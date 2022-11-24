import { PartialType } from '@nestjs/mapped-types';
import { CreateNodePackageDto } from './create-node_package.dto';

export class UpdateNodePackageDto extends PartialType(CreateNodePackageDto) {}
