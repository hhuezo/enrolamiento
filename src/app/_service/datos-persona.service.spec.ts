import { TestBed } from '@angular/core/testing';

import { DatosPersonaService } from './datos-persona.service';

describe('DatosPersonaService', () => {
  let service: DatosPersonaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosPersonaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
