import { IsArray, IsEnum, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export enum Role {
  SYSTEM = 'system',
  USER = 'user',
  Assistant = 'assistant'
}

export class MessageDto {
  @IsEnum(Role)
  role: Role;

  @IsString()
  content: string;
}

export class ChatRequestDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MessageDto)
  messages: MessageDto[];
}
