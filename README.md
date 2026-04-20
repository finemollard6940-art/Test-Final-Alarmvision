# Alarm Vision – Site Web Statique

## Arborescence

```
alarmvision/
├── index.html            ← Accueil
├── technologie.html      ← Page Technologie IA
├── services.html         ← Page Services
├── contact.html          ← Page Contact
├── devis.html            ← Page Devis gratuit
├── mentions-legales.html ← Mentions légales
├── cgv.html              ← Conditions Générales de Vente
├── assets/
│   ├── style.css         ← Styles globaux
│   └── app.js            ← Application React complète (toutes les pages)
└── README.md             ← Ce fichier
```

## Comment ça fonctionne

Chaque fichier HTML contient un attribut `data-page` sur la balise `<html>` :
```html
<html lang="fr" data-page="home">
```
Le fichier `app.js` lit cet attribut pour afficher la bonne page, sans rechargement ni framework de routing.

## Déploiement sur GitHub Pages

1. Créez un dépôt GitHub (ex: `alarmvision`)
2. Uploadez tous les fichiers **en conservant la structure de dossiers**
3. Allez dans **Settings → Pages → Source → main branch → / (root)**
4. Votre site sera disponible sur `https://votre-nom.github.io/alarmvision/`

## Déploiement sur OVH (hébergement mutualisé)

1. Connectez-vous à votre espace client OVH
2. Allez dans **Hébergements → FTP/SSH**
3. Uploadez tous les fichiers dans le dossier `www/` ou `public_html/`
   - Conservez la structure : `www/assets/style.css`, `www/assets/app.js`, etc.
4. Votre site sera disponible sur votre domaine

## Notes importantes

- ✅ Toutes les images sont hébergées sur des CDN externes (Unsplash, Freepik) – aucune image locale à gérer
- ✅ Tailwind CSS est chargé via CDN – aucune compilation nécessaire
- ✅ React est chargé via CDN – aucune installation npm requise
- ✅ La carte Leaflet (Lyon) fonctionne via CDN
- ⚠️  Les formulaires affichent une confirmation visuelle mais n'envoient pas de données réelles. Pour les connecter à un backend, il faudra ajouter un service comme Formspree ou EmailJS.
