import { TestBed, inject } from '@angular/core/testing';

import { PioneerService } from './pioneer.service';

describe('PioneerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      pioneers: [PioneerService]
    });
  });

  it('should be created', inject([PioneerService], (service: PioneerService) => {
    expect(service).toBeTruthy();
  }));
});
