import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { HttpClient, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './app/interceptors/auth.interceptor';
import { adminGuard } from './app/guards/admin.guard';
import { importProvidersFrom, EnvironmentProviders } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader, TRANSLATE_HTTP_LOADER_CONFIG } from '@ngx-translate/http-loader';
import { AppModule } from './app/app.module';

import { AppComponent } from './app/app.component';
import { LoginComponent } from './app/pages/login/login.component';
import { HomeComponent } from './app/pages/home/home.component';
import { ProductsComponent } from './app/pages/products/products.component';
import { ProductDetailComponent } from './app/pages/product-detail/product-detail.component';
import { AboutComponent } from './app/pages/about/about.component';
import { AdminComponent } from './app/pages/admin/admin.component';
import { DashboardComponent } from './app/pages/admin/dashboard/dashboard.component';
import { ManageProductsComponent } from './app/pages/admin/manage-products/manage-products.component';
import { ManageUsersComponent } from './app/pages/admin/manage-users/manage-users.component';
import { ReviewDetailComponent } from './app/pages/review-detail/review-detail.component';
import { NotFoundComponent } from './app/pages/not-found/not-found.component';

export function HttpLoaderFactory(): TranslateHttpLoader {
  return new TranslateHttpLoader();
}

export function provideTranslation(): EnvironmentProviders {
  return importProvidersFrom([
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
      },
    }),
  ]);
}

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'products/:id/reviews/:reviewId', component: ReviewDetailComponent },
  { path: 'about', component: AboutComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [adminGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'manage-products', component: ManageProductsComponent },
      { path: 'edit-product/:id', component: ManageProductsComponent },
      { path: 'users', component: ManageUsersComponent }
    ]
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    importProvidersFrom(AppModule),
    provideTranslation(),
    { provide: TRANSLATE_HTTP_LOADER_CONFIG, useValue: { prefix: '/assets/i18n/', suffix: '.json' } }
  ]
}).catch(err => console.error(err));
