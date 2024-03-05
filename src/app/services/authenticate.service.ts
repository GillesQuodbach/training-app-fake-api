import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {
  constructor() {}

  isAdmin() {
    console.log('admin is read');
    return true;
  }
}
