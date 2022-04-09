import { writable } from 'svelte/store';

export const window = writable({ width: 0, height: 0 });
export const isLoading = writable();
export const inTransition = writable();
export const globalSlideNum = writable(0);

export const slidesIndex = writable({}); // Configs for slides
