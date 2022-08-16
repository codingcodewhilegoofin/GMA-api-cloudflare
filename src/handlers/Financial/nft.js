//PolygonAPI URL
const polygonUrlBase = 'https://api.polygon.io/v1/open-close/';
let symbol = 'AAPL';
let date = '2022-08-03';
let adjusted = 'true';

const Nftticker = async (request, event) => {

    if (request.params.symbol) {
        symbol = request.params.symbol;
    } else {
        symbol = 'AAPL';
    }

    if (request.params.date) {
        date = request.params.date;
    } else {
        date = '2022-08-03';
    }

    if (request.params.adjusted) {
        adjusted = request.params.adjusted;
    } else {
        adjusted = 'true';
    }

    try {
        const response = await fetch((polygonUrlBase + `${symbol}/` + `${date}/` + `?adjusted=${adjusted}` + `&apiKey=${POLYGON_API_KEY}`));

        if (!response.ok) {
            const message = `Bad response: ${response.status}`;
            res.status(401).send("Could not find ticker symbol or other issue");
            throw new Error(message);
        }
        else {

            const data = await response.json();

            return new Response(JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    }
    catch (error) {
        console.error("Failed GET for Polygon data: " + error);
        //res.status(401).send("Could not find ticker symbol or other issue");
    }
};
export default Nftticker;