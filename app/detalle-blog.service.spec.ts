import { TestBed } from '@angular/core/testing';

import { DetalleBlogService } from './detalle-blog.service';

describe('DetalleBlogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DetalleBlogService = TestBed.get(DetalleBlogService);
    expect(service).toBeTruthy();
  });
});
