/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Serializer for products.
 */
export type Product = {
    readonly id: number;
    name: string;
    category: number;
    price: string;
    image?: string | null;
    description?: string;
};
