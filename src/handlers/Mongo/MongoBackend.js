//Mongo URL
const MongoUrl = 'https://data.mongodb-api.com/app/data-inikb/endpoint/data/v1/action/find';

const MongoBackend = async (request, event) => {

    try {

        async function getAll() {
            try {

                const data = {
                    "collection": "gmwebsite",
                    "database": "gmadb",
                    "dataSource": "giobot",
                    "filter": {}
                };

                let options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Request-Headers': '*',
                        'api-key': MDB_TOKEN,
                    },
                    body: JSON.stringify(data),
                };

                console.log("Function is running calling... ");
                console.log(options, options.headers, options.body);

                const MongoResponse = await fetch(MongoUrl, options);

                if (!MongoResponse.ok) {
                    const message = `\n Bad fetch: ${MongoResponse.status}`;
                    console.log(message, ' Response is: ', MongoResponse.body, MongoResponse.headers, MongoResponse.statusText);
                }
                else {
                    const MongoData = await MongoResponse.json();
                    console.log(MongoData);

                    return MongoData;
                }

            } catch (error) {
                console.log("useToken() internal error occurred: ", error.message);
            }
        }

        const MongoData = await getAll();
        
        console.log("MongoData is" , MongoData?.documents[0])

        return new Response(JSON.stringify(MongoData?.documents ?? "Not found"), {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
                'Access-Control-Max-Age': '86400',
            }
        });
    }
    catch (error) {
        console.error("Failed MongoBackend call : ", error.message);
    }
};
export default MongoBackend;