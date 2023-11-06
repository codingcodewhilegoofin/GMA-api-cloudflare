//Mongo URL
const MongoUrl = 'https://data.mongodb-api.com/app/data-inikb/endpoint/data/v1/action/deleteOne';

let id = '';

const MongoDelete = async (request, event) => {

    if (request.params.id) {
        id = request.params.id;
    } else {
        id = '';
    }

    try {

        async function deleteDocument() {
            try {

                const data = {
                    "collection": "gmwebsite",
                    "database": "gmadb",
                    "dataSource": "giobot",
                    "filter": { "_id": { "$oid": `${id}` } },
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

                const MongoResponse = await fetch(MongoUrl, options);

                if (!MongoResponse.ok) {
                    const message = `\n Bad fetch: ${MongoResponse.status}`;
                    console.log(message, ' Response is: ', MongoResponse.body, MongoResponse.headers, MongoResponse.statusText);
                    return new Response(`Error : ${message}`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
                            'Access-Control-Max-Age': '86400',
                        }
                    });
                }
                else {
                    const MongoData = await MongoResponse.json();
                    
                    return MongoData;
                }

            } catch (error) {
                console.log("useToken() internal error occurred: ", error.message);
                return new Response(`Error : ${error.message}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
                        'Access-Control-Max-Age': '86400',
                    }
                });
            }
        }

        const MongoData = await deleteDocument();
        
        console.log("MongoDelete sucessfull" , MongoData);

        return new Response(JSON.stringify(MongoData ), {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
                'Access-Control-Max-Age': '86400',
            }
        });
    }
    catch (error) {
        console.error("Failed MongoDelete call : ", error.message);
        return new Response(`Error : ${error.message}`, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
                'Access-Control-Max-Age': '86400',
            }
        });
    }
};
export default MongoDelete;