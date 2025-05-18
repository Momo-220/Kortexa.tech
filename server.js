// server.js
import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';

const PORT = 3002;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = createServer((req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    });
    
    server.listen(PORT, (err) => {
      if (err) {
        console.error('Erreur lors du démarrage du serveur:', err);
        process.exit(1);
      }
      console.log(`> Serveur prêt sur http://localhost:${PORT}`);
    });
    
    // Gestion des erreurs du serveur
    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`Le port ${PORT} est déjà utilisé. Veuillez fermer l'application qui utilise ce port ou choisir un autre port.`);
      } else {
        console.error('Erreur du serveur:', err);
      }
      process.exit(1);
    });
    
    // Gestion de l'arrêt propre du serveur
    ['SIGINT', 'SIGTERM'].forEach(signal => {
      process.on(signal, () => {
        console.log(`Signal ${signal} reçu, fermeture du serveur...`);
        server.close(() => {
          console.log('Serveur fermé avec succès');
          process.exit(0);
        });
      });
    });
  })
  .catch(err => {
    console.error('Erreur lors de la préparation de l\'application Next.js:', err);
    process.exit(1);
  }); 