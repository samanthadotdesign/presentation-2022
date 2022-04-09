import { writable } from 'svelte/store';

import slideIndexObj from '@assets/slideIndex';

export const window = writable({ width: 0, height: 0 });
export const isLoading = writable(false);
export const inTransition = writable(false);
export const globalSlideNum = writable(0);

export const slidesIndex = writable(slideIndexObj); // Configs for slides

export default { window, isLoading, inTransition, globalSlideNum, slidesIndex };
