import { TestBed } from '@angular/core/testing';

import { ValidaUsrLogueadoService } from './valida-usr-logueado.service';

describe('ValidaUsrLogueadoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ValidaUsrLogueadoService = TestBed.get(ValidaUsrLogueadoService);
    expect(service).toBeTruthy();
  });
});
