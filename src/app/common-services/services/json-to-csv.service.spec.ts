import { TestBed } from '@angular/core/testing';

import { JsonToCsvService } from './json-to-csv.service';

describe('JsonToCsvService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JsonToCsvService = TestBed.get(JsonToCsvService);
    expect(service).toBeTruthy();
  });
});
