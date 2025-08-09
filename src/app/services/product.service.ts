import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product } from '../interfaces/product.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = 'https://fakestoreapi.com/products';

  // Retorna um Observable com a lista de todos os produtos
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  // Retorna um Observable com um único produto pelo ID
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  // Retorna um Observable com produtos filtrados por categoria
  getProductsByCategory(category: string): Observable<Product[]> {
    // A API de categoria não retorna a URL da imagem.
    // Por isso, pegamos todos os produtos e filtramos no lado do cliente.
    return this.getProducts().pipe(
      map(products => products.filter(p => p.category === category))
    );
  }
}

