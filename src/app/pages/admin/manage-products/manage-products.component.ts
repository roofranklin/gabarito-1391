import { Component, signal, inject } from '@angular/core';
import { AdminComponent } from '../admin.component';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-manage-products',
  standalone: false,
  templateUrl: './manage-products.component.html',
  styleUrl: './manage-products.component.scss'
})
export class ManageProductsComponent {
  adminComponent = inject(AdminComponent);

  onAction() {
    this.adminComponent.incrementActions();
  }

  private productService = inject(ProductService);
  public status = signal<'idle' | 'loading' | 'success' | 'error'>('idle');
  public errorMessage = signal<string | null>(null);

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
        console.log('Produto adicionado:', product);
        this.status.set('success');
      },
      error: (err) => {
        this.status.set('error');
        this.errorMessage.set(err.message);
      }
    });
  }
  
}
