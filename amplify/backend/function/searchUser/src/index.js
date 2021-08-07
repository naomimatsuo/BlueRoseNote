exports.handler = async (event) => {
    // TODO implement
    const AWS = require("aws-sdk");

    const docClient = new AWS.DynamoDB.DocumentClient();

    const records = await docClient.scan(event.body).promise();
    const ret = records.Items.map((item) => {
        return {
            accountId: item.accountId,
            selfImg: item.selfImg,
            description: item.description,
            userName: item.userName
        }
    });

    const response = {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  },
        body: JSON.stringify(ret)
    };
    return response;
};
