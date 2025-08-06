import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  products = [
    { id:1, name: 'Notebook Gamer', status: 'Disponível' },
    { id:2, name: 'Smartphone', status: 'Pré compra' },
    { id:3, name: 'Tablet', status: 'Indisponível' }
  ]

}
