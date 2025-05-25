// services/slackService.js
const { IncomingWebhook } = require('@slack/webhook');

const webhook = new IncomingWebhook(process.env.SLACK_WEBHOOK_URL);

async function sendToSlack(message) {
  try {
    await webhook.send({
      text: message,
      mrkdwn: true
    });
    return true;
  } catch (error) {
    console.error('Slack error:', error);
    return false;
  }
}

module.exports = { sendToSlack };