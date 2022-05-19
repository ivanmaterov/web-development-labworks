/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface AuthToken {
  username: string;
  password: string;
  token: string;
}

/**
 * Serializer for categories.
 */
export interface Category {
  id: number;
  title: string;
}

/**
 * Serializer for categories.
 */
export interface PatchedCategory {
  id?: number;
  title?: string;
}

/**
 * Serializer for products.
 */
export interface PatchedProduct {
  id?: number;
  name?: string;
  category?: number;

  /**
   * @format decimal
   * @pattern ^-?\d{0,8}(?:\.\d{0,2})?$
   */
  price?: string;

  /** @format uri */
  image?: string | null;
  description?: string;
}

export interface PatchedUser {
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   * @pattern ^[\w.@+-]+$
   */
  username?: string;

  /** Name of User */
  name?: string;

  /** @format uri */
  url?: string;
}

/**
 * Serializer for products.
 */
export interface Product {
  id: number;
  name: string;
  category: number;

  /**
   * @format decimal
   * @pattern ^-?\d{0,8}(?:\.\d{0,2})?$
   */
  price: string;

  /** @format uri */
  image?: string | null;
  description?: string;
}

export interface User {
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   * @pattern ^[\w.@+-]+$
   */
  username: string;

  /** Name of User */
  name?: string;

  /** @format uri */
  url: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "http://127.0.0.1:8000";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  private encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  private addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  private addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  private mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  private createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
        ...(requestParams.headers || {}),
      },
      signal: cancelToken ? this.createAbortSignal(cancelToken) : void 0,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title backend API
 * @version 1.0.0
 * @baseUrl http://127.0.0.1:8000
 *
 * Documentation of API endpoints of backend
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * @description OpenApi3 schema for this API. Format can be selected via content negotiation. - YAML: application/vnd.oai.openapi - JSON: application/vnd.oai.openapi+json
     *
     * @tags api
     * @name ApiSchemaRetrieve
     * @request GET:/api/schema/
     * @secure
     */
    apiSchemaRetrieve: (
      query?: {
        format?: "json" | "yaml";
        lang?:
          | "af"
          | "ar"
          | "ar-dz"
          | "ast"
          | "az"
          | "be"
          | "bg"
          | "bn"
          | "br"
          | "bs"
          | "ca"
          | "cs"
          | "cy"
          | "da"
          | "de"
          | "dsb"
          | "el"
          | "en"
          | "en-au"
          | "en-gb"
          | "eo"
          | "es"
          | "es-ar"
          | "es-co"
          | "es-mx"
          | "es-ni"
          | "es-ve"
          | "et"
          | "eu"
          | "fa"
          | "fi"
          | "fr"
          | "fy"
          | "ga"
          | "gd"
          | "gl"
          | "he"
          | "hi"
          | "hr"
          | "hsb"
          | "hu"
          | "hy"
          | "ia"
          | "id"
          | "ig"
          | "io"
          | "is"
          | "it"
          | "ja"
          | "ka"
          | "kab"
          | "kk"
          | "km"
          | "kn"
          | "ko"
          | "ky"
          | "lb"
          | "lt"
          | "lv"
          | "mk"
          | "ml"
          | "mn"
          | "mr"
          | "my"
          | "nb"
          | "ne"
          | "nl"
          | "nn"
          | "os"
          | "pa"
          | "pl"
          | "pt"
          | "pt-br"
          | "ro"
          | "ru"
          | "sk"
          | "sl"
          | "sq"
          | "sr"
          | "sr-latn"
          | "sv"
          | "sw"
          | "ta"
          | "te"
          | "tg"
          | "th"
          | "tk"
          | "tr"
          | "tt"
          | "udm"
          | "uk"
          | "ur"
          | "uz"
          | "vi"
          | "zh-hans"
          | "zh-hant";
      },
      params: RequestParams = {},
    ) =>
      this.request<Record<string, any>, any>({
        path: `/api/schema/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  authToken = {
    /**
     * No description
     *
     * @tags auth-token
     * @name AuthTokenCreate
     * @request POST:/auth-token/
     * @secure
     */
    authTokenCreate: (data: AuthToken, params: RequestParams = {}) =>
      this.request<AuthToken, any>({
        path: `/auth-token/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  categories = {
    /**
     * @description View for products.
     *
     * @tags categories
     * @name CategoriesList
     * @request GET:/categories/
     * @secure
     */
    categoriesList: (params: RequestParams = {}) =>
      this.request<Product[], any>({
        path: `/categories/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description View for products.
     *
     * @tags categories
     * @name CategoriesCreate
     * @request POST:/categories/
     * @secure
     */
    categoriesCreate: (data: Product, params: RequestParams = {}) =>
      this.request<Product, any>({
        path: `/categories/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description View for products.
     *
     * @tags categories
     * @name CategoriesRetrieve
     * @request GET:/categories/{id}/
     * @secure
     */
    categoriesRetrieve: (id: number, params: RequestParams = {}) =>
      this.request<Product, any>({
        path: `/categories/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description View for products.
     *
     * @tags categories
     * @name CategoriesUpdate
     * @request PUT:/categories/{id}/
     * @secure
     */
    categoriesUpdate: (id: number, data: Product, params: RequestParams = {}) =>
      this.request<Product, any>({
        path: `/categories/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description View for products.
     *
     * @tags categories
     * @name CategoriesPartialUpdate
     * @request PATCH:/categories/{id}/
     * @secure
     */
    categoriesPartialUpdate: (id: number, data: PatchedProduct, params: RequestParams = {}) =>
      this.request<Product, any>({
        path: `/categories/${id}/`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description View for products.
     *
     * @tags categories
     * @name CategoriesDestroy
     * @request DELETE:/categories/{id}/
     * @secure
     */
    categoriesDestroy: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/categories/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  products = {
    /**
     * @description View for category.
     *
     * @tags products
     * @name ProductsList
     * @request GET:/products/
     * @secure
     */
    productsList: (params: RequestParams = {}) =>
      this.request<Category[], any>({
        path: `/products/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description View for category.
     *
     * @tags products
     * @name ProductsCreate
     * @request POST:/products/
     * @secure
     */
    productsCreate: (data: Category, params: RequestParams = {}) =>
      this.request<Category, any>({
        path: `/products/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description View for category.
     *
     * @tags products
     * @name ProductsRetrieve
     * @request GET:/products/{id}/
     * @secure
     */
    productsRetrieve: (id: number, params: RequestParams = {}) =>
      this.request<Category, any>({
        path: `/products/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description View for category.
     *
     * @tags products
     * @name ProductsUpdate
     * @request PUT:/products/{id}/
     * @secure
     */
    productsUpdate: (id: number, data: Category, params: RequestParams = {}) =>
      this.request<Category, any>({
        path: `/products/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description View for category.
     *
     * @tags products
     * @name ProductsPartialUpdate
     * @request PATCH:/products/{id}/
     * @secure
     */
    productsPartialUpdate: (id: number, data: PatchedCategory, params: RequestParams = {}) =>
      this.request<Category, any>({
        path: `/products/${id}/`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description View for category.
     *
     * @tags products
     * @name ProductsDestroy
     * @request DELETE:/products/{id}/
     * @secure
     */
    productsDestroy: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/products/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  users = {
    /**
     * No description
     *
     * @tags users
     * @name UsersList
     * @request GET:/users/
     * @secure
     */
    usersList: (params: RequestParams = {}) =>
      this.request<User[], any>({
        path: `/users/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersRetrieve
     * @request GET:/users/{username}/
     * @secure
     */
    usersRetrieve: (username: string, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/users/${username}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersUpdate
     * @request PUT:/users/{username}/
     * @secure
     */
    usersUpdate: (username: string, data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/users/${username}/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersPartialUpdate
     * @request PATCH:/users/{username}/
     * @secure
     */
    usersPartialUpdate: (username: string, data: PatchedUser, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/users/${username}/`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersMeRetrieve
     * @request GET:/users/me/
     * @secure
     */
    usersMeRetrieve: (params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/users/me/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
}
