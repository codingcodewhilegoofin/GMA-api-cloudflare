let userPrompt = 'Chicken Nuggets';

const ApiTest = async (request, event) => {

    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-002",
            prompt: userPrompt,
        });

        console.log(completion);

        completion.catch(error => console.error('caught error!', error));

        console.log(completion.data.choices[0].text);

        //console.log(completion.data.choices[0].text);
        return new Response(JSON.stringify(completion.data.choices[0].text), {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
                'Access-Control-Max-Age': '86400',
            }
        });
    }
    catch (error) {
        console.error("Failed GET for openai data: " + error);
    }
};
export default ApiTest;