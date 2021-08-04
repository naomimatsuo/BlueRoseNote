exports.handler = async (event) => {
    // TODO implement
    const AWS = require("aws-sdk");

    const docClient = new AWS.DynamoDB.DocumentClient();

    let val = null;

    console.log(event);

    if (event.clientId) {
        const ret = await docClient.get({
            TableName: 'UserProfile',
            Key: event
        }).promise();

        val = ret.Item;
    } else {
        const ret = await docClient.scan({
            TableName: 'UserProfile',
            Limit: 1,
            FilterExpression: "accountId = :val",
            ExpressionAttributeValues: { ":val": event.accountId }
        }).promise();

        if (ret.Items.length < 1) {
            val = null;
        } else {
            ret.Items[0].clientId = null;
            val = ret.Items[0];
        }
    }

    const response = {
        statusCode: 200,
        body: JSON.stringify(val)
    };
    return response;
};