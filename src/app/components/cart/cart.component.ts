import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Training } from 'src/app/model/training.model';
import { CartService } from 'src/app/services/cart.service';
import { AuthenticateService } from 'src/app/services/authenticate.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})

/**
 * Composant de gestion d'un panier permettant l'affichage du panier, la suppression éventuelle de formations et le passage à l'étape suivante
 */
export class CartComponent implements OnInit {
  cart: Training[] | undefined;
  amount: number = 0;
  dateOrder: Date = new Date();
  constructor(
    public cartService: CartService,
    private router: Router,
    private authService: AuthenticateService
  ) {}

  /**
   * à l'initialisation du composant, récupération des données du panier via le service dédié
   */
  ngOnInit(): void {
    this.cart = this.cartService.getCart();
    this.amount = this.cartService.getAmount();
  }

  /**
   * Méthode qui supprime une formation du panier et met à jour l'affichage du panier
   * @param training
   */
  onRemoveFromCart(training: Training) {
    this.cartService.removeTraining(training);
    this.cart = this.cartService.getCart();
  }

  /**
   * Méthode de gestion de l'étape suivante de la commande en renvoyant vers le composant de gestion client (formulaire)
   */
  onNewOrder() {
    if (this.authService.getConnection() === true) {
      this.router.navigateByUrl('customer');
    } else {
      alert('Vous devez être connecté pour passer commande');
    }
  }
}
