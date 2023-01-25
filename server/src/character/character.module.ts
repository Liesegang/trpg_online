import { Module } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CharacterGateway } from './character.gateway';

@Module({
  providers: [CharacterGateway, CharacterService]
})
export class CharacterModule {}
