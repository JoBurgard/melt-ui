import type { WritableProp } from '$lib/internal/helpers/props.js';
import type { BuilderReturn } from '$lib/internal/types.js';
import type { createPagination } from './create.js';
export type { PaginationComponentEvents } from './events.js';

export type CreatePaginationProps = {
	/**
	 * The total number of items to be paginated.
	 */
	count: WritableProp<number>;

	/**
	 * Number of items per page
	 *
	 * @default 1
	 */
	perPage?: WritableProp<number>;

	/**
	 * Number of visible items before and after the current page
	 *
	 * @default 1
	 */
	siblingCount?: WritableProp<number>;

	/**
	 * The uncontrolled default page of the pagination.
	 *
	 * @default 1
	 */
	defaultPage?: WritableProp<number>;

	/**
	 * The current page.
	 */
	page?: WritableProp<number>;
};

export type Page = {
	type: 'page';
	value: number;
};

export type Ellipsis = {
	type: 'ellipsis';
};

export type PageItem = (Page | Ellipsis) & {
	/** Unique key for the item, to be passed to svelte #each block */
	key: string;
};

export type GetPageItemsArgs = {
	totalPages: number;
	siblingCount?: number;
	page?: number;
};

export type Pagination = BuilderReturn<typeof createPagination>;
export type PaginationElements = Pagination['elements'];
export type PaginationOptions = Pagination['options'];
export type PaginationStates = Pagination['states'];
