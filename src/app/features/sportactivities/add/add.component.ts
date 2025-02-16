import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SportsActivityService } from '../../../shared/services/sports-activity.service';
import { ActivityId } from '../../../shared/models/sportactivitiesmodels/sport-activity-add.model';
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
export class AddComponent {
  addActivityForm: FormGroup;
  isLoading = false;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private sportsActivityService: SportsActivityService,
    private dialogRef: MatDialogRef<AddComponent>,
    private snackBar: MatSnackBar
  ) {
    this.addActivityForm = this.fb.group({
      code: ['', Validators.required],
      nameAr: ['', Validators.required],
      nameEn: ['', Validators.required],
    });
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      console.log('📷 Selected File:', this.selectedFile);
    }
  }

  onSubmit(): void {
    if (this.addActivityForm.invalid || this.isLoading) return;

    this.isLoading = true;
    const newActivity: ActivityId = {
      id: 0,
      code: this.addActivityForm.value.code,
      nameAr: this.addActivityForm.value.nameAr,
      nameEn: this.addActivityForm.value.nameEn,
      image: '',
    };

    this.sportsActivityService.addSportsActivity(newActivity).subscribe({
      next: (response) => {
        console.log('✅ Activity added:', response);
        if (this.selectedFile) {
          this.uploadImage(response.id);
        } else {
          this.showMessage('Activity added successfully!', 'success');
          this.dialogRef.close(true);
        }
      },
      error: (err) => {
        console.error('❌ Error adding activity:', err);
        this.showMessage('Error adding activity', 'error');
        this.isLoading = false;
      },
    });
  }

  uploadImage(activityId: number) {
    if (!this.selectedFile) return;

    this.sportsActivityService.uploadImage(activityId, this.selectedFile).subscribe({
      next: () => {
        console.log('✅ Image uploaded successfully');
        this.showMessage('Activity and image uploaded successfully!', 'success');
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('❌ Error uploading image:', err);
        this.showMessage('Activity added, but image upload failed.', 'error');
      },
      complete: () => (this.isLoading = false),
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
