import { PartialType } from '@nestjs/mapped-types';
import { CreateNodeRamStickDto } from './create-node-ram-stick.dto';

export class UpdateNodeRamStickDto extends PartialType(CreateNodeRamStickDto) {}
