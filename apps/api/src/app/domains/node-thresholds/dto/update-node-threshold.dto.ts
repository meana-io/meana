import { PartialType } from '@nestjs/mapped-types';
import { CreateNodeThresholdDto } from './create-node-threshold.dto';

export class UpdateNodeThresholdDto extends PartialType(CreateNodeThresholdDto) {}
