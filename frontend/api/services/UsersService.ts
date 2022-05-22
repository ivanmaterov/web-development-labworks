/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PatchedUser } from '../models/PatchedUser';
import type { User } from '../models/User';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UsersService {

    /**
     * @returns User
     * @throws ApiError
     */
    public static usersList(): CancelablePromise<Array<User>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/',
        });
    }

    /**
     * @param username
     * @returns User
     * @throws ApiError
     */
    public static usersRetrieve(
        username: string,
    ): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/{username}/',
            path: {
                'username': username,
            },
        });
    }

    /**
     * @param username
     * @param requestBody
     * @returns User
     * @throws ApiError
     */
    public static usersUpdate(
        username: string,
        requestBody: User,
    ): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/users/{username}/',
            path: {
                'username': username,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param username
     * @param requestBody
     * @returns User
     * @throws ApiError
     */
    public static usersPartialUpdate(
        username: string,
        requestBody?: PatchedUser,
    ): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/users/{username}/',
            path: {
                'username': username,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns User
     * @throws ApiError
     */
    public static usersMeRetrieve(): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/me/',
        });
    }

}