//Arduino Url
const ArduinoUrl = 'https://api2.arduino.cc/iot/v1/clients/token';
const thingsURL = "https://api2.arduino.cc/iot/v2/things?show_properties=true";
const propertiesPublishUrl = "https://api2.arduino.cc/iot/v2/things";

const CodeLedSTATUS = async (request, event) => {

    try {

        // Turn on LED on website and board 
        async function getToken() {
            let options = {
                method: 'POST',
                body: 'grant_type=client_credentials&client_id=' + ARDUINO_CLIENT_ID + '&client_secret=' + ARDUINO_SECRET_TOKEN + '&audience=' + 'https://api2.arduino.cc/iot',
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
            };

            try {
                const response = await fetch(ArduinoUrl, options);

                console.log(response.status);

                if (!response.ok) {
                    const message = `Bad response: ${response.status}`;
                    throw new Error(message);
                }
                else {

                    const tokenPackage = await response.json();
                    const token = (tokenPackage['access_token']);

                    return token;
                }
            }
            catch (error) {
                console.error("Failed getting an Arduino access token: " + error);
            }
        }

        async function useToken() {
            try {

                const token = await getToken();

                let options2 = {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                };

                try {

                    const arduinoResponse = await fetch(thingsURL, options2);

                    if (!arduinoResponse.ok) {
                        const message = `\n An error has occured: ${arduinoResponse.status}`;

                        throw new Error(message);
                    }
                    else {

                        const arduinoData = await arduinoResponse.json();

                        return {arduinoData, arduinoResponse };
                    }
                }
                catch (error) {
                    console.error("\n Failed GET things request: ", error);
                }

            } catch (error) {
                console.log("useToken() error occurred: ", error);
            }
        }

        const {arduinoData, arduinoResponse}  = await useToken();

        return new Response(JSON.stringify({
            value: `${arduinoData[0].properties[1].last_value}`,
            name: `${arduinoData[0].properties[1].name}`,
            status: `${arduinoResponse.status}`,
            }
        ), {headers: {'Content-Type': 'application/json'}});
    }
    catch (error) {
        console.error("Failed CodeLedToggleSTATUS function call : " + error);
        //res.status(401).send("Could not find ticker symbol or other issue");
    }
};
export default CodeLedSTATUS;