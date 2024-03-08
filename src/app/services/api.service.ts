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

  public addTraining(training: Training) {
    return this.http.post<Training>(environment.host + '/trainings', training);
  }

  public updateTraining(training: Training) {
    return this.http.put<Training>(environment.host + '/trainings', training);
  }

  public deleteTraining(id: number) {
    console.log(environment.host + '/trainings/' + id);
    return this.http.delete<Training>(environment.host + '/trainings/' + id);
  }

  public getUsers() {
    return this.http.get<User[]>(environment.host + '/users');
  }

  public getUserByEmail(email: string): Observable<User[]> {
    return this.http.get<User[]>(`${environment.host}/users?email=${email}`);
  }
}
