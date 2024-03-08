import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../services/api.service';
import { Training } from 'src/app/model/training.model';
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
  isModify: boolean = false;
  newTraining = new NewTraining('', '', 0, 0);
  training = new Training(0, '', '', 0, 0);
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

  // Mise à jour d'une formation
  onUpdateTraining(form: FormGroup, training: Training) {
    if (form.valid) {
      training = new Training(
        this.training.id,
        form.value.name,
        form.value.description,
        form.value.price,
        form.value.quantity
      );
      this.apiService.updateTraining(training).subscribe({
        next: (data: Training) => {
          this.retrieveData();
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

  resetForm() {
    this.newTrainingForm.patchValue({
      name: '',
      description: '',
      price: '',
      quantity: '',
    });
  }

  // Pré-remplissage du formulaire de mise a jour d'une formation
  updateAddFormTraining(training: Training) {
    console.log('training to upadte', training);
    this.newTrainingForm.patchValue({
      name: training.name,
      description: training.description,
      price: training.price,
      quantity: training.quantity,
    });
    this.training = training;
    this.toggleUpdateTraining();
    this.isModify = true;
  }

  // fonction de mise a jour du tableau de formation
  retrieveData() {
    this.apiService.getTrainings().subscribe({
      next: (data) => (this.listTrainings = data),
      error: (err) => (this.error = err.message),
      complete: () => (this.error = null),
    });
  }

  // Ajout d'une nouvelle formation
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

  // suppression d'une formation
  deleteOneTraining(id: number) {
    this.apiService.deleteTraining(id).subscribe(() => {
      console.log('formation suppr');
      this.retrieveData();
    });
  }

  // affichage du formulaire au clic
  toggleAddTraining() {
    this.resetForm();
    return (this.showAddTrainingForm = !this.showAddTrainingForm);
  }

  toggleUpdateTraining() {
    return (this.showAddTrainingForm = !this.showAddTrainingForm);
  }
}
