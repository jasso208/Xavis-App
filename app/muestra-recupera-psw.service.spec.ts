import { TestBed } from '@angular/core/testing';

import { MuestraRecuperaPswService } from './muestra-recupera-psw.service';

describe('MuestraRecuperaPswService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MuestraRecuperaPswService = TestBed.get(MuestraRecuperaPswService);
    expect(service).toBeTruthy();
  });
});
