import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { NodeUsersService } from './node-users.service';
import { CreateNodeUserDto } from './dto/create-node-user.dto';
import { ApiService } from '../../common/services/api.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('node-users')
export class NodeUsersController {
  constructor(
    private readonly nodeUsersService: NodeUsersService,
    private readonly apiService: ApiService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createNodeUserDto: CreateNodeUserDto) {
    return await this.nodeUsersService.create(createNodeUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(
    @Query() requestQuery: any,
    @Query('fields')
    fields?: string,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
    @Query('sort') sort?: string[],
    @Query('search') search?: string
  ) {
    const findOptions = this.apiService.prepareGetManyOptions(
      requestQuery,
      fields,
      limit,
      offset,
      sort,
      search
    );

    return this.nodeUsersService.findAll(findOptions);
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-latest')
  getLatest(@Query('nodeUuid') nodeUuid: string) {
    return this.nodeUsersService.getLatest(nodeUuid);
  }
}
