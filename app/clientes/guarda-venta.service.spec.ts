import { TestBed } from '@angular/core/testing';

import { GuardaVentaService } from './guarda-venta.service';

describe('GuardaVentaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GuardaVentaService = TestBed.get(GuardaVentaService);
    expect(service).toBeTruthy();
  });
});
