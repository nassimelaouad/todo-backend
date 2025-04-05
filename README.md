<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```
# Todo App - Backend

Ce dépôt contient la partie **backend** de l'application Todo, développée avec **NestJS**.  
Elle fournit une API REST pour gérer une liste de tâches : création, consultation, modification et suppression.

---

##  Stack technique

- **NestJS** comme framework backend
- **Prisma** pour l'accès à la base de données MySQL
- Base de données : **MySQL** j'ai créer la base de donnée **hdmtestdev**
- Utilisation de **Yarn** comme gestionnaire de paquets
- Architecture orientée **Use Cases** pour séparer la logique métier

---

##  Installation

1. Cloner le dépôt GitHub et se positionner dans le dossier du projet.
2. Installer les dépendances avec la commande `yarn install`.
3. Configurer les accès à la base de données dans le fichier `.env`.
4. Exécuter les migrations Prisma pour créer les tables nécessaires.
5. Lancer le serveur avec `yarn start:dev`.

---

##  Fonctionnalités de l’API

- **GET /tasks** : Récupération de toutes les tâches.
- **POST /tasks** : Création d’une nouvelle tâche.
- **PUT /tasks/:id** : Mise à jour d’une tâche existante.
- **DELETE /tasks/:id** : Suppression d’une tâche.

---

##  Structure du projet et modifications importantes

Le projet suit une architecture propre (Clean Architecture) :  
Les contrôleurs utilisent des **use cases** pour exécuter la logique métier, en s’appuyant sur des **repositories** pour l'accès aux données.

###  `SaveTaskUseCase.ts`

Ce fichier contient la logique métier permettant de créer ou mettre à jour une tâche.  
Une validation a été ajoutée pour empêcher la création ou la mise à jour d'une tâche avec un nom vide ou composé uniquement d'espaces.  
La tâche est ensuite sauvegardée via le repository, en fonction de la présence ou non d’un identifiant.

---

###  `SaveTaskDto.ts`

Ce DTO (Data Transfer Object) sert à transférer les données d’une tâche vers la couche métier.  
Il a été ajusté pour permettre la mise à jour des tâches : en plus du nom, il contient désormais un identifiant optionnel.  
Cela permet d’utiliser le même DTO pour la création **et** la modification des tâches.

---

###  `UseCaseFactory.ts`

Ce fichier instancie tous les cas d’usage de l’application.  
Le cas d’usage pour la sauvegarde d’une tâche (`SaveTaskUseCase`) a été ajouté à la factory.  
Cela permet de centraliser la création des use cases et de les injecter facilement dans les contrôleurs.

---

###  `TaskRepository.ts`

Ce fichier gère la communication avec la base de données via Prisma.  
La méthode `save` a été modifiée pour prendre en charge deux cas :  
- Si un identifiant est fourni, elle effectue une mise à jour de la tâche existante.
- Sinon, elle crée une nouvelle tâche.

Ce comportement permet de centraliser la logique de sauvegarde (création ou mise à jour) au même endroit.

---

###  `TaskController.ts`

Ce fichier définit les routes de l’API REST.  
Une nouvelle route a été ajoutée pour gérer la mise à jour d’une tâche (`PUT /tasks/:id`).  
Cette route reçoit un nom de tâche en entrée, construit un DTO avec l’identifiant et le nom, puis appelle le use case de sauvegarde.

---

##  Frontend

Le frontend associé à cette API est disponible à l'adresse suivante :  
[https://github.com/nassimelaouad/todo-frontend](https://github.com/nassimelaouad/todo-frontend)

---

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
