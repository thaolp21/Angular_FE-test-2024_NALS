export interface Image {
    url: string
}

export interface ResponseDataModel {
    items: Item[]
}
export interface ResponsePaginationModel {
    count: number,
    page: number,
    offset: number,
    total: number,
    prev: number,
    next: number
}
export interface ResponseHttpModel {
    data: ResponseDataModel
    pagination: ResponsePaginationModel
}
export class Item {
    id?: number
    title?: string
    content?: string
    comments_count?: number
    image?: Image
    created_at?: string
    updated_at?: string
}
export class UpdateItem {
    id?: number
    title!: string
    content!: string
    image?: string
}

export const FORM_SEARCH_NAME = {
    SEARCH: 'search',
    SORT_BY: 'sort_by',
    SORT_DIRECTION: 'sort_direction'
}
export const FORM_BLOG_NAME = {
    ID: 'id',
    TITLE: 'title',
    CONTENT: 'content',
    IMAGE: 'image'
}
export class Paginator {
    page!: number
    offset!: number
    search?: string
    sort_by?: string
    sort_direction?: string
    total?: number //total pages
    prev?: number
    next?: number
    count?: number //total items
    constructor(param?: Paginator) {
        if (param) {
            this.page = param.page;
            this.offset = param.offset;
            this.search = param.search || '';
            this.sort_by = param.sort_by || '';
            this.sort_direction = typeof param.sort_direction === "boolean" ? (param.sort_direction ? 'asc' : 'desc') : param.sort_direction;
            this.total = param.total;
            this.prev = param.prev;
            this.next = param.next;
            this.count = param.count;
        }
    }
}
export const SORT_BY_LIST = [
    'id', 'title', 'content', 'created_at', 'updated_at'
]