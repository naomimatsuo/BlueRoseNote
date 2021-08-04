exports.handler = async (event) => {
    // TODO implement
    const AWS = require("aws-sdk");

    const docClient = new AWS.DynamoDB.DocumentClient();

    const params = {
        TableName: event.tableName,
        FilterExpression: "clientId = :cId",
        ExpressionAttributeValues: { ":cId": event.clientId }
    };

    const records = await docClient.scan(params).promise();
    if (records.Items) {
        for (let i = 0; i < records.Items.length; i++) {
            const deleteParams = {
                TableName: event.tableName,
                Key: {
                    clientId: event.clientId,
                    recordId: records.Items[i].recordId
                }
            };

            console.log(deleteParams);

            await docClient.delete(deleteParams).promise();
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
