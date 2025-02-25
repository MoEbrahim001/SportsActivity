import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { GovernorateService } from '../../../shared/services/governorate.service';
import { GovernorateResult } from '../../../shared/models/Governoratemodels/governorate-results.models';
import { ListboxModule } from 'primeng/listbox';
import { MessageService } from 'primeng/api';
import { AddGovernorateComponent } from '../add/add.component';
import { GovernorateList } from '../../../shared/models/Governoratemodels/governorate-list.models';
import { ToastModule } from 'primeng/toast';
import { MatDialog } from '@angular/material/dialog';
import { EditGovernateComponent } from '../edit/edit.component';
import { AddCityComponent } from '../../cities/add/add.component';
import { EditcityComponent } from '../../cities/edit/edit.component';
import { CityService } from '../../../shared/services/city.service'; 
import { CityList } from '../../../shared/models/Citymodels/city-list.models';
import { CityResult } from '../../../shared/models/Citymodels/city-results.models';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ListboxModule, ReactiveFormsModule, FormsModule, ToastModule],
  providers: [MessageService],  
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class GovernorateListComponent implements OnInit {
    formGroup!: FormGroup;
    governorates: GovernorateList[] = [];
    cities: CityList[] = []; // Store cities of selected governorate
    loading: boolean = false;
    selectedGovernorate!: GovernorateList | null;

    constructor(
        private governorateService: GovernorateService, 
        private cityService: CityService, 
        private fb: FormBuilder,
        private messageService: MessageService, 
        private dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.formGroup = this.fb.group({
            selectedGovernorate: [null]
        });

        this.loadGovernorates();

        this.formGroup.get('selectedGovernorate')?.valueChanges.subscribe(governorate => {
            if (governorate) {
                this.onGovernorateSelected(governorate);
            } else {
                this.cities = [];
            }
        });
    }

    onGovernorateSelected(governorate: GovernorateList) {
        if (governorate) {
            this.selectedGovernorate = governorate;
            console.log("Selected Governorate ID:", governorate.id);
            this.loadCities(governorate.id);
        } else {
            console.warn("No governorate selected.");
            this.cities = [];
        }
    }
    
    loadGovernorates() {
        this.loading = true;
        this.governorateService.getGovernorates().subscribe(
            (response: GovernorateResult) => {
                this.governorates = response.results;
                this.loading = false;
            },
            error => {
                console.error('Error loading governorates', error);
                this.loading = false;
            }
        );
    }

    loadCities(governorateId: number) {
        this.cityService.getCitiesByGovernorate(governorateId).subscribe(
            (response) => {
                this.cities = response.length ? response : []; // Ensure cities are updated properly
                console.log(`Loaded ${this.cities.length} cities for Governorate ID: ${governorateId}`);
            },
            error => {
                if (error.status === 404) {
                    console.warn(`No cities found for Governorate ID: ${governorateId}`);
                    this.cities = [];
                } else {
                    console.error('Error fetching cities', error);
                }
            }
        );
    }

    onAddGovernorate() {
        const dialogRef = this.dialog.open(AddGovernorateComponent, { width: '400px' });

        dialogRef.afterClosed().subscribe((newGovernorate: GovernorateList) => {
            if (newGovernorate) {
                this.governorates.push(newGovernorate);
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Governorate added' });
            }
        });
    }

    onEditGovernorate(governorate: GovernorateList) {
        const dialogRef = this.dialog.open(EditGovernateComponent, { width: '500px', data: governorate });

        dialogRef.afterClosed().subscribe((updatedGovernorate: GovernorateList) => {
            if (updatedGovernorate) {
                const index = this.governorates.findIndex(g => g.id === updatedGovernorate.id);
                if (index !== -1) {
                    this.governorates[index] = updatedGovernorate;
                }
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Governorate updated' });
            }
        });
    }

    onAddCity() {
        if (!this.selectedGovernorate) {
            console.warn("No governorate selected for adding a city.");
            return;
        }

        const dialogRef = this.dialog.open(AddCityComponent, { width: '400px', data: { governorateId: this.selectedGovernorate.id } });

        dialogRef.afterClosed().subscribe(newCity => {
            if (newCity) {
                this.cities.push(newCity);
            }
        });
    }

    onEditCity(city: CityList) {
        const dialogRef = this.dialog.open(EditcityComponent, { width: '400px', data: city });

        dialogRef.afterClosed().subscribe(updatedCity => {
            if (updatedCity) {
                const index = this.cities.findIndex(c => c.id === updatedCity.id);
                if (index !== -1) {
                    this.cities[index] = updatedCity;
                }
            }
        });
    }
}
