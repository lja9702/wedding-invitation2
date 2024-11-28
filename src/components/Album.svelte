<script>
	import { Navigation, Pagination, A11y, Thumbs } from 'swiper';
	import { Swiper, SwiperSlide } from 'swiper/svelte';

	let thumbsSwiper = null;
	// TODO: 사진 수에 맞춰서 조정
	const imageCount = 24;

	const setThumbsSwiper = (e) => {
		const [swiper] = e.detail;
		setTimeout(() => {
			thumbsSwiper = swiper;
		});
	};
	import 'swiper/css';
	import 'swiper/css/navigation';
	import 'swiper/css/pagination';
</script>

<section>
	<div class="py-3 mx-auto">
		<h1 class="mb-8 text-2xl md:text-3xl font-bold text-center text-primary">갤러리</h1>
		<div class="mb-2">
			<Swiper
				modules={[Navigation, Pagination, A11y, Thumbs]}
				thumbs={{ swiper: thumbsSwiper }}
				slidesPerView={1}
				navigation={true}
				pagination={true}
				centeredSlides={true}
				setWrapperSize={true}
			>
                {#each Array(imageCount) as _, index (index)}
					<SwiperSlide>
						<div class="flex justify-center">
							<img src="/images/album/{index + 1}.jpg" alt={index + 1} />
						</div>
					</SwiperSlide>
				{/each}
				<SwiperSlide>
					<div class="flex justify-center">
						<div style="width: 80%">
							<div class="movie" alt={imageCount}>
								<iframe src="https://www.youtube.com/embed/tRYrTgS5DrI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
							</div>
						</div>
					</div>
				</SwiperSlide>
			</Swiper>
		</div>
		<Swiper
			on:swiper={setThumbsSwiper}
			modules={[Navigation, Pagination, A11y, Thumbs]}
			slidesPerView={3}
			spaceBetween={10}
			watchSlidesProgress={true}
		>
			{#each Array(imageCount) as _, index (index)}
				<SwiperSlide>
					<img class="thumb-img" src="/images/album/{index + 1}.jpg" alt={index + 1} />
				</SwiperSlide>
			{/each}
		</Swiper>
	</div>
</section>

<style>
	.thumb-img {
		object-fit: cover;
		aspect-ratio: 1 / 1;
		width: 100%;
	}
</style>
