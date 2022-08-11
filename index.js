import { Router } from 'itty-router'

const testUrl = 'https://swapi.dev/api/people/1/';
const polygonUrlBase = 'https://api.polygon.io/v1/open-close/';
let symbol = 'AAPL';
let date = '2022-08-03';
let adjusted = 'true';

const router = Router();

router.get("/", () => {
  return new Response("Hello, world! This is the root page of your Worker template.")
})

router.all("*", () => new Response("YOUR MOM!", { status: 404 }))


//Test listener
addEventListener('fetch', (e) => {
  e.respondWith(router.handle(e.request))
})


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