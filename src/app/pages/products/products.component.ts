import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';
import { switchMap } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { CategoryListComponent } from '../../components/category-list/category-list.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule, CategoryListComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  private productService = inject(ProductService);

  // Categoria selecionada (null = todas)
  public selectedCategory = signal<string | null>(null);

  // Observable que troca a fonte conforme a categoria selecionada
  private products$ = toObservable(this.selectedCategory).pipe(
    switchMap(category =>
      category
        ? this.productService.getProductsByCategory(category)
        : this.productService.getProducts()
    )
  );

  // Signal dos produtos (carrega conforme seleção)
  public products = toSignal(this.products$);

  onCategorySelected(category: string | null) {
    this.selectedCategory.set(category);
  }
}
