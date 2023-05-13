import { TestBed } from '@angular/core/testing';

import { GetSourcesService } from './get-sources.service';

describe('GetSourcesService', () => {
  let service: GetSourcesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetSourcesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
