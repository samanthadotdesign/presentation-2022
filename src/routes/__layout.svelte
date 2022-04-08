<script>
	import '@assets/globals.css';
	import { onMount } from 'svelte';
	import { window as windowObj } from '@stores/layout';

	const resizeHandler = (event) => {
		const { innerWidth: width, innerHeight: height } = window;

		$windowObj = {
			width,
			height
		};
	};

	onMount(() => {
		document.addEventListener('resize', resizeHandler);
	});

    function handleSrollWheel(event) {
      event.preventDefault()
      if (this.inTransition == false) {
        this.inTransition = true
        //console.log("Handling Scroll Event")
        let finalValue
        if (Math.sign(event.deltaY) == -1 && this.globalUnits > 0) {
          finalValue = this.globalUnits - 1
        } else if (Math.sign(event.deltaY) == 1 && this.globalUnits < 25) {
          finalValue = this.globalUnits + 1
        }
        const config = {
          easing: "easeInOutQuad",
          duration: 2000
        }
        this.smoothUpdate(finalValue, config)
      }
    },
</script>

<div class="w-screen h-screen" on:mousewheel={handleScrollWheel}>
	<slot />
</div>
