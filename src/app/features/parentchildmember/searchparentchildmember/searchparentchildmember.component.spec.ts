import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchparentchildmemberComponent } from './searchparentchildmember.component';

describe('SearchparentchildmemberComponent', () => {
  let component: SearchparentchildmemberComponent;
  let fixture: ComponentFixture<SearchparentchildmemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchparentchildmemberComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchparentchildmemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
