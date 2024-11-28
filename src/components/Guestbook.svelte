<script lang="ts">
	import { browser } from '$app/environment';

	export let guestbooks;
	let _id = null;
	let name = '';
	let content = '';
	let password = '';
	let open = false;
	let postDisabled = false;
	let colors = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];
	let currentColor = 'c1';
	let showPopup = false;
	let selectedGuestbook = null;

	$: if (open) {
		disableScroll();
	} else {
		enableScroll();
	}

	function disableScroll() {
		if (browser) {
			document.body.style.overflow = 'hidden';
		}
	}

	function enableScroll() {
		if (browser) {
			document.body.style.overflow = 'auto';
		}
	}

	function pickColor() {
		currentColor = colors[Math.floor(Math.random() * colors.length)];
		return currentColor;
	}

	async function doPost() {
		postDisabled = true;
		const color = currentColor;
		const res = await fetch('/api/guestbook', {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				_id,
				name,
				content,
				color,
				password
			})
		});

		if (!res.ok) {
			if (res.status == 400) {
				alert('잘못된 암호입니다.');
			} else {
				alert('메시지 전송에 실패했습니다.');
			}
			postDisabled = false;
			return;
		}

		const guestbook = (await res.json()).guestbook;
		if (_id != null) {
			guestbooks.forEach((g) => {
				if (g._id == _id) {
					g.name = guestbook.name;
					g.content = guestbook.content;
				}
			});
			guestbooks = [...guestbooks];
			alert('수정되었습니다.');
		} else {
			guestbooks = [...guestbooks, guestbook];
			alert('등록되었습니다.');
		}

		initPopup();
		pickColor();
		postDisabled = false;
		showPopup = false;
		return;
	}

	function initPopup() {
		_id = null;
		name = '';
		content = '';
		password = '';
	}

	function togglePopup(e) {
		let sender = e.target;
		if (sender.classList.contains('write') || sender.classList.contains('btn')) {
			if (showPopup) {
				initPopup();
			} else {
				pickColor();
			}
			showPopup = !showPopup;
		}
	}

	function getDate(ts) {
		const date = new Date(ts); // Date 2011-05-09T06:08:45.178Z
		const year = date.getFullYear();
		const month = ("0" + (date.getMonth() + 1)).slice(-2);
		const day = ("0" + date.getDate()).slice(-2);
		return `${year}/${month}/${day}`
	}

	function selectTalk(e, guestbook) {
		let sender = e.target;
		if (!sender.classList.contains('edit')) {
			if (guestbook == selectedGuestbook) {
				selectedGuestbook = null;
			} else {
				selectedGuestbook = guestbook;
			}
		} else {
			modifyTalk(guestbook);
		}
	}

	function modifyTalk(guestbook) {
		initPopup();
		_id = guestbook._id;
		currentColor = guestbook.color;
		name = guestbook.name;
		content = guestbook.content;
		showPopup = true;
	}
</script>

<section>
	<div class="py-2 mx-auto text-center guestbook">
		<h1 class="text-xl md:text-2xl font-bold text-center text-primary">축하의 한마디</h1>
		{#if guestbooks}
		<div class="body">
			{#each guestbooks as guestbook}
			<div class="talk {guestbook == selectedGuestbook ? 'selected' : ''}" on:click={(e) => selectTalk(e, guestbook)}>
				<svg width="1.5em" height="1.5em" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="{guestbook.color}">
					<path d="M15.5 9a.5.5 0 100-1 .5.5 0 000 1z" fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path>
					<path d="M21.542 15A9.997 9.997 0 0022 12c0-5.523-4.477-10-10-10S2 6.477 2 12s4.477 10 10 10c4.478 0 8.268-2.943 9.542-7zm0 0H17" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path>
				</svg>
				<div>
					{@html guestbook.name}
					<span class="edit">수정하기</span>
					<div class="bubble-info-wrap">
						<p>{@html guestbook.content}</p>
						<small>{getDate(guestbook.date)}</small>
					</div>
				</div>
			</div>
			{/each}
		</div>
		{/if}
		<button class="btn" on:click={togglePopup}>나도 한마디😍</button>
		{#if showPopup}
		<div class="write" on:click={togglePopup}>
			<div class="screen">
				<div class="area">
					<h3 class="title"><span>나도 한마디😍</span></h3>
					<form data-gtm-form-interact-id="1">
						<div class="comment">
							<svg width="1.5em" height="1.5em" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="{currentColor}">
								<path d="M15.5 9a.5.5 0 100-1 .5.5 0 000 1z" fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path>
								<path d="M21.542 15A9.997 9.997 0 0022 12c0-5.523-4.477-10-10-10S2 6.477 2 12s4.477 10 10 10c4.478 0 8.268-2.943 9.542-7zm0 0H17" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path>
							</svg>
							<div>
								<div contenteditable="true" class="editor" bind:innerHTML={name}></div>
								<br>
								<div contenteditable="true" class="editor" bind:innerHTML={content}></div>
								<br>
								<div contenteditable="true" class="editor" bind:innerHTML={password}></div>
							</div>
						</div>
						<input type="button" class="write-btn" value="글쓰기" on:click={doPost} disabled={!(content && name && password) || postDisabled}>
					</form>
				</div>
			</div>
		</div>
		{/if}
	</div>
</section>