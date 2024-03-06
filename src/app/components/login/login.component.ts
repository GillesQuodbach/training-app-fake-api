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
  constructor(
    public authService: AuthenticateService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.user = this.authService.getUser();
    this.loginForm = new FormGroup({
      email: new FormControl(this.user.email),
      password: new FormControl(this.user.password),
    });
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [
        this.user.email,
        [Validators.required, Validators.pattern('[a-z0-9.@]*')],
      ],
      password: [this.user.password, [Validators.required]],
    });
  }

  onFindUser(form: FormGroup) {
    if (form.valid) {
      this.authService.findUser(
        new User(form.value.email, form.value.password, 'unknown')
      );
      // this.router.navigateByUrl('order');
    }
  }
  // }
  // onSaveUser(form: FormGroup) {
  //   if (form.valid) {
  //     this.cartService.saveCustomer(
  //       new Customer(
  //         form.value.name,
  //         form.value.firstName,
  //         form.value.address,
  //         form.value.phone,
  //         form.value.email
  //       )
  //     );
  //     this.router.navigateByUrl('order');
  //   }
  // }
}
