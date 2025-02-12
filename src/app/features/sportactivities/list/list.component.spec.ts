import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSportsActivitiesComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListSportsActivitiesComponent;
  let fixture: ComponentFixture<ListSportsActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListSportsActivitiesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListSportsActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
