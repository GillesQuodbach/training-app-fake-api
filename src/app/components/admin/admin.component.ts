import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../services/api.service';
import { Training } from 'src/app/model/training.model';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NewTraining } from 'src/app/model/newTraining';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  newTrainingForm: FormGroup;
  listTrainings: Training[] | undefined;
  error: Error | null | undefined;
  showAddTrainingForm: boolean = false;
  newTraining = new NewTraining('', '', 0, 0);
  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder
  ) {
    this.newTrainingForm = this.formBuilder.group({
      name: [this.newTraining.name, Validators.required],
      description: [this.newTraining.description, Validators.required],
      price: [this.newTraining.price, Validators.required],
      quantity: [this.newTraining.quantity, Validators.required],
    });
  }

  ngOnInit(): void {
    this.apiService.getTrainings().subscribe({
      next: (data) => (this.listTrainings = data),
      error: (err) => (this.error = err.message),
      complete: () => (this.error = null),
    });
  }

  retrieveData() {
    this.apiService.getTrainings().subscribe({
      next: (data) => (this.listTrainings = data),
      error: (err) => (this.error = err.message),
      complete: () => (this.error = null),
    });
  }

  saveNewTraining(form: FormGroup) {
    if (form.valid) {
      this.newTraining = new NewTraining(
        form.value.name,
        form.value.description,
        form.value.price,
        form.value.quantity
      );

      this.apiService.addTraining(this.newTraining).subscribe({
        next: (data: NewTraining) => {
          this.newTraining = data;
          this.retrieveData();
          form.reset();
        },
        error: (err) => {
          this.error = err.message;
        },
        complete: () => {
          this.error = null;
        },
      });
    }
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

  updateOneTraining(training: Training) {
    this.apiService.updateTraining(training).subscribe(() => {
      console.log('formation suppr');
      this.apiService.getTrainings().subscribe({
        next: (data) => (this.listTrainings = data),
        error: (err) => (this.error = err.message),
        complete: () => (this.error = null),
      });
    });
  }

  toggleAddTrainingForm() {
    if (this.showAddTrainingForm === false) {
      this.showAddTrainingForm = true;
    } else if (this.showAddTrainingForm === true) {
      return (this.showAddTrainingForm = false);
    }
    return this.showAddTrainingForm;
  }
}
