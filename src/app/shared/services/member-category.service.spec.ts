import { TestBed } from '@angular/core/testing';

import { MemberCategoryService } from './member-category.service';

describe('MemberCategoryService', () => {
  let service: MemberCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemberCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
