import { TestBed } from '@angular/core/testing';

import { HuellaService } from './huella.service';

describe('HuellaService', () => {
  let service: HuellaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HuellaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
