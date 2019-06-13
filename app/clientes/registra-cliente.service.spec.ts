import { TestBed } from '@angular/core/testing';

import { RegistraClienteService } from './registra-cliente.service';

describe('RegistraClienteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegistraClienteService = TestBed.get(RegistraClienteService);
    expect(service).toBeTruthy();
  });
});
