/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type User = {
    /**
     * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
     */
    username: string;
    name?: string;
    readonly url: string;
};
