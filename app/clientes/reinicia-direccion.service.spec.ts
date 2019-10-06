import { TestBed } from '@angular/core/testing';

import { ReiniciaDireccionService } from './reinicia-direccion.service';

describe('ReiniciaDireccionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReiniciaDireccionService = TestBed.get(ReiniciaDireccionService);
    expect(service).toBeTruthy();
  });
});
