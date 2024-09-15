import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogPageComponent } from './blog-page.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [{ path: '', component: BlogPageComponent, pathMatch: 'full' }, {
  path: 'blogs/detail/:id',
  component: DetailComponent
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogPageRoutingModule { }
