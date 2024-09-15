import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogPageRoutingModule } from './blog-page-routing.module';
import { BlogPageComponent } from './blog-page.component';
import { DataViewModule } from 'primeng/dataview';
import { DetailComponent } from './detail/detail.component';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { BlogService } from './services/blog.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessageModule } from 'primeng/message';
import { CardModule } from 'primeng/card';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { SkeletonComponent } from './shared/skeleton/skeleton.component';

@NgModule({
  declarations: [
    BlogPageComponent,
    DetailComponent,
  ],
  imports: [
    CommonModule,
    BlogPageRoutingModule,
    DataViewModule,
    PaginatorModule,
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule,
    ToggleButtonModule,
    DialogModule,
    TooltipModule,
    ToastModule,
    FileUploadModule,
    InputTextareaModule,
    MessageModule,
    CardModule,
    BreadcrumbModule,
    SkeletonComponent
  ],
  providers: [BlogService, provideHttpClient(), MessageService, HttpClient]
})
export class BlogPageModule { }
