import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './Product/components/product/product.component';
import { CategoryComponent } from './Category/components/category/category.component';

const routes: Routes = [{ path: 'categories', component: CategoryComponent },
  { path: 'products', component: ProductComponent },
  { path: '', redirectTo: '/categories', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
