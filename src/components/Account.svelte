<script lang="ts">
	import copy from 'copy-to-clipboard';
	import { Icon } from 'svelte-awesome';
	import copyIcon from 'svelte-awesome/icons/copy';

	const groomAccounts = {
		'이준서': '신한 110-235-471685',
		'(혼주) 박수빈': '농협 352-1823-549813'
	}
	const brideAccounts = {
		'이진아': '신한 110-381-913319',
		'(혼주) 이은숙': '농협 083-02-002225'
	}

	const copyAccount = async (accountInfo) => {
		copy(accountInfo);
		alert('계좌번호가 복사되었습니다.');
	};
</script>

<section>
	<div class="py-2 mx-auto text-center">
		<h1 class="text-xl md:text-2xl font-bold text-center text-primary">마음 전하실 곳</h1>
		<div class="p-2">
			<p class="text-sm">"신랑신부에게 축하의 마음을 전해주세요"</p>
			<div class="collapse sm:w-1/2 w-4/5 bg-base-200 mx-auto my-5 rounded-box shadow-xl bg-smokewhite">
				<input type="checkbox" />
				<div class="p-5 collapse-title font-bold">신랑측 계좌번호</div>
				<div class="collapse-content text-sm">
					<div style="padding-left:10px">
					{#each Object.entries(groomAccounts) as [name, account]}
						<div style="display:flex">
							<div class="m-1 font-bold text-base" style="padding-right:5px">
								{name}
							</div>
							<button on:click={() => copyAccount(account)}>
								{account} <Icon data={copyIcon} />
							</button>
						</div>
					{/each}
					</div>
				</div>
			</div>
			<div class="collapse sm:w-1/2 w-4/5 bg-base-200 mx-auto mt-5 rounded-box shadow-xl bg-smokewhite">
				<input type="checkbox" />
				<div class="p-5 collapse-title font-bold">신부측 계좌번호</div>
				<div class="collapse-content text-sm">
					<div style="padding-left:10px">
					{#each Object.entries(brideAccounts) as [name, account]}
						<div style="display:flex">
							<div class="m-1 font-bold text-base" style="padding-right:5px">
								{name}
							</div>
							<button on:click={() => copyAccount(account)}
								>{account} <Icon data={copyIcon} />
							</button>
						</div>
					{/each}
					</div>
				</div>
			</div>
		</div>
		<div style="margin-top:40px">
				<div><p class="text-sm" style="margin-bottom: 5px;">축하 🌸화환🌸은 정중히 사양합니다.</p></div>
				<div><p class="text-sm">좋은 마음만 감사히 받겠습니다.</p></div>
		</div>
	</div>
</section>
