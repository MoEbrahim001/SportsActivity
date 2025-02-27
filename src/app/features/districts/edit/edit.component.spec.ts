import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditdistrictComponent } from './edit.component';

describe('EditdistrictComponent', () => {
  let component: EditdistrictComponent;
  let fixture: ComponentFixture<EditdistrictComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditdistrictComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditdistrictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
