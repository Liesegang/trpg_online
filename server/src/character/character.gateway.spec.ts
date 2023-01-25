import { Test, TestingModule } from '@nestjs/testing';
import { CharacterGateway } from './character.gateway';
import { CharacterService } from './character.service';

describe('CharacterGateway', () => {
  let gateway: CharacterGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CharacterGateway, CharacterService],
    }).compile();

    gateway = module.get<CharacterGateway>(CharacterGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
