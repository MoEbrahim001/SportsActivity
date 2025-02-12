import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSportsActivityComponent } from './edit.component';

describe('EditComponent', () => {
  let component: EditSportsActivityComponent;
  let fixture: ComponentFixture<EditSportsActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSportsActivityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditSportsActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
