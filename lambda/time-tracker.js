const AWS = require("aws-sdk");

const customerDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
    const TABLE= 'TimeTracker'
    let body;
    let statusCode = 200;
    const headers = {
        "Content-Type": "application/json"
    };

    let path = event.resource;
    let httpMethod = event.httpMethod;
    let route = httpMethod.concat(' ').concat(path);

    try {
        switch (route) {
            case "GET /time-tracker":
                body = await customerDB.scan({TableName: TABLE}).promise();
                break;
            case "GET /time-tracker/{id}":
                body = await customerDB
                    .get({
                        TableName: TABLE,
                        Key: {
                            id: event.pathParameters.id
                        }
                    })
                    .promise();
                break;
            case "PUT /time-tracker":
                let requestJSON = JSON.parse(event.body);
                await customerDB
                    .put({
                        TableName: TABLE,
                        Item: {
                            id: requestJSON.id,
                            month: requestJSON.month,
                            week: requestJSON.week,
                            day:requestJSON.day,
                            task:requestJSON.task,
                            time:requestJSON.time
                        }
                    })
                    .promise();
                body = `Put item ${requestJSON.id}`;
                break;
            case "DELETE /time-tracker/{id}":
                await customerDB
                    .delete({
                        TableName: TABLE,
                        Key: {
                            id: event.pathParameters.id
                        }
                    })
                    .promise();
                body = `Deleted item ${event.pathParameters.id}`;
                break;

            default:
                throw new Error(`Unsupported route: "${route}"`);
        }
    } catch (err) {
        console.log(err)
        statusCode = 400;
        body = err.message;
    } finally {
        console.log(body)
        body = JSON.stringify(body);
    }

    return {
        statusCode,
        body,
        headers
    };
};