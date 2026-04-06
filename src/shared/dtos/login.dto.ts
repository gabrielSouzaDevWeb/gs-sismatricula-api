import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Nome de usuário para autenticação',
    example: 'admin',
  })
  @IsString({ message: 'O nome de usuário deve ser uma string válida' })
  @IsNotEmpty({ message: 'O nome de usuário é obrigatório' })
  username: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: 'senha_forte_123',
  })
  @IsString({ message: 'A senha deve ser uma string válida' })
  @IsNotEmpty({ message: 'A senha é obrigatória' })
  password: string;
}
