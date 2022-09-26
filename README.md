# <p align = "center"> Projeto 21 - Sing me a Song </p>

<p align="center">
   <img src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f399-fe0f.svg" width= 250/>
</p>

<p align = "center">
   <img src="https://img.shields.io/badge/author-Vitor Carvalho Matos-4dae71?style=flat-square" />
</p>


## Descrição

Este projeto consiste em produzir testes automatizados unitarios, de integração e End-to-End. Estes testes são feitos em cima de uma aplicação pronta disponibilizada pela Driven

***

## Tecnologias e Conceitos

- JEST, Supertest
- Cypress
- Node.js
- TypeScript
- Prisma

***

## 🏁 Rodando a aplicação

Este projeto foi inicializado com o [Create React App](https://github.com/facebook/create-react-app), então certifique-se que voce tem a ultima versão estável do [Node.js](https://nodejs.org/en/download/) e [npm](https://www.npmjs.com/) rodando localmente.

Primeiro, faça o clone desse repositório na sua maquina:

```
git clone https://github.com/V1T0R-CM/projeto21-singmeasong.git
```

Depois, dentro da pasta, rode o seguinte comando para instalar as dependencias, na pasta front-end, e na pasta back-end:
```
npm install
```
Depois, para inicializar o banco de dados, utilize o seguinte comando dentro da pasta back-end:

```
npx prisma migrate dev
```

Finalizado o processo, é só inicializar o servidor front-end com:
```
npm start
```

E do back-end com:
```
npm run dev
```
Para rodar os testes automatizados, na pasta do front-end use o comando: (testes e2e)
```
npx cypress open
```
Para rodar os testes automatizados, na pasta do back-end use o comando: (testes unitários)
```
npm run test:unit
```
Para rodar os testes automatizados, na pasta do back-end use o comando: (testes de integração)
```
npm run test:integration
```

Para rodar os testes automatizados, na pasta do back-end use o comando: (testes unitarios e de integração simultaneamente)
```
npm run test
```
