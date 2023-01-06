import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { NodeNetworkCardsService } from './node-network-cards.service';
import { ApiService } from '../../common/services/api.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateNodeRamStickDto } from '../node-ram-sticks/dto/create-node-ram-stick.dto';

@Controller('node-network-cards')
export class NodeNetworkCardsController {
  constructor(
    private readonly nodeNetworkCardsService: NodeNetworkCardsService,
    private readonly apiService: ApiService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createNodeRamStickDto: CreateNodeRamStickDto) {
    return await this.nodeNetworkCardsService.create(createNodeRamStickDto);
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

    return this.nodeNetworkCardsService.findAll(findOptions);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':uuid/get-latest')
  getLatest(@Param('uuid') nodeUuid: string) {
    return this.nodeNetworkCardsService.getLatest(nodeUuid);
  }
}
