declare module 'portable-fetch';
declare module 'url';

declare interface BaseResponse<T = any> {
    status: number;
    success: boolean;
    result: T;
    totalPage?: number;
    totalCount?: number;
    pageSize?: number;
    currentPage: number;
}