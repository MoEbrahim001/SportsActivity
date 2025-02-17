import { Component, OnInit ,Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MemberTypesService } from '../../../shared/services/member-type.service';
import { MemberTypeResult } from '../../../shared/models/membertypemodels/member-type-results';
import { MemberTypeParams } from '../../../shared/models/membertypemodels/mwmber-type-params';
import { PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AddComponentMember } from '../add/add.component';
import { EditMemberTypeComponent } from '../edit/edit.component';
import { MemberTypeList } from '../../../shared/models/membertypemodels/member-type-list.models';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule, MatTableModule, MatButtonModule, MatIconModule, MatTooltipModule]
})
export class ListComponent implements OnInit {
  members: MemberTypeList[] = [];
  totalResults = 0;

  memberParams: MemberTypeParams = {
    first: 0, 
    rows: 5,
  };
  displayedColumns: string[] = ['id', 'name', 'nameAr', 'actions'];

  constructor(
    private memberService: MemberTypesService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getAllMembers();
  }

getAllMembers() {
  this.memberService.getMemberTypes(this.memberParams).subscribe({
    next: (data: MemberTypeResult) => { // 👈 Explicitly define 'data' type
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
    const dialogRef = this.dialog.open(AddComponentMember, {
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
  openEditDialog(member: MemberTypeList) {
    console.log('📤 Opening Edit Dialog with:', member); // Debug log
    const dialogRef = this.dialog.open(EditMemberTypeComponent, {
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
      this.memberService.deleteSportsActivity(memberId).subscribe({
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
  
  trackById(index: number, item: MemberTypeList) {
    return item.id;
  }
}
