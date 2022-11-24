import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { NodeUsersService } from './node-users.service';
import { CreateNodeUserDto } from './dto/create-node-user.dto';
import { ApiService } from '../../common/services/api.service';

@Controller('node-users')
export class NodeUsersController {
  constructor(
    private readonly nodeUsersService: NodeUsersService,
    private readonly apiService: ApiService
  ) {}

  @Post()
  async create(@Body() createNodeUserDto: CreateNodeUserDto) {
    return await this.nodeUsersService.create(createNodeUserDto);
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

    return this.nodeUsersService.findAll(findOptions);
  }
}
