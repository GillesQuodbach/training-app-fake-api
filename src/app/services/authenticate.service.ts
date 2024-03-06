import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {
  constructor(private router: Router) {}
  private user: User = new User('', '', 'unknown');
  private users: User[] = [
    {
      email: 'elbab@gmail.com',
      password: '1234',
      roles: ['ADMIN_USER'],
    },
    {
      email: 'hugo@gmail.com',
      password: '1234',
      roles: ['USER'],
    },
  ];

  getUser() {
    return this.user;
  }
  getUsers() {
    return this.users;
  }

  findUser(user: User) {
    console.log('user from authService', user);
    this.user = user;
  }

  isAdmin() {
    const registredUser = this.users.find(
      (item) =>
        item.email === this.user.email && item.password === this.user.password
    );
    if (registredUser && registredUser.roles.includes('ADMIN_USER')) {
      return true;
    } else {
      return false;
    }
  }

  redirectIfAdmin() {
    if (this.isAdmin()) {
      this.router.navigateByUrl('/admin');
    }
  }
}
