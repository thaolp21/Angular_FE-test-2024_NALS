import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Paginator, ResponseHttpModel } from '../models/blog.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BlogService {
  url = 'https://mock-api.nals.vn/api/v2/blogs'
  constructor(private httpClient: HttpClient) { }

  getBlog(paginator: HttpParams | Paginator): Observable<ResponseHttpModel> {
    return this.httpClient.get<ResponseHttpModel>(this.url, {
      params: (paginator as HttpParams)
    })
  }
  getBlogById(id: number): Observable<ResponseHttpModel> {
    return this.httpClient.get<ResponseHttpModel>(`${this.url}/${id}`)
  }
  updateBlog(body: FormData, id: number) {
    return this.httpClient.put(`${this.url}/${id}`, body)
  }
  createBlog(body: FormData) {
    return this.httpClient.post(this.url, body)
  }
}