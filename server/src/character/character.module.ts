import { Module } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CharacterGateway } from './character.gateway';
import { DatabaseModule } from '../database/database.module';
import { charactersProviders } from './character.providers';
import { CharacterController } from './character.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [CharacterController],
  providers: [CharacterGateway, CharacterService, ...charactersProviders],
})
export class CharacterModule {}
