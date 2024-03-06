import { AuthenticateService } from 'src/app/services/authenticate.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  userConnected: boolean = false;
  constructor(public authService: AuthenticateService) {
    this.userConnected = this.authService.getConnection();
  }

  title = 'trainings-front-app';
}
