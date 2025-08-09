import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product } from '../interfaces/product.interfaces';
import { catchError, of, throwError } from 'rxjs';

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

  // CREATE
  addProduct(newProduct: { title: string, price: number, description: string }): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, newProduct).pipe(
      catchError(this.handleError)
    );
  }

  // UPDATE
  updateProduct(id: number, productData: Partial<Product>): Observable<Product> {
    return this.http.patch<Product>(`${this.apiUrl}/${id}`, productData).pipe(
      catchError(this.handleError)
    );
  }

  // DELETE
  deleteProduct(id: number): Observable<{}> {
    return this.http.delete<{}>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }
  
  // Tratamento de erro centralizado
  private handleError(error: any) {
    console.error('Ocorreu um erro na API:', error);
    return throwError(() => new Error('Algo deu errado; por favor, tente novamente mais tarde.'));
  }
}

