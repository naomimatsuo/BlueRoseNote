exports.handler = async (event) => {
    // TODO implement
    const AWS = require("aws-sdk");

    const docClient = new AWS.DynamoDB.DocumentClient();

    console.log(event);

    const commuInfo = await docClient.get({
        TableName: 'CommunityInfo',
        Key: { communityId: event.communityId }
    }).promise();

    const joinResult = await docClient.query({
        TableName: 'CommunityMember',
        ScanIndexForward: false,
        KeyConditionExpression: "#x = :val1 and #y = :val2",
        ExpressionAttributeNames: { "#x": "communityId", "#y": "clientId" },
        ExpressionAttributeValues: { ":val1": event.communityId, ":val2": event.clientId }
    }).promise();

    const response = {
        statusCode: 200,
        body: JSON.stringify({
            communityInfo: commuInfo,
            doesJoin: joinResult
        })
    };
    return response;
};