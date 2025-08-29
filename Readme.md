# Alchemy Wallet Transfers

Une application Angular moderne qui affiche les transferts de portefeuille Alchemy dans un tableau interactif et responsive.

## 🚀 Fonctionnalités

- **Affichage des transferts** : Visualisation des transactions de portefeuille en temps réel
- **Interface responsive** : Adaptation automatique aux écrans mobiles et desktop
- **Design moderne** : Interface utilisateur élégante avec des effets hover et transitions
- **Liens vers Etherscan** : Accès direct aux détails des transactions sur Etherscan
- **Chargement asynchrone** : Indicateur de chargement pendant la récupération des données

## 🛠️ Technologies utilisées

- **Angular 18+** avec architecture standalone
- **TypeScript** pour le typage statique
- **SCSS** pour les styles avancés

## 📋 Prérequis

- Node.js (version 18 ou supérieure)
- npm ou yarn
- Angular CLI (`npm install -g @angular/cli`)

## 🔧 Installation

1. **Cloner le repository**

   ```bash
   git clone <url-du-repo>
   cd front-end/main
   ```

2. **Installer les dépendances**

   ```bash
   npm install
   ```


## 🚦 Démarrage

**Mode développement**

```bash
ng serve
```

L'application sera accessible sur `http://localhost:4200`

**Build de production**

```bash
ng build --prod
```

## 📊 Fonctionnalités du tableau (so far)

Le tableau affiche les colonnes suivantes :

- **Network** : Réseau blockchain
- **Block** : Numéro de bloc (converti depuis hexadécimal)
- **From** : Adresse expéditeur
- **To** : Adresse destinataire
- **Asset** : Type d'actif transféré
- **Value** : Valeur de la transaction
- **Category** : Catégorie de transaction
- **Txn Hash** : Hash de transaction (lien vers Etherscan)

![Alt text](./assets/1sr.png)
