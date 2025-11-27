import { TestBed } from '@angular/core/testing';
import { SizeTierService } from './size-tier.service';

describe('SizeTierService', () => {
  let service: SizeTierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SizeTierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have initial size tiers', () => {
    expect(service.sizeTiers().length).toBeGreaterThan(0);
  });

  it('should get correct size tier for small weight', () => {
    const tier = service.getSizeTierForWeight(10);
    expect(tier).toBeTruthy();
    expect(tier?.name).toBe('Small');
  });

  it('should get correct size tier for medium weight', () => {
    const tier = service.getSizeTierForWeight(30);
    expect(tier).toBeTruthy();
    expect(tier?.name).toBe('Medium');
  });

  it('should get correct size tier for large weight', () => {
    const tier = service.getSizeTierForWeight(75);
    expect(tier).toBeTruthy();
    expect(tier?.name).toBe('Large');
  });

  it('should get correct size tier for premium weight', () => {
    const tier = service.getSizeTierForWeight(250);
    expect(tier).toBeTruthy();
    expect(tier?.name).toBe('Premium');
  });
});
