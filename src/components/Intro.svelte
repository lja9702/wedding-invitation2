<script lang="ts">
	const imgUrl = '/images/intro.jpg';

	export let isMemory = false;

	function getDayBefore(year, month, day) {
		const today = new Date();
		const dayBefore20230128 = new Date(year, month - 1, day);
		const diff = dayBefore20230128.getTime() - today.getTime();
		const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
		if (diffDays > 0) {
			return `D-${diffDays}`;
		}
		if (diffDays === 0) {
			return 'D-Day';
		} else {
			return `D+${diffDays * -1}`;
		}
	}
</script>

<div class="text-center justify-center modal-middle flex py-9 text-xl">
	<span class="px-3">이준서</span>
	<button on:click={() => (isMemory = !isMemory)}>
		<span class="px-3 text-4xl text-primary">{getDayBefore(2023, 10, 21)}</span>
	</button>
	<span class="px-3">이진아</span>
</div>
<img src={imgUrl} alt="intro" width="678" height="1024" class="w-full pb-5" />
<div class="text-center py-5 text-lg">
	<p>2023년 10월 21일 토요일 오후 1시</p>
	<p>국회의사당 사랑재</p>
</div>
