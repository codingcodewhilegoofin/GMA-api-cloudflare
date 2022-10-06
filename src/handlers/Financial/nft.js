//PolygonAPI URL
const openseaUrlBase = 'https://api.opensea.io/api/v1/collection/';
let collectionName = 'cryptopunks';
let date = '2022-08-03';
let adjusted = 'true';

const NftTicker = async (request, event) => {

    if (request.params.collectionName) {
        collectionName = request.params.collectionName;
    } else {
        collectionName = 'cryptopunks';
    }
   

    try {
        const nftOptions = {method: 'GET'};

        const response = await fetch( ( openseaUrlBase + `/${collectionName}`  ), nftOptions );

        if (!response.ok) {
            const message = `Bad response: ${response.status}`;
            res.status(401).send("Could not find ticker symbol or other issue");
            throw new Error(message);
        }
        else {

            const data = await response.json();

            return new Response(JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
                    'Access-Control-Max-Age': '86400',
                }
            });
        }
    }
    catch (error) {
        console.error("Failed GET for Nft data: " + error);
        //res.status(401).send("Could not find ticker symbol or other issue");
    }
};
export default NftTicker;