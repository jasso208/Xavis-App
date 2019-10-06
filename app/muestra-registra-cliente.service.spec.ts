import { TestBed } from '@angular/core/testing';

import { MuestraRegistraClienteService } from './muestra-registra-cliente.service';

describe('MuestraRegistraClienteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MuestraRegistraClienteService = TestBed.get(MuestraRegistraClienteService);
    expect(service).toBeTruthy();
  });
});
