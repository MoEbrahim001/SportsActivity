import { Component, OnInit ,Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MemberCategoryService } from '../../../shared/services/member-category.service';
import { MemberCategoryResult } from '../../../shared/models/membertcategorymodels/member-category-results.models';
import { MemberCategoryParams } from '../../../shared/models/membertcategorymodels/member-category-params.models';
import { PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AddcategoryComponent } from '../addcategory/addcategory.component';
import { EditcategoryComponent } from '../editcategory/editcategory.component';
import { MemberCategoryList } from '../../../shared/models/membertcategorymodels/member-category-list.models';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-listcategory',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule, MatTableModule, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './listcategory.component.html',
  styleUrl: './listcategory.component.css'
})
export class ListcategoryComponent {
 members: MemberCategoryList[] = [];
  totalResults = 0;

  memberParams: MemberCategoryParams = {
    first: 0, 
    rows: 5,
  };
  displayedColumns: string[] = ['id', 'name', 'nameAr', 'actions'];

  constructor(
    private memberService: MemberCategoryService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getAllMembers();
  }

getAllMembers() {
  this.memberService.getMemberCategories(this.memberParams).subscribe({
    next: (data: MemberCategoryResult) => { // 👈 Explicitly define 'data' type
      console.log('✅ Received Members:', data);
      this.members = data.results; // Ensure 'results' is an array of 'Result'
      this.totalResults = data.totalResults;
    },
    error: (err) => {
      console.error('❌ Error fetching members:', err);
    }
  });
}


  onPageChange(event: PageEvent) {
    this.memberParams.first = event.pageIndex * event.pageSize;
    this.memberParams.rows = event.pageSize;
    this.getAllMembers();
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddcategoryComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('✅ New Member Added:', result);
        this.getAllMembers();
      }
    });
  }

  // openEditDialog(member: MemberTypeList) {
  //   const dialogRef = this.dialog.open(EditMemberTypeComponent, {
  //     width: '500px',
  //     data: member,
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result) {
  //       console.log('✅ Member Updated:', result);
  //       this.getAllMembers();
  //     }
  //   });
  // }
  openEditDialog(member: MemberCategoryList) {
    console.log('📤 Opening Edit Dialog with:', member); // Debug log
    const dialogRef = this.dialog.open(EditcategoryComponent, {
      width: '500px',
      data: { ...member }, // Ensure new reference
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('✅ Member Updated:', result);
        this.getAllMembers();
      }
    });
  }
  


  deleteMember(memberId: number) {
    if (confirm('❌ Are you sure you want to delete this member?')) {
      this.memberService.deleteMemberCategory(memberId).subscribe({
        next: () => {
          console.log(`🗑️ Deleted Member ID: ${memberId}`);
          this.members = this.members.filter(member => member.id !== memberId);
        },
        error: (err) => {
          console.error('❌ Error deleting member:', err);
        }
      });
    }
  }
  
  trackById(index: number, item: MemberCategoryList) {
    return item.id;
  }

}
