import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MemberCategoryService } from '../../../shared/services/member-category.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-editcategory',
  standalone: true,
  imports: [CommonModule, 
    FormsModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule],
  templateUrl: './editcategory.component.html',
  styleUrl: './editcategory.component.css'
})
export class EditcategoryComponent implements OnInit {
  editMemberTypeObj = { id: 0, name: '', nameAr: '' };
  isNameDuplicate: boolean = false;
  allMemberTypes: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<EditcategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private memberTypesService: MemberCategoryService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    console.log('🔍 Edit Dialog Opened. Received Data:', this.data);

    if (this.data) {
      this.editMemberTypeObj = { 
        id: this.data.id, 
        name: this.data.name, 
        nameAr: this.data.nameAr 
      };
    }

    this.loadAllMemberTypes();
  }

  loadAllMemberTypes() {
    const params = { first: 0, rows: 100 };  // Adjust as needed
    this.memberTypesService.getMemberCategories(params).subscribe({
      next: (data) => (this.allMemberTypes = data.results),
      error: (err) => console.error('❌ Error fetching all member types:', err),
    });
  }

  checkDuplicateName() {
    const newName = this.editMemberTypeObj.name?.trim().toLowerCase();
    const newNameAr = this.editMemberTypeObj.nameAr?.trim().toLowerCase();

    this.isNameDuplicate = this.allMemberTypes.some(
      (memberType) =>
        (memberType.name.toLowerCase() === newName || 
         memberType.nameAr.toLowerCase() === newNameAr) &&
        memberType.id !== this.editMemberTypeObj.id
    );
  }

  saveChanges() {
    if (!this.editMemberTypeObj.name?.trim() || !this.editMemberTypeObj.nameAr?.trim()) {
      alert('⚠️ Both Arabic and English names are required!');
      return;
    }

    if (this.isNameDuplicate) {
      alert('⚠️ This name already exists! Please choose another name.');
      return;
    }

    this.memberTypesService.editMemberCategory(this.editMemberTypeObj).subscribe({
      next: (response) => {
        if (response.status === "Error") {
          alert(`❌ ${response.message}`);
        } else if (response.status === "Success") {
          alert('✅ Member Type updated successfully!');
          this.dialogRef.close(response);
        } else {
          alert('⚠️ Unexpected response from server.');
        }
      },
      error: (err) => {
        console.error('❌ Error updating member type:', err);
        alert('❌ Failed to update member type. Please try again.');
      }
    });
  }

  onCancel() {
    this.dialogRef.close();
  }
}

