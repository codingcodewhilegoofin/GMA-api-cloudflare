import { Router } from 'itty-router';
import Tests from './handlers/tests.js';
import Test from './handlers/test.js';
import ApiTest from './handlers/OpenAi/apitest.js';
import Artist from './handlers/Spotify/artist.js';
import Artists from './handlers/Spotify/artists.js';
import StockTicker from './handlers/Financial/stock.js';
import CryptoTicker from './handlers/Financial/cryptoTicker.js';
import NftTicker from './handlers/Financial/nft.js';
import GovData from './handlers/Financial/gov.js';
import CodeLedToggleON from './handlers/Arduino/codeLedToggleON.js';
import WebSiteLedToggleON from './handlers/Arduino/webSiteLedToggleON.js';
import CodeLedToggleOFF from './handlers/Arduino/codeLedToggleOFF.js';
import CodeLedSTATUS from './handlers/Arduino/codeLedSTATUS.js';
import MongoBackend from './handlers/Mongo/MongoBackend.js';
import Index from './html/index.html';
import About from './html/about.html';
import Endpoints from './html/endpoints.html';
import Contact from './html/contact.html';

const router = Router();



// Test routes
router.get('/api/tests', Tests)
router.get('/api/test/:id', Test );

// Connect to OpenAI API will need a standard HTTP request 
router.get('/api/OpenAi/:userPrompt', ApiTest );

// Connect to Spotify API 
router.get('/api/Spotify', Artists );
router.get('/api/Spotify/:artistID', Artist );

// Connect to Financial APIs 
router.get('/api/Stock/:symbol/:date/:adjusted', StockTicker );
router.get('/api/Crypto/:cryptoTicker/:adjusted', CryptoTicker );
router.get('/api/Nft/:collectionName', NftTicker );
router.get('/api/Gov', GovData );

// Connect to Arduino API
router.get('/api/Arduino/ToggleON', CodeLedToggleON );
router.get('/api/Arduino/ToggleOFF', CodeLedToggleOFF );
router.get('/api/Arduino/STATUS', CodeLedSTATUS );
router.get('/api/Arduino/TestConnection', WebSiteLedToggleON );

router.get('/api/Mongo', MongoBackend );

router.get('*', () => new Response('🌴☀️ ~ Cannot find an endpoint for this 😕 ~ 🌴☀️', { status: 404 }));

//Test listener
addEventListener('fetch', event =>
  event.respondWith(router.handle(event.request))
)