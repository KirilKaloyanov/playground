import { Routes } from '@angular/router';
import { UserProfileComponent } from './guarded-paths/user/user-profile-component/user-profile-component';
import { HomeComponent } from './home/home-component/home-component';
import { UserSettingsComponent } from './guarded-paths/user/private-child-user-component/private-child-user-component';
import { DashboardComponent } from './guarded-paths/admin/private-child-admin-component/private-child-admin-component';
import { AdminPanelComponent } from './guarded-paths/admin/admin-panel-component/admin-panel-component';
import { DirectivesComponent } from './home/directives-component/directives-component';
import { LoginComponent } from './home/login-component/login-component';
import { AuthGuard } from './shared/guards/AuthGuard';
import { DependencyInjectionComponent } from './home/dependency-injection/dependency-injection.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'directives', component: DirectivesComponent },
      { path: 'dependency-injection', component: DependencyInjectionComponent },
    ],
  },

  {
    path: 'user',
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
      { path: 'profile', component: UserProfileComponent },
      { path: 'settings', component: UserSettingsComponent },
    ],
  },
  {
    path: 'admin',
    children: [
      { path: '', redirectTo: 'panel', pathMatch: 'prefix' },
      { path: 'panel', component: AdminPanelComponent },
      { path: 'dashboard', component: DashboardComponent },
    ],
  },
];
