import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.css'],
  standalone: true,
  imports: [CommonModule, SkeletonModule]
})
export class SkeletonComponent {
  numOfRow = Array(20)
}
