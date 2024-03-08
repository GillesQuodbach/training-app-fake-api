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

  deleteOneTraining(id: number) {
    this.apiService.deleteTraining(id).subscribe(() => {
      console.log('formation suppr');

      this.apiService.getTrainings().subscribe({
        next: (data) => (this.listTrainings = data),
        error: (err) => (this.error = err.message),
        complete: () => (this.error = null),
      });
    });
  }
}
