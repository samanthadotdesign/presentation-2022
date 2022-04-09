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
			//console.log("espichaste", event)
			let finalValue;
			/* if (event.key && !isNaN(event.key)) {
          //console.log("NUMBER")
          finalValue = Number(event.key)
        } else */ if (event.code == 'ArrowLeft' && $globalSlideNum > 0) {
				finalValue = $globalSlideNum - 1;
			} else if (event.code == 'ArrowRight' && $globalSlideNum < 25) {
				finalValue = $globalSlideNum + 1;
			} /* else if (event.code == "End") {
          finalValue = 25
        } else if (event.code == "Home") {
          finalValue = 0
        }  else if (event.code == "PageUp" && $globalSlideNum <= 22) {
          finalValue = $globalSlideNum + 3
        } else if (event.code == "PageDown" && $globalSlideNum >= 4) {
          finalValue = $globalSlideNum - 3
        } */ else {
				$inTransition = false;
			}
			if (finalValue !== $globalSlideNum) {
				const config = {
					easing: 'easeOutQuart',
					duration: 1500
				};
				//console.log("espichaste y soy distinto", finalValue, event, config)
				smoothUpdate(finalValue, config);
			}
		}
	}

	function handleScrollWheel(event) {
		event.preventDefault();
		if ($inTransition == false) {
			$inTransition = true;
			//console.log("Handling Scroll Event")
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

	/* RUNTIME */
	onMount(() => {
		if (browser) {
			window.addEventListener('resize', resizeHandler);
			window.addEventListener('keyup', keyPress);
			Hammer = import('hammerjs');
		}
	});

	/* REACTIVE VARS */

	$: activeSlidesArray = Object.keys($slidesIndex).filter((slide) => {
		return inRange($globalSlideNum, $slidesIndex[slide].start, $slidesIndex[slide].end);
	});

	$: preloadSlidesArray = Object.keys($slidesIndex).filter((slide) => {
		return inRange($globalSlideNum, $slidesIndex[slide].preload, $slidesIndex[slide].start);
	});
</script>

<div class="w-screen h-screen fixed overflow-hidden" on:mousewheel={handleScrollWheel}>
	<slot />
</div>
