import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../category';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
  template: `
  <input [(ngModel)]="categoryName">
`
})
export class CategoryComponent implements OnInit{

  categories: Category[] = [];
  newCategory: Category = { id: 0, name: '' };
  isUpdate = false;

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  createCategory(): void {
    this.categoryService.createCategory(this.newCategory).subscribe(category => {
      this.categories.push(category);
      this.resetForm();
    });
  }

  updateCategory(): void {
    this.categoryService.updateCategory(this.newCategory.id, this.newCategory).subscribe(() => {
      this.loadCategories();
      this.resetForm();
    });
  }

  editCategory(category: Category): void {
    this.newCategory = { ...category };
    this.isUpdate = true;
  }

  deleteCategory(id: number): void {
    this.categoryService.deleteCategory(id).subscribe(() => {
      this.categories = this.categories.filter(category => category.id !== id);
    });
  }

  resetForm(): void {
    this.newCategory = { id: 0, name: '' };
    this.isUpdate = false;
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

}
