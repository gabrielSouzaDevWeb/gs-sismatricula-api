# Refatoração: Relacionamento Many-to-Many entre Estudante e Filiação

## 📋 Resumo das Alterações

Este documento descreve as mudanças realizadas para transformar o relacionamento entre **Estudante** e **Filiação** de **One-to-Many** (1:N) para **Many-to-Many** (N:N).

## 🗂️ Estrutura Criada

### 1. Nova Entidade Intermediária

- **Arquivo**: `src/shared/infrastructure/entities/estudante-filiacao.entity.ts`
- **Tabela**: `estudantes_filiacoes`
- **Propósito**: Gerenciar o relacionamento N:N entre estudantes e filiações

### 2. Migrations (Ordem de Execução)

#### Migration 1: `1738543200000-1-CreateEstudantesFiliacoesTable.ts`

Cria a tabela intermediária com:

- Foreign keys para `estudantes` e `filiacoes`
- Índices para performance
- Índice único para evitar vínculos duplicados

#### Migration 2: `1738543300000-2-MigrateDataToEstudantesFiliacoes.ts`

Migra dados existentes:

- SELECT + INSERT dos relacionamentos antigos para a nova tabela
- Preserva timestamps e soft deletes

#### Migration 3: `1738543400000-3-RemoveIdEstudanteFromFiliacoes.ts`

Remove o modelo antigo:

- Remove a foreign key `id_estudante` de `filiacoes`
- Remove a coluna `id_estudante` da tabela `filiacoes`

## 📝 Entidades Atualizadas

### Estudante

```typescript
// Antes
@OneToMany(() => Filiacao, (filiacao) => filiacao.estudante)
filiacoes: Filiacao[];

// Depois
@OneToMany(() => EstudanteFiliacao, (estudanteFiliacao) => estudanteFiliacao.estudante)
estudantesFiliacoes: EstudanteFiliacao[];
```

### Filiação

```typescript
// Antes
@ManyToOne(() => Estudante, (estudante) => estudante.filiacoes)
@JoinColumn({ name: 'id_estudante' })
estudante: Estudante;

@Column({ type: 'int', name: 'id_estudante' })
idEstudante: number;

// Depois
@OneToMany(() => EstudanteFiliacao, (estudanteFiliacao) => estudanteFiliacao.filiacao)
estudantesFiliacoes: EstudanteFiliacao[];
```

## 🔧 Services Atualizados

### MatriculaService

✅ **Método `create`**: Agora cria vínculos na tabela `estudantes_filiacoes` automaticamente
✅ **Método `update`**: Gerencia vínculos ao adicionar novas filiações
✅ **Relations**: Atualizadas para `estudantesFiliacoes: { filiacao: true }`

### EstudanteService

✅ **Relations**: Atualizadas em todos os métodos para usar `estudantesFiliacoes: { filiacao: true }`

### FiliacaoService

✅ **Relations**: Atualizadas em todos os métodos para usar `estudantesFiliacoes: { estudante: true }`
✅ **Método `createComVinculo`**: Novo método para criar filiação já vinculada a um estudante

### EstudanteFiliacaoService (NOVO)

Service dedicado para gerenciar vínculos:

- `vincularEstudanteAFiliacao(idEstudante, idFiliacao)` - Cria vínculo
- `desvincularEstudanteDeFiliacao(idEstudante, idFiliacao)` - Remove vínculo
- `findFiliacoesByEstudante(idEstudante)` - Lista filiações de um estudante
- `findEstudantesByFiliacao(idFiliacao)` - Lista estudantes de uma filiação
- `verificarVinculo(idEstudante, idFiliacao)` - Verifica se vínculo existe

## 📦 DTOs Atualizados

### Removido `idEstudante` de:

- ✅ `CreateFiliacaoDto`
- ✅ `UpdateFiliacaoDto`

### Novos DTOs:

- ✅ `VincularEstudanteFiliacaoDto` - Para vincular estudantes a filiações
- ✅ `CriarFiliacaoComVinculoDto` - Para criar filiação com vínculo

## 🎯 Como Usar

### Criar Matrícula (Funciona igual a antes!)

```typescript
POST /matricula/create
{
  "estudante": {
    "nome": "João Silva",
    "sexo": "M",
    // ... outros campos
  },
  "filiacoes": [
    {
      "nome": "Maria Silva",
      "celular": "11999999999",
      "isResponsavelPagamento": true
    },
    {
      "nome": "José Silva",
      "celular": "11988888888"
    }
  ],
  "idTurno": 1,
  "anoLetivo": 2026
}
```

**O service automaticamente cria os vínculos na tabela intermediária!**

### Criar Filiação com Vínculo

```typescript
// No FiliacaoService
await filiacaoService.createComVinculo(
  {
    nome: 'Ana Costa',
    celular: '11977777777',
  },
  idEstudante, // ID do estudante existente
);
```

### Gerenciar Vínculos Manualmente

```typescript
// Vincular estudante a filiação
await estudanteFiliacaoService.vincularEstudanteAFiliacao(
  idEstudante,
  idFiliacao,
);

// Desvincular
await estudanteFiliacaoService.desvincularEstudanteDeFiliacao(
  idEstudante,
  idFiliacao,
);

// Listar filiações de um estudante
const result =
  await estudanteFiliacaoService.findFiliacoesByEstudante(idEstudante);

// Listar estudantes de uma filiação
const result =
  await estudanteFiliacaoService.findEstudantesByFiliacao(idFiliacao);
```

## 🚀 Executando as Migrations

```bash
# Executar todas as migrations
npm run typeorm migration:run

# Reverter se necessário
npm run typeorm migration:revert
```

## ⚠️ Pontos Importantes

1. **Controllers não foram alterados** - A API permanece com a mesma interface
2. **Retrocompatibilidade** - Os dados antigos são migrados automaticamente
3. **Soft Delete** - A tabela intermediária suporta soft delete
4. **Índices** - Performance otimizada com índices adequados
5. **Validações** - Evita vínculos duplicados com índice único

## 🔮 Campos Futuros

A entidade `EstudanteFiliacao` está preparada para receber novos campos, como:

- Tipo de relação (pai, mãe, responsável legal, etc.)
- Data de início do vínculo
- Data de término do vínculo
- Prioridade de contato
- Etc.

Basta adicionar as colunas na entidade e criar uma nova migration!

## 📊 Estrutura do Banco de Dados

```
estudantes
├── id (PK)
├── nome
└── ...

estudantes_filiacoes (NOVA TABELA)
├── id (PK)
├── id_estudante (FK → estudantes.id)
├── id_filiacao (FK → filiacoes.id)
├── dt_criacao
├── dt_atualizacao
└── dt_deletado
└── UNIQUE INDEX (id_estudante, id_filiacao)

filiacoes
├── id (PK)
├── nome
├── celular
└── ...
└── ❌ id_estudante (REMOVIDO)
```

## ✅ Checklist de Conclusão

- [x] Entidade intermediária criada
- [x] Migrations criadas (criação, migração de dados, limpeza)
- [x] Entidades Estudante e Filiação atualizadas
- [x] MatriculaService ajustado
- [x] EstudanteService ajustado
- [x] FiliacaoService ajustado
- [x] EstudanteFiliacaoService criado
- [x] DTOs ajustados
- [x] Módulos atualizados
- [x] Controllers mantidos inalterados
- [x] Documentação criada

## 🎉 Resultado Final

O sistema agora suporta múltiplos estudantes por filiação e múltiplas filiações por estudante, mantendo total retrocompatibilidade com o código existente!
