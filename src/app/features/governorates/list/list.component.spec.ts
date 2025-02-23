import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovernorateListComponent } from './list.component';

describe('ListComponent', () => {
  let component: GovernorateListComponent;
  let fixture: ComponentFixture<GovernorateListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GovernorateListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GovernorateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
