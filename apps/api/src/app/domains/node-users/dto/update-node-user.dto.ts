import { PartialType } from '@nestjs/mapped-types';
import { CreateNodeUserDto } from './create-node-user.dto';

export class UpdateNodeUserDto extends PartialType(CreateNodeUserDto) {}
