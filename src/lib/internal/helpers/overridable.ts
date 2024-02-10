import { writable, type Readable, type Updater, type Writable } from 'svelte/store';
import { isReadable, isWritable } from './is.js';
import { withGet, type WithGet } from './withGet.js';

export type ChangeFn<T> = (args: { curr: T; next: T }) => T;

/**
 * A wrapper over Svelte's Writable store that allows for overriding the update method.
 * - The first argument is the initial value or a writable store.
 * - The second argument is an optional callback that is called before the value is updated.
 * It receives an object with the current and next values, and should return the modified next value.
 */
export const overridable = <T>(value: Readable<T> | T, onChange?: ChangeFn<T>) => {
	const _store = isReadable(value) ? value : (writable(value) as Readable<T> | Writable<T>);
	const store = withGet(_store) as unknown as WithGet<Readable<T>> & WithGet<Writable<T>>;

	const update = (updater: Updater<T>, sideEffect?: (newValue: T) => void) => {
		if (!isWritable(store)) return;
		store.update((curr) => {
			const next = updater(curr);
			let res: T = next;
			if (onChange) {
				res = onChange({ curr, next });
			}

			sideEffect?.(res);
			return res;
		});
	};

	const set: typeof store.set = (curr) => {
		update(() => curr);
	};

	return {
		...store,
		update,
		set,
	};
};
