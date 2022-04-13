<script>
	/* PACKAGES */
	import anime from 'animejs';
	import { onMount } from 'svelte';

	/* STORES */
	import layoutStore, {
		window as windowObj,
		isLoading,
		inTransition,
		globalSlideNum,
		slidesIndex
	} from '@stores/layout';

	import { browser } from '$app/env';

	/* SLIDES */

	import Slide00 from '@slides/00.svelte';

	import Slide01 from '@slides/01.svelte';

	import Slide02 from '@slides/02.svelte';

	import Slide03 from '@slides/03.svelte';

	const slideComponents = {
		Slide00,
		Slide01,
		Slide02,
		Slide03
	};

	/* ASSETS */
	import '@assets/globals.css';

	/* LOCAL VARS */
	let Hammer;
	let appRef;

	let activeSlidesArray;
	let preloadSlidesArray;

	let localSlideNum = { slideNum: 0 };

	/* FUNCTIONS */
	const resizeHandler = (event) => {
		const { innerWidth: width, innerHeight: height } = window;

		$windowObj = {
			width,
			height
		};
	};

	function keyPress(event) {
		if ($inTransition == false) {
			$inTransition = true;

			let finalValue;
			// finalValue is the next slide position
			// It will replace localSlideNum

			if (event.code == 'ArrowLeft' && $globalSlideNum > 0) {
				finalValue = $globalSlideNum - 1;
			} else if (event.code == 'ArrowRight' && $globalSlideNum < 25) {
				finalValue = $globalSlideNum + 1;
			} else {
				$inTransition = false;
			}

			// If there is a change in the slide number (Slide 0->Slide 1), create config object
			if (finalValue !== $globalSlideNum) {
				const config = {
					easing: 'easeOutQuart',
					duration: 1500
				};
				smoothUpdate(finalValue, config);
			}
		}
	}

	function handleScrollWheel(event) {
		//console.log('CHECKING SCROLL EVENT');
		event.preventDefault();
		event.stopPropagation();
		event.stopImmediatePropagation();

		if ($inTransition == false) {
			$inTransition = true;
			let finalValue;
			if (Math.sign(event.deltaY) == -1 && $globalSlideNum > 0) {
				finalValue = $globalSlideNum - 1;
			} else if (Math.sign(event.deltaY) == 1 && $globalSlideNum < 25) {
				finalValue = $globalSlideNum + 1;
			}
			const config = {
				easing: 'easeInOutQuad',
				duration: 2000
			};
			smoothUpdate(finalValue, config);
		}
	}

	// Interpolating changes between slides
	function smoothUpdate(end, config) {
		return anime({
			// Set target for animation
			targets: localSlideNum,
			// Animejs will interpolate the value from 0 to end
			slideNum: end,
			easing: config.easing,
			duration: config.duration,
			round: 100,
			// Set inTransition to false after a little delay
			update: function () {
				$globalSlideNum = localSlideNum.slideNum;
			},
			complete: () => {
				return setTimeout(() => {
					$inTransition = false;
				}, 100);
			}
		});
	}

	function inRange(x, min, max) {
		return (x - min) * (x - max) <= 0;
	}

	// Custom events from Hammer for both mobile and desktop swiping
	async function setHammer() {
		const Hammer = await window.Hammer;
		var hammertime = new window.Hammer(appRef);
		hammertime.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
		hammertime.on('swipe', (e) => {
			let jResult = '';
			switch (true) {
				// LEFT
				case e.angle < -157.5 || e.angle > 157.5:
					jResult = 'left';
					break;
				// RIGHT
				case e.angle > -22.5 && e.angle < 22.5:
					jResult = 'right';
					break;
				// UP
				case e.angle < -67.5 && e.angle > -112.5:
					jResult = 'up';
					break;
				// Down
				case e.angle > 67.5 && e.angle < 112.5:
					jResult = 'down';
					break;
				// LEFT-Up
				case e.angle < -112.5 && e.angle > -157.5:
					jResult = 'left-Up';
					break;
				// LEFT-Down
				case e.angle > 112.5 && e.angle < 157.5:
					jResult = 'left-Down';
					break;
				// RIGHT-Up
				case -22.5 > e.angle && e.angle > -67.5:
					jResult = 'right-Up';
					break;
				// RIGHT-Down
				case e.angle > 22.5 && e.angle < 67.5:
					jResult = 'right-Down';
					break;
				default:
					// code block
					jResult = 'unknown'; // UNKNOWN - what happened?
			}
			/* console.log("--00--> Swipe: " + e.direction + " -- Dir is: " + jResult) */
			if ($inTransition == false) {
				$inTransition = true;
				let finalValue;
				if (jResult == 'left' && $globalSlideNum < 25) {
					finalValue = $globalSlideNum + 1;
				} else if (jResult == 'right' && $globalSlideNum > 0) {
					finalValue = $globalSlideNum - 1;
				} /* else if (jResult == "down") {
            finalValue = 25
          } else if (jResult == "up") {
            finalValue = 1
          } */ else {
					$inTransition == false;
				}
				const config = {
					easing: 'easeOutQuart',
					duration: 1500
				};
				smoothUpdate(finalValue, config);
			}
		});

		appRef.addEventListener(
			'touchmove',
			function (event) {
				//console.log("Empecé a mover con el fingui", event)
				event.preventDefault();
			}.bind(this)
		);
	}

	/* RUNTIME */
	onMount(() => {
		if (browser) {
			window.Hammer = import('hammerjs');

			window.addEventListener('resize', resizeHandler);
			window.addEventListener('keyup', keyPress);
			//window.addEventListener('wheel', handleScrollWheel, { passive: false });

			setHammer();
			resizeHandler({ width: window.innerWidth, height: window.innerHeight });
		}
	});

	/* REACTIVE VARS */

	// activeSlides returns the array of slides that will be shown [slide0, slide1]
	// Depending on configs, it will return >1 value in the array
	$: activeSlidesArray = Object.keys($slidesIndex).filter((slide) => {
		return inRange($globalSlideNum, $slidesIndex[slide].start, $slidesIndex[slide].end);
	});

	// Preloads the slides before they're shown
	$: preloadSlidesArray = Object.keys($slidesIndex).filter((slide) => {
		return inRange($globalSlideNum, $slidesIndex[slide].preload, $slidesIndex[slide].start);
	});

	/* setInterval(() => {
		console.log('CHECKING GLOBAL ON INTERVAL', $globalSlideNum);
	}, 500); */
</script>

<div
	on:mousewheel={handleScrollWheel}
	bind:this={appRef}
	class="w-screen h-screen fixed overflow-hidden"
>
	{#key $globalSlideNum}
		<h1 class="absolute top-0 left-0 z-[60]">{$globalSlideNum}</h1>
		{#each activeSlidesArray as slide}
			<svelte:component this={slideComponents[slide]} class="absolute top-0 left-0" />
			<!-- <div class={`absolute w-screen h-screen flex justify-center items-center z-2`}>{slide}</div> -->
		{/each}

		{#each preloadSlidesArray as slide}
			<svelte:component this={slideComponents[slide]} class="invisible" />
			<!-- <div class="absolute w-screen h-screen flex justify-start items-center z-1">{slide}</div> -->
		{/each}
	{/key}
</div>
