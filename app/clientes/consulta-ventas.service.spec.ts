import { TestBed } from '@angular/core/testing';

import { ConsultaVentasService } from './consulta-ventas.service';

describe('ConsultaVentasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConsultaVentasService = TestBed.get(ConsultaVentasService);
    expect(service).toBeTruthy();
  });
});
