import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMemberTypeComponent } from './edit.component';

describe('EditComponent', () => {
  let component: EditMemberTypeComponent;
  let fixture: ComponentFixture<EditMemberTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditMemberTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditMemberTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
