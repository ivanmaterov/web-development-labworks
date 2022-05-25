/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Category } from './Category';

export type Product = {
    id?: number;
    name: string;
    category: Category;
    price: string;
    image?: string | null;
    description?: string;
};
