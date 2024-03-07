import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { User } from 'src/app/model/user.model';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user: User;
  userConnected: boolean = false;
  constructor(
    public authService: AuthenticateService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.user = this.authService.getUser();
    this.userConnected = this.authService.getConnection();
    this.loginForm = this.formBuilder.group({
      email: [
        this.user.email,
        [Validators.required, Validators.pattern('[a-z0-9.@]*')],
      ],
      password: [this.user.password, [Validators.required]],
    });
  }

  ngOnInit(): void {}

  onFindUser(form: FormGroup) {
    if (form.valid) {
      this.authService.findUser(
        new User(form.value.email, form.value.password, 'unknown')
      );
    }
    this.authService.redirectIfAdmin();
  }

  onDeconnect() {
    this.authService.deconnectUser();
  }
}
