Partie mobile
=====================


## Description

Ce projet correspond à la partie mobile (tablette/smartphone) du Poly'Defense. A partir de vos appareils mobile vous pouvez intéragir avec les différents dispositifs du jeu (table et partie web).


## Installation

Pour pouvoir éxécuter le projet vous devez disposer des outils suivants :
 

* ** NodeJS & son gestionnaire de paquets ** : [https://nodejs.org/en/](https://nodejs.org/en/)

* ** Cordova **  : *npm install -g cordova*

* ** Ionic **  : *npm install -g ionic*
		
* ** Bower **  : *npm install -g bower*
	



## Exécution

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


Pour toutes informations complémentaires n'hésitez pas à me contacter.

* [Salah Bennour](mailto:bennour@polytech.unice.fr)

---

![Polytech Nice Sophia](http://users.polytech.unice.fr/~bennour/logos.png)