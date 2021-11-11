const dynamoose = require('dynamoose');

exports.handler = async (event) => {
  
  const peopleSchema = new dynamoose.Schema({
    'id': Number,
    'name': String,
    'age': Number
  })

  const peopleTable = dynamoose.model('people', peopleSchema);

  let data = null;
  let status = 500;

  try {
    data = await peopleTable.scan().exec();
    status = 200;
  } catch (err) {
    console.log(err);
    data = new Error(err);
    status = 400;
  }

  const response = {
    statusCode: 200,
    body: JSON.stringify(data),
  };
  return response;
};