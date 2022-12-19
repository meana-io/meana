import { PartialType } from '@nestjs/swagger';
import { CreateNodeDeviceDto } from './create-node-device.dto';

export class UpdateNodeDeviceDto extends PartialType(CreateNodeDeviceDto) {}
