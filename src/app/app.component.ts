import { AuthenticateService } from 'src/app/services/authenticate.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(public authService: AuthenticateService) {}

  title = 'trainings-front-app';
}
