import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddistrictComponent } from './add.component';

describe('AdddistrictComponent', () => {
  let component: AdddistrictComponent;
  let fixture: ComponentFixture<AdddistrictComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdddistrictComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdddistrictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
