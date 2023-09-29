# Fiche de Révision : Fonctionnement du Back-end avec MySQL et Node.js

## 1. Introduction au Back-end

Le back-end, ou "serveur", fait référence à la partie "cachée" d'une application web/mobile qui gère la logique métier, la manipulation des données, et communique avec la base de données. Il fonctionne généralement sur un serveur distant et renvoie des réponses au front-end (ou "client").

## 2. Rôle de Node.js

### 2.1. Qu'est-ce que Node.js?

- Environnement d'exécution JavaScript côté serveur basé sur le moteur V8 de Chrome.
- Non bloquant et orienté événement, ce qui le rend efficace pour les applications I/O lourdes.

### 2.2. Pourquoi utiliser Node.js pour le back-end?

- Rapidité et performance.
- Écosystème riche avec npm (gestionnaire de paquets).
- Une seule langue (JavaScript) côté client et serveur.

**Exemple**: Créer un serveur HTTP simple avec Node.js:
```javascript

const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World');
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});

## 3. Rôle de MySQL

### 3.1. Qu'est-ce que MySQL?

- Système de gestion de base de données relationnelle (RDBMS).
- Utilisé pour stocker, récupérer, et gérer des données relationnelles.

### 3.2. Pourquoi MySQL pour le back-end?

- Open source, fiable, et robuste.
- Large communauté et beaucoup de ressources d'apprentissage.
- Facile à intégrer avec diverses technologies back-end, y compris Node.js.

**Exemple**: Structure d'une table "utilisateurs" simple:
```sql
CREATE TABLE utilisateurs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    mot_de_passe VARCHAR(255) NOT NULL
);