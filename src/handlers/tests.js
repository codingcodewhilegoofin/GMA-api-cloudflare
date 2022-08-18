const testUrl = 'https://swapi.dev/api/people/1/';

const Tests = async () => {
    try {
        const response = await fetch(testUrl);

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
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
                    'Access-Control-Max-Age': '86400',
                }
            });
        }

    }
    catch (error) {
        console.error("Failed GET for stock data: " + error);
        //res.status(401).send("Could not find ticker symbol or other issue");
    }

};

export default Tests;