import { Injectable } from '@angular/core';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {
  constructor() {}
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
  }

  isAdmin() {
    // TODO Récupérer les champs email et password du login
    // console.log('admin is read');
    return true;
  }
}
