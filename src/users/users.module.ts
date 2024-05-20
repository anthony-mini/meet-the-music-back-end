import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ArtistProfile } from 'src/artist-profile/entities/artist-profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, ArtistProfile])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
