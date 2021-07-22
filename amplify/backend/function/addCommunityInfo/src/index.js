exports.handler = async (event) => {
    // TODO implement
    console.log(event);
    const AWS = require("aws-sdk");

    const docClient = new AWS.DynamoDB.DocumentClient();

    const val = await docClient.put({
        TableName: 'CommunityInfo',
        Item: JSON.parse(JSON.stringify(event))
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