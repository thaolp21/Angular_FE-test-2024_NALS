import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from '../models/blog.model';
import { BlogService } from '../services/blog.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent {
  id!: number | null;
  detailBlog: Item | undefined
  constructor(private activatedRoute: ActivatedRoute, private blogService: BlogService) { }
  homeBreadcumbIcon: MenuItem = {
    icon: 'pi pi-home', label:
      'Home', routerLink: '/'
  }
  detailBreadcumbIcons: MenuItem[] = [{ icon: 'pi pi-book', label: 'Detail page' }]

  ngOnInit() {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.blogService.getBlogById(this.id).subscribe((res) => {
      this.detailBlog = res.data as Item
    })
  }
}
