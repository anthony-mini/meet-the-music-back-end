import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from './enums/role.enum';
import { Roles } from '../auth/security/roles.decorator';
import { RolesGuard } from '../auth/security/roles.guard';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';

@Controller('users')
@UseGuards(ThrottlerGuard) // Limit the number of requests globally
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @UseGuards(RolesGuard)
  // @Roles(Role.ADMIN)
  @Post()
  @Throttle({ default: { limit: 5, ttl: 300 } }) // Override the global limit
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ARTIST, Role.PROMOTER, Role.USER)
  @Get()
  findAll(@Query('limit') limit: number) {
    return this.usersService.findAll(limit);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ARTIST, Role.PROMOTER, Role.USER)
  @Get('search/:query')
  searchUsers(@Param('query') query: string) {
    return this.usersService.searchUsers(query);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Get('email/:email')
  findByEmail(@Param('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
