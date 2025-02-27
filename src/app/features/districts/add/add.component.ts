import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DistrictService } from '../../../shared/services/district.service';
import { AddDistrict } from '../../../shared/models/Districtmodels/district-add.models';
import { CityService } from '../../../shared/services/city.service';
import { CityList } from '../../../shared/models/Citymodels/city-list.models';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSelectModule,
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} } // ✅ Provide MAT_DIALOG_DATA
  ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AdddistrictComponent {
 addDistrictForm: FormGroup;
  isLoading = false;
  cities: CityList[] = [];

  constructor(
    private fb: FormBuilder,
    private districtservice: DistrictService,
    private citySrvice: CityService,
    private dialogRef: MatDialogRef<AdddistrictComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {
    this.addDistrictForm = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      nameAr: ['', Validators.required],
      cityId: ['', Validators.required]
    });

    this.loadCities();
  }

  loadCities() {
    this.citySrvice.getCities().subscribe(
      (response) => {
        this.cities = response.results;
      },
      (error) => {
        console.error('Error loading cities:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.addDistrictForm.invalid || this.isLoading) return;

    this.isLoading = true;
    const newDistrict: AddDistrict = {
      id: 0,
      code: this.addDistrictForm.value.code,
      name: this.addDistrictForm.value.name,
      nameAr: this.addDistrictForm.value.nameAr,
      cityId: this.addDistrictForm.value.cityId
    };

    this.districtservice.addDistricts(newDistrict).subscribe({
      next: () => {
        // this.showMessage('District added successfully!', 'success');
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('❌ Error adding district:', err);
        // this.showMessage('Error adding district', 'error');
        this.isLoading = false;
      }
    });
  }

  cancel() {
    console.log("DialogRef:", this.dialogRef); // Debugging to check if dialogRef is defined
    if (this.dialogRef) {
      this.dialogRef.close(false);
    } else {
      console.error("dialogRef is undefined");
    }
  }

  // showMessage(message: string, type: 'success' | 'error') {
  //   this.snackBar.open(message, 'Close', {
  //     duration: 3000,
  //     panelClass: type === 'success' ? 'snackbar-success' : 'snackbar-error',
  //   });
  // }

}
