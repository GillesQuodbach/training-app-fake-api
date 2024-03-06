import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {
  constructor(private router: Router) { }
  private user: User = new User('', '', 'unknown');
  private users: User[] = [
    {
      email: 'elbab@gmail.com',
      password: '1234',
      roles: ['ADMIN', 'USER'],
    },
    {
      email: 'hugo@gmail.com',
      password: '1234',
      roles: ['USER'],
    },
  ];
  public userConnected: boolean = false;
  // gestion localStorage
  saveUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): User {
    let user = localStorage.getItem('user');
    if (user) return JSON.parse(user);
    return this.user;
  }

  getUsers() {
    return this.users;
  }

  findUser(user: User) {
    console.log('user from authService', user);
    this.user = user;
  }

  getConnection() {
    return this.userConnected;
  }

  isAdmin() {
    const registredUser = this.users.find(
      (item) =>
        item.email === this.user.email && item.password === this.user.password
    );
    if (registredUser && registredUser.roles.includes('ADMIN')) {
      this.userConnected = true;
      this.user.roles = ['ADMIN']
      this.saveUser(this.user)
      return true;
    } else if (registredUser && registredUser.roles.includes('USER')) {
      this.userConnected = true;
      this.user.roles = ['USER']
      this.saveUser(this.user)
    }
    return false;
  }

  redirectIfAdmin() {
    if (this.isAdmin()) {
      this.router.navigateByUrl('/admin');
    }
  }

  deconnectUser() {
    this.userConnected = false;
    this.user = new User('', '', '');
    this.router.navigateByUrl('/');
    localStorage.clear();
  }
}
