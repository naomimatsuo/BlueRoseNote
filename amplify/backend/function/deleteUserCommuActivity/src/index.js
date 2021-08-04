exports.handler = async (event) => {
    // TODO implement
    const AWS = require("aws-sdk");

    const docClient = new AWS.DynamoDB.DocumentClient();

    const params = {
        tableName: event.tableName,
        FilterExpression: "clientId = :cId",
        ExpressionAttributeValues: { ":cId": event.clientId }
    };

    const records = await docClient.scan(params).promise();

    if (records.Items) {
        if (event.tableName === 'CommunityMember') {
            for (let i = 0; i < records.Items.length; i++) {
                const deleteParams = {
                    TableName: event.tableName,
                    Key: {
                        clientId: event.clientId,
                        communityId: records.Items[i].communityId
                    }
                };
                await docClient.delete(deleteParams).promise();
            }
        } else if (event.tableName === 'CommunityTweet') {
            for (let i = 0; i < records.Items.length; i++) {
                const deleteParams = {
                    TableName: event.tableName,
                    Key: {
                        communityId: records.Items[i].communityId,
                        tweetId: records.Items[i].tweetId
                    }
                };
                await docClient.delete(deleteParams).promise();
            }
        } else if (event.tableName === 'CommunityTweetLike') {
            for (let i = 0; i < records.Items.length; i++) {
                const deleteParams = {
                    TableName: event.tableName,
                    Key: {
                        communityId: records.Items[i].communityId,
                        repTweetId: records.Items[i].repTweetId
                    }
                };
                await docClient.delete(deleteParams).promise();
            }
        } else if (event.tableName === 'CommunityTweetReply') {
            for (let i = 0; i < records.Items.length; i++) {
                const deleteParams = {
                    TableName: event.tableName,
                    Key: {
                        communityRepId: records.Items[i].communityRepId,
                        tweetId: records.Items[i].tweetId
                    }
                };
                await docClient.delete(deleteParams).promise();
            }
        }
    }

    const response = {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  },
        body: JSON.stringify('deleted successfully')
    };
    return response;
};
