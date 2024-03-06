import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { AuthenticateService } from 'src/app/services/authenticate.service';
@Injectable({
  providedIn: 'root'
})
export class LocalService {
  private user: User;
  constructor(private authService: AuthenticateService) {

    this.user = this.authService.getUser()
  }

  getUser(): User {
    let user = localStorage.getItem('user');
    if (user) return JSON.parse(user);
    return this.user;
  }


  saveUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public removeUser() {
    localStorage.removeItem('user')
  }

  public clearLocalStorage() {
    localStorage.clear()
  }


}
