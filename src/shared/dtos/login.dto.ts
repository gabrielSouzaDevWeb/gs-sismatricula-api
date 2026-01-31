import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsString({ message: 'O nome de usuário deve ser uma string válida' })
  @IsNotEmpty({ message: 'O nome de usuário é obrigatório' })
  username: string;

  @IsString({ message: 'A senha deve ser uma string válida' })
  @IsNotEmpty({ message: 'A senha é obrigatória' })
  password: string;
}
