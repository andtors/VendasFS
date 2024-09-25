export interface IPage<T> {
    content: Array<T>;
    size: number;
    number: number;
    totalElements: number;
    first: number;
}