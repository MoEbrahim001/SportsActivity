import { Routes } from '@angular/router';
import { ListSportsActivitiesComponent } from '../../../SportsActivity/src/app/features/sportactivities/list/list.component';
import { AddComponent } from './features/sportactivities/add/add.component';
import { EditSportsActivityComponent } from './features/sportactivities/edit/edit.component';
import { AddComponentMember } from './features/membertypes/add/add.component';
import { ListComponent } from './features/membertypes/list/list.component';
import { EditMemberTypeComponent } from './features/membertypes/edit/edit.component';

export const appRoutes: Routes = [
  { path: '', component: ListSportsActivitiesComponent },
  { path: 'add', component: AddComponent },
  { path: 'edit/:id', component: EditSportsActivityComponent },
  {path : 'add-member-type', component: AddComponentMember},
  {path: 'view' , component:ListComponent},
  {path : 'edit/:id', component:EditMemberTypeComponent}
  
  // Redirect to list by default
];
