import { writable } from 'svelte/store';

export const window = writable({ width: 0, height: 0 });
export const loading = writable();
