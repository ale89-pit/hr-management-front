import { TestBed } from '@angular/core/testing';

import { CompetenzeServiceService } from './competenze-service.service';

describe('CompetenzeServiceService', () => {
  let service: CompetenzeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompetenzeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
