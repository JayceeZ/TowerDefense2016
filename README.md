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
	Menus et interactions de deuxième niveaux (menus) / informations personnelles et générales (quelle information, sur quel support) + moteur de jeu

#### Salah BENNOUR
	Support mobile pour les joueurs
	Développement responsive et cross-platform : affichage des informations joueurs (statistiques, scores, niveau des défenses..) et interaction avec le jeu depuis le support mobile.


## Partie serveur
#### Installation
#### Exécution


## Partie table
#### Installation
#### Exécution


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

* [Alexandre Tissière](mailto:bennour@polytech.unice.fr)
* [Jean-Christophe Isoard](mailto:bennour@polytech.unice.fr)
* [Kevin Justal](mailto:bennour@polytech.unice.fr)
* [Salah Bennour](mailto:bennour@polytech.unice.fr)

---

![Polytech Nice Sophia](http://users.polytech.unice.fr/~bennour/logos.png)