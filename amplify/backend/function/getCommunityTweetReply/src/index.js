exports.handler = async (event) => {
    // TODO implement
    const AWS = require("aws-sdk");

    const docClient = new AWS.DynamoDB.DocumentClient();

    console.log(event);

    const val = await docClient.query({
        TableName: 'CommunityTweetReply',
        Limit: 15,
        ScanIndexForward: false,
        KeyConditionExpression: "communityRepId = :val",
        ExpressionAttributeValues: { ":val": event.communityId + "_" + event.replyToTweetId },
        ExclusiveStartKey: event.lastEvaluatedKey
    }).promise();

    for (let i = 0; i < val.Items.length; i++) {
        const cId = val.Items[i].clientId;

        const user = await docClient.get({
            TableName: 'UserProfile',
            Key: { clientId: cId }
        }).promise();

        const replys = await docClient.scan({
            TableName: 'CommunityTweetReply',
            FilterExpression: "communityRepId = :id",
            ExpressionAttributeValues: {
                ":id": val.Items[i].communityId + "_" + val.Items[i].tweetId
            },
            ProjectionExpression: "communityId, tweetId, clientId"
        }).promise();

        const likes = await docClient.scan({
            TableName: 'CommunityTweetLike',
            ScanIndexForward: false,
            FilterExpression: "communityId = :comId and repTweetId = :twId",
            ExpressionAttributeValues: {
                ":comId": val.Items[i].communityId,
                ":twId": val.Items[i].repTweetId + "_" + val.Items[i].tweetId
            }
        }).promise();

        console.log(val.Items[i].repTweetId + "_" + val.Items[i].tweetId);

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

        val.Items[i].likes = likes.Items;
        val.Items[i].replys = replys.Items;
    }

    const response = {
        statusCode: 200,
        body: JSON.stringify(val)
    };
    return response;
};