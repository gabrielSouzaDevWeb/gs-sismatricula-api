import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class EnderecoService {
  private readonly logger = new Logger(EnderecoService.name);

  async viaCep(cep: string) {
    const clean = cep.replace(/\D/g, '');
    try {
      const url = `https://viacep.com.br/ws/${clean}/json/`;
      const { data } = await axios.get(url, { timeout: 5000 });
      if (data.erro) {
        return { error: 'CEP não encontrado', provider: 'viacep', status: 404 };
      }
      return { provider: 'viacep', data };
    } catch (error) {
      this.logger.error('ViaCEP error', error);
      return { error: 'Erro ao consultar ViaCEP', provider: 'viacep' };
    }
  }

  async brasilApi(cep: string) {
    const clean = cep.replace(/\D/g, '');
    try {
      const url = `https://brasilapi.com.br/api/cep/v1/${clean}`;
      const { data } = await axios.get(url, { timeout: 5000 });
      return { provider: 'brasilapi', data };
    } catch (error) {
      this.logger.error('BrasilAPI error', error);
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return { error: 'CEP não encontrado', provider: 'brasilapi', status: 404 };
      }
      return { error: 'Erro ao consultar BrasilAPI', provider: 'brasilapi' };
    }
  }
}
