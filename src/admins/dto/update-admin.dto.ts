import { InputType, PartialType } from '@nestjs/graphql';
import { CreateAdminInput } from './create-admin.dto';

@InputType()
export class UpdateAdminDto extends PartialType(CreateAdminInput) {}
