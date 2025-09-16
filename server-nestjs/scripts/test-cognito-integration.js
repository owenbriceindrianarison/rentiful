#!/usr/bin/env node

/**
 * Script de test pour l'intégration Cognito
 * Ce script vérifie que l'API répond correctement aux requêtes authentifiées
 */

const https = require('https');
const http = require('http');

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:4000';

// Token JWT de test (remplacez par un vrai token Cognito)
const TEST_TOKEN = process.env.TEST_JWT_TOKEN || 'your-test-jwt-token';

async function makeRequest(endpoint, token = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(API_BASE_URL + endpoint);
    const options = {
      hostname: url.hostname,
      port: url.port || (url.protocol === 'https:' ? 443 : 80),
      path: url.pathname,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }

    const protocol = url.protocol === 'https:' ? https : http;

    const req = protocol.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data,
        });
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}

async function testEndpoints() {
  console.log("🧪 Test de l'intégration Cognito...\n");

  const tests = [
    {
      name: 'GET / (endpoint public)',
      endpoint: '/',
      token: null,
      expectedStatus: 200,
    },
    {
      name: 'GET /auth/profile (sans token)',
      endpoint: '/auth/profile',
      token: null,
      expectedStatus: 401,
    },
    {
      name: 'GET /auth/profile (avec token)',
      endpoint: '/auth/profile',
      token: TEST_TOKEN,
      expectedStatus: 401, // Sera 401 car le token de test n'est pas valide
    },
    {
      name: 'GET /managers/test-id (sans token)',
      endpoint: '/managers/test-id',
      token: null,
      expectedStatus: 401,
    },
    {
      name: 'GET /tenants/test-id (sans token)',
      endpoint: '/tenants/test-id',
      token: null,
      expectedStatus: 401,
    },
  ];

  for (const test of tests) {
    try {
      console.log(`📡 Test: ${test.name}`);
      const response = await makeRequest(test.endpoint, test.token);

      if (response.statusCode === test.expectedStatus) {
        console.log(`✅ Succès: ${response.statusCode}`);
      } else {
        console.log(
          `❌ Échec: attendu ${test.expectedStatus}, reçu ${response.statusCode}`,
        );
      }

      if (response.body) {
        try {
          const jsonBody = JSON.parse(response.body);
          console.log(`📄 Réponse: ${JSON.stringify(jsonBody, null, 2)}`);
        } catch {
          console.log(`📄 Réponse: ${response.body}`);
        }
      }

      console.log('');
    } catch (error) {
      console.log(`❌ Erreur: ${error.message}`);
      console.log('');
    }
  }
}

async function main() {
  try {
    await testEndpoints();
    console.log('🎉 Tests terminés !');
    console.log('\n📝 Notes:');
    console.log(
      '- Pour tester avec un vrai token Cognito, définissez TEST_JWT_TOKEN',
    );
    console.log('- Assurez-vous que le serveur est démarré sur le port 4000');
    console.log("- Configurez les variables d'environnement Cognito dans .env");
  } catch (error) {
    console.error('💥 Erreur lors des tests:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
