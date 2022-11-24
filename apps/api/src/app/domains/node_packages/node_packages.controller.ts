import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { NodePackagesService } from './node_packages.service';
import { CreateNodePackageDto } from './dto/create-node_package.dto';
import { ApiService } from '../../common/services/api.service';

@Controller('node-packages')
export class NodePackagesController {
  constructor(
    private readonly nodePackageService: NodePackagesService,
    private readonly apiService: ApiService
  ) {}

  @Post()
  async create(@Body() createNodePackageDto: CreateNodePackageDto) {
    return await this.nodePackageService.create(createNodePackageDto);
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

    return this.nodePackageService.findAll(findOptions);
  }
}
