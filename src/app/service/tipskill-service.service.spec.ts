import { TestBed } from '@angular/core/testing';

import { TipskillServiceService } from './tipskill-service.service';

describe('TipskillServiceService', () => {
  let service: TipskillServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipskillServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
