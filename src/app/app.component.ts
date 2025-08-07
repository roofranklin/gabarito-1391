import { Component } from '@angular/core';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'minha-loja';
}
