import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  imports: [ CommonModule ],
  templateUrl: './login-component.html',
})
export class LoginComponent {

  auth = inject(AuthService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  isLogged() {
    return this.auth.isAuthenticated();
  };

  login(role: string) {
    if (role === "user" || role === "admin") 
      this.auth.login("Kiril", role);
    
    this.route.queryParams.subscribe(params => {
      const path = params['returnUrl'];
      this.router.navigate([ path ])
    })
  }

  logout() {
    this.auth.logout();
  }

  getUserName() {
    return this.auth.getUser()?.username;
  }

  getUserRole() {
    return this.auth.getUser()?.role;
  }
}
