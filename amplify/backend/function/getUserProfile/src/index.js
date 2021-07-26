exports.handler = async (event) => {
    // TODO implement
    const AWS = require("aws-sdk");

    const docClient = new AWS.DynamoDB.DocumentClient();

    const val = await docClient.get({
        TableName: 'UserProfile',
        Key: event
    }).promise();

    const response = {
        statusCode: 200,
        body: JSON.stringify(val.Item)
    };
    return response;
};