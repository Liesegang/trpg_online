import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { Character } from './entities/character.entity';

@Injectable()
export class CharacterService {
  constructor(
    @Inject('CHARACTER_MODEL')
    private characterModel: Model<Character>,
  ) {}

  create(createCharacterDto: CreateCharacterDto) {
    const createdCharacter = new this.characterModel(createCharacterDto);
    return createdCharacter.save();
  }

  findAll() {
    return this.characterModel.find().exec();
  }

  findOne(id: number) {
    return this.characterModel.findOne({ id }).exec();
  }

  update(id: number, updateCharacterDto: UpdateCharacterDto) {
    return this.characterModel.updateOne({ id }, updateCharacterDto).exec();
  }

  remove(id: number) {
    return this.characterModel.findOneAndRemove({ id }).exec();
  }
}
