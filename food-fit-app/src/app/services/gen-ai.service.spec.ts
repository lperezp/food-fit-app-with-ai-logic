import { TestBed } from '@angular/core/testing';

import { GenAiService } from './gen-ai.service';

describe('GenAiService', () => {
  let service: GenAiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenAiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
