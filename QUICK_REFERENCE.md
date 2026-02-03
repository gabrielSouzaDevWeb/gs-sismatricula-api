# 🚀 Quick Reference - Mudanças Many-to-Many

## Alterações Realizadas

### ✅ Entidades

- `src/shared/infrastructure/entities/estudante-filiacao.entity.ts` (**NOVA**)
- `src/shared/infrastructure/entities/estudante.entity.ts` (**ATUALIZADO**)
- `src/shared/infrastructure/entities/filiacao.entity.ts` (**ATUALIZADO**)

### ✅ Migrations (Executar nesta ordem)

```bash
1738543200000-1-CreateEstudantesFiliacoesTable.ts
1738543300000-2-MigrateDataToEstudantesFiliacoes.ts
1738543400000-3-RemoveIdEstudanteFromFiliacoes.ts
```

### ✅ Services

- `src/matricula/matricula.service.ts` (**ATUALIZADO**)
- `src/estudante/estudante.service.ts` (**ATUALIZADO**)
- `src/filiacao/filiacao.service.ts` (**ATUALIZADO** + novo método `createComVinculo`)
- `src/shared/services/estudante-filiacao.service.ts` (**NOVO**)

### ✅ DTOs

- `src/shared/dtos/create-filiacao.dto.ts` (**ATUALIZADO** - removido `idEstudante`)
- `src/shared/dtos/update-filiacao.dto.ts` (**ATUALIZADO** - removido `idEstudante`)
- `src/shared/dtos/vincular-estudante-filiacao.dto.ts` (**NOVO**)

### ✅ Módulos

- `src/shared/infrastructure/infrastructure.module.ts` (**ATUALIZADO** - adicionado EstudanteFiliacaoService)

### ✅ Controllers

- ✨ **NENHUM CONTROLLER FOI ALTERADO!**

## O que muda para o desenvolvedor?

### Criação de Matrícula (IDÊNTICO!)

```typescript
// Continua funcionando igual
POST /matricula/create
{
  "estudante": { ... },
  "filiacoes": [ ... ]
}
// O service automaticamente cria os vínculos!
```

### Novo: Gerenciar Vínculos Manualmente

```typescript
// Novo método no FiliacaoService
filiacaoService.createComVinculo(filiacaoData, idEstudante);

// Novo service: EstudanteFiliacaoService
estudanteFiliacaoService.vincularEstudanteAFiliacao(idEst, idFil);
estudanteFiliacaoService.desvincularEstudanteDeFiliacao(idEst, idFil);
estudanteFiliacaoService.findFiliacoesByEstudante(idEst);
estudanteFiliacaoService.findEstudantesByFiliacao(idFil);
```

## ⚡ Roadmap Futuro

A tabela `estudantes_filiacoes` está pronta para adicionar:

- Tipo de relação (pai, mãe, responsável legal)
- Prioridade de contato
- Data de início/fim do vínculo
- E mais!

Basta adicionar coluna na entidade e criar migration!

## 🔍 Validações Implementadas

✅ Índice único evita vínculos duplicados
✅ Foreign keys com CASCADE delete/update
✅ Soft delete suportado
✅ Tratamento de erro se responsável de pagamento não existir
✅ Transações garantem consistência

## 🧪 Como Testar

```bash
# 1. Executar migrations
npm run typeorm migration:run

# 2. Testar endpoint de matrícula (sem mudanças!)
POST /matricula/create

# 3. Testar novo método
GET /filiacao/get-one-by-id/:id
# Resposta inclui estudantesFiliacoes[].estudante

# 4. Testar service diretamente (em código)
await estudanteFiliacaoService.findFiliacoesByEstudante(1);
```

## 📋 Checklist antes de deploy

- [ ] Executar todas as migrations em DEV
- [ ] Testar criação de matrícula
- [ ] Testar leitura de estudante com filiações
- [ ] Testar leitura de filiação com estudantes
- [ ] Testar atualização de matrícula com novas filiações
- [ ] Verificar integridade de dados no BD
- [ ] Validar índices foram criados: `SHOW INDEX FROM estudantes_filiacoes;`
