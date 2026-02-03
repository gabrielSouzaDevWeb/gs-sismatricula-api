# 📚 Guia de Execução - Migrations Many-to-Many

## Pré-requisitos

- NodeJS instalado
- Banco de dados MySQL/PostgreSQL rodando
- Variáveis de ambiente configuradas (`.env`)

## Estrutura de Migrations

As 3 migrations devem ser executadas **nesta ordem obrigatória**:

```
1738543200000-1-CreateEstudantesFiliacoesTable.ts    ← Cria tabela intermediária
         ↓
1738543300000-2-MigrateDataToEstudantesFiliacoes.ts  ← Migra dados antigos
         ↓
1738543400000-3-RemoveIdEstudanteFromFiliacoes.ts    ← Limpa modelo antigo
```

## Execução Prática

### 1️⃣ Verificar Migrations Pendentes

```bash
# Ver quais migrations faltam executar
npm run typeorm migration:show

# Saída esperada:
# [X] CreateEstudantesFiliacoesTable
# [X] MigrateDataToEstudantesFiliacoes
# [X] RemoveIdEstudanteFromFiliacoes
```

### 2️⃣ Executar Todas as Migrations

```bash
# Executar automaticamente na ordem correta
npm run typeorm migration:run

# Saída esperada:
# ✔ Migration CreateEstudantesFiliacoesTable1 has been executed successfully.
# ✔ Migration MigrateDataToEstudantesFiliacoes2 has been executed successfully.
# ✔ Migration RemoveIdEstudanteFromFiliacoes3 has been executed successfully.
```

### 3️⃣ Verificar Tabela Criada

```bash
# Conectar ao banco de dados
mysql -u user -p database_name

# Verificar estrutura da tabela
DESCRIBE estudantes_filiacoes;

# Saída esperada:
# +---------------+----------+------+-----+---------+----------------+
# | Field         | Type     | Null | Key | Default | Extra          |
# +---------------+----------+------+-----+---------+----------------+
# | id            | int      | NO   | PRI | NULL    | auto_increment |
# | id_estudante  | int      | NO   | MUL | NULL    |                |
# | id_filiacao   | int      | NO   | MUL | NULL    |                |
# | dt_criacao    | timestamp| NO   |     | now()   |                |
# | dt_atualizacao| timestamp| NO   |     | now()   | ON UPDATE now()| |
# | dt_deletado   | timestamp| YES  |     | NULL    |                |
# +---------------+----------+------+-----+---------+----------------+
```

### 4️⃣ Validar Dados Migrados

```bash
# Contar registros na tabela intermediária
SELECT COUNT(*) as total_vinculos FROM estudantes_filiacoes;

# Ver alguns vínculos
SELECT
  ef.id,
  ef.id_estudante,
  e.nome as nome_estudante,
  ef.id_filiacao,
  f.nome as nome_filiacao
FROM estudantes_filiacoes ef
JOIN estudantes e ON ef.id_estudante = e.id
JOIN filiacoes f ON ef.id_filiacao = f.id
LIMIT 10;

# Validar índices foram criados
SHOW INDEX FROM estudantes_filiacoes;

# Saída esperada:
# - IDX_ESTUDANTES_FILIACOES_ID_ESTUDANTE
# - IDX_ESTUDANTES_FILIACOES_ID_FILIACAO
# - IDX_ESTUDANTES_FILIACOES_UNIQUE (único)
```

### 5️⃣ Validar Coluna Removida

```bash
# Verificar que id_estudante foi removido de filiacoes
DESCRIBE filiacoes;

# ✅ Não deve aparecer id_estudante
# ❌ Se ainda existir, algo deu errado!
```

## 🔄 Se Precisar Reverter

### Reverter TODAS as 3 migrations

```bash
# Reverter na ordem inversa (automático)
npm run typeorm migration:revert
npm run typeorm migration:revert
npm run typeorm migration:revert
```

⚠️ **Aviso**: Isso pode causar perda de dados se houver novos registros!

### Reverter uma migration específica

```bash
# Se apenas a última falhou, reverter só ela
npm run typeorm migration:revert -- --from 1738543400000

# Depois ejecutar novamente
npm run typeorm migration:run -- --from 1738543400000
```

## 🚨 Troubleshooting

### Erro: "Foreign key constraint fails"

**Causa**: Tentou executar migration 3 antes da 2

**Solução**:

```bash
# Verificar ordem de execução
npm run typeorm migration:show

# Se estiver errada, reverter tudo e começar novamente
npm run typeorm migration:revert
npm run typeorm migration:revert
npm run typeorm migration:revert
npm run typeorm migration:run
```

### Erro: "Table estudantes_filiacoes doesn't exist"

**Causa**: A migration 1 não foi executada

**Solução**:

```bash
# Verificar se há migrations pendentes
npm run typeorm migration:show

# Executar migrations pendentes
npm run typeorm migration:run
```

### Erro: "Column id_estudante doesn't exist"

**Causa**: Migration 3 foi executada mas não havia coluna para remover

**Solução**: Isso é esperado se já estava em produção com modelo antigo

```sql
-- Verificar manualmente
SHOW COLUMNS FROM filiacoes LIKE 'id_estudante';

-- Se existir, remover manualmente (último recurso!)
ALTER TABLE filiacoes DROP FOREIGN KEY fk_filiacoes_estudantes;
ALTER TABLE filiacoes DROP COLUMN id_estudante;
```

### Erro: "Migration timeout"

**Causa**: Banco de dados muito grande, a migração demora

**Solução**:

```bash
# Aumentar timeout no comando
# Editar script no package.json ou executar diretamente:
npm run typeorm migration:run -- --timeout 60000
```

## ✅ Checklist Pós-Execução

- [ ] Todas 3 migrations executadas com sucesso
- [ ] Tabela `estudantes_filiacoes` criada
- [ ] Dados da relação antiga migrados
- [ ] Coluna `id_estudante` removida de `filiacoes`
- [ ] Índices criados corretamente
- [ ] Foreign keys validadas
- [ ] Soft delete funcionando
- [ ] Aplicação inicia sem erros
- [ ] Testes de matrícula passando
- [ ] Dados integros no banco

## 🎯 Próximos Passos

1. Executar migrations
2. Testar endpoints (ver EXEMPLOS_USO.md)
3. Validar integridade de dados
4. Deploy em produção
5. Monitorar logs para erros

## 📞 Suporte

Se encontrar problemas:

1. Verificar logs da aplicação
2. Consultar documentação: `REFATORACAO_MANY_TO_MANY.md`
3. Verificar exemplos: `EXEMPLOS_USO.md`
4. Reverter migrations e recomeçar em caso de erro crítico

---

**Última atualização**: 02/02/2026
**Versão**: 1.0
**Status**: ✅ Pronto para Produção
