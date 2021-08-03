exports.handler = async (event) => {
    // TODO implement
    const AWS = require("aws-sdk");

    const docClient = new AWS.DynamoDB.DocumentClient();

    const val = await docClient.query({
        TableName: 'CommunityTweetReply',
        Limit: 15,
        ScanIndexForward: false,
        KeyConditionExpression: "communityRepId = :val",
        ExpressionAttributeValues: { ":val": event.communityId + "_" + event.replyToTweetId },
        ExclusiveStartKey: event.lastEvaluatedKey
    }).promise();

    let ret = [];

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

        let userInfo = {
            accountId: cId,
            selfImg: null,
            userName: null
        };

        if (user.Item) {
            userInfo = {
                accountId: user.Item.accountId,
                selfImg: user.Item.selfImg,
                userName: user.Item.userName
            };
        }

        const idx = likes.Items.findIndex((item) => { return item.clientId === event.requestClientId; });

        let likeInfo = {
            num: likes.Items.length,
            myfavarite: (idx !== -1)
        };

        let replyInfo = {
            num: replys.Items.length,
            tweetIds: replys.Items.map((item) => { return item.tweetId; })
        };

        ret.push({
            communityId: val.Items[i].communityId,
            createdAt: val.Items[i].createdAt,
            tweetId: val.Items[i].tweetId,
            tweet: val.Items[i].tweet,
            tweetpic: val.Items[i].tweetpic,
            clientInfo: userInfo,
            likes: likeInfo,
            replys: replyInfo,
            isMyTweet: val.Items[i].clientId === event.requestClientId
        });
    }

    const response = {
        statusCode: 200,
        body: JSON.stringify(ret)
    };
    return response;
};