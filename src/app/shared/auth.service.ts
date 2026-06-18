import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export type UserRole = 'admin' | 'user' | 'guest';

interface AuthUser {
  username: string;
  role: UserRole;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUser: AuthUser | null = null;

  constructor(private router: Router) {}

  login(username: string, role: UserRole = 'user'): void {
    this.currentUser = { username, role };
    // this.router.navigate(['home']);
  }

  logout(): void {
    this.currentUser = null;
    this.router.navigate(['home']);
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  hasRole(role: UserRole): boolean {
    return this.currentUser?.role === role;
  }

  getUser(): AuthUser | null {
    return this.currentUser;
  }
}
