import { PartialType } from '@nestjs/mapped-types';
import { CreateNodeDiskDto } from './create-node-disk.dto';

export class UpdateNodeDiskDto extends PartialType(CreateNodeDiskDto) {}
