# chamados-springframework

API REST do Sistema de Chamados — DAS (Design e Arquitetura de Sistemas), Univille.

Aluna: Fernanda Lemes de Souza — 144 6CN (Engenharia de Software)

## Executar

```
.\mvnw spring-boot:run
```

API em `http://localhost:8080`. Console H2 em `http://localhost:8080/h2-console` (JDBC URL `jdbc:h2:mem:chamadosdb`, usuário `sa`, senha em branco).

## Executar o frontend

Com o backend rodando, em outro terminal:

```
cd frontend
npm install
npm run dev
```

Frontend em `http://localhost:5173` (React + TypeScript + Vite). As chamadas para `/api` são encaminhadas para `http://localhost:8080`.

Telas, conforme o mapa de telas: Dashboard, Clientes (lista, novo, editar, detalhe com chamados do cliente), Categorias (lista e cadastro), Técnicos (lista e cadastro), Chamados (lista, filtros e novo) e Detalhe do chamado (status, técnico e comentários).

## Endpoints

| Recurso | Rotas |
|---|---|
| Clientes | `POST /clientes`, `GET /clientes`, `GET /clientes/{id}`, `PUT /clientes/{id}`, `DELETE /clientes/{id}`, `GET /clientes/{id}/chamados` |
| Categorias | `POST /categorias`, `GET /categorias`, `GET /categorias/{id}`, `PUT /categorias/{id}`, `DELETE /categorias/{id}` |
| Técnicos | `POST /tecnicos`, `GET /tecnicos`, `GET /tecnicos/{id}`, `PUT /tecnicos/{id}`, `DELETE /tecnicos/{id}` |
| Chamados | `POST /chamados`, `GET /chamados`, `GET /chamados/{id}`, `PUT /chamados/{id}`, `DELETE /chamados/{id}`, `PATCH /chamados/{id}/atribuir`, `PATCH /chamados/{id}/status`, `POST /chamados/{id}/comentarios` |

## Exemplos de consulta

Filtrar chamados por status, prioridade e cliente, com paginação e ordenação:

```
curl -i "http://localhost:8080/chamados?status=ABERTO&prioridade=ALTA&clienteId=1&page=0&size=10&sort=dataAbertura,desc"
```

Somente por status:

```
curl -i "http://localhost:8080/chamados?status=EM_ATENDIMENTO"
```

Chamados de um cliente:

```
curl -i "http://localhost:8080/clientes/1/chamados?page=0&size=10"
```

Sem `sort`, as listagens são ordenadas por `dataAbertura` decrescente.

Adicionar comentário (aparece no `GET /chamados/{id}`):

```
curl -i -X POST http://localhost:8080/chamados/1/comentarios \
  -H "Content-Type: application/json" \
  -d '{"texto":"Estamos verificando.","autor":"Fernanda"}'
```
