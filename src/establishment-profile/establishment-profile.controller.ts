import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EstablishmentProfileService } from './establishment-profile.service';
import { CreateEstablishmentProfileDto } from './dto/create-establishment-profile.dto';
import { UpdateEstablishmentProfileDto } from './dto/update-establishment-profile.dto';

@Controller('establishment-profile')
export class EstablishmentProfileController {
  constructor(
    private readonly establishmentProfileService: EstablishmentProfileService,
  ) {}

  @Post()
  create(@Body() createEstablishmentProfileDto: CreateEstablishmentProfileDto) {
    return this.establishmentProfileService.create(
      createEstablishmentProfileDto,
    );
  }

  @Get()
  findAll() {
    return this.establishmentProfileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.establishmentProfileService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEstablishmentProfileDto: UpdateEstablishmentProfileDto,
  ) {
    return this.establishmentProfileService.update(
      +id,
      updateEstablishmentProfileDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.establishmentProfileService.remove(+id);
  }
}
