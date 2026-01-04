# Configuração de Segurança Cloudflare WAF

Configure as seguintes regras no **Cloudflare WAF** (Security > WAF > Custom rules):

## 1. Bloqueio de Tráfego Fora do Brasil

```
Rule Name: Bloquear tráfego fora do Brasil
Expression: (ip.geoip.country ne "BR")
Action: Block
```

## 2. Bloquear Scanners e User-Agents Maliciosos

```
Rule Name: Bloquear scanners e bots maliciosos
Expression:
  (http.user_agent contains "sqlmap") or
  (http.user_agent contains "nmap") or
  (http.user_agent contains "nikto") or
  (http.user_agent contains "masscan") or
  (http.user_agent contains "curl") or
  (http.user_agent contains "wget") or
  (http.user_agent contains "python-requests") or
  (http.user_agent contains "scrapy")
Action: Block
```

## 3. Proteger Endpoints Sensíveis (Rate Limiting)

```
Rule Name: Rate limit em endpoints sensíveis
Expression:
  (http.request.uri.path contains "/login") or
  (http.request.uri.path contains "/auth") or
  (http.request.uri.path contains "/admin") or
  (http.request.uri.path contains "/api/matricula/create")
Action: Managed Challenge
Rate: 10 requests per 10 seconds
```

## 4. Bloquear Acesso Direto por IP

```
Rule Name: Bloquear acesso direto por IP
Expression: (not http.host contains "gabrielsouzadevweb.com.br")
Action: Block
```

## 5. Proteção DDoS (Ativar)

- **Security** > **DDoS** > Ativar proteção HTTP DDoS
- **Security** > **Bots** > Ativar Bot Fight Mode

## 6. SSL/TLS (Configurar)

- **SSL/TLS** > **Overview** > Modo: **Full (strict)**
- **SSL/TLS** > **Edge Certificates** > Ativar:
  - Always Use HTTPS
  - HTTP Strict Transport Security (HSTS)
  - Minimum TLS Version: TLS 1.2

## 7. Firewall Rules (Adicional)

```
Rule Name: Bloquear países de alto risco
Expression: (ip.geoip.country in {"CN" "RU" "KP" "IR"})
Action: Block
```

## Guards NestJS (Implementados)

Os seguintes guards foram implementados no código como **segunda camada de defesa**:

1. **GeoBlockGuard**: Valida header `CF-IPCountry` (Cloudflare)
2. **UserAgentGuard**: Bloqueia user-agents maliciosos
3. **HostnameGuard**: Valida hostname permitido

**Aplicação**: Guards aplicados globalmente em todos os endpoints.

## Monitoramento

- **Security** > **Events** para visualizar bloqueios e tentativas de ataque
- **Analytics & Logs** > **Security Analytics** para métricas detalhadas
- Configure alertas por email para eventos críticos

## Observações

⚠️ **Ambiente Local**: Os guards NestJS permitem requisições locais (localhost/127.0.0.1) automaticamente.

⚠️ **Cloudflare WAF**: Configurações do Cloudflare têm precedência e bloqueiam antes de chegar na API (mais eficiente).

⚠️ **User-Agent curl**: Se você usa curl para testes, precisa adicionar um user-agent customizado:

```bash
curl -H "User-Agent: Mozilla/5.0" https://api.gabrielsouzadevweb.com.br/api/estudante
```
