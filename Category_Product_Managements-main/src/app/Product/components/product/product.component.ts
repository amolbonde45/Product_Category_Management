import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../../Category/services/category.service';
import { Product } from '../../product';
import { Category } from '../../../Category/category';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: Category[] = [];
  newProduct: Product = { id: 0, name: '', price: 0, category: '' };
  searchQuery: string = '';
  isUpdate = false;


  constructor(private productService: ProductService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe(products => {
      this.products = products;
      this.filteredProducts = products;
    });
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  createProduct(): void {
    this.productService.createProduct(this.newProduct).subscribe(product => {
      this.products.push(product);
      this.filteredProducts.push(product);
      this.resetForm();
    });
  }

  updateProduct(): void {
    this.productService.updateProduct(this.newProduct.id, this.newProduct).subscribe(() => {
      this.loadProducts();
      this.resetForm();
    });
  }

  editProduct(product: Product): void {
    this.newProduct = { ...product };
    this.isUpdate = true;
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(() => {
      this.products = this.products.filter(product => product.id !== id);
      this.filteredProducts = this.filteredProducts.filter(product => product.id !== id);
    });
  }

  filterProducts(): void {
    const query = this.searchQuery.toLowerCase();
    const matchingProduct = this.products.find(product =>
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    );

    if (matchingProduct) {
      this.filteredProducts = this.products.filter(product =>
        product.category.toLowerCase() === matchingProduct.category.toLowerCase()
      );
    } else {
      this.filteredProducts = [];
    }
  }

  resetForm(): void {
    this.newProduct = { id: 0, name: '', price: 0, category: '' };
    this.isUpdate = false;
  }

  resetSearch(): void {
    this.searchQuery = '';
    this.filteredProducts = this.products;
  }
}
