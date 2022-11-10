import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiService } from '../../common/services/api.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly apiService: ApiService
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  findAll(
    @Query('fields')
    fields?: string,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
    @Query('sort') sort?: string[],
    @Query('search') search?: string
  ) {
    const findOptions = this.apiService.prepareGetManyOptions(
      fields,
      limit,
      offset,
      sort,
      search
    );

    return this.usersService.findAll(findOptions);
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.usersService.findOne(uuid);
  }

  @Patch(':uuid')
  update(@Param('uuid') uuid: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(uuid, updateUserDto);
  }

  @Delete(':uuid')
  remove(@Param('uuid') uuid: string) {
    return this.usersService.deleteOne(uuid);
  }
}
