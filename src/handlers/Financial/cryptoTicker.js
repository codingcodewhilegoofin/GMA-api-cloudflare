//PolygonAPI URL
const polygonUrlBaseCrypto = 'https://api.polygon.io/v2/aggs/ticker/';
let cryptoTicker = 'X:BTCUSD';
let adjusted = 'true';

const CryptoTicker = async (request, event) => {

    if (request.params.cryptoTicker) {
        cryptoTicker = request.params.cryptoTicker;
    } else {
        cryptoTicker = 'X:BTCUSD';
    }

    if (request.params.adjusted) {
        adjusted = request.params.adjusted;
    } else {
        adjusted = 'true';
    }


    try {
        const response = await fetch( ( polygonUrlBaseCrypto + `${cryptoTicker}/` + `prev?adjusted=${adjusted}`+ `&apiKey=${POLYGON_API_KEY}` ) );

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
        console.error("Failed GET for Crypto data: " + error);
        //res.status(401).send("Could not find ticker symbol or other issue");
    }
};
export default CryptoTicker;