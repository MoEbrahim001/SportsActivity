import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ParentchildserviceService } from '../../../shared/services/parentchildservice.service';
import { SearchParentchildmember } from '../../../shared/models/ParentChildmodels/parentchildsearch';

@Component({
  selector: 'app-searchparentchildmember',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './searchparentchildmember.component.html',
  styleUrl: './searchparentchildmember.component.css'
})
export class SearchparentchildmemberComponent {
  searchCriteria: SearchParentchildmember = {
    memberId: '',  // or '' if it's a string
    nameAr: '',
    membertype: ''
  };

  members: any[] = [];
  errorMessage: string = '';

  constructor(private memberService: ParentchildserviceService) {}

  searchMembers() {
    console.log("Search Criteria:", this.searchCriteria);

    this.memberService.searchMembers(this.searchCriteria.memberId , this.searchCriteria.nameAr).subscribe(
      response => {
        console.log("API Response:", response);

        if (response.length === 0) {
          this.errorMessage = "⚠️ لا توجد بيانات مطابقة للبحث";
          this.members = [];
        } else {
          this.errorMessage = "";
          this.members = response;
        }
      },
      error => {
        console.error("API Error:", error);
        this.errorMessage = "❌ حدث خطأ أثناء البحث. حاول مرة أخرى.";
        this.members = [];
      }
    );
  }

  resetSearch() {
    this.searchCriteria = {
      memberId: '', // or '' if it's a string
      nameAr: '',
      membertype: ''
    };
    this.members = [];
    this.errorMessage = "";
  }
}
