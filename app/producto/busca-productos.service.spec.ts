import { TestBed } from '@angular/core/testing';

import { BuscaProductosService } from './busca-productos.service';

describe('BuscaProductosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BuscaProductosService = TestBed.get(BuscaProductosService);
    expect(service).toBeTruthy();
  });
});
