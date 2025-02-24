import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CityService } from '../../../shared/services/city.service';
import { AddCity } from '../../../shared/models/Citymodels/city-add.models';
import { GovernorateService } from '../../../shared/services/governorate.service';
import { GovernorateList } from '../../../shared/models/Governoratemodels/governorate-list.models';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add-city',
  standalone: true,
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSelectModule
  ],
})
export class AddCityComponent {
  addCityForm: FormGroup;
  isLoading = false;
  governorates: GovernorateList[] = [];

  constructor(
    private fb: FormBuilder,
    private cityService: CityService,
    private governorateService: GovernorateService,
    private dialogRef: MatDialogRef<AddCityComponent>,
    private snackBar: MatSnackBar
  ) {
    this.addCityForm = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      nameAr: ['', Validators.required],
      governorateId: ['', Validators.required]
    });

    this.loadGovernorates();
  }

  loadGovernorates() {
    this.governorateService.getGovernorates().subscribe(
      (response) => {
        this.governorates = response.results;
      },
      (error) => {
        console.error('Error loading governorates:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.addCityForm.invalid || this.isLoading) return;

    this.isLoading = true;
    const newCity: AddCity = {
      id: 0,
      code: this.addCityForm.value.code,
      name: this.addCityForm.value.name,
      nameAr: this.addCityForm.value.nameAr,
      governorateId: this.addCityForm.value.governorateId
    };

    this.cityService.addCities(newCity).subscribe({
      next: () => {
        this.showMessage('City added successfully!', 'success');
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('❌ Error adding city:', err);
        this.showMessage('Error adding city', 'error');
        this.isLoading = false;
      }
    });
  }

  cancel() {
    this.dialogRef.close(false);
  }

  showMessage(message: string, type: 'success' | 'error') {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: type === 'success' ? 'snackbar-success' : 'snackbar-error',
    });
  }
}
