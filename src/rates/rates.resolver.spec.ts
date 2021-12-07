import { Test, TestingModule } from '@nestjs/testing';
import { RatesResolver } from './rates.resolver';

describe('RatesResolver', () => {
  let resolver: RatesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RatesResolver],
    }).compile();

    resolver = module.get<RatesResolver>(RatesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
