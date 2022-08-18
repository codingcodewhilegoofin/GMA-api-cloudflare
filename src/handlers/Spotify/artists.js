//Spotify
const baseUrl = 'https://accounts.spotify.com/api/token';
const artistUrlBase = 'https://api.spotify.com/v1/artists/';
let artistID = '7bSpQNOg9UsW530DuXM3X5';

const Artists = async (request, event) => {


    try {

        const response = await fetch(baseUrl, {
            method: 'POST',
            body: 'grant_type=client_credentials&client_id=' + SPOTIFY_CLIENT_ID + '&client_secret=' + SPOTIFY_CLIENT_TOKEN,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            throw new Error(message);
        }
        else {

            //response.json() is a method on the Response object that lets you extract a JSON object from the response
            const token = await response.json();

            try {
                const dataResponse = await fetch((artistUrlBase + artistID), {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token.access_token}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (!dataResponse.ok) {
                    const message = `Could not get spotify data : ${dataResponse.status}`;
                    throw new Error(message);
                }
                else {

                    //response.json() is a method on the Response object that lets you extract a JSON object from the response
                    const data = await dataResponse.json();

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
                console.log("Error in getSpotifyAPI() data transfer : " + error);
            }
        }
    }
    catch (error) {
        console.error("Failed GET for Spotify data: " + error);
        //res.status(401).send("Could not find ticker symbol or other issue");
    }
};
export default Artists;