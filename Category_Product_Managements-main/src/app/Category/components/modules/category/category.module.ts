import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoryComponent } from '../../category/category.component';

@NgModule({
  imports: [FormsModule, CategoryComponent], 
  exports: [CategoryComponent]
})
export class CategoryModule { }
