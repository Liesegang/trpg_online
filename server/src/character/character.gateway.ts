import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { CharacterService } from './character.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';

@WebSocketGateway()
export class CharacterGateway {
  constructor(private readonly characterService: CharacterService) {}

  @SubscribeMessage('createCharacter')
  create(@MessageBody() createCharacterDto: CreateCharacterDto) {
    return this.characterService.create(createCharacterDto);
  }

  @SubscribeMessage('findAllCharacter')
  findAll() {
    return this.characterService.findAll();
  }

  @SubscribeMessage('findOneCharacter')
  findOne(@MessageBody() id: number) {
    return this.characterService.findOne(id);
  }

  @SubscribeMessage('updateCharacter')
  update(@MessageBody() updateCharacterDto: UpdateCharacterDto) {
    return this.characterService.update(
      updateCharacterDto.id,
      updateCharacterDto,
    );
  }

  @SubscribeMessage('removeCharacter')
  remove(@MessageBody() id: number) {
    return this.characterService.remove(id);
  }
}
