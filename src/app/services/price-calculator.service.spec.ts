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
    expect(result?.basePrice).toBe(95 * 10); // $95/g * 10g = $950
    expect(result?.multiplier).toBe(0.9); // Small tier multiplier
    expect(result?.totalPrice).toBe(950 * 0.9); // $950 * 0.9 = $855
  });

  it('should apply size tier multiplier', () => {
    const result = service.calculatePrice('1', 75); // Large tier (50-100g)
    expect(result).toBeTruthy();
    expect(result?.sizeTier.name).toBe('Large');
    expect(result?.multiplier).toBe(1.15);
    expect(result?.totalPrice).toBe(95 * 75 * 1.15);
  });

  it('should return null for invalid truffle id', () => {
    const result = service.calculatePrice('999', 50);
    expect(result).toBeNull();
  });
});
