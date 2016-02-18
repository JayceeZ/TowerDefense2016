Poly'Defense
=====================


## Description

Ce projet correspond à la partie mobile (tablette/smartphone) du Poly'Defense. A partir de vos appareils mobile vous pouvez intéragir avec les différents dispositifs du jeu (table et partie web).

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



## Contact


Pour toutes informations complémentaires n'hésitez pas à nous contacter.

* [Alexandre Tissière](mailto:tissiere@polytech.unice.fr)
* [Jean-Christophe Isoard](mailto:isoard@polytech.unice.fr)
* [Kevin Justal](mailto:bennour@polytech.unice.fr)
* [Salah Bennour](mailto:bennour@polytech.unice.fr)

---

![Polytech Nice Sophia](http://users.polytech.unice.fr/~bennour/logos.png)