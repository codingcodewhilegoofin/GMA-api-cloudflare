//Mongo URL
const MongoUrl = 'https://data.mongodb-api.com/app/data-inikb/endpoint/data/v1/action/updateOne';

let id = '';
let name = 'none';
let social = ['1', '2'];
let plug = '';
let date = '2022-12-08T01:11:18.965Z';

const MongoUpdate = async (request, event) => {

    if (request.params.id) {
        id = request.params.id;
    } else {
        id = '';
    }

    if (request.params.name) {
        name = request.params.name;
    } else {
        name = 'none';
    }

    if (request.params.social) {
        social = request.params.social;
    } else {
        social = ['1', '2'];
    }

    if (request.params.plug) {
        plug = request.params.plug;
    } else {
        plug = '';
    }

    if (request.params.date) {
        date = request.params.date;
    } else {
        date = '2022-12-08T01:11:18.965Z';
    }
  
    try {

        async function updateDocument() {
            try {

                const data = {
                    "collection": "gmwebsite",
                    "database": "gmadb",
                    "dataSource": "giobot",
                    "filter": { "_id": { "$oid": `${id}` } },
                    "update": {
                        "$set": {
                            "name": `${name}`,
                            "social": [
                                `${social}`,
                            ],
                            "plug": `${plug}`,
                            "date": `${date}`,
                        }
                    }
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

        const MongoData = await updateDocument();

        console.log("MongoUpdate sucessfull", MongoData);

        return new Response(JSON.stringify(MongoData), {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
                'Access-Control-Max-Age': '86400',
            }
        });
    }
    catch (error) {
        console.error("Failed MongoUpdate call : ", error.message);
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
export default MongoUpdate;