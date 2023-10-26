<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# Schedule Mail

Este projeto foi construído com o [NestJs](https://github.com/nestjs/nest), um framework eficiente e poderoso para Node.js. Ele utiliza a API externa do SendGrid para enviar e-mails e a biblioteca Schedule para agendar o envio de e-mails utilizando o cron.

## Pré-requisitos

Antes de executar este projeto, certifique-se de ter o seguinte:

- Node.js instalado em sua máquina
- Credenciais da API do SendGrid (chave da API, e-mail remetente, etc.)

## Instalação

1. Clone o repositório do projeto no GitHub.
2. Navegue até o diretório do projeto.
3. Execute o seguinte comando para instalar as dependências:

```bash
$ pnpm install
```

## Rodar o servidor

```bash
# desenvolvimento
$ pnpm run start

# observação
$ pnpm run start:dev

# produção
$ pnpm run start:prod
```

## Test

```bash
# Testes unitários
$ pnpm run test

# Testes e2e
$ pnpm run test:e2e

# Coverage dos testes
$ pnpm run test:cov
```

## Configuração

1. Crie um arquivo `.env` na raiz do diretório do projeto.
2. Copie as variáveis de ambiente do arquivo `.env.sample`:
3. Preencha com os dados de conexão do seu PostgreSQL e com sua chave da API SendGrid

## Uso

Para iniciar a aplicação, execute o seguinte comando:

```
npm run start:dev
```

Isso iniciará o servidor NestJS e o deixará pronto para lidar com as requisições da API.

## Envio de E-mails

Para enviar um e-mail usando a API do SendGrid, faça uma requisição POST para o endpoint apropriado, fornecendo os dados necessários.

## Banco de Dados

Este projeto utiliza o TypeORM com o PostgreSQL como banco de dados. Certifique-se de ter um servidor PostgreSQL em execução e atualize as configurações de conexão no arquivo `.env`.