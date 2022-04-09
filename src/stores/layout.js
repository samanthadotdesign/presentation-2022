import { writable } from 'svelte/store';

import slideIndexObj from '@assets/slideIndex';

export const window = writable({ width: 0, height: 0 });
export const isLoading = writable();
export const inTransition = writable();
export const globalSlideNum = writable({ value: 0 });

export const slidesIndex = writable(slideIndexObj); // Configs for slides
