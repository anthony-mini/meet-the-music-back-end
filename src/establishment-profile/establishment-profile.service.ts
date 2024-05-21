import { Injectable } from '@nestjs/common';
import { CreateEstablishmentProfileDto } from './dto/create-establishment-profile.dto';
import { UpdateEstablishmentProfileDto } from './dto/update-establishment-profile.dto';

@Injectable()
export class EstablishmentProfileService {
  create(createEstablishmentProfileDto: CreateEstablishmentProfileDto) {
    return 'This action adds a new establishmentProfile';
  }

  findAll() {
    return `This action returns all establishmentProfile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} establishmentProfile`;
  }

  update(
    id: number,
    updateEstablishmentProfileDto: UpdateEstablishmentProfileDto,
  ) {
    return `This action updates a #${id} establishmentProfile`;
  }

  remove(id: number) {
    return `This action removes a #${id} establishmentProfile`;
  }
}
