import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent {
  private categoryService = inject(CategoryService);

  // Converte o observable de categorias em um signal
  public categories = toSignal(this.categoryService.getCategories());

  @Output() categorySelected = new EventEmitter<string | null>();

  select(category: string | null): void {
    this.categorySelected.emit(category);
  }
}
