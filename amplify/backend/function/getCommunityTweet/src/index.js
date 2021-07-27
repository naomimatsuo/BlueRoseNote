exports.handler = async (event) => {
    // TODO implement
    const AWS = require("aws-sdk");

    const docClient = new AWS.DynamoDB.DocumentClient();

    console.log(event);

    const val = await docClient.query({
        TableName: 'CommunityTweet',
        Limit: 15,
        ScanIndexForward: false,
        KeyConditionExpression: "#x = :val",
        ExpressionAttributeNames: { "#x": "communityId" },
        ExpressionAttributeValues: { ":val": event.communityId },
        ExclusiveStartKey: event.lastEvaluatedKey
    }).promise();

    for (let i = 0; i < val.Items.length; i++) {
        const cId = val.Items[i].clientId;

        const user = await docClient.get({
            TableName: 'UserProfile',
            Key: { clientId: cId }
        }).promise();

        const like = await docClient.scan({
            TableName: 'CommunityTweetLike',
            FilterExpression: "communityId = :comId and clientId = :cliId and tweetId = :twId",
            ExpressionAttributeValues: {
                ":comId": val.Items[i].communityId,
                ":cliId": event.clientId,
                ":twId": val.Items[i].tweetId
            }
        }).promise();

        console.log(like);

        if (!user.Item) {
            val.Items[i].clientInfo = {
                clientId: cId,
                selfImg: null,
                userName: null
            };
        } else {
            val.Items[i].clientInfo = {
                clientId: user.Item.clientId,
                selfImg: user.Item.selfImg,
                userName: user.Item.userName
            };
        }

        if (like.Count > 0) {
            val.Items[i].iLike = true
        } else {
            val.Items[i].iLike = false
        }
    }

    const response = {
        statusCode: 200,
        body: JSON.stringify(val)
    };
    return response;
};