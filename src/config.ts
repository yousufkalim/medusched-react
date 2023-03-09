let baseUrl = 'http://localhost:5000/api/v1';
let mediaUrl = 'http://localhost:5000';
const appName = 'MedUSched';
let env = 'dev';

// Update the baseUrl and mediaUrl on every environment
switch (window.location.host) {
  case 'medusched-dev.falconweb.app':
    baseUrl = 'https://medusched-api-dev.falconweb.app/api/v1';
    mediaUrl = 'https://medusched-api-dev.falconweb.app/';
    break;

  case 'medusched-qa.falconweb.app':
    baseUrl = 'https://medusched-api-qa.falconweb.app/api';
    mediaUrl = 'https://medusched-api-qa.falconweb.app/';
    env = 'qa';
    break;

  case 'medusched-staging.falconweb.app':
    baseUrl = 'https://medusched-api-staging.falconweb.app/api';
    mediaUrl = 'https://medusched-api-staging.falconweb.app/';
    env = 'staging';
    break;

  case 'medusched-prod.falconweb.app':
    baseUrl = 'https://medusched-api-prod.falconweb.app/api';
    mediaUrl = 'https://medusched-api-prod.falconweb.app/';
    env = 'prod';
    break;
}

export { baseUrl, mediaUrl, appName, env };
