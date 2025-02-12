import { Routes } from '@angular/router';
import { ListSportsActivitiesComponent } from '../../../SportsActivity/src/app/features/sportactivities/list/list.component';
import { AddComponent } from './features/sportactivities/add/add.component';
import { EditSportsActivityComponent } from './features/sportactivities/edit/edit.component';


export const appRoutes: Routes = [
  { path: '', component: ListSportsActivitiesComponent },
  { path: 'add', component: AddComponent },
  { path: 'edit/:id', component: EditSportsActivityComponent },
  
  // Redirect to list by default
];
