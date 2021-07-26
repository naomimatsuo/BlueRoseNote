exports.handler = async (event) => {
    // TODO implement
    const AWS = require("aws-sdk");

    const docClient = new AWS.DynamoDB.DocumentClient();

    console.log(event);

    const val = await docClient.query({
        TableName: 'RecordTweet',
        Limit: 15,
        ScanIndexForward: false,
        KeyConditionExpression: "#x = :val",
        ExpressionAttributeNames: { "#x": "clientId" },
        ExpressionAttributeValues: { ":val": event.clientId },
        ExclusiveStartKey: event.lastEvaluatedKey
    }).promise();

    const response = {
        statusCode: 200,
        //  Uncomment below to enable CORS requests
        //  headers: {
        //      "Access-Control-Allow-Origin": "*",
        //      "Access-Control-Allow-Headers": "*"
        //  },
        body: JSON.stringify(val)
    };
    return response;
};