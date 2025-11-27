import { TestBed } from '@angular/core/testing';
import { TruffleService } from './truffle.service';

describe('TruffleService', () => {
  let service: TruffleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TruffleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have initial truffles', () => {
    expect(service.truffles().length).toBeGreaterThan(0);
  });

  it('should get truffle by id', () => {
    const truffle = service.getTruffleById('1');
    expect(truffle).toBeTruthy();
    expect(truffle?.name).toBe('Black Winter Truffle');
  });

  it('should return undefined for non-existent truffle', () => {
    const truffle = service.getTruffleById('999');
    expect(truffle).toBeUndefined();
  });
});
