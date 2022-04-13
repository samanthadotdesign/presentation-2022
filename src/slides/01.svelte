<script>
	/* PROPS */
	export { clazz as class };

	/* LOCAL VARS */
	let clazz;
	const slideConfig = $slidesIndex.Slide01;

	/* STORES */
	import { slidesIndex } from '@stores/layout';
</script>

<div class={`w-screen h-screen bg-green-600 ${clazz}`}>"SLIDE 1"</div>
