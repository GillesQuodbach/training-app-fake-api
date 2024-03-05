import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/model/customer.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})

/**
 * Composant de gestion d'un client en le récupérant directement s'il existe déjà via le service
 * le tout pouvant être modifié à l'aide d'un formulaire
 */
export class CustomerComponent implements OnInit {  
  constructor(public cartService : CartService, private router : Router) {  
  }

  ngOnInit(): void {
  }

  /**
   * Méthode de validation du formulaire client en le sauvegardant dans le service
   * avant de renvoyer vers le composant de gestion du récap de la commande
   * @param customer 
   */
  onSaveCustomer(customer : Customer){
    this.cartService.saveCustomer(customer);
    this.router.navigateByUrl('order');
  }
}
