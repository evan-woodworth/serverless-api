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
    let id = Number(event.pathParameters.id);
    data = await peopleTable.delete({id});
    status = 200;
  } catch (err) {
    status = 400;
    console.log(err)
    data = new Error(err);
  }

  const response = {
    statusCode: status,
    body: JSON.stringify(data),
  };
  return response;
};