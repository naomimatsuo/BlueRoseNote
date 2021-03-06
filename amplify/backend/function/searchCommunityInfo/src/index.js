exports.handler = async (event) => {
    // TODO implement
    const AWS = require("aws-sdk");

    const docClient = new AWS.DynamoDB.DocumentClient();

    const params = JSON.parse(JSON.stringify(event));
    console.log(params);

    let val = null;

    if (params.Key) {
        console.log('get');
        val = await docClient.get({
            TableName: 'CommunityInfo',
            Key: { communityId: Number(params.Key) }
        }).promise();
    } else {
        console.log('scan');
        val = await docClient.scan(
            params
        ).promise();
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