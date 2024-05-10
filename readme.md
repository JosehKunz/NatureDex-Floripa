

---------------------------------------------------------
## Na primeira vez é necessário instalar as dependencias:
`npm install`
 Se for em ambiente local: `npm install --dev`
`cp .env_example .env`
'npm install cors'

## Rode as Migrantions para ter o banco de dados para rodar o programa
1. Opção nº 1: `sequelize db:migrate`
2. Opção nº 2: `npx sequelize db:migrate`

## As bibliotecas utilizadas são

Para trabalhar com banco de dados
// instalar o sequelize
`npm install sequelize` 
// instalar o driver do PostgreSQL
`npm install pg` 
// instalar o CLI do sequelize
`npm install -g sequelize-cli` 

Para auxiliar com o arquivo .env
### instalar o dotenv
`npm install dotenv`

Para auxiliar com a segurança e autenticação
### instalar o JsonWebToken ( JWT )
`npm install jsonwebtoken`

### instalar o axios
`npm install axios`
### instalar o Swagger UI
`npm install swagger-ui-express`
### instalar o Swagger AutoGen para gerar o documento Swagger de forma automatica.
`npm install swagger-autogen`
## Gerar o documento do swagger automaticamente
`node autoGen.swagger.js`

## instalar YUP para validação de dados
`npm install yup`
---------------------------------------------------------

## colocando dados iniciais nas tabelas criadas via sequelize:
1. `npx sequelize db:seed --seed usuarios.seeders.js`
2. `npx sequelize db:seed --seed locais.seeders.js`

## Para rodar o repositório em ambiente local
`npm run start:dev`
## Logo após, acesse o doc da API
http://localhost:3000/docs/