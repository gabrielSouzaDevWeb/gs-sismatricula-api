import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CnpjService } from './cnpj.service';

@ApiTags('CNPJ')
@Controller('cnpj')
export class CnpjController {
  constructor(private readonly cnpjService: CnpjService) {}

  @Get(':cnpj')
  @ApiOperation({ summary: 'Consultar CNPJ via BrasilAPI' })
  @ApiResponse({ status: 200, description: 'Dados retornados pela BrasilAPI' })
  async getBrasilApi(@Param('cnpj') cnpj: string) {
    return this.cnpjService.brasilApi(cnpj);
  }

  @Get('receitaws/:cnpj')
  @ApiOperation({ summary: 'Consultar CNPJ via ReceitaWS' })
  @ApiResponse({ status: 200, description: 'Dados retornados pela ReceitaWS' })
  async getReceitaWs(@Param('cnpj') cnpj: string) {
    return this.cnpjService.receitaWs(cnpj);
  }
}
