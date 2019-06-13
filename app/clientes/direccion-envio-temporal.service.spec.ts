import { TestBed } from '@angular/core/testing';

import { DireccionEnvioTemporalService } from './direccion-envio-temporal.service';

describe('DireccionEnvioTemporalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DireccionEnvioTemporalService = TestBed.get(DireccionEnvioTemporalService);
    expect(service).toBeTruthy();
  });
});
