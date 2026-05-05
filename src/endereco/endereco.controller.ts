import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EnderecoService } from './endereco.service';

@ApiTags('Endereço')
@Controller('cep')
export class EnderecoController {
  constructor(private readonly enderecoService: EnderecoService) {}

  @Get(':cep')
  @ApiOperation({ summary: 'Consultar CEP via ViaCEP' })
  @ApiResponse({ status: 200, description: 'Dados retornados pelo ViaCEP' })
  async getViaCep(@Param('cep') cep: string) {
    return this.enderecoService.viaCep(cep);
  }

  @Get('brasilapi/:cep')
  @ApiOperation({ summary: 'Consultar CEP via BrasilAPI' })
  @ApiResponse({ status: 200, description: 'Dados retornados pela BrasilAPI' })
  async getBrasilApi(@Param('cep') cep: string) {
    return this.enderecoService.brasilApi(cep);
  }
}
