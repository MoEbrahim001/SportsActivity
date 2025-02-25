import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogModule } from 'primeng/dialog';
// Angular Material Modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CityService } from '../../../shared/services/city.service';
import { GovernorateList } from '../../../shared/models/Governoratemodels/governorate-list.models';
import { MatSelectModule } from '@angular/material/select';
import { GovernorateService } from '../../../shared/services/governorate.service';
@Component({
  selector: 'app-edit-city',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    DialogModule,
    MatSelectModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditcityComponent implements OnInit {
  editForm!: FormGroup;
  governorates: GovernorateList[] = [];

  selectedFile: File | null = null;
  previewImage: string | null = null;
  originalName: string = '';
  originalNameAr: string = '';
  originalImage: string | null = null;
  isNameDuplicate: boolean = false;
  allCities: any[] = [];
  SuccessfullyHeader: string = 'Success';
  SuccessfullyMessage: string = 'City updated successfully!';
  showSuccessfullyMessage: boolean = false;
  errorMessage: string = '';
  errorDisplay: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<EditcityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private CityService: CityService,

    private governorateService: GovernorateService,

  ) { }
  ngOnInit(): void {
    console.log('🔍 Edit Dialog Opened. City Data:', this.data);
    this.initForm();
    this.loadAllCities();
    this.loadGovernorates();
  }
  initForm() {
    this.editForm = this.fb.group({
      id: [this.data.id],
      code: [this.data.code, Validators.required],
      name: [this.data.name, Validators.required],
      nameAr: [this.data.nameAr, Validators.required],
      governorateId: [this.data.governorateId, [Validators.required, Validators.min(1)]],
    });

    this.originalName = this.data.name;
    this.originalNameAr = this.data.nameAr;

    this.editForm.get('name')?.valueChanges.subscribe(() => this.checkDuplicateName());
    this.editForm.get('nameAr')?.valueChanges.subscribe(() => this.checkDuplicateName());
    
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
  loadAllCities() {
    this.CityService.getCities().subscribe({
      next: (data) => {
        this.allCities = data.results;

        this.checkDuplicateName(); // Ensure check runs after cities are loaded
      },
      error: (err) => console.error('❌ Error fetching cities:', err),
    });
  }

  checkDuplicateName() {
    if (!this.allCities || this.allCities.length === 0) {
      return; // Ensure data is loaded before checking
    }

    const newName = this.editForm.value.name?.trim().toLowerCase();
    const newNameAr = this.editForm.value.nameAr?.trim().toLowerCase();

    this.isNameDuplicate = this.allCities.some(
      (city) =>
        city.id !== this.data.id && // Ensure it's not the same city being edited
        ((city.name?.trim().toLowerCase() === newName) ||
          (city.nameAr?.trim().toLowerCase() === newNameAr))
    );
  }

  saveChanges() {
    if (this.isNameDuplicate) {
      this.errorMessage = '⚠️ This name already exists! Please choose another name.';
      this.errorDisplay = true;
      return;
    }

    if (this.editForm.invalid) {
      this.errorMessage = '⚠️ Please fill in all required fields correctly!';
      this.errorDisplay = true;
      return;
    }

    this.CityService.editCity(this.editForm.value).subscribe({
      next: (response) => {
        this.SuccessfullyMessage = 'City updated successfully!';
        this.showSuccessfullyMessage = true;

        // Close the dialog after showing success message
        setTimeout(() => {
          this.dialogRef.close(response);
        }, 2000);
      },
      error: (err) => {
        console.error('❌ Error updating City:', err);
        this.errorMessage = '❌ Failed to update City. Please try again.';
        this.errorDisplay = true;
      }
    });
  }

  onCancel() {
    this.dialogRef.close();
  }



}


