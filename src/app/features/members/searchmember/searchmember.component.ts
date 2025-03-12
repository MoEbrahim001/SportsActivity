import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  
import { CommonModule } from '@angular/common'; 
import { SearchMemberVM } from '../../../shared/models/Members/SearchMemberVM';
import { MemberService } from '../../../shared/services/member.service';

@Component({
  selector: 'app-searchmember',
  standalone: true,
  imports: [FormsModule, CommonModule],  
  templateUrl: './searchmember.component.html',
  styleUrl: './searchmember.component.css'
})
export class SearchmemberComponent {
  searchCriteria: SearchMemberVM = {};
  members: any[] = [];
  errorMessage: string = '';  // New property for error message

  constructor(private memberService: MemberService, private cdr: ChangeDetectorRef) {}

  searchMembers() {
    console.log("Search Criteria Before Sending:", this.searchCriteria);
  
    if (this.searchCriteria.dob) {
      const dobDate = new Date(this.searchCriteria.dob);
      this.searchCriteria.dob = dobDate.toISOString().split('T')[0];
    }
  
    this.memberService.searchMembers(this.searchCriteria).subscribe(
      response => {
        console.log("API Response (Extracted Results):", response);
        
        if (response.length === 0) {
          this.errorMessage = "⚠️ لا توجد بيانات مطابقة للبحث";  // Set error message
          this.members = [];
        } else {
          this.errorMessage = ""; // Clear error message
          this.members = response;
        }
      },
      error => {
        console.error("API Error:", error);
        this.errorMessage = "❌ حدث خطأ أثناء البحث. حاول مرة أخرى.";  // API error message
        this.members = [];
      }
    );
  }

  resetSearch() {
    this.searchCriteria = {};
    this.members = [];
    this.errorMessage = "";  // Clear error message on reset
  }
}
