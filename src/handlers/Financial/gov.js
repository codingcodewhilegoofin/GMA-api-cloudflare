
const GovData = async (request, event) => {

    try {
        const response = await fetch('https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v2/accounting/od/debt_outstanding?sort=-record_date');

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
        console.error("Failed GET for Polygon data: " + error);
        //res.status(401).send("Could not find ticker symbol or other issue");
    }
};
export default GovData;