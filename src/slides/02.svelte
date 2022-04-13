<script>
	/* PACKAGES */

	import anime from 'animejs';

	/* PROPS */
	export { clazz as class };

	/* STORES */
	import { slidesIndex, globalSlideNum } from '@stores/layout';

	/* LOCAL VARS */
	let clazz;
	const slideConfig = $slidesIndex.Slide02;

	let text1, text2, text3;
	let media1, media2, media3;

	/* FUNCTIONS */

	function internalIndexCalculator(slideNumber) {
		return (slideNumber - slideConfig.start) / (slideConfig.end - slideConfig.start);
	}

	$: bindingsReady = text1 && text2 && text3 && media1 && media2 && media3;

	$: innerPercentage = internalIndexCalculator($globalSlideNum);

	const textAnimation = (percentage) => {
		const animation = anime.timeline({
			autoplay: false,
			loop: false,
			endDelay: 200
		});

		animation
			.add({
				targets: [text1, text2, text3],
				opacity: (el, i) => {
					return i == 0 ? [0.5, 1] : 0.5;
				},
				duration: 200,
				easing: 'linear'
			})
			.add({
				targets: [text1, text2, text3],
				opacity: (el, i) => {
					return i == 0 ? [1, 0.5] : i == 1 ? [0.5, 1] : 0.5;
				},
				duration: 200,
				delay: 0,
				easing: 'linear'
			})
			.add({
				targets: [text1, text2, text3],
				opacity: (el, i) => {
					return i == 1 ? [1, 0.5] : i == 2 ? [0.5, 1] : 0.5;
				},
				duration: 200,
				delay: 0,
				easing: 'linear'
			});

		//console.log('CHECKING DURATION', animation.duration * percentage);

		animation.seek(animation.duration * percentage);
		// determines what frame the animation should be in
		// num of frames is determined by the duration + delay
	};

	const mediaAnimation = (percentage) => {
		const animation = anime.timeline({
			autoplay: false,
			loop: false,
			endDelay: 200
		});

		animation
			.add({
				targets: [media1, media2, media3],
				translateY: (el, i) => {
					return i == 0 ? ['100%', '0%'] : '100%';
				},
				duration: 200,
				easing: 'linear'
			})
			.add({
				targets: [media1, media2, media3],
				translateY: (el, i) => {
					return i == 0 ? ['0%', '-100%'] : i == 1 ? ['100%', '0%'] : '100%';
				},
				duration: 200,
				delay: 0,
				easing: 'linear'
			})
			.add({
				targets: [media1, media2, media3],
				translateY: (el, i) => {
					return i == 1 ? ['0%', '-100%'] : i == 2 ? ['100%', '0%'] : '-100%';
				},
				duration: 200,
				delay: 0,
				easing: 'linear'
			});

		//console.log('CHECKING DURATION', animation.duration * percentage);

		animation.seek(animation.duration * percentage);
		// determines what frame the animation should be in
		// num of frames is determined by the duration + delay
	};

	$: {
		if (bindingsReady) {
			textAnimation(innerPercentage);
			mediaAnimation(innerPercentage);
		}
	}
</script>

<div class={`w-screen h-screen z-50 bg-white ${clazz}`}>
	<h1 class="fixed right-0 top-0 z-[999]">{innerPercentage}</h1>
	<div class="relative w-full h-full flex items-center">
		<div class="w-1/2 flex flex-col items-center justify-center gap-x-10 text-center">
			<h2 bind:this={text1} style="opacity:0.5;" class={`text-xl w-full text-black`}>
				Lack trust in credit score
			</h2>
			<h2 bind:this={text2} style="opacity:0.5;" class={`text-xl w-full text-black`}>
				Manual processing
			</h2>
			<h2 bind:this={text3} style="opacity:0.5;" class={`text-xl w-full text-black`}>
				Hard to communicate
			</h2>
		</div>
		<div class="absolute top-0 left-1/2 w-1/2 flex flex-col justify-center items-center">
			<div class="relative w-full h-full">
				<div bind:this={media1} class={`absolute top-0 left-0 min-w-full min-h-screen bg-red-300`}>
					Lack trust in credit score
				</div>
				<div
					bind:this={media2}
					class={`absolute top-0 left-0 min-w-full min-h-screen bg-yellow-300`}
				>
					Manual processing
				</div>
				<div
					bind:this={media3}
					class={`absolute top-0 left-0 min-w-full min-h-screen bg-green-300`}
				>
					Hard to communicate
				</div>
			</div>
		</div>
	</div>
</div>
