import { TestBed, inject } from '@angular/core/testing';

import { HttpCollectorLbService } from './http-collector-lb.service';

describe('HttpCollectorLbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpCollectorLbService]
    });
  });

  it('should ...', inject([HttpCollectorLbService], (service: HttpCollectorLbService) => {
    expect(service).toBeTruthy();
  }));
});
