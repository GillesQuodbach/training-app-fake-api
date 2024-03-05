import {
  Component,
  DoCheck,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/model/customer.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})

/**
 * Composant de gestion du récapitulatif d'une commande + validation
 */
export class OrderComponent implements OnInit, OnChanges, DoCheck, OnDestroy {
  dateOrder: Date = new Date();
  customer: Customer | undefined;
  constructor(public cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    console.log('ngOnInit');
    this.customer = this.cartService.getCustomer();
  }

  /**
   * Méthode appelé en cas de validation d'une commande
   * si user confirme alors l'appli est remise dans son état initial
   */
  onOrder() {
    if (confirm("Aujourd'hui c'est gratuit, merci de votre visite :)")) {
      this.cartService.clearLocalStorage();
      this.router.navigateByUrl('');
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnCHanges' + changes);
  }

  ngDoCheck(): void {
    console.log('ngDoCheck');
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy');
  }
}
