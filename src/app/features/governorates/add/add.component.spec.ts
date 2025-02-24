import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGovernorateComponent } from './add.component';

describe('AddComponent', () => {
  let component: AddGovernorateComponent;
  let fixture: ComponentFixture<AddGovernorateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddGovernorateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddGovernorateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
