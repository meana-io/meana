import { PartialType } from '@nestjs/swagger';
import { CreateNodeRamDto } from './create-node-ram.dto';

export class UpdateNodeRamDto extends PartialType(CreateNodeRamDto) {}
