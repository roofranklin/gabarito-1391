import { Component, signal, inject, OnInit } from '@angular/core';
import { AdminComponent } from '../admin.component';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../interfaces/product.interfaces';

@Component({
  selector: 'app-manage-products',
  standalone: false,
  templateUrl: './manage-products.component.html',
  styleUrl: './manage-products.component.scss'
})
export class ManageProductsComponent implements OnInit {
  adminComponent = inject(AdminComponent);
  private productService = inject(ProductService);

  public products = signal<Product[]>([]);
  public status = signal<'idle' | 'loading' | 'success' | 'error'>('idle');
  public errorMessage = signal<string | null>(null);

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products.set(products);
      },
      error: (err) => {
        this.status.set('error');
        this.errorMessage.set(err.message);
      }
    });
  }

  onAddProduct(formValue: { title: string, price: string, description: string }) {
    this.status.set('loading');
    this.errorMessage.set(null);

    const newProduct = {
      title: formValue.title,
      price: Number(formValue.price),
      description: formValue.description
    };

    this.productService.addProduct(newProduct).subscribe({
      next: (product) => {
        this.status.set('success');
        this.products.update(products => [...products, product]);
      },
      error: (err) => {
        this.status.set('error');
        this.errorMessage.set(err.message);
      }
    });
  }

  onDeleteProduct(productId: number) {
    this.productService.deleteProduct(productId).subscribe({
      next: () => {
        this.products.update(products => products.filter(p => p.id !== productId));
      },
      error: (err) => {
        this.status.set('error');
        this.errorMessage.set(err.message);
      }
    });
  }
}
