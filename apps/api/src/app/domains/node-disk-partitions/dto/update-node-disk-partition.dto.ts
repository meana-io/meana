import { PartialType } from '@nestjs/mapped-types';
import { CreateNodeDiskPartitionDto } from './create-node-disk-partition.dto';

export class UpdateNodeDiskPartitionDto extends PartialType(
  CreateNodeDiskPartitionDto
) {}
