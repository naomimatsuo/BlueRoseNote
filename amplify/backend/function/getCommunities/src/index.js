exports.handler = async (event) => {
    // TODO implement
    const AWS = require("aws-sdk");

    const docClient = new AWS.DynamoDB.DocumentClient();

    console.log(event);

    const val = await docClient.scan({
        TableName: 'CommunityMember',
        ScanIndexForward: false,
        Limit: 15,
        FilterExpression: "#x = :val",
        ExpressionAttributeNames: { "#x": "clientId" },
        ExpressionAttributeValues: { ":val": event.clientId }
    }).promise();

    for (let i = 0; i < val.Items.length; i++) {
        const commuInfo = await docClient.get({
            TableName: 'CommunityInfo',
            Key: { communityId: val.Items[i].communityId }
        }).promise();

        val.Items[i].communityName = commuInfo.Item.communityName;
        val.Items[i].description = commuInfo.Item.description;
        val.Items[i].selfImg = commuInfo.Item.selfImg;
        val.Items[i].part1 = commuInfo.Item.part1;
        val.Items[i].part2 = commuInfo.Item.part2;
        val.Items[i].part3 = commuInfo.Item.part3;
        val.Items[i].part4 = commuInfo.Item.part4;
        val.Items[i].part5 = commuInfo.Item.part5;
        val.Items[i].part6 = commuInfo.Item.part6;
        val.Items[i].part7 = commuInfo.Item.part7;
        val.Items[i].part8 = commuInfo.Item.part8;
        val.Items[i].part9 = commuInfo.Item.part9;
        val.Items[i].part10 = commuInfo.Item.part10;
        val.Items[i].part11 = commuInfo.Item.part11;
        val.Items[i].part12 = commuInfo.Item.part12;
        val.Items[i].part13 = commuInfo.Item.part13;
        val.Items[i].part14 = commuInfo.Item.part14;
        val.Items[i].part15 = commuInfo.Item.part15;
        val.Items[i].part16 = commuInfo.Item.part16;
        val.Items[i].part17 = commuInfo.Item.part17;
        val.Items[i].part18 = commuInfo.Item.part18;
        val.Items[i].part19 = commuInfo.Item.part19;
        val.Items[i].part20 = commuInfo.Item.part20;
        val.Items[i].part21 = commuInfo.Item.part21;
        val.Items[i].part22 = commuInfo.Item.part22;
        val.Items[i].part23 = commuInfo.Item.part23;
    }

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
