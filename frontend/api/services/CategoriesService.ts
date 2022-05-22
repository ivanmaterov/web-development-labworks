/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Category } from '../models/Category';
import type { PatchedCategory } from '../models/PatchedCategory';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CategoriesService {

    /**
     * View for category.
     * @returns Category
     * @throws ApiError
     */
    public static categoriesList(): CancelablePromise<Array<Category>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/categories/',
        });
    }

    /**
     * View for category.
     * @param requestBody
     * @returns Category
     * @throws ApiError
     */
    public static categoriesCreate(
        requestBody: Category,
    ): CancelablePromise<Category> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/categories/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * View for category.
     * @param id A unique integer value identifying this Category.
     * @returns Category
     * @throws ApiError
     */
    public static categoriesRetrieve(
        id: number,
    ): CancelablePromise<Category> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/categories/{id}/',
            path: {
                'id': id,
            },
        });
    }

    /**
     * View for category.
     * @param id A unique integer value identifying this Category.
     * @param requestBody
     * @returns Category
     * @throws ApiError
     */
    public static categoriesUpdate(
        id: number,
        requestBody: Category,
    ): CancelablePromise<Category> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/categories/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * View for category.
     * @param id A unique integer value identifying this Category.
     * @param requestBody
     * @returns Category
     * @throws ApiError
     */
    public static categoriesPartialUpdate(
        id: number,
        requestBody?: PatchedCategory,
    ): CancelablePromise<Category> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/categories/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * View for category.
     * @param id A unique integer value identifying this Category.
     * @returns void
     * @throws ApiError
     */
    public static categoriesDestroy(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/categories/{id}/',
            path: {
                'id': id,
            },
        });
    }

}