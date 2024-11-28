<script lang="ts">
	import { Navigation, Pagination, A11y } from 'swiper';
	import { Swiper, SwiperSlide } from 'swiper/svelte';

	import 'swiper/css';
	import 'swiper/css/navigation';
	import 'swiper/css/pagination';

	export let isMemory = true;
	function getDayAfter(year, month, day) {
		const today = new Date();
		const dayAfter20141107 = new Date(year, month - 1, day);
		const diff = dayAfter20141107.getTime() - today.getTime();
		const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
		if (diffDays > 0) {
			return `D-${diffDays}`;
		} else {
			return `D+${diffDays * -1}`;
		}
	}

	const medias = [
		{
			id: 1,
			title: '200일 남산에서 (자물쇠야 어디있니?)'
		},
		{
			id: 2,
			title: '2018년 새해맞이 제야의 종 엄청난 인파 속에서'
		},
		{
			id: 3,
			title: '2주년 기념✌️'
		},
		{
			id: 4,
			title: '2019년 프라하 카를교에서'
		},
		{
			id: 5,
			title: '2019년 악뮤콘! 악뮤 최고🤩'
		},
		{
			id: 6,
			title: '2020년 봄맞이 제주🍊'
		},
		{
			id: 7,
			title: '진아의 졸업식🎓'
		},
		{
			id: 8,
			title: '2020년 가을 제주🌴'
		},
		{
			id: 9,
			title: '2021년 새해맞이 석촌호수에서'
		},
		{
			id: 10,
			title: '5주년 기념🖐️'
		},
		{
			id: 11,
			title: '2000일 기념🥰'
		},
		{
			id: 12,
			title: '2022년 준서 생일기념 제주🎉'
		},
		{
			id: 13,
			title: '2022년 늦가을 양재천에서🎑'
		},
		{
			id: 14,
			title: '2022년 겨울 양평에서❄️'
		}
	];
</script>

<div class="text-center justify-center modal-middle flex py-9 text-xl">
	<span class="px-3">이준서</span>
	<button on:click={() => (isMemory = !isMemory)}
		><span
			class="tooltip tooltip-open tooltip-bottom px-3 text-4xl text-primary"
			data-tip="다시 눌러서 돌아가기">{getDayAfter(2017, 1, 19)}</span
		></button
	>
	<span class="px-3">이진아</span>
</div>

<div class="mx-auto">
	<div class="mb-2">
		<Swiper
			modules={[Navigation, Pagination, A11y]}
			slidesPerView={1}
			navigation={true}
			pagination={true}
			centeredSlides={true}
			setWrapperSize={true}
		>
			{#each medias as media}
				<SwiperSlide>
					<div class="flex justify-center">
						<div>
							<img src="/images/memory/{media.id}.jpg" alt={media.id} />
							<div class="card p-4 m-5 bg-base-200 shadow-xl text-center memory-card">
								{media.title}
							</div>
						</div>
					</div>
				</SwiperSlide>
			{/each}
		</Swiper>
	</div>
</div>
