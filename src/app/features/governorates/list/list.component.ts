import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GovernorateService } from '../../../shared/services/governorate.service';
import { GovernorateResult } from '../../../shared/models/Governoratemodels/governorate-results.models';
import { ListboxModule } from 'primeng/listbox';
import { HttpClientModule } from '@angular/common/http';
import { GovernorateList } from '../../../shared/models/Governoratemodels/governorate-list.models';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, ListboxModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class GovernorateListComponent implements OnInit {
    formGroup!: FormGroup;
    governorates: GovernorateList[] = [];
    loading: boolean = false;

    constructor(private governorateService: GovernorateService, private fb: FormBuilder) {}

    ngOnInit(): void {
        this.formGroup = this.fb.group({
            selectedGovernorate: [null] // Reactive form control for selection
        });

        this.loadGovernorates();
    }

    loadGovernorates() {
        this.loading = true;
        this.governorateService.getGovernorates().subscribe(
            (response: GovernorateResult) => {
                this.governorates = response.results; // No pagination, display all
                this.loading = false;
            },
            error => {
                console.error('Error loading governorates', error);
                this.loading = false;
            }
        );
    }

    onAdd() {
        console.log("Add button clicked!");
        // Navigate to add form or open a modal
    }

    onEdit(governorate: GovernorateList) {
        console.log("Edit button clicked for:", governorate);
        // Navigate to edit form or open a modal with governorate details
    }
}
