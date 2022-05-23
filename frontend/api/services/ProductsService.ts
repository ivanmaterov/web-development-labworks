/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PatchedProduct } from '../models/PatchedProduct';
import type { Product } from '../models/Product';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ProductsService {

    /**
     * View for products.
     * @param idIn Multiple values may be separated by commas.
     * @returns Product
     * @throws ApiError
     */
    public static productsList(
        idIn?: Array<number>,
    ): CancelablePromise<Array<Product>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/products/',
            query: {
                'id__in': idIn,
            },
        });
    }

    /**
     * View for products.
     * @param requestBody
     * @returns Product
     * @throws ApiError
     */
    public static productsCreate(
        requestBody: Product,
    ): CancelablePromise<Product> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/products/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * View for products.
     * @param id A unique integer value identifying this Product.
     * @returns Product
     * @throws ApiError
     */
    public static productsRetrieve(
        id: number,
    ): CancelablePromise<Product> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/products/{id}/',
            path: {
                'id': id,
            },
        });
    }

    /**
     * View for products.
     * @param id A unique integer value identifying this Product.
     * @param requestBody
     * @returns Product
     * @throws ApiError
     */
    public static productsUpdate(
        id: number,
        requestBody: Product,
    ): CancelablePromise<Product> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/products/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * View for products.
     * @param id A unique integer value identifying this Product.
     * @param requestBody
     * @returns Product
     * @throws ApiError
     */
    public static productsPartialUpdate(
        id: number,
        requestBody?: PatchedProduct,
    ): CancelablePromise<Product> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/products/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * View for products.
     * @param id A unique integer value identifying this Product.
     * @returns void
     * @throws ApiError
     */
    public static productsDestroy(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/products/{id}/',
            path: {
                'id': id,
            },
        });
    }

}