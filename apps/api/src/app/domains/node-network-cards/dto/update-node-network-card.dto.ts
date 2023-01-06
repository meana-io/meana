import { PartialType } from '@nestjs/mapped-types';
import { CreateNodeNetworkCardDto } from './create-node-network-card.dto';

export class UpdateNodeNetworkCardDto extends PartialType(CreateNodeNetworkCardDto) {}
