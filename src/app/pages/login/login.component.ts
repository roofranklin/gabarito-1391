import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  credentials = {
    username: '',
    password: ''
  };

  private authService = inject(AuthService);
  private router = inject(Router);

  login() {
    this.authService.login(this.credentials).subscribe({
      next: () => {
        this.router.navigate(['/admin']);
      },
      error: (err) => {
        console.error('Login failed', err);
      }
    });
  }
}
