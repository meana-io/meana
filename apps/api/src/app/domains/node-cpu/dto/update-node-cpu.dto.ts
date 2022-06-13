import { PartialType } from '@nestjs/swagger';
import { CreateNodeCpuDto } from './create-node-cpu.dto';

export class UpdateNodeCpuDto extends PartialType(CreateNodeCpuDto) {}
