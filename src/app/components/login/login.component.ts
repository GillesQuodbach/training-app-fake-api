import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { User } from 'src/app/model/user.model';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: User = this.authService.getUser();
  loginForm = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,})$'),
      ],
    ],
    password: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticateService,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // récupérer le localStorage
    // vérifier l'utilisateur
    // si ok connection
  }

  loginUser() {
    const { email, password } = this.loginForm.value;
    this.apiService.getUserByEmail(email as string).subscribe((response) => {
      this.user = new User(
        response[0].email,
        response[0].password,
        response[0].roles
      );
      this.authService.upDateUser(
        response[0].email,
        response[0].password,
        response[0].roles
      );
      if (
        response.length > 0 &&
        response[0].password == password &&
        response[0].roles.includes('ADMIN')
      ) {
        this.authService.isAdmin();
        this.authService.userConnected = true;
        this.router.navigateByUrl('/admin');
      } else if (
        response.length > 0 &&
        response[0].password == password &&
        response[0].roles.includes('USER')
      ) {
        this.router.navigateByUrl('/');
      } else {
        alert('wrong email or password');
      }
    });
  }
}
