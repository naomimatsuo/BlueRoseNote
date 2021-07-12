exports.handler = async (event) => {
  // TODO implement
  const AWS = require('aws-sdk');

  const docClient = new AWS.DynamoDB.DocumentClient();

  const val = await docClient.put({
    TableName: 'UserProfile',
    Item: JSON.parse(JSON.stringify(event))
  }).promise();

  const response = {
    statusCode: 200,
    body: JSON.stringify(val)
  };

  return response;
};