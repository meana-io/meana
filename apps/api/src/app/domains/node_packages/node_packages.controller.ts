import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { NodePackagesService } from './node_packages.service';
import { CreateNodePackageDto } from './dto/create-node_package.dto';
import { ApiService } from '../../common/services/api.service';
import { NodePackageExtended } from '../../../../../../libs/shared/Types/NodePackageExtended';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('node-packages')
export class NodePackagesController {
  constructor(
    private readonly nodePackageService: NodePackagesService,
    private readonly apiService: ApiService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createNodePackageDto: CreateNodePackageDto) {
    return await this.nodePackageService.create(createNodePackageDto);
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

    return this.nodePackageService.findAll(findOptions);
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-latest')
  getLatest(@Query('nodeUuid') nodeUuid: string) {
    return this.nodePackageService.getLatest(nodeUuid);
  }

  @Post('set-latest/:nodeUuid')
  setLatest(
    @Param('nodeUuid') nodeUuid: string,
    @Body() packages: { packages: NodePackageExtended[] }
  ) {
    return this.nodePackageService.setLatest(nodeUuid, packages.packages);
  }
}
