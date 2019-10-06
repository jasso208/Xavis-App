import { TestBed } from '@angular/core/testing';

import { CambiaPswTokenService } from './cambia-psw-token.service';

describe('CambiaPswTokenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CambiaPswTokenService = TestBed.get(CambiaPswTokenService);
    expect(service).toBeTruthy();
  });
});
