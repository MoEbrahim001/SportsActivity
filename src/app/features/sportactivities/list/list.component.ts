import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { SportsActivityService } from '../../../shared/services/sports-activity.service';
import { SportActivityList } from '../../../shared/models/sportactivitiesmodels/sport-activity-list.model';
import { SportsActivityParams } from '../../../shared/models/sportactivitiesmodels/sport-activity-params';
import { SportsActivityResult } from '../../../shared/models/sportactivitiesmodels/sport-activity-result';
import { PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EditSportsActivityComponent } from '../edit/edit.component';
import { AddComponent } from '../add/add.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule, MatTableModule, MatButtonModule, MatIconModule, MatTooltipModule]
})
export class ListSportsActivitiesComponent implements OnInit {
  sportsActivities: SportActivityList[] = [];
  totalResults = 0;

  activityParams: SportsActivityParams = {
    first: 0, // Start at first record
    rows: 5, // Show 5 records per page
  };
  displayedColumns: string[] = ['id', 'code', 'nameAr', 'name', 'image', 'actions'];

  constructor(
    private sportsActivityService: SportsActivityService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getAllSportsActivities();
  }

  getAllSportsActivities() {
    this.sportsActivityService.getSportsActivities(this.activityParams).subscribe({
      next: (data: SportsActivityResult) => {
        console.log('✅ Received Sports Activities:', data);
        this.sportsActivities = data.results;
        this.totalResults = data.totalResults;
      },
      error: (err) => {
        console.error('❌ Error fetching sports activities:', err);
      }
    });
  }

  // ✅ Handle Pagination Change
  onPageChange(event: PageEvent) {
    this.activityParams.first = event.pageIndex * event.pageSize;
    this.activityParams.rows = event.pageSize;
    this.getAllSportsActivities();
  }

  // ✅ Open Add Activity Dialog
  openAddDialog() {
    const dialogRef = this.dialog.open(AddComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('✅ New Activity Added:', result);
        this.getAllSportsActivities(); // Refresh list after adding
      }
    });
  }

  // ✅ Open Edit Dialog
  openEditDialog(activity: SportActivityList) {
    const dialogRef = this.dialog.open(EditSportsActivityComponent, {
      width: '500px',
      data: activity,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('✅ Activity Updated:', result);
        this.getAllSportsActivities(); // Refresh the list after editing
      }
    });
  }

  // ✅ Delete Activity
  deleteActivity(activityId: number) {
    if (confirm('❌ Are you sure you want to delete this activity?')) {
      this.sportsActivityService.deleteSportsActivity(activityId).subscribe({
        next: () => {
          console.log(`🗑️ Deleted Activity ID: ${activityId}`);
          this.sportsActivities = this.sportsActivities.filter(activity => activity.id !== activityId);
        },
        error: (err) => {
          console.error('❌ Error deleting activity:', err);
        }
      });
    }
  }
  
  trackById(index: number, item: SportActivityList) {
    return item.id;
  }
}
