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

  it('should handle boundary weights correctly (weight at boundary goes to next tier)', () => {
    // At 20g boundary: goes to Medium (inclusive minWeight)
    const tierAt20 = service.getSizeTierForWeight(20);
    expect(tierAt20?.name).toBe('Medium');

    // At 50g boundary: goes to Large
    const tierAt50 = service.getSizeTierForWeight(50);
    expect(tierAt50?.name).toBe('Large');

    // At 100g boundary: goes to Extra Large
    const tierAt100 = service.getSizeTierForWeight(100);
    expect(tierAt100?.name).toBe('Extra Large');
  });
});
