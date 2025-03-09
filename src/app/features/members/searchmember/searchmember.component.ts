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
        this.members = response; // Now response is an array
      },
      error => {
        console.error("API Error:", error);
      }
    );
  }
  

  resetSearch() {
    this.searchCriteria = {};
    this.members = [];
  }
}