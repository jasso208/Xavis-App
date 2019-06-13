import { TestBed } from '@angular/core/testing';

import { DireccionEnvioService } from './direccion-envio.service';

describe('DireccionEnvioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DireccionEnvioService = TestBed.get(DireccionEnvioService);
    expect(service).toBeTruthy();
  });
});
