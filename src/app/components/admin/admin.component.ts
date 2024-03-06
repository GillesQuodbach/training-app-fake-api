import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../services/api.service';
import { Training } from 'src/app/model/training.model';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  listTrainings: Training[] | undefined;
  error: Error | null | undefined;
  constructor(
    private apiService: ApiService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.apiService.getTrainings().subscribe({
      next: (data) => (this.listTrainings = data),
      error: (err) => (this.error = err.message),
      complete: () => (this.error = null),
    });
  }

  /**
   * Méthode permettant l'ajout d'une formation au panier en utilisant le service dédié
   * @param training
   */
  onAddToCart(training: Training) {
    if (training.quantity > 0) {
      this.cartService.addTraining(training);
      this.router.navigateByUrl('cart');
    }
  }
}
