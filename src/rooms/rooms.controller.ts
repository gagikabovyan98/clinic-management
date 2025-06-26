import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/roles.enum';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  @Roles(Role.Staff)
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }

  @Get('available/:date')
  @Roles(Role.Staff)
  findAvailable(@Param('date') date: string) {
    return this.roomsService.findAvailableRooms(new Date(date));
  }

  @Get()
  @Roles(Role.Staff)
  findAll() {
    return this.roomsService.findAll();
  }

  @Get(':id')
  @Roles(Role.Staff)
  findOne(@Param('id') id: string) {
    return this.roomsService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.Staff)
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(+id, updateRoomDto);
  }

  @Delete(':id')
  @Roles(Role.Staff)
  remove(@Param('id') id: string) {
    return this.roomsService.remove(+id);
  }
}
