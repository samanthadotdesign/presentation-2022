<script>
	/* PROPS */
	export { clazz as class };

	/* LOCAL VARS */
	let clazz;
	const slideConfig = $slidesIndex.Slide00;

	/* STORES */
	import { slidesIndex } from '@stores/layout';
</script>

<div class={`w-screen h-screen bg-red-500 ${clazz}`}>
	<div class="w-full h-full relative">
		<div
			class="absolute rounded-full border-2 border-black w-[15vw] h-[15vw] top-[10%] left-[10%] -translate-1/2 flex justify-center items-center"
		>
			Research
		</div>

		<div
			class="absolute rounded-full border-2 border-black w-[15vw] h-[15vw] top-[35%] left-[15%] -translate-1/2 flex justify-center items-center"
		>
			Understand & analyze
		</div>

		<div
			class="absolute rounded-full border-2 border-black w-[15vw] h-[15vw] top-[65%] left-[35%] -translate-1/2 flex justify-center items-center"
		>
			Start broad
		</div>
		<div
			class="absolute rounded-full border-2 border-black w-[15vw] h-[15vw] top-[80%] left-[50%] -translate-1/2 flex justify-center items-center"
		>
			Go into detail
		</div>
		<div
			class="absolute rounded-full border-2 border-black w-[15vw] h-[15vw] top-[65%] right-[35%] -translate-1/2 flex justify-center items-center"
		>
			Testing
		</div>
		<div
			class="absolute rounded-full border-2 border-black w-[15vw] h-[15vw] top-[35%] right-[15%] -translate-1/2 flex justify-center items-center"
		>
			Iterate
		</div>
		<div
			class="absolute rounded-full border-2 border-black w-[15vw] h-[15vw] top-[10%] right-[10%] -translate-1/2 flex justify-center items-center"
		>
			Continue to next feature
		</div>
	</div>
</div>
