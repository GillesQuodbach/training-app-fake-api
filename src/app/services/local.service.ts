import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { AuthenticateService } from 'src/app/services/authenticate.service';
@Injectable({
  providedIn: 'root',
})
export class LocalService {
  private user: User;
  constructor(private authService: AuthenticateService) {
    this.user = this.authService.getUser();
  }

  saveUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(key: string) {
    return localStorage.getItem(key);
  }

  public removeUser() {
    localStorage.removeItem('user');
  }

  public clearLocalStorage() {
    localStorage.clear();
  }
}
