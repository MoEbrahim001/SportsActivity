import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchmemberComponent } from './searchmember.component';

describe('SearchmemberComponent', () => {
  let component: SearchmemberComponent;
  let fixture: ComponentFixture<SearchmemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchmemberComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchmemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
