import { Component, OnInit } from '@angular/core';
import { BlogService } from './services/blog.service';
import { Item, Paginator, FORM_SEARCH_NAME, FORM_BLOG_NAME, UpdateItem, SORT_BY_LIST } from './models/blog.model';
import { PaginatorState } from 'primeng/paginator';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { FileSelectEvent } from 'primeng/fileupload';
import { catchError, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.css']
})
export class BlogPageComponent implements OnInit {
  loading: boolean = false
  items: Item[] = []
  paginator: Paginator = {
    page: 1,
    offset: 20,
  }
  searchFormGroup!: FormGroup;
  blogFromGroup!: FormGroup
  firstPage: number = 0
  updateBlogItem: UpdateItem | null = null
  visible: boolean = false;
  currentIdItem: number | undefined = undefined

  protected sortByList = SORT_BY_LIST
  protected FORM_SEARCH_NAME = FORM_SEARCH_NAME
  protected FORM_BLOG_NAME = FORM_BLOG_NAME

  constructor(private blogService: BlogService, private formBuilder: FormBuilder, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.getData(this.paginator)
    this.buildSearchFormGroup()
  }

  // Pagination

  onPageChange(e: PaginatorState) {
    this.paginator.page = (e.page || 0) + 1
    this.firstPage = e.first || 0
    this.getData(this.paginator)
  }

  // Handle sort and search function

  buildSearchFormGroup() {
    this.searchFormGroup = this.formBuilder.group({
      [FORM_SEARCH_NAME.SEARCH]: [],
      [FORM_SEARCH_NAME.SORT_BY]: [],
      [FORM_SEARCH_NAME.SORT_DIRECTION]: [{ value: null, disabled: true }]
    });
    this.getFormSearchControl(FORM_SEARCH_NAME.SORT_BY).valueChanges.subscribe((value) => {
      const sortDirectionFormCtrl = this.getFormSearchControl(FORM_SEARCH_NAME.SORT_DIRECTION)
      sortDirectionFormCtrl.reset()
      if (value) {
        sortDirectionFormCtrl.enable()
      } else sortDirectionFormCtrl.disable()
    })
  }
  getFormSearchControl(key: string): FormControl {
    return this.searchFormGroup.get(key) as FormControl
  }

  search() {
    const filters = this.searchFormGroup.getRawValue()
    this.paginator = new Paginator(filters)
    this.firstPage = 0
    this.getData(this.paginator)
  }
  getData(paginator: Paginator) {
    this.loading = true
    const param = this.handleParam(paginator)

    this.blogService.getBlog(param).subscribe((res) => {
      this.items = res.data.items
      this.paginator = { ...this.paginator, ...res.pagination }
      this.loading = false
    })
  }

  //Update and Create Blog Item

  showDialog(item?: Item) {
    this.visible = true;
    this.currentIdItem = item?.id
    this.buildBlogForm(item)
  }

  buildBlogForm(blog: Item | UpdateItem | undefined) {
    this.blogFromGroup = this.formBuilder.group({
      [FORM_BLOG_NAME.TITLE]: [blog?.title || null, Validators.required],
      [FORM_BLOG_NAME.CONTENT]: [blog?.content || null, Validators.required],
      [FORM_BLOG_NAME.IMAGE]: [],
    });
  }

  getFormBlogControl(key: string): FormControl {
    return this.blogFromGroup.get(key) as FormControl
  }

  onUpload(event: FileSelectEvent) {
    this.getFormBlogControl(FORM_BLOG_NAME.IMAGE).setValue(event.currentFiles[0])
  }

  updateBlog() {
    type T = keyof typeof this.blogService
    let functionName: T = 'createBlog'
    let message = 'Created'
    if (this.currentIdItem != undefined) {
      functionName = 'updateBlog'
      message = 'Updated'
    }
    if (this.blogFromGroup.valid) {
      const formData = new FormData()
      const values = this.blogFromGroup.getRawValue()
      for (const key in values) {
        if (values[key]) {
          formData.append(`blog[${key}]`, values[key])
        }
      }
      this.blogService[functionName](formData, this.currentIdItem!).pipe(
        catchError((err) => {
          this.handleError(err)
          return of('error', err)
        })
      ).subscribe((res) => {
        this.visible = false
        if (res?.data?.id) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: `${message} blog successful!` });
          this.searchFormGroup.reset()
          this.search()
        }
      })
    }
  }

  handleError(err: HttpErrorResponse) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
  }
  handleParam(params: Paginator) {
    type T = keyof typeof params
    for (const key in params) {

      if (!params[key as T]) {
        delete params[key as T]
      }
    }
    return params
  }
}
