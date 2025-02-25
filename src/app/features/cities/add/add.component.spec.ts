import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCityComponent } from './add.component';

describe('AddComponent', () => {
  let component: AddCityComponent;
  let fixture: ComponentFixture<AddCityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
