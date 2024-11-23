
// * IMPORTS
require('dotenv').config();
const { Telegraf } = require('telegraf');

// * ENV SHOULD BE SECURE
const { TELEGRAM_API_TOKEN, IS_PROD } = process.env
const bot = new Telegraf(TELEGRAM_API_TOKEN);

// * IMPORT COMMANDS 
const { startCommand, list_commands } = require('./command/start.js')
const { createUser } = require('./command/createUser.js')
const { freeTalk } = require('./command/freeTalk.js')


// Lambda handler function
const handler = async (event, context, callback) => {

  const body = JSON.parse(event.body);

  // * CUSTOMER VALIDATION 
  const { from, message_id } = body.message

  if (from) {
    const { is_bot, language_code, first_name, id } = from

    //* VALIDATE IS THE  CUSTOMER ALREADY REGISTER 
    const list = [7755419235]
    if (!list.includes(id)) {
      //! USER ALREADY EXIST
      await createUser(bot)
    } else {
      startCommand(bot)
    }
  }


  // * ======START DEFAULT COMMANDS 
  bot.command('oldschool', (ctx) => ctx.reply('Hello'))
  list_commands(bot)
  freeTalk(bot)
  // * ======= START DEFAULT COMMANDS 

  if (IS_PROD === 'true') {
    try {
      // Parse Telegram's webhook payload

      // Pass the update to Telegraf for processing
      await bot.handleUpdate(body);

      return {
        statusCode: 200,
        body: JSON.stringify({ success: true }),
      };
    } catch (error) {
      console.error('Error processing update:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ success: false, error: error.message }),
      };
    }
  } else {
    bot.launch();
  }
}

exports.handler = handler;

exports.test = () => {
  const event = {
    resource: '/webhook',
    path: '/webhook',
    httpMethod: 'POST',
    headers: {
      'Accept-Encoding': 'gzip, deflate',
      'CloudFront-Forwarded-Proto': 'https',
      'CloudFront-Is-Desktop-Viewer': 'true',
      'CloudFront-Is-Mobile-Viewer': 'false',
      'CloudFront-Is-SmartTV-Viewer': 'false',
      'CloudFront-Is-Tablet-Viewer': 'false',
      'CloudFront-Viewer-ASN': '62041',
      'CloudFront-Viewer-Country': 'NL',
      'Content-Type': 'application/json',
      Host: '8kb1qzbfr7.execute-api.us-west-2.amazonaws.com',
      'User-Agent': 'Amazon CloudFront',
      Via: '1.1 d46464e02ca4f5540906664a2cfbcce2.cloudfront.net (CloudFront)',
      'X-Amz-Cf-Id': 'ovuhrsTNLgP3hSKtn_LovKJtqwBzKbcCoU2LXS5Rs-kWnA1vucuCQw==',
      'X-Amzn-Trace-Id': 'Root=1-67414867-7451aabd6bc864de40c0f0f7',
      'X-Forwarded-For': '91.108.6.145, 15.158.40.117',
      'X-Forwarded-Port': '443',
      'X-Forwarded-Proto': 'https'
    },
    multiValueHeaders: {
      'Accept-Encoding': ['gzip, deflate'],
      'CloudFront-Forwarded-Proto': ['https'],
      'CloudFront-Is-Desktop-Viewer': ['true'],
      'CloudFront-Is-Mobile-Viewer': ['false'],
      'CloudFront-Is-SmartTV-Viewer': ['false'],
      'CloudFront-Is-Tablet-Viewer': ['false'],
      'CloudFront-Viewer-ASN': ['62041'],
      'CloudFront-Viewer-Country': ['NL'],
      'Content-Type': ['application/json'],
      Host: ['8kb1qzbfr7.execute-api.us-west-2.amazonaws.com'],
      'User-Agent': ['Amazon CloudFront'],
      Via: [
        '1.1 d46464e02ca4f5540906664a2cfbcce2.cloudfront.net (CloudFront)'
      ],
      'X-Amz-Cf-Id': ['ovuhrsTNLgP3hSKtn_LovKJtqwBzKbcCoU2LXS5Rs-kWnA1vucuCQw=='],
      'X-Amzn-Trace-Id': ['Root=1-67414867-7451aabd6bc864de40c0f0f7'],
      'X-Forwarded-For': ['91.108.6.145, 15.158.40.117'],
      'X-Forwarded-Port': ['443'],
      'X-Forwarded-Proto': ['https']
    },
    queryStringParameters: null,
    multiValueQueryStringParameters: null,
    pathParameters: null,
    stageVariables: null,
    requestContext: {
      resourceId: 'nj9r52',
      resourcePath: '/webhook',
      httpMethod: 'POST',
      extendedRequestId: 'BrhALE-dPHcEJJg=',
      requestTime: '23/Nov/2024:03:13:43 +0000',
      path: '/Prod/webhook',
      accountId: '451852144542',
      protocol: 'HTTP/1.1',
      stage: 'Prod',
      domainPrefix: '8kb1qzbfr7',
      requestTimeEpoch: 1732331623155,
      requestId: '36fc109c-9a6f-4046-816f-0ba506908b7b',
      identity: {
        cognitoIdentityPoolId: null,
        accountId: null,
        cognitoIdentityId: null,
        caller: null,
        sourceIp: '91.108.6.145',
        principalOrgId: null,
        accessKey: null,
        cognitoAuthenticationType: null,
        cognitoAuthenticationProvider: null,
        userArn: null,
        userAgent: 'Amazon CloudFront',
        user: null
      },
      domainName: '8kb1qzbfr7.execute-api.us-west-2.amazonaws.com',
      deploymentId: '8d6cxr',
      apiId: '8kb1qzbfr7'
    },
    body: '{"update_id":554809799,\n' +
      '"message":{"message_id":1,"from":{"id":7755419235,"is_bot":false,"first_name":"Vlody","language_code":"en"},"chat":{"id":7755419235,"first_name":"Vlody","type":"private"},"date":1732331623,"text":"/start","entities":[{"offset":0,"length":6,"type":"bot_command"}]}}',
    isBase64Encoded: false
  }

  handler(event, null, callback => {
    console.log('Callback response', callback);
  });
};
