<script lang="ts">
	import Icon from 'svelte-awesome';
	import { mobile, envelopeOpenO } from 'svelte-awesome/icons';
	import { browser } from '$app/environment';

	$: if (groomModalOpen || brideModalOpen) {
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

	const groomPhone = '010-8604-4032';
	const bridePhone = '010-2849-8907';

	let groomModalOpen = false;
	let brideModalOpen = false;
</script>

<section>
	<div class="text-center mx-auto">
		<div class="mx-auto py-3 w-24">
			<img src="/images/flower.png" width="320" height="320" alt="flower" />
		</div>
		<div class="w-full mx-auto px-5 py-5">
			<p class="leading-relaxed text-lg text-black" style="font-weight:600">
				귀중한 분들을 초대합니다.<br />
			</p>
			<br />
			<p class="leading-relaxed text-base text-black/80">
				함께 맞이하는 7번째 가을,<br/>
				새로운 마음과 새 의미를 되새기며<br/>
				저희 두 사람 소중한 앞날을 향해 <br/>
				새 출발을 하려고 합니다.<br/><br/>
				따뜻한 마음으로 앞으로의 미래를<br/>
				축복해주시면 감사하겠습니다.<br/>
			</p>
		</div>
		<div class="w-full mx-auto px-5 py-5">
			<p class="text-gray-700 tracking-wider text-center">
				이동국 • 박수빈 <span class="text-xs text-neutral">의 장남</span> 준서
				<br />
				이종원 • 이은숙 <span class="text-xs text-neutral">의 장녀</span> 진아
			</p>
		</div>
		<div class="flex justify-evenly my-7">
			<div class="w-1/3">
				<label for="groom-modal">
					<div
						class="rounded-full shadow-2xl overflow-hidden ring ring-secondary ring-offset-base-100 ring-offset-2"
					>
						<img src="/images/face/groom.jpg" width="450" height="450" alt="groom" />
					</div>
				</label>
			</div>
			<label for="bride-modal" class="w-1/3">
				<div
					class="rounded-full shadow-2xl overflow-hidden ring ring-secondary ring-offset-base-100 ring-offset-2"
				>
					<img src="/images/face/bride.jpg" width="400" height="400" alt="bride" />
				</div>
			</label>
		</div>
		<div class="text-gray-500 text-xs my-5">
			이미지를 클릭해서<br />연락처와 신랑·신부의 메시지를 확인해보세요.
		</div>
	</div>
</section>

<input
	on:click={() => (groomModalOpen = !groomModalOpen)}
	type="checkbox"
	id="groom-modal"
	class="modal-toggle"
/>
<label for="groom-modal" class="modal cursor-pointer">
	<label class="modal-box" style="background-color:white" for="">
		<div>
			<!-- TODO: 신랑측 프로필 인사말 수정하기 -->
			<label for="groom-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
			<div class="w-2/3 mx-auto rounded-full shadow-2xl overflow-hidden">
				<img src="/images/face/groom.jpg" width="450" height="450" alt="groom" />
			</div>
			<div class="text-center my-5">
				<a href="tel:{groomPhone}"><Icon class="mx-3" data={mobile} scale="3" /></a><a
					href="sms:{groomPhone}"><Icon class="mx-3" data={envelopeOpenO} scale="2" /></a
				>
			</div>
			<div class="break-keep p-3">
				이제 사랑하는 사람과 함께 미래를 바라보려고 합니다.<br />
				힘든 일이 있어도 서로 의지하며 극복하고 행복하게 오래오래 살아가겠습니다.
			</div>
		</div>
	</label>
</label>

<input
	on:click={() => (brideModalOpen = !brideModalOpen)}
	type="checkbox"
	id="bride-modal"
	class="modal-toggle"
/>
<label for="bride-modal" class="modal cursor-pointer">
	<label class="modal-box" style="background-color:white" for="">
		<div>
			<label for="bride-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
			<div class="w-2/3 mx-auto rounded-full shadow-2xl overflow-hidden">
				<img src="/images/face/bride.jpg" width="400" height="400" alt="bride" />
			</div>
			<div class="text-center my-5">
				<a href="tel:{bridePhone}"><Icon class="mx-3" data={mobile} scale="3" /></a><a
					href="sms:{bridePhone}"><Icon class="mx-3" data={envelopeOpenO} scale="2" /></a
				>
			</div>
			<div class="break-keep p-3">
				알콩달콩 투닥투닥 7년을 만나왔던 저희, 결혼합니다👫<br />
				지금보다 더 예쁘고 행복하게 살겠습니다😊 <br />
			</div>
			<div class="break-keep p-3 text-sm">
				P.S. 모바일청첩장 상단의 D-Day를 클릭해보세요 :)
			</div>
		</div>
	</label>
</label>
