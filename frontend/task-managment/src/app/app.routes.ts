import { Routes } from '@angular/router';
import { MainPage } from './components/pages/main-page/main-page';
import { Login } from './components/pages/login/login';
import { Signup } from './components/pages/signup/signup';
import { authGuard } from './guard/Guard';
export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'mainPage', component: MainPage, canActivate: [authGuard] },
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
];
