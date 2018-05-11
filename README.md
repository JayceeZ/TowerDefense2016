Poly'Defense
=====================


## Description

Poly'Defense est un jeu coopératif de type Tower Defense pour table tangible. 
Le but du jeu est de placer des défenses sur la carte pour empêcher les ennemis d'atteindre leur objectif.
Les joueurs ont à disposition une interface personnelle (tablette ou mobile) pour sélectionner/valider leurs défenses et disposer
de ses statistiques personnelles et un pion pour intéragir avec la table sur laquelle il positionne et oriente ses défenses.
Une interface web affichant l'évolution en live des statistiques de tous les joueurs est à disposition pour être affiché
sur une ou plusieurs interfaces tiers.
 
## Répartition du travail

#### Alexandre TISSIERE
	Gestion interactions tangibles (comment les joueurs interagissent sur la table, visualisation) + moteur de jeu

#### Jean-Christophe ISOARD
	Affichage du plateau de jeu, éléments animés et statiques
	Développement graphique/dessin (conséquences visuelles d’interactions avec la table)

#### Kévin JUSTAL
	Informations personnelles et générales (support externe permanent)

#### Salah BENNOUR
	Support mobile pour les joueurs
	Développement responsive et cross-platform : affichage des informations joueurs (statistiques, scores, niveau des défenses..) et interaction avec le jeu depuis le support mobile.

## Partie table
Prévue pour fonctionner sur une Table SUR40 executant la plateforme Windows 7 avec le mode Surface désactivé (session Windows standard)

#### Installation

Pour installer les dépendances du projet, il faut lancer install.bat
Une série de "npm install" vont s'executer dans les dossiers Core/, Server/ et TableUI/

#### Exécution

Si aucune erreur n'a été rencontrée lors de l''installation des dépendances,
le point d'entrée de l'application est l'executable :

	TableUI/nw.exe

Vous pouvez en créer un raccourcis si vous le souhaitez.

Cet executable va lancer deux consoles 
(Server/server.js et Core/Core.js) 
!! veillez à les fermer en quittant l'application !!
ainsi que l'écran de création de partie.

Si l'execution vous semble ralentie ou si vous ne voyez pas les tags s'afficher. 
Nous avons rencontrés des problèmes similaires.
Essayez de passer en mode surface et de revenir sur le compte en mode Windows.

Si vous rencontrez d'autres problèmes, contactez Jean-Christophe Isoard aux adresses : 
isoard@polytech.unice.fr ou jeanchristophe.isoard@gmail.com

### Utilisation des tags

Des tags précis sont actuellement associés à leur couleur dans l'application :
A6 (rouge), 1 (bleu), 20 (vert), C4 (violet), B5 (jaune)

Vous devez jouer avec ces tags ou modifier l'association tags/couleurs.

Pour changer les tags associés, il faut modifier la variable tagColors qui contient l'association tags/couleurs
dans le fichier TableUI/src/app.js

## Partie mobile

#### Installation

Pour pouvoir éxécuter le projet vous devez disposer des outils suivants :
 

* ** NodeJS & son gestionnaire de paquets ** : [https://nodejs.org/en/](https://nodejs.org/en/)

* ** Cordova **  : *npm install -g cordova*

* ** Ionic **  : *npm install -g ionic*
		
* ** Bower **  : *npm install -g bower*
	

#### Exécution

Tout d'abord placez-vous à la racine du projet :
	
		$ cd myApp

Ensuite téléchargez les dépendances :

		$ bower install
		
Puis ajoutez la plate-forme pour lequel vous souhaitez exécuter l'application :
	
		$ ionic platform add android (pour android)
		
		$ ionic platform add ios (pour IOS)
		
Enfin, compilez puis déployer votre application sur votre appareil connecté par USB :

		$ ionic run android (pour android)
		
		$ ionic run ios (pour IOS)
		

PS : vous pouvez aussi lancer l'application sur vore navigateur - pour d'éventuels tests par exemple - à partir de la ligne de commande suivante :

		$ ionic serve



## Auteurs

* Alexandre Tissière
* Jean-Christophe Isoard
* Kevin Justal
* Salah Bennour

---

Polytech Nice Sophia
