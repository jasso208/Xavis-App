import { TestBed } from '@angular/core/testing';

import { RecuperaPswService } from './recupera-psw.service';

describe('RecuperaPswService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecuperaPswService = TestBed.get(RecuperaPswService);
    expect(service).toBeTruthy();
  });
});
