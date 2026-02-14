import { TestBed } from '@angular/core/testing';
import { PriceCalculatorService } from './price-calculator.service';

describe('PriceCalculatorService', () => {
  let service: PriceCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PriceCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate price correctly for small tier', () => {
    const result = service.calculatePrice('1', 10); // Black Winter Truffle, 10g (Small tier)
    expect(result).toBeTruthy();
    expect(result?.truffle.name).toBe('Black Winter Truffle');
    expect(result?.sizeTier.name).toBe('Small'); // 0-20g range
    expect(result?.weight).toBe(10);
    // Average history for truffle 1: (85 + 90 + 95) / 3 = 90
    expect(result?.unitPrice).toBe(90);
    expect(result?.basePrice).toBe(90 * 10); // 90€/g * 10g = 900€
    expect(result?.multiplier).toBe(0.9); // Small tier multiplier
    expect(result?.totalPrice).toBe(900 * 0.9); // 900€ * 0.9 = 810€
  });

  it('should apply size tier multiplier', () => {
    const result = service.calculatePrice('1', 75); // Large tier (50-100g)
    expect(result).toBeTruthy();
    expect(result?.sizeTier.name).toBe('Large');
    expect(result?.multiplier).toBe(1.15);
    // Using unit price 90 from average
    expect(result?.totalPrice).toBe(90 * 75 * 1.15);
  });

  it('should return null for invalid truffle id', () => {
    const result = service.calculatePrice('999', 50);
    expect(result).toBeNull();
  });
});
