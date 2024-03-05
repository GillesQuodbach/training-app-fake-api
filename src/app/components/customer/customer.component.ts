import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/model/customer.model';
import { CartService } from 'src/app/services/cart.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})

/**
 * Composant de gestion d'un client en le récupérant directement s'il existe déjà via le service
 * le tout pouvant être modifié à l'aide d'un formulaire
 */
export class CustomerComponent implements OnInit {
  myForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private router: Router
  ) {
    let customer = this.cartService.getCustomer();
    this.myForm = new FormGroup({
      name: new FormControl(customer.name),
      firstName: new FormControl(customer.firstName),
      address: new FormControl(customer.address),
      phone: new FormControl(customer.phone),
      email: new FormControl(customer.email),
    });
  }

  ngOnInit(): void {}

  /**
   * Méthode de validation du formulaire client en le sauvegardant dans le service
   * avant de renvoyer vers le composant de gestion du récap de la commande
   * @param customer
   */
  onSaveCustomer(form: FormGroup) {
    if (form.valid) {
      this.cartService.saveCustomer(
        new Customer(
          form.value.name,
          form.value.firstName,
          form.value.address,
          form.value.phone,
          form.value.email
        )
      );
      this.router.navigateByUrl('order');
    }
  }
}
