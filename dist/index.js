(() => {
  // node_modules/itty-router/dist/itty-router.min.mjs
  function e({ base: t = "", routes: n = [] } = {}) {
    return { __proto__: new Proxy({}, { get: (e2, a, o) => (e3, ...r) => n.push([a.toUpperCase(), RegExp(`^${(t + e3).replace(/(\/?)\*/g, "($1.*)?").replace(/(\/$)|((?<=\/)\/)/, "").replace(/:(\w+)(\?)?(\.)?/g, "$2(?<$1>[^/]+)$2$3").replace(/\.(?=[\w(])/, "\\.").replace(/\)\.\?\(([^\[]+)\[\^/g, "?)\\.?($1(?<=\\.)[^\\.")}/*$`), r]) && o }), routes: n, async handle(e2, ...r) {
      let a, o, t2 = new URL(e2.url);
      e2.query = Object.fromEntries(t2.searchParams);
      for (var [p, s, u] of n)
        if ((p === e2.method || "ALL" === p) && (o = t2.pathname.match(s))) {
          e2.params = o.groups;
          for (var c of u)
            if (void 0 !== (a = await c(e2.proxy || e2, ...r)))
              return a;
        }
    } };
  }

  // src/handlers/tests.js
  var testUrl = "https://swapi.dev/api/people/1/";
  var Tests = async () => {
    try {
      const response = await fetch(testUrl);
      if (!response.ok) {
        const message = `Bad response: ${response.status}`;
        throw new Error(message);
      } else {
        const data = await response.json();
        return new Response(JSON.stringify(data), {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
            "Access-Control-Max-Age": "86400"
          }
        });
      }
    } catch (error) {
      console.error("Failed GET for stock data: " + error);
    }
  };
  var tests_default = Tests;

  // src/handlers/test.js
  var testUrl2 = "https://swapi.dev/api/people/";
  var Test = async (request, event) => {
    const swapid = request.params.id;
    try {
      const response = await fetch(testUrl2 + `${swapid}/`);
      if (!response.ok) {
        const message = `Bad response: ${response.status}`;
        throw new Error(message);
      } else {
        const data = await response.json();
        return new Response(JSON.stringify(data), {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
            "Access-Control-Max-Age": "86400"
          }
        });
      }
    } catch (error) {
      console.error("Failed GET for stock data: " + error);
    }
  };
  var test_default = Test;

  // src/handlers/OpenAi/apitest.js
  var userPrompt = "Chicken Nuggets";
  var ApiTest = async (request, event) => {
    try {
      const completion = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: userPrompt
      });
      console.log(completion);
      completion.catch((error) => console.error("caught error!", error));
      console.log(completion.data.choices[0].text);
      return new Response(JSON.stringify(completion.data.choices[0].text), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
          "Access-Control-Max-Age": "86400"
        }
      });
    } catch (error) {
      console.error("Failed GET for openai data: " + error);
    }
  };
  var apitest_default = ApiTest;

  // src/handlers/Spotify/artist.js
  var baseUrl = "https://accounts.spotify.com/api/token";
  var artistUrlBase = "https://api.spotify.com/v1/artists/";
  var artistID = "7bSpQNOg9UsW530DuXM3X5";
  var Artist = async (request, event) => {
    if (request.params.artistID) {
      artistID = request.params.artistID;
    } else {
      artistID = "7bSpQNOg9UsW530DuXM3X5";
    }
    try {
      const response = await fetch(baseUrl, {
        method: "POST",
        body: "grant_type=client_credentials&client_id=" + SPOTIFY_CLIENT_ID + "&client_secret=" + SPOTIFY_CLIENT_TOKEN,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });
      if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
      } else {
        const token = await response.json();
        try {
          const dataResponse = await fetch(artistUrlBase + artistID, {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token.access_token}`,
              "Content-Type": "application/json"
            }
          });
          if (!dataResponse.ok) {
            const message = `Could not get spotify data : ${dataResponse.status}`;
            throw new Error(message);
          } else {
            const data = await dataResponse.json();
            return new Response(JSON.stringify(data), {
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
                "Access-Control-Max-Age": "86400"
              }
            });
          }
        } catch (error) {
          console.log("Error in getSpotifyAPI() data transfer : " + error);
        }
      }
    } catch (error) {
      console.error("Failed GET for Spotify data: " + error);
    }
  };
  var artist_default = Artist;

  // src/handlers/Spotify/artists.js
  var baseUrl2 = "https://accounts.spotify.com/api/token";
  var artistUrlBase2 = "https://api.spotify.com/v1/artists/";
  var artistID2 = "7bSpQNOg9UsW530DuXM3X5";
  var Artists = async (request, event) => {
    try {
      const response = await fetch(baseUrl2, {
        method: "POST",
        body: "grant_type=client_credentials&client_id=" + SPOTIFY_CLIENT_ID + "&client_secret=" + SPOTIFY_CLIENT_TOKEN,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });
      if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
      } else {
        const token = await response.json();
        try {
          const dataResponse = await fetch(artistUrlBase2 + artistID2, {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token.access_token}`,
              "Content-Type": "application/json"
            }
          });
          if (!dataResponse.ok) {
            const message = `Could not get spotify data : ${dataResponse.status}`;
            throw new Error(message);
          } else {
            const data = await dataResponse.json();
            return new Response(JSON.stringify(data), {
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
                "Access-Control-Max-Age": "86400"
              }
            });
          }
        } catch (error) {
          console.log("Error in getSpotifyAPI() data transfer : " + error);
        }
      }
    } catch (error) {
      console.error("Failed GET for Spotify data: " + error);
    }
  };
  var artists_default = Artists;

  // src/handlers/Financial/stock.js
  var polygonUrlBase = "https://api.polygon.io/v1/open-close/";
  var symbol = "AAPL";
  var date = "2022-08-03";
  var adjusted = "true";
  var Stockticker = async (request, event) => {
    if (request.params.symbol) {
      symbol = request.params.symbol;
    } else {
      symbol = "AAPL";
    }
    if (request.params.date) {
      date = request.params.date;
    } else {
      date = "2022-08-03";
    }
    if (request.params.adjusted) {
      adjusted = request.params.adjusted;
    } else {
      adjusted = "true";
    }
    try {
      const response = await fetch(polygonUrlBase + `${symbol}/${date}/?adjusted=${adjusted}&apiKey=${POLYGON_API_KEY}`);
      if (!response.ok) {
        const message = `Bad response: ${response.status}`;
        res.status(401).send("Could not find ticker symbol or other issue");
        throw new Error(message);
      } else {
        const data = await response.json();
        return new Response(JSON.stringify(data), {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
            "Access-Control-Max-Age": "86400"
          }
        });
      }
    } catch (error) {
      console.error("Failed GET for Polygon data: " + error);
    }
  };
  var stock_default = Stockticker;

  // src/handlers/Financial/cryptoTicker.js
  var polygonUrlBaseCrypto = "https://api.polygon.io/v2/aggs/ticker/";
  var cryptoTicker = "X:BTCUSD";
  var adjusted2 = "true";
  var CryptoTicker = async (request, event) => {
    if (request.params.cryptoTicker) {
      cryptoTicker = request.params.cryptoTicker;
    } else {
      cryptoTicker = "X:BTCUSD";
    }
    if (request.params.adjusted) {
      adjusted2 = request.params.adjusted;
    } else {
      adjusted2 = "true";
    }
    try {
      const response = await fetch(polygonUrlBaseCrypto + `${cryptoTicker}/prev?adjusted=${adjusted2}&apiKey=${POLYGON_API_KEY}`);
      if (!response.ok) {
        const message = `Bad response: ${response.status}`;
        res.status(401).send("Could not find ticker symbol or other issue");
        throw new Error(message);
      } else {
        const data = await response.json();
        return new Response(JSON.stringify(data), {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
            "Access-Control-Max-Age": "86400"
          }
        });
      }
    } catch (error) {
      console.error("Failed GET for Crypto data: " + error);
    }
  };
  var cryptoTicker_default = CryptoTicker;

  // src/handlers/Financial/nft.js
  var openseaUrlBase = "https://api.opensea.io/api/v1/collection/";
  var collectionName = "cryptopunks";
  var NftTicker = async (request, event) => {
    if (request.params.collectionName) {
      collectionName = request.params.collectionName;
    } else {
      collectionName = "cryptopunks";
    }
    try {
      const nftOptions = { method: "GET" };
      const response = await fetch(openseaUrlBase + `/${collectionName}`, nftOptions);
      if (!response.ok) {
        const message = `Bad response: ${response.status}`;
        res.status(401).send("Could not find ticker symbol or other issue");
        throw new Error(message);
      } else {
        const data = await response.json();
        return new Response(JSON.stringify(data), {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
            "Access-Control-Max-Age": "86400"
          }
        });
      }
    } catch (error) {
      console.error("Failed GET for Nft data: " + error);
    }
  };
  var nft_default = NftTicker;

  // src/handlers/Financial/gov.js
  var GovData = async (request, event) => {
    try {
      const response = await fetch("https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v2/accounting/od/debt_outstanding?sort=-record_date");
      if (!response.ok) {
        const message = `Bad response: ${response.status}`;
        res.status(401).send("Could not find ticker symbol or other issue");
        throw new Error(message);
      } else {
        const data = await response.json();
        return new Response(JSON.stringify(data), {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
            "Access-Control-Max-Age": "86400"
          }
        });
      }
    } catch (error) {
      console.error("Failed GET for Polygon data: " + error);
    }
  };
  var gov_default = GovData;

  // src/handlers/Arduino/codeLedToggleON.js
  var ArduinoUrl = "https://api2.arduino.cc/iot/v1/clients/token";
  var thingsURL = "https://api2.arduino.cc/iot/v2/things?show_properties=true";
  var propertiesPublishUrl = "https://api2.arduino.cc/iot/v2/things";
  var CodeLedToggleON = async (request, event) => {
    try {
      async function getToken() {
        let options = {
          method: "POST",
          body: "grant_type=client_credentials&client_id=" + ARDUINO_CLIENT_ID + "&client_secret=" + ARDUINO_SECRET_TOKEN + "&audience=https://api2.arduino.cc/iot",
          headers: { "content-type": "application/x-www-form-urlencoded" }
        };
        try {
          const response = await fetch(ArduinoUrl, options);
          console.log(response.status);
          if (!response.ok) {
            const message = `Bad response: ${response.status}`;
            throw new Error(message);
          } else {
            const tokenPackage = await response.json();
            const token = tokenPackage["access_token"];
            return token;
          }
        } catch (error) {
          console.error("Failed getting an Arduino access token: " + error);
        }
      }
      async function useToken() {
        try {
          const token = await getToken();
          let options2 = {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          };
          try {
            const response = await fetch(thingsURL, options2);
            if (!response.ok) {
              const message = `
 An error has occured: ${response.status}`;
              throw new Error(message);
            } else {
              const data = await response.json();
              try {
                let options3 = {
                  method: "PUT",
                  headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                    "value": true
                  })
                };
                const urlTemp = `${propertiesPublishUrl}/${data[0].id}/properties/${data[0].properties[2].id}/publish`;
                const response2 = await fetch(urlTemp, options3);
                if (!response2.ok) {
                  const message = `
 Bad response PUT : ${response2.status}`;
                  throw new Error(message);
                }
                return response2;
              } catch (error) {
                console.error("\n Failed POST properties update request: ", error);
              }
            }
          } catch (error) {
            console.error("\n Failed GET things request: ", error);
          }
        } catch (error) {
          console.log("useToken() error occurred: ", error);
        }
      }
      const arduinoResponse = await useToken();
      return new Response(JSON.stringify("LED_ON " + arduinoResponse.status), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
          "Access-Control-Max-Age": "86400"
        }
      });
    } catch (error) {
      console.error("Failed CodeLedToggleON function call : " + error);
    }
  };
  var codeLedToggleON_default = CodeLedToggleON;

  // src/handlers/Arduino/webSiteLedToggleON.js
  var ArduinoUrl2 = "https://api2.arduino.cc/iot/v1/clients/token";
  var thingsURL2 = "https://api2.arduino.cc/iot/v2/things?show_properties=true";
  var propertiesPublishUrl2 = "https://api2.arduino.cc/iot/v2/things";
  var webSiteLedToggleON = async (request, event) => {
    try {
      async function getToken() {
        let options = {
          method: "POST",
          body: "grant_type=client_credentials&client_id=" + ARDUINO_CLIENT_ID + "&client_secret=" + ARDUINO_SECRET_TOKEN + "&audience=https://api2.arduino.cc/iot",
          headers: { "content-type": "application/x-www-form-urlencoded" }
        };
        try {
          const response = await fetch(ArduinoUrl2, options);
          console.log(response.status);
          if (!response.ok) {
            const message = `Bad response: ${response.status}`;
            throw new Error(message);
          } else {
            const tokenPackage = await response.json();
            const token = tokenPackage["access_token"];
            return token;
          }
        } catch (error) {
          console.error("Failed getting an Arduino access token: " + error);
        }
      }
      async function useToken() {
        try {
          const token = await getToken();
          let options2 = {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          };
          try {
            const response = await fetch(thingsURL2, options2);
            if (!response.ok) {
              const message = `
 An error has occured: ${response.status}`;
              throw new Error(message);
            } else {
              const data = await response.json();
              try {
                let options3 = {
                  method: "PUT",
                  headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                    "value": true
                  })
                };
                const urlTemp = `${propertiesPublishUrl2}/${data[0].id}/properties/${data[0].properties[3].id}/publish`;
                const response2 = await fetch(urlTemp, options3);
                if (!response2.ok) {
                  const message = `
 Bad response PUT : ${response2.status}`;
                  throw new Error(message);
                }
                return response2;
              } catch (error) {
                console.error("\n Failed POST properties update request: ", error);
              }
            }
          } catch (error) {
            console.error("\n Failed GET things request: ", error);
          }
        } catch (error) {
          console.log("useToken() error occurred: ", error);
        }
      }
      const arduinoResponse = await useToken();
      console.log("arduinoResponse:", arduinoResponse);
      return new Response(JSON.stringify("Connection to API is live, LED is on." + arduinoResponse.status), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
          "Access-Control-Max-Age": "86400"
        }
      });
    } catch (error) {
      console.error("Failed webSiteLedToggleOn function call : ", error);
    }
  };
  var webSiteLedToggleON_default = webSiteLedToggleON;

  // src/handlers/Arduino/codeLedToggleOFF.js
  var ArduinoUrl3 = "https://api2.arduino.cc/iot/v1/clients/token";
  var thingsURL3 = "https://api2.arduino.cc/iot/v2/things?show_properties=true";
  var propertiesPublishUrl3 = "https://api2.arduino.cc/iot/v2/things";
  var CodeLedToggleOFF = async (request, event) => {
    try {
      async function getToken() {
        let options = {
          method: "POST",
          body: "grant_type=client_credentials&client_id=" + ARDUINO_CLIENT_ID + "&client_secret=" + ARDUINO_SECRET_TOKEN + "&audience=https://api2.arduino.cc/iot",
          headers: { "content-type": "application/x-www-form-urlencoded" }
        };
        try {
          const response = await fetch(ArduinoUrl3, options);
          console.log(response.status);
          if (!response.ok) {
            const message = `Bad response: ${response.status}`;
            throw new Error(message);
          } else {
            const tokenPackage = await response.json();
            const token = tokenPackage["access_token"];
            return token;
          }
        } catch (error) {
          console.error("Failed getting an Arduino access token: " + error);
        }
      }
      async function useToken() {
        try {
          const token = await getToken();
          let options2 = {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          };
          try {
            const response = await fetch(thingsURL3, options2);
            if (!response.ok) {
              const message = `
 An error has occured: ${response.status}`;
              throw new Error(message);
            } else {
              const data = await response.json();
              try {
                let options3 = {
                  method: "PUT",
                  headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                    "value": false
                  })
                };
                const urlTemp = `${propertiesPublishUrl3}/${data[0].id}/properties/${data[0].properties[2].id}/publish`;
                const response2 = await fetch(urlTemp, options3);
                if (!response2.ok) {
                  const message = `
 Bad response PUT : ${response2.status}`;
                  throw new Error(message);
                }
                return response2;
              } catch (error) {
                console.error("\n Failed POST properties update request: ", error);
              }
            }
          } catch (error) {
            console.error("\n Failed GET things request: ", error);
          }
        } catch (error) {
          console.log("useToken() error occurred: ", error);
        }
      }
      const arduinoResponse = await useToken();
      return new Response(JSON.stringify("LED_OFF " + arduinoResponse.status), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
          "Access-Control-Max-Age": "86400"
        }
      });
    } catch (error) {
      console.error("Failed CodeLedToggleOFF function call : " + error);
    }
  };
  var codeLedToggleOFF_default = CodeLedToggleOFF;

  // src/handlers/Arduino/codeLedSTATUS.js
  var ArduinoUrl4 = "https://api2.arduino.cc/iot/v1/clients/token";
  var thingsURL4 = "https://api2.arduino.cc/iot/v2/things?show_properties=true";
  var CodeLedSTATUS = async (request, event) => {
    try {
      async function getToken() {
        let options = {
          method: "POST",
          body: "grant_type=client_credentials&client_id=" + ARDUINO_CLIENT_ID + "&client_secret=" + ARDUINO_SECRET_TOKEN + "&audience=https://api2.arduino.cc/iot",
          headers: { "content-type": "application/x-www-form-urlencoded" }
        };
        try {
          const response = await fetch(ArduinoUrl4, options);
          console.log(response.status);
          if (!response.ok) {
            const message = `Bad response: ${response.status}`;
            throw new Error(message);
          } else {
            const tokenPackage = await response.json();
            const token = tokenPackage["access_token"];
            return token;
          }
        } catch (error) {
          console.error("Failed getting an Arduino access token: " + error);
        }
      }
      async function useToken() {
        try {
          const token = await getToken();
          let options2 = {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          };
          try {
            const arduinoResponse2 = await fetch(thingsURL4, options2);
            if (!arduinoResponse2.ok) {
              const message = `
 An error has occured: ${arduinoResponse2.status}`;
              throw new Error(message);
            } else {
              const arduinoData2 = await arduinoResponse2.json();
              console.log(" Response: \n", arduinoResponse2);
              return { arduinoData: arduinoData2, arduinoResponse: arduinoResponse2 };
            }
          } catch (error) {
            console.error("\n Failed GET things request: ", error);
          }
        } catch (error) {
          console.log("useToken() error occurred: ", error);
        }
      }
      const { arduinoData, arduinoResponse } = await useToken();
      console.log(" Data: \n", arduinoData[0].properties[2]);
      return new Response(JSON.stringify(
        {
          value: `${arduinoData[0].properties[2].last_value}`,
          name: `${arduinoData[0].properties[2].name}`,
          status: `${arduinoResponse.status}`
        }
      ), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
          "Access-Control-Max-Age": "86400"
        }
      });
    } catch (error) {
      console.error("Failed CodeLedToggleSTATUS function call : " + error);
    }
  };
  var codeLedSTATUS_default = CodeLedSTATUS;

  // src/handlers/Mongo/MongoBackend.js
  var MongoUrl = "https://data.mongodb-api.com/app/data-inikb/endpoint/data/v1/action/find";
  var MongoBackend = async (request, event) => {
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
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Request-Headers": "*",
              "api-key": MDB_TOKEN
            },
            body: JSON.stringify(data)
          };
          console.log("Function is running calling... ");
          console.log(options, options.headers, options.body);
          const MongoResponse = await fetch(MongoUrl, options);
          if (!MongoResponse.ok) {
            const message = `
 Bad fetch: ${MongoResponse.status}`;
            console.log(message, " Response is: ", MongoResponse.body, MongoResponse.headers, MongoResponse.statusText);
          } else {
            const MongoData2 = await MongoResponse.json();
            console.log(MongoData2);
            return MongoData2;
          }
        } catch (error) {
          console.log("useToken() internal error occurred: ", error.message);
        }
      }
      const MongoData = await getAll();
      console.log("MongoData is", MongoData?.documents[0]);
      return new Response(JSON.stringify(MongoData?.documents ?? "Not found"), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
          "Access-Control-Max-Age": "86400"
        }
      });
    } catch (error) {
      console.error("Failed MongoBackend call : ", error.message);
    }
  };
  var MongoBackend_default = MongoBackend;

  // src/handlers/Mongo/MongoCreate.js
  var MongoUrl2 = "https://data.mongodb-api.com/app/data-inikb/endpoint/data/v1/action/insertOne";
  var name = "none";
  var social = ["1", "2"];
  var plug = "";
  var date2 = "2022-12-08T01:11:18.965Z";
  var MongoCreate = async (request, event) => {
    if (request.params.name) {
      name = request.params.name;
    } else {
      name = "none";
    }
    if (request.params.social) {
      social = request.params.social;
    } else {
      social = ["1", "2"];
    }
    if (request.params.plug) {
      plug = request.params.plug;
    } else {
      plug = "";
    }
    if (request.params.date) {
      date2 = request.params.date;
    } else {
      date2 = "2022-12-08T01:11:18.965Z";
    }
    try {
      async function createDocument() {
        try {
          const data = {
            "collection": "gmwebsite",
            "database": "gmadb",
            "dataSource": "giobot",
            "document": {
              "name": `${name}`,
              "social": [
                `${social}`
              ],
              "plug": `${plug}`,
              "date": `${date2}`
            }
          };
          let options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Request-Headers": "*",
              "api-key": MDB_TOKEN
            },
            body: JSON.stringify(data)
          };
          console.log("Function is running calling... ");
          console.log(options, options.headers, options.body);
          const MongoResponse = await fetch(MongoUrl2, options);
          if (!MongoResponse.ok) {
            const message = `
 Bad fetch: ${MongoResponse.status}`;
            console.log(message, " Response is: ", MongoResponse.body, MongoResponse.headers, MongoResponse.statusText);
            return new Response(`Error : ${message}`, {
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
                "Access-Control-Max-Age": "86400"
              }
            });
          } else {
            const MongoData2 = await MongoResponse.json();
            console.log(MongoData2);
            return MongoData2;
          }
        } catch (error) {
          console.log("useToken() internal error occurred: ", error.message);
          return new Response(`Error : ${error.message}`, {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
              "Access-Control-Max-Age": "86400"
            }
          });
        }
      }
      const MongoData = await createDocument();
      console.log("MongoCreate sucessfull", MongoData);
      return new Response(JSON.stringify(MongoData), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
          "Access-Control-Max-Age": "86400"
        }
      });
    } catch (error) {
      console.error("Failed MongoCreate call : ", error.message);
      return new Response(`Error : ${error.message}`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
          "Access-Control-Max-Age": "86400"
        }
      });
    }
  };
  var MongoCreate_default = MongoCreate;

  // src/handlers/Mongo/MongoUpdate.js
  var MongoUrl3 = "https://data.mongodb-api.com/app/data-inikb/endpoint/data/v1/action/updateOne";
  var id = "";
  var name2 = "none";
  var social2 = ["1", "2"];
  var plug2 = "";
  var date3 = "2022-12-08T01:11:18.965Z";
  var MongoUpdate = async (request, event) => {
    if (request.params.id) {
      id = request.params.id;
    } else {
      id = "";
    }
    if (request.params.name) {
      name2 = request.params.name;
    } else {
      name2 = "none";
    }
    if (request.params.social) {
      social2 = request.params.social;
    } else {
      social2 = ["1", "2"];
    }
    if (request.params.plug) {
      plug2 = request.params.plug;
    } else {
      plug2 = "";
    }
    if (request.params.date) {
      date3 = request.params.date;
    } else {
      date3 = "2022-12-08T01:11:18.965Z";
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
                "name": `${name2}`,
                "social": [
                  `${social2}`
                ],
                "plug": `${plug2}`,
                "date": `${date3}`
              }
            }
          };
          let options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Request-Headers": "*",
              "api-key": MDB_TOKEN
            },
            body: JSON.stringify(data)
          };
          const MongoResponse = await fetch(MongoUrl3, options);
          if (!MongoResponse.ok) {
            const message = `
 Bad fetch: ${MongoResponse.status}`;
            console.log(message, " Response is: ", MongoResponse.body, MongoResponse.headers, MongoResponse.statusText);
            return new Response(`Error : ${message}`, {
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
                "Access-Control-Max-Age": "86400"
              }
            });
          } else {
            const MongoData2 = await MongoResponse.json();
            return MongoData2;
          }
        } catch (error) {
          console.log("useToken() internal error occurred: ", error.message);
          return new Response(`Error : ${error.message}`, {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
              "Access-Control-Max-Age": "86400"
            }
          });
        }
      }
      const MongoData = await updateDocument();
      console.log("MongoUpdate sucessfull", MongoData);
      return new Response(JSON.stringify(MongoData), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
          "Access-Control-Max-Age": "86400"
        }
      });
    } catch (error) {
      console.error("Failed MongoUpdate call : ", error.message);
      return new Response(`Error : ${error.message}`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
          "Access-Control-Max-Age": "86400"
        }
      });
    }
  };
  var MongoUpdate_default = MongoUpdate;

  // src/handlers/Mongo/MongoDelete.js
  var MongoUrl4 = "https://data.mongodb-api.com/app/data-inikb/endpoint/data/v1/action/deleteOne";
  var id2 = "";
  var MongoDelete = async (request, event) => {
    if (request.params.id) {
      id2 = request.params.id;
    } else {
      id2 = "";
    }
    try {
      async function deleteDocument() {
        try {
          const data = {
            "collection": "gmwebsite",
            "database": "gmadb",
            "dataSource": "giobot",
            "filter": { "_id": { "$oid": `${id2}` } }
          };
          let options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Request-Headers": "*",
              "api-key": MDB_TOKEN
            },
            body: JSON.stringify(data)
          };
          const MongoResponse = await fetch(MongoUrl4, options);
          if (!MongoResponse.ok) {
            const message = `
 Bad fetch: ${MongoResponse.status}`;
            console.log(message, " Response is: ", MongoResponse.body, MongoResponse.headers, MongoResponse.statusText);
            return new Response(`Error : ${message}`, {
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
                "Access-Control-Max-Age": "86400"
              }
            });
          } else {
            const MongoData2 = await MongoResponse.json();
            return MongoData2;
          }
        } catch (error) {
          console.log("useToken() internal error occurred: ", error.message);
          return new Response(`Error : ${error.message}`, {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
              "Access-Control-Max-Age": "86400"
            }
          });
        }
      }
      const MongoData = await deleteDocument();
      console.log("MongoDelete sucessfull", MongoData);
      return new Response(JSON.stringify(MongoData), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
          "Access-Control-Max-Age": "86400"
        }
      });
    } catch (error) {
      console.error("Failed MongoDelete call : ", error.message);
      return new Response(`Error : ${error.message}`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
          "Access-Control-Max-Age": "86400"
        }
      });
    }
  };
  var MongoDelete_default = MongoDelete;

  // wrangler-module-Text:./6b79c8eaecc7f2d0c9a270746421c1027c9750f9-index.html
  var b79c8eaecc7f2d0c9a270746421c1027c9750f9_index_default = __6b79c8eaecc7f2d0c9a270746421c1027c9750f9_index_html;

  // src/index.js
  var router = e();
  router.get("/api", () => new Response(b79c8eaecc7f2d0c9a270746421c1027c9750f9_index_default, {
    headers: { "content-type": "text/html" }
  }));
  router.get("/api/tests", tests_default);
  router.get("/api/test/:id", test_default);
  router.get("/api/OpenAi/:userPrompt", apitest_default);
  router.get("/api/Spotify", artists_default);
  router.get("/api/Spotify/:artistID", artist_default);
  router.get("/api/Stock/:symbol/:date/:adjusted", stock_default);
  router.get("/api/Crypto/:cryptoTicker/:adjusted", cryptoTicker_default);
  router.get("/api/Nft/:collectionName", nft_default);
  router.get("/api/Gov", gov_default);
  router.get("/api/Arduino/ToggleON", codeLedToggleON_default);
  router.get("/api/Arduino/ToggleOFF", codeLedToggleOFF_default);
  router.get("/api/Arduino/STATUS", codeLedSTATUS_default);
  router.get("/api/Arduino/TestConnection", webSiteLedToggleON_default);
  router.get("/api/Mongo", MongoBackend_default);
  router.get("/api/MongoCreate/:name/:social/:plug/:date", MongoCreate_default);
  router.get("/api/MongoUpdate/:id/:name/:social/:plug/:date", MongoUpdate_default);
  router.get("/api/MongoDelete/:id", MongoDelete_default);
  router.get("*", () => new Response("Whatever you did is not valid! ~ Did not find an endpoint for this please try again\u{1F615} ~ \u{1F334}\u2600\uFE0F", { status: 404 }));
  addEventListener(
    "fetch",
    (event) => event.respondWith(router.handle(event.request))
  );
})();
//# sourceMappingURL=index.js.map
