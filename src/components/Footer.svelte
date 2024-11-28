<script lang="ts">
	import { env } from '$env/dynamic/public';
	import copy from 'copy-to-clipboard';

	// TODO: Use Vercel image url after deploy
	const previewImageUrl = 'https://wedding-junseo-with-jinah.vercel.app/images/kakao_thumbnail2.jpg';
	const title = '준서와 진아의 결혼식에 초대합니다';
	const desc = '2023년 10월 21일 토요일 오후 1시 국회의사당 사랑재';

	const initialize = () => {
		// eslint-disable-next-line no-undef
		Kakao.init(env.PUBLIC_KAKAO_JAVASCRIPT_KEY);
		// eslint-disable-next-line no-undef
		Kakao.Share.createDefaultButton({
			container: '#kakaotalk-sharing-btn',
			objectType: 'feed',
			content: {
				title: title,
				description: desc,
				imageUrl: previewImageUrl,
				link: {
					mobileWebUrl: window.location.href,
					webUrl: window.location.href
				}
			},
			buttons: [
				{
					title: '청첩장 보러가기',
					link: {
						mobileWebUrl: window.location.href,
						webUrl: window.location.href
					}
				}
			]
		});
	};

	async function sharePage() {
		if (navigator.share) {
			navigator.share({
				title: document.title,
				url: window.location.href
			});
		} else {
			copy(window.location.href);
			alert('링크가 복사되었습니다.');
		}
	}
</script>

<svelte:head>
	<script
		src="https://t1.kakaocdn.net/kakao_js_sdk/2.0.1/kakao.min.js"
		integrity="sha384-eKjgHJ9+vwU/FCSUG3nV1RKFolUXLsc6nLQ2R1tD0t4YFPCvRmkcF8saIfOZNWf/"
		crossorigin="anonymous"
		on:load={initialize}></script>
</svelte:head>

<section>
	<div class="text-center px-5 pb-5">
		<a id="kakaotalk-sharing-btn" href="javascript:;" role="button" class="btn mx-2">카카오로 공유하기</a>
		<button class="btn mx-2" on:click={sharePage}>링크로 공유하기</button>
	</div>
</section>
