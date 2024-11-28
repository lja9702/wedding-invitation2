<script lang="ts">
	import Album from '$components/Album.svelte';
	import Intro from '$components/Intro.svelte';
	import Message from '$components/Message.svelte';
	import Location from '$components/Location.svelte';
	import Guestbook from '$components/Guestbook.svelte';
	import Footer from '$components/Footer.svelte';
	import Account from '$components/Account.svelte';
	import Saos from 'saos';
	import { onDestroy, onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import Memory from '$components/Memory.svelte';

	let guestbooks;
	let music = null
	let soundState = 'off'
	let isPlayed = false;
	$: isMemory = false;

	onMount(async () => {
		const res = await fetch('/api/guestbook');
		guestbooks = (await res.json()).guestbooks;
	});

	onMount(() => {
		music = new Audio('/music/background-music.mp3')
		music.volume = 0.5
		music.muted = true;
	});

	const togglePlaying = () => {
		soundState === 'off'? soundOn() : soundOff()
	}

	const soundOn = () => {
		if (!isPlayed) {
			music.play();
			isPlayed = true;
		}
		music.volume = 0.5
		music.muted = false;
		soundState = 'on'
	}

	const soundOff = () => {
		music.volume = 0
		music.muted = true;
		soundState = 'off'
	}

</script>

<svelte:head>
	<meta property="og:type" content="website">
	<meta property="og:url" content="https://wedding-junseo-with-jinah.vercel.app">
	<meta property="og:title" content="준서와 진아의 결혼식에 초대합니다">
	<meta property="og:image" content="https://wedding-junseo-with-jinah.vercel.app/images/kakao_thumbnail2.jpg">
	<meta property="og:description" content="2023년 10월 21일 토요일 오후 1시 국회의사당 사랑재">
	<title>준서와 진아의 결혼식에 초대합니다</title>
	<link rel="stylesheet" href="https://unpkg.com/mono-icons@1.0.5/iconfont/icons.css" >
</svelte:head>

<div>
	<label class="swap swap-switch">
		<button on:click={togglePlaying}/>
		{#if soundState === 'on'} 
		<i class="mi mi-volume-up"/>

		{:else if soundState === 'off'}
		<i class="mi mi-volume-off"/>

		{/if}
	</label>
{#if !isMemory}
	<div in:fade={{ duration: 2500 }} out:fade>
		<Intro bind:isMemory />
		<div class="divider" />
		<Saos once={true} animation={'fade-in 1.5s'} top={250}>
			<Message />
			<div class="divider" />
		</Saos>
		<Saos once={true} animation={'fade-in 1.5s'} top={250}>
			<Location />
			<div class="divider" />
		</Saos>
		<Saos once={true} animation={'fade-in 1.5s'} top={250}>
			<Album />
			<div class="divider" />
		</Saos>
		<Saos once={true} animation={'fade-in 1.5s'} top={250}>
			<Account />
			<div class="divider" />
			<Guestbook {guestbooks} />
			<div>
				<Footer />
			</div>
		</Saos>
	</div>
{:else}
	<div in:fade={{ duration: 2500 }} out:fade>
		<Memory bind:isMemory />
	</div>
{/if}
</div>
<style>
	@-webkit-keyframes -global-fade-in {
		0% {
			-webkit-transform: translateY(10px);
			transform: translateY(10px);
			opacity: 0;
		}
		100% {
			-webkit-transform: translateY(0);
			transform: translateY(0);
			opacity: 1;
		}
	}

	.swap-switch{
		z-index: 1;
		position: fixed;
		top: 13px;
		right: 17px;
		color: gray;
		font-size: x-large;
	}
</style>
