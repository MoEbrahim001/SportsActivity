import { TestBed } from '@angular/core/testing';

import { ParentchildserviceService } from './parentchildservice.service';

describe('ParentchildserviceService', () => {
  let service: ParentchildserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParentchildserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
