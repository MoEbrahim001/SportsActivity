import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SportsActivityService } from '../../../shared/services/sports-activity.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { first } from 'rxjs';
import { MatDialogModule } from '@angular/material/dialog';

// Angular Material Modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule,
    MatCardModule,
    MatDialogModule
  ],
})
export class EditSportsActivityComponent implements OnInit {
  editForm!: FormGroup;
  selectedFile: File | null = null;
  previewImage: string | null = null;
  originalNameEn: string = ''; 
  originalNameAr: string = ''; 
  originalImage: string | null = null; 
  isNameDuplicate: boolean = false; 
  allActivities: any[] = []; 

  constructor(
    public dialogRef: MatDialogRef<EditSportsActivityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private sportsActivityService: SportsActivityService
  ) {}

  ngOnInit() {
    console.log('🔍 Edit Dialog Opened. Activity Data:', this.data);
    this.initForm();
    this.loadAllActivities();
  }

  initForm() {
    this.editForm = this.fb.group({
      id: [this.data.id],
      code: [this.data.code],
      nameAr: [this.data.nameAr, Validators.required], 
      nameEn: [this.data.nameEn, Validators.required], 
    });

    this.originalNameEn = this.data.nameEn;
    this.originalNameAr = this.data.nameAr;
    this.originalImage = this.data.image || null;

    if (this.originalImage) {
      this.previewImage = `https://localhost:7177/images/${this.originalImage}`;
    }

    this.editForm.get('nameEn')?.valueChanges.subscribe(() => this.checkDuplicateName());
    this.editForm.get('nameAr')?.valueChanges.subscribe(() => this.checkDuplicateName());
  }

  loadAllActivities() {
    this.sportsActivityService.getSportsActivities({ first: 0, rows: 100 }).subscribe({
      next: (data) => (this.allActivities = data.results),
      error: (err) => console.error('❌ Error fetching all activities:', err),
    });
  }

  checkDuplicateName() {
    const newNameEn = this.editForm.value.nameEn?.trim().toLowerCase();
    const newNameAr = this.editForm.value.nameAr?.trim().toLowerCase();

    this.isNameDuplicate = this.allActivities.some(
      (activity) =>
        (activity.nameEn.toLowerCase() === newNameEn || 
         activity.nameAr.toLowerCase() === newNameAr) &&
        activity.id !== this.data.id
    );
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        alert('⚠️ Invalid file type! Please upload a PNG or JPG image.');
        return;
      }

      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => (this.previewImage = e.target.result);
      reader.readAsDataURL(file);
    }
  }

  saveChanges() {
    if (!this.editForm.value.nameEn?.trim() || !this.editForm.value.nameAr?.trim()) {
      alert('⚠️ Both Arabic and English names are required!');
      return;
    }
  
    if (this.isNameDuplicate) {
      alert('⚠️ This name already exists! Please choose another name.');
      return;
    }
  
    const formData = new FormData();
    formData.append('activityId', this.data.id.toString());
    formData.append('code', this.editForm.getRawValue().code);
    formData.append('nameAr', this.editForm.value.nameAr);
    formData.append('nameEn', this.editForm.value.nameEn);
  
    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }
  
    this.sportsActivityService.editSportsActivity(this.data.id, formData).subscribe({
      next: (response) => {
        if (response.status === "Error") {
          alert(`❌ ${response.errorMsg}`);
        } else if (response.status === "Success") {
          alert('✅ Activity updated successfully!');
          this.dialogRef.close(response);
        } else {
          alert('⚠️ Unexpected response from server.');
        }
      },
      error: (err) => {
        console.error('❌ Error updating activity:', err);
        alert('❌ Failed to update activity. Please try again.');
      }
    });
  }

  onCancel() {
    this.dialogRef.close();
  }
}
