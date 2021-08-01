exports.handler = async (event) => {
    // TODO implement
    const AWS = require("aws-sdk");

    const docClient = new AWS.DynamoDB.DocumentClient();

    console.log(event);

    const val = await docClient.scan(
        event
    ).promise();

    for (let i = 0; i < val.Items.length; i++) {
        const cId = val.Items[i].reviewerId;

        const user = await docClient.get({
            TableName: 'UserProfile',
            Key: { clientId: cId }
        }).promise();

        if (!user.Item) {
            val.Items[i].userName = null;
            val.Items[i].selfImg = null;
            val.Items[i].description = null;
        } else {
            val.Items[i].userName = user.Item.userName;
            val.Items[i].selfImg = user.Item.selfImg;
            val.Items[i].description = user.Item.description;
        }
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
