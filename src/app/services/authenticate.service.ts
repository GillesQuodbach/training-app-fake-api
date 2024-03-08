import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {
  public userConnected: boolean = false;
  user: User = new User('', '', ['']);
  constructor(private router: Router, private apiService: ApiService) {
    this.user = this.getUser();
    if (this.user.roles.includes('USER')) {
      this.userConnected = true;
    }
  }
  key = '123';

  ngOnInit(): void {}

  private encrypt(txt: string): string {
    return CryptoJS.AES.encrypt(txt, this.key).toString();
  }
  private decrypt(txtToDecrypt: string) {
    return CryptoJS.AES.decrypt(txtToDecrypt, this.key).toString(
      CryptoJS.enc.Utf8
    );
  }

  // gestion localStorage
  saveUser(user: User) {
    localStorage.setItem('user', this.encrypt(JSON.stringify(user)));
  }

  getUser(): User {
    let user = localStorage.getItem('user');
    if (user) {
      let decryptedUser = this.decrypt(user);
      this.user = JSON.parse(decryptedUser);
    }
    return this.user;
  }

  upDateUser(email: string, password: string, roles: string[]) {
    this.user = new User(email, password, roles);
    this.saveUser(this.user);
  }

  getUsers() {
    return this.apiService.getUsers;
  }

  getConnection() {
    return this.userConnected;
  }

  isAdmin() {
    return this.user.roles.includes('ADMIN');
  }

  userDeconnection() {
    localStorage.clear();
    this.userConnected = false;
    this.user = new User('', '', ['']);
  }
}
