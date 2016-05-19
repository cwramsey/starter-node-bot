var Botkit = require('botkit')

var token = process.env.SLACK_TOKEN

var controller = Botkit.slackbot({
  // reconnect to Slack RTM when connection goes bad
  retry: Infinity,
  debug: false
})

// Assume single team mode if we have a SLACK_TOKEN
if (token) {
  console.log('Starting in single-team mode')
  controller.spawn({
    token: token
  }).startRTM(function (err, bot, payload) {
    if (err) {
      throw new Error(err)
    }

    console.log('Connected to Slack RTM')
  })
// Otherwise assume multi-team mode - setup beep boop resourcer connection
} else {
  console.log('Starting in Beep Boop multi-team mode')
  require('beepboop-botkit').start(controller, { debug: true })
}

controller.on('message_received', function (bot, message) {
  console.log(message);
  console.log(Object.keys(message));
});

controller.hears(['ha', 'haha', 'lol'], ['message_received,direct_mention,mention,direct_message'], function (bot, message) {
  console.log("Heard a laugh");
  bot.reply(message, 'http://instantostrich.com')
})