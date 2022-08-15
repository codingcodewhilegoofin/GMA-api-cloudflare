/* import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
}); */
//const openai = new OpenAIApi(configuration);

//Open AI 
let userPrompt = 'Chicken Nuggets';

const ApiTest = async (request, event) => {

    //const userPrompt = request.params.userPrompt;

    try {

        /* if (request.params.userPrompt) {
            userPrompt = request.params.userPrompt;
        }  */

        console.log(request.params.userPrompt);
        console.log(userPrompt);
        console.log(openai);


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
                'Content-Type': 'application/json'
            }
        });

    }
    catch (error) {
        console.error("Failed GET for openai data: " + error);
    }
};
export default ApiTest;