import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CnpjService {
  private readonly logger = new Logger(CnpjService.name);

  async brasilApi(cnpj: string) {
    const clean = cnpj.replace(/\D/g, '');
    try {
      const url = `https://brasilapi.com.br/api/cnpj/v1/${clean}`;
      const { data } = await axios.get(url, { timeout: 8000 });
      return { provider: 'brasilapi', data };
    } catch (error) {
      this.logger.error('BrasilAPI CNPJ error', error);
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return { error: 'CNPJ não encontrado', provider: 'brasilapi', status: 404 };
      }
      return { error: 'Erro ao consultar BrasilAPI', provider: 'brasilapi' };
    }
  }

  async receitaWs(cnpj: string) {
    const clean = cnpj.replace(/\D/g, '');
    try {
      const url = `https://www.receitaws.com.br/v1/cnpj/${clean}`;
      const { data } = await axios.get(url, { timeout: 8000 });
      if (data.status && data.status === 'ERROR') {
        return { error: 'CNPJ não encontrado', provider: 'receitaws', status: 404 };
      }
      return { provider: 'receitaws', data };
    } catch (error) {
      this.logger.error('ReceitaWS CNPJ error', error);
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return { error: 'CNPJ não encontrado', provider: 'receitaws', status: 404 };
      }
      return { error: 'Erro ao consultar ReceitaWS', provider: 'receitaws' };
    }
  }
}
