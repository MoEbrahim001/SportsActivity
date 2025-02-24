import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { GovernorateService } from '../../../shared/services/governorate.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogModule } from 'primeng/dialog'; 
// Angular Material Modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, 
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    DialogModule ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditGovernateComponent implements OnInit {
  editForm!: FormGroup;
  selectedFile: File | null = null;
  previewImage: string | null = null;
  originalName: string = ''; 
  originalNameAr: string = ''; 
  originalImage: string | null = null; 
  isNameDuplicate: boolean = false; 
  allGovernorates: any[] = [];
  SuccessfullyHeader: string = 'Success';
SuccessfullyMessage: string = 'Governorate updated successfully!';
showSuccessfullyMessage: boolean = false;
errorMessage: string = '';
errorDisplay: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<EditGovernateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private governorateService: GovernorateService
  ) {}
  ngOnInit(): void {
    console.log('🔍 Edit Dialog Opened. Governorate Data:', this.data);
    this.initForm();
    this.loadAllGovernorates();  }
    initForm() {
      this.editForm = this.fb.group({
        id: [this.data.id],
        code: [this.data.code, Validators.required],
        name: [this.data.name, Validators.required],
        nameAr: [this.data.nameAr, Validators.required],
        logo: [this.data.logo, Validators.required],
        area: [this.data.area, [Validators.required, Validators.min(1)]],
        population: [this.data.population, [Validators.required, Validators.min(1)]],
      });
  
      this.originalName = this.data.name;
      this.originalNameAr = this.data.nameAr;
  
      this.editForm.get('name')?.valueChanges.subscribe(() => this.checkDuplicateName());
      this.editForm.get('nameAr')?.valueChanges.subscribe(() => this.checkDuplicateName());
    }
    loadAllGovernorates() {
      this.governorateService.getGovernorates().subscribe({
        next: (data) => (this.allGovernorates = data.results),
        error: (err) => console.error('❌ Error fetching governorates:', err),
      });
    }
  
    checkDuplicateName() {
      const newName = this.editForm.value.name?.trim().toLowerCase();
      const newNameAr = this.editForm.value.nameAr?.trim().toLowerCase();
  
      this.isNameDuplicate = this.allGovernorates.some(
        (gov) =>
          (gov.name.toLowerCase() === newName || 
           gov.nameAr.toLowerCase() === newNameAr) &&
          gov.id !== this.data.id
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
    
      this.governorateService.editGovernorate(this.editForm.value).subscribe({
        next: (response) => {
          this.SuccessfullyMessage = 'Governorate updated successfully!';
          this.showSuccessfullyMessage = true;
    
          // Close the dialog after showing success message
          setTimeout(() => {
            this.dialogRef.close(response);
          }, 2000);
        },
        error: (err) => {
          console.error('❌ Error updating governorate:', err);
          this.errorMessage = '❌ Failed to update governorate. Please try again.';
          this.errorDisplay = true;
        }
      });
    }
  
    onCancel() {
      this.dialogRef.close();
    }



}
