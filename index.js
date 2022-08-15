import { Router } from 'itty-router';

import {
  json,
  missing,
  error,
  status,
  withContent,
  withParams,
  ThrowableRouter,
} from 'itty-router-extras';

const testUrl = 'https://swapi.dev/api/people/1/';
const polygonUrlBase = 'https://api.polygon.io/v1/open-close/';
let symbol = 'AAPL';
let date = '2022-08-03';
let adjusted = 'true';

import Tests from './src/handlers/tests.js';
import Test from './src/handlers/test.js';
import ApiTest from './src/handlers/OpenAi/apitest.js';
import Artist from './src/handlers/Spotify/artist.js';
import Artists from './src/handlers/Spotify/artists.js'

const router = Router();


router.get('/', () => new Response('Hello', { status: 200 })) 

router.get('/api/tests', Tests)
router.get('/api/test/:id', Test );

// Connect to OpenAI API will need a standard HTTP request 
router.get('/api/OpenAi/:userPrompt', ApiTest );

// Connect to Spotify API 
router.get('/api/Spotify', Artists );
router.get('/api/Spotify/:artistID', Artist );


router.get('*', () => new Response('Not found bitchh', { status: 404 }));

//Test listener
addEventListener('fetch', event =>
  event.respondWith(router.handle(event.request))
)

//Test function 
/* async function handleRequest(request) {

  const{ symbol } = await request.json();
  console.log("\n req:" , request.method);
  console.log("\n JSON:" , request.json());

   if (request.query.symbol) {
    symbol = request.query.symbol;
  } else {
    symbol = 'AAPL';
  } 

  
    if (request.query.date) {
      date = request.query.date;
    } else {
      date = '2022-08-03';
    }
  
    if (request.query.adjusted) {
      adjusted = request.query.adjusted;
    } else {
      adjusted = 'true';
    } 

  try {
    const response = await fetch((polygonUrlBase + `${symbol}/` + `${date}/` + `?adjusted=${adjusted}` + `&apiKey=${POLYGON_API_KEY}`));

    if (!response.ok) {
      const message = `Bad response: ${response.status}`;
      //res.status(401).send("Could not find ticker symbol or other issue");
      throw new Error(message);
    }
    else {

      const data = await response.json();

      //res.status(200).send(data);
      return new Response(JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

  }
  catch (error) {
    console.error("Failed GET for stock data: " + error);
    //res.status(401).send("Could not find ticker symbol or other issue");
  }
}
 */