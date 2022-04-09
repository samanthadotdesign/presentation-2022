<script>
	/* PACKAGES */
	import anime from 'animejs';
	import { onMount } from 'svelte';

	/* STORES */
	import {
		window as windowObj,
		isLoading,
		inTransition,
		globalSlideNum,
		slidesIndex
	} from '@stores/layout';
	import { browser } from '$app/env';

	/* ASSETS */
	import '@assets/globals.css';

	/* LOCAL VARS */
	let Hammer;
	let appRef;

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
			// It will replace $globalSlideNum

			if (event.code == 'ArrowLeft' && $globalSlideNum.value > 0) {
				finalValue = $globalSlideNum.value - 1;
			} else if (event.code == 'ArrowRight' && $globalSlideNum.value < 25) {
				finalValue = $globalSlideNum.value + 1;
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
		event.preventDefault();
		if ($inTransition == false) {
			$inTransition = true;
			let finalValue;
			if (Math.sign(event.deltaY) == -1 && $globalSlideNum.value > 0) {
				finalValue = $globalSlideNum.value - 1;
			} else if (Math.sign(event.deltaY) == 1 && $globalSlideNum.value < 25) {
				finalValue = $globalSlideNum.value + 1;
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
			targets: $globalSlideNum,
			// Animejs will interpolate the value from 0 to end
			value: end,
			easing: config.easing,
			duration: config.duration,
			round: 100,
			// Set inTransition to false after a little delay
			complete: () =>
				setTimeout(() => {
					$inTransition = false;
				}, 100)
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
			if (this.inTransition == false) {
				this.inTransition = true;
				let finalValue;
				if (jResult == 'left' && this.globalUnits < 25) {
					finalValue = this.globalUnits + 1;
				} else if (jResult == 'right' && this.globalUnits > 0) {
					finalValue = this.globalUnits - 1;
				} /* else if (jResult == "down") {
            finalValue = 25
          } else if (jResult == "up") {
            finalValue = 1
          } */ else {
					this.inTransition == false;
				}
				const config = {
					easing: 'easeOutQuart',
					duration: 1500
				};
				this.smoothUpdate(finalValue, config);
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

			setHammer();
			resizeHandler({ width: window.innerWidth, height: window.innerHeight });
		}
	});

	/* REACTIVE VARS */

	// activeSlides returns the array of slides that will be shown [slide0, slide1]
	// Depending on configs, it will return >1 value in the array
	$: activeSlidesArray = Object.keys($slidesIndex).filter((slide) => {
		return inRange($globalSlideNum.value, $slidesIndex[slide].start, $slidesIndex[slide].end);
	});

	// Preloads the slides before they're shown
	$: preloadSlidesArray = Object.keys($slidesIndex).filter((slide) => {
		return inRange($globalSlideNum.value, $slidesIndex[slide].preload, $slidesIndex[slide].start);
	});
</script>

<div
	bind:this={appRef}
	class="w-screen h-screen fixed overflow-hidden"
	on:mousewheel={handleScrollWheel}
>
	{#each activeSlidesArray as slide}
		<!-- <svelte:component this={slide} class="absolute" /> -->
		<div class={`absolute w-screen h-screen flex justify-center items-center z-2`}>{slide}</div>
	{/each}

	{#each preloadSlidesArray as slide}
		<!-- <svelte:component this={slide} class="invisible" /> -->
		<div class="absolute w-screen h-screen flex justify-start items-center z-1">{slide}</div>
	{/each}
</div>
