//
//
//      ┏┛ ┻━━━━━┛ ┻┓
//      ┃　　　　　　 ┃
//      ┃　　　━　　　┃
//      ┃　┳┛　  ┗┳　┃
//      ┃　　　　　　 ┃
//      ┃　　　┻　　　┃
//      ┃　　　　　　 ┃
//      ┗━┓　　　┏━━━┛
//        ┃　　　┃   神兽保佑
//        ┃　　　┃   代码无BUG！
//        ┃　　　┗━━━━━━━━━┓
//        ┃　　　　　　　    ┣┓
//        ┃　　　　         ┏┛
//        ┗━┓ ┓ ┏━━━┳ ┓ ┏━┛
//          ┃ ┫ ┫   ┃ ┫ ┫
//          ┗━┻━┛   ┗━┻━┛
//
//  Created by CharlesChen on 2023/12/16.

import { Type } from 'class-transformer';
import {
  IsNotEmpty, IsString, IsEnum,
  IsArray, ArrayMinSize, ValidateNested,
  IsNumber, Max, Min, IsOptional,
} from 'class-validator';

export enum Role {
  system    = 'system',
  user      = 'user',
  assistant = 'assistant',
}

export enum Model {
  gpt35 = 'gpt-3.5-turbo',
  gpt4  = 'gpt-4',
}

export class Message {
  @IsEnum(Role)
  readonly role: Role;

  @IsString()
  @IsNotEmpty()
  readonly content: string;
}

export class ChatBody {
  @IsString()
  @IsNotEmpty()
  readonly apikey: string;

  @IsEnum(Model)
  readonly model: Model;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => Message)
  readonly messages: Message[];

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(2)
  readonly temperature?: number;
}
