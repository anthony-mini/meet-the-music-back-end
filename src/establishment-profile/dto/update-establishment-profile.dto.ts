import { PartialType } from '@nestjs/mapped-types';
import { CreateEstablishmentProfileDto } from './create-establishment-profile.dto';

export class UpdateEstablishmentProfileDto extends PartialType(CreateEstablishmentProfileDto) {}
