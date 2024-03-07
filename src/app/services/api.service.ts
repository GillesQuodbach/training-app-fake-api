import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Training } from '../model/training.model';
import { User } from '../model/user.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  public getTrainings() {
    return this.http.get<Training[]>(environment.host + '/trainings');
  }

  public getTraining(id: number) {
    return this.http.get<Training>(environment.host + '/trainings' + id);
  }

  public getUsers() {
    return this.http.get<User[]>(environment.host + '/users');
  }

  public getUserByEmail(email: string): Observable<User[]> {
    return this.http.get<User[]>(`${environment.host}/users?email=${email}`);
  }
}
