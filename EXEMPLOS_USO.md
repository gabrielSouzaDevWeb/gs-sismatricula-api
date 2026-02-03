// Exemplo de Testes - Many-to-Many Estudante-Filiacao

// ============================================
// 1. CRIAÇÃO DE MATRÍCULA (Sem mudanças!)
// ============================================

// Request
POST /matricula/create
{
"estudante": {
"nome": "João Silva Santos",
"dataNascimento": "2015-05-15",
"sexo": "M",
"serie": "5º ano",
"escola": "EMEF Exemplo",
"numeroContato": "11999999999"
},
"filiacoes": [
{
"nome": "Maria Silva",
"dataNascimento": "1990-03-20",
"cpf": "12345678900",
"celular": "11999999999",
"email": "maria@example.com",
"isResponsavelPagamento": true // ✅ Uma filiação é responsável
},
{
"nome": "José Silva",
"dataNascimento": "1988-07-10",
"cpf": "98765432100",
"celular": "11988888888",
"profissao": "Engenheiro"
}
],
"idTurno": 1,
"anoLetivo": 2026,
"valorMensalidade": 250.00
}

// Response (com os novos relacionamentos)
{
"message": "Matrícula criada com sucesso",
"data": {
"id": 1,
"estudante": {
"id": 1,
"nome": "João Silva Santos",
"estudantesFiliacoes": [
{
"id": 1,
"idEstudante": 1,
"idFiliacao": 1,
"filiacao": {
"id": 1,
"nome": "Maria Silva",
"celular": "11999999999",
"email": "maria@example.com"
}
},
{
"id": 2,
"idEstudante": 1,
"idFiliacao": 2,
"filiacao": {
"id": 2,
"nome": "José Silva",
"celular": "11988888888"
}
}
]
}
}
}

// ============================================
// 2. BUSCAR ESTUDANTE COM SUAS FILIAÇÕES
// ============================================

GET /estudante/1

// Response
{
"message": "Estudante recuperado com sucesso",
"data": {
"id": 1,
"nome": "João Silva Santos",
"estudantesFiliacoes": [
{
"id": 1,
"idEstudante": 1,
"idFiliacao": 1,
"filiacao": {
"id": 1,
"nome": "Maria Silva",
"celular": "11999999999"
}
},
{
"id": 2,
"idEstudante": 1,
"idFiliacao": 2,
"filiacao": {
"id": 2,
"nome": "José Silva",
"celular": "11988888888"
}
}
]
}
}

// ============================================
// 3. BUSCAR FILIAÇÃO COM SEUS ESTUDANTES
// ============================================

GET /filiacao/get-one-by-id/1

// Response
{
"message": "Filiação recuperada com sucesso",
"data": {
"id": 1,
"nome": "Maria Silva",
"celular": "11999999999",
"cpf": "12345678900",
"email": "maria@example.com",
"estudantesFiliacoes": [
{
"id": 1,
"idEstudante": 1,
"idFiliacao": 1,
"estudante": {
"id": 1,
"nome": "João Silva Santos",
"dataNascimento": "2015-05-15"
}
},
// Se Maria fosse responsável de outro estudante:
{
"id": 3,
"idEstudante": 2,
"idFiliacao": 1,
"estudante": {
"id": 2,
"nome": "Pedro Silva",
"dataNascimento": "2016-08-22"
}
}
]
}
}

// ============================================
// 4. CRIAR FILIAÇÃO E VINCULAR A ESTUDANTE
// ============================================

// Usando o novo método createComVinculo (no service)
// Em um controller:

POST /filiacao/vincular // Exemplo de novo endpoint

{
"idEstudante": 1,
"filiacao": {
"nome": "Ana Silva",
"celular": "11977777777",
"cpf": "55566677788",
"email": "ana@example.com"
}
}

// Response
{
"message": "Filiação criada e vinculada com sucesso",
"data": {
"id": 3,
"nome": "Ana Silva",
"celular": "11977777777"
}
}

// ============================================
// 5. GERENCIAR VÍNCULOS MANUALMENTE (NO CÓDIGO)
// ============================================

// 5.1 - Vincular um estudante a uma filiação existente
const resultVinculo = await estudanteFiliacaoService.vincularEstudanteAFiliacao(
1, // idEstudante
3 // idFiliacao
);

// Response:
// {
// "message": "Vínculo criado com sucesso",
// "data": {
// "id": 4,
// "idEstudante": 1,
// "idFiliacao": 3,
// "dtCriacao": "2026-02-02T10:30:00.000Z"
// }
// }

// 5.2 - Desvincular
const resultDesvincular = await estudanteFiliacaoService.desvincularEstudanteDeFiliacao(
1, // idEstudante
3 // idFiliacao
);

// Response:
// {
// "message": "Vínculo removido com sucesso",
// "data": null
// }

// 5.3 - Listar todas as filiações de um estudante
const filiacoes = await estudanteFiliacaoService.findFiliacoesByEstudante(1);

// Response:
// {
// "message": "Filiações do estudante listadas com sucesso",
// "data": [
// {
// "id": 1,
// "idEstudante": 1,
// "idFiliacao": 1,
// "filiacao": { ... }
// },
// {
// "id": 2,
// "idEstudante": 1,
// "idFiliacao": 2,
// "filiacao": { ... }
// }
// ]
// }

// 5.4 - Listar todos os estudantes de uma filiação
const estudantes = await estudanteFiliacaoService.findEstudantesByFiliacao(1);

// Response:
// {
// "message": "Estudantes da filiação listados com sucesso",
// "data": [
// {
// "id": 1,
// "idEstudante": 1,
// "idFiliacao": 1,
// "estudante": { ... }
// },
// {
// "id": 3,
// "idEstudante": 2,
// "idFiliacao": 1,
// "estudante": { ... }
// }
// ]
// }

// 5.5 - Verificar se existe vínculo
const existe = await estudanteFiliacaoService.verificarVinculo(1, 1);

// Response:
// {
// "message": "Verificação realizada com sucesso",
// "data": true
// }

// ============================================
// 6. ATUALIZAR MATRÍCULA COM NOVAS FILIAÇÕES
// ============================================

PUT /matricula/update/1

{
"filiacoes": [
// Filiação existente (vai atualizar)
{
"id": 1,
"nome": "Maria Silva Costa", // Nome atualizado
"celular": "11999999999",
"email": "maria.costa@example.com"
},
// Nova filiação (vai criar e vincular)
{
"nome": "Carlos Silva",
"celular": "11966666666",
"profissao": "Advogado"
}
]
}

// Response
{
"message": "Matrícula atualizada com sucesso",
"data": {
"id": 1,
"estudante": {
"id": 1,
"nome": "João Silva Santos",
"estudantesFiliacoes": [
// Filiação 1 atualizada
{
"id": 1,
"idEstudante": 1,
"idFiliacao": 1,
"filiacao": {
"id": 1,
"nome": "Maria Silva Costa", // ✅ Atualizado
"email": "maria.costa@example.com"
}
},
// Filiação 2 existente
{
"id": 2,
"idEstudante": 1,
"idFiliacao": 2,
"filiacao": { ... }
},
// Filiação 3 (nova - Carlos)
{
"id": 5,
"idEstudante": 1,
"idFiliacao": 4,
"filiacao": {
"id": 4,
"nome": "Carlos Silva",
"celular": "11966666666"
}
}
]
}
}
}

// ============================================
// 7. CENÁRIO REAL - RESPONSÁVEL DE PAGAMENTO
// ============================================

// Um estudante (João) tem 3 filiações:
// 1. Mãe (Maria) - responsável pagamento
// 2. Pai (José)
// 3. Avó (Ana)

// E a mesma mãe (Maria) pode ser responsável de pagamento
// de outro estudante (Pedro)!

// Estrutura no BD:
// estudantes_filiacoes
// - id=1, id_estudante=1, id_filiacao=1 (João-Maria)
// - id=2, id_estudante=1, id_filiacao=2 (João-José)
// - id=3, id_estudante=1, id_filiacao=3 (João-Ana)
// - id=4, id_estudante=2, id_filiacao=1 (Pedro-Maria) ✅ Mesma filiação!

// matriculas
// - id=1, id_estudante=1, id_responsavel_pagamento=1 (João paga com Maria)
// - id=2, id_estudante=2, id_responsavel_pagamento=1 (Pedro paga com Maria)

console.log("✅ Uma filiação (Maria) é responsável de pagamento de múltiplos estudantes!");
console.log("✅ Uma filiação pode ser responsável de vários estudantes!");
console.log("✅ Um estudante pode ter várias filiações!");
