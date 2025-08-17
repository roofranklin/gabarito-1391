import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { LanguageSwitcherComponent } from './components/language-switcher/language-switcher.component';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [
    RouterModule, 
    ShoppingCartComponent, 
    CommonModule, 
    TranslateModule, 
    LanguageSwitcherComponent
  ]
})
export class AppComponent {
  title = 'minha-loja';

  constructor(
    public authService: AuthService,
    private router: Router,
    private translate: TranslateService
  ) {
    this.translate.setDefaultLang('pt');
    this.translate.use('pt');
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
