import { Module } from '@nestjs/common';
import { SocialMediaController } from './social-media.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocialMedia } from './entites/social-media.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SocialMedia])],
  controllers: [SocialMediaController],
})
export class SocialMediaModule {}
