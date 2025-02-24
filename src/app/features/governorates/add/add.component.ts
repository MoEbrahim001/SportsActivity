import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GovernorateService } from '../../../shared/services/governorate.service';
import { AddGovernate } from '../../../shared/models/Governoratemodels/governorate-add.models';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-add',
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
  ],
})
export class AddGovernorateComponent {
  addGovernorateForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private governorateService: GovernorateService,
    private dialogRef: MatDialogRef<AddGovernorateComponent>,
    private snackBar: MatSnackBar
  ) {
    this.addGovernorateForm = this.fb.group({
      code: ['', Validators.required],
      nameAr: ['', Validators.required],
      name: ['', Validators.required],
      area: ['', Validators.required],
      population: ['', Validators.required],
      logo : ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.addGovernorateForm.invalid || this.isLoading) return;

    this.isLoading = true;
    const newGovernorate: AddGovernate = {
      id: 0,
      code: this.addGovernorateForm.value.code,
      nameAr: this.addGovernorateForm.value.nameAr,
      name: this.addGovernorateForm.value.name,
      area: this.addGovernorateForm.value.area,
      population: this.addGovernorateForm.value.population,
      logo : this.addGovernorateForm.value.logo,
    };

    this.governorateService.addGovernorates(newGovernorate).subscribe({
      next: () => {
        this.showMessage('Governorate added successfully!', 'success');
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('❌ Error adding governorate:', err);
        this.showMessage('Error adding governorate', 'error');
        this.isLoading = false;
      },
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
