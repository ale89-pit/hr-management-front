import { TestBed } from '@angular/core/testing';

import { NationalityServiceService } from './form-employee/nationality-service.service';

describe('NationalityServiceService', () => {
  let service: NationalityServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NationalityServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
