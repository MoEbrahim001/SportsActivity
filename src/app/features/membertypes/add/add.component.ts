import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MemberTypesService } from '../../../shared/services/member-type.service';
import { AddMember } from '../../../shared/models/membertypemodels/member-type-add.model';
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
export class AddComponentMember {
  addMemberTypeForm: FormGroup;
  isLoading = false;
  private dialogRef = inject(MatDialogRef<AddComponentMember>); // Inject MatDialogRef correctly

  constructor(
    private fb: FormBuilder,
    private memberTypesService: MemberTypesService,
    private snackBar: MatSnackBar
  ) {
    this.addMemberTypeForm = this.fb.group({
      name: ['', Validators.required],
      nameAr: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.addMemberTypeForm.invalid || this.isLoading) return;

    this.isLoading = true;
    const newMemberType: AddMember = {
      id: 0,
      name: this.addMemberTypeForm.value.name,
      nameAr: this.addMemberTypeForm.value.nameAr,
    };

    this.memberTypesService.addMemberType(newMemberType).subscribe({
      next: (response) => {
        console.log('✅ Member Type added:', response);
        this.showMessage('Member Type added successfully!', 'success');
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('❌ Error adding member type:', err);
        this.showMessage('Error adding member type', 'error');
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
