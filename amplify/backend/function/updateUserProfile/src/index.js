exports.handler = async (event) => {
    // TODO implement
    console.log(event.body);

    const AWS = require("aws-sdk");

    const docClient = new AWS.DynamoDB.DocumentClient();

    const val = await docClient.put({
        TableName: 'UserProfile',
        Item: JSON.parse(event.body)
    }).promise();

    const response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*"
        },
        body: JSON.stringify(val)
    };

    return response;
};