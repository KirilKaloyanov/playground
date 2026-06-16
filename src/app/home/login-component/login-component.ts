import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login-component',
  imports: [ CommonModule ],
  templateUrl: './login-component.html',
})
export class LoginComponent {
  constructor(private auth: AuthService) {}

  isLogged() {
    return this.auth.isAuthenticated();
  };

  login(role: string) {
    if (role === "user" || role === "admin" || role === "guest") {
      this.auth.login("Kiril", role);
    }  
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
