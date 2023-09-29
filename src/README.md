# Projet Générateur d'art : ARTSPHERE-AI

## Description du projet

Le projet Artsphere-AI est un site web qui utilise les API de OpenAI qui sont GPT-3,5 turbo et DALL·E, pour générer automatiquement des graffitis uniques, des tableaux inspirés des grands peintres de notre siècle, ou des idées deco/design d'interieur. L'utilisateur clique sur le bouton générer et le site produit un nom de graffiti et une image de graffiti basée sur ce nom, pareil pour les peintres impressionistes et la décoration.
L'objectif est de stimuler l'imagination des artistes.

![Image 1](/frontend/asset/img/hp.PNG)

## Comment ça fonctionne?

1. **Génération du nom** : À l'aide de l'API du modèle GPT-4, nous générons un nom pour une oeuvre d'art unique basée sur un prompt spécifique. Il existe 3 thèmes interne au site , Graffitis, Tableaux, et Pixel Art.

2. **Génération de l'image** : En utilisant l'API de DALL·E, nous créons une image basée sur le nom généré. DALL·E est un modèle qui peut produire des images uniques à partir de descriptions textuelles.

## Comment l'utiliser?

Les utilisateurs peuvent visiter le site web, choisir quelle type d'inspiration ils veulent (Art, Graff ou Pixel Art) et cliquer sur la shpère de leur choix. En arrivant sur la page thématiques cliquez sur le "Générer". Le site web produira alors un nom unique et l'oeuvre correspondante.

![Image 1](/frontend/asset/img/graff.PNG)

![Image 1](/frontend/asset/img/art.PNG)

![Image 1](/frontend/asset/img/pixel.PNG)

## Galerie

 Une galerie communautaire est également disponible où les utilisateurs peuvent consulter des selections alèatoires des trois types d'oeuvre d'art, elles . Nous prévoyons également pour le futur un système de notation.

![Image 1](/frontend/asset/img/gallerie.PNG)
## Contributions

Nous sommes toujours à la recherche de contributions pour améliorer notre projet. Si vous avez des idées ou des suggestions, n'hésitez pas à ouvrir une issue ou à soumettre une pull request.


## Secrets

Vous devez créer un fichier module.js dans le dossier asset/js afin d'y importer vos clées API pour Chat GPT et Dall-E ainsi que les URL associées
Ensuite rendez-vous sur le site de OpenAI section API Documentation et suivez le guide dédié.
Voici la liste des polices à télécharger pour une meilleure expérience:

Futurama : https://www.dafont.com/fr/futurama-2.font

Classic Mosaic : https://www.dafont.com/fr/classic-mosaic.font

Bemock: https://www.dafont.com/fr/bemock.font

Modeco : https://www.dafont.com/fr/modeco.font

Computer: https://www.dafont.com/fr/computer-2.font

LLPixel: https://www.dafont.com/fr/llpixel.font

Street Blocks: https://www.dafont.com/fr/street-blocks.font

Lettre Classique :https://www.dafont.com/fr/lettreclassique.font

Golden : https://www.dafont.com/fr/golden-2.font

Minecraft : https://www.dafont.com/fr/minecraft.font

## Licence

Pour plus d'informations, veuillez consulter le fichier LICENCE