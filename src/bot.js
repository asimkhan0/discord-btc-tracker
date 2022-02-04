require("dotenv").config();
const request = require('request');
const { Client, Intents } = require('discord.js')

const client = new Client({ intents: [Intents.FLAGS.GUILDS /*, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_MESSAGES */ ] })

client.login(process.env.DISCORD_TOKEN)

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  startWatching()
});

// client.on('messageCreate', (message) => {
//   if (message.content === 'hello') {
//     message.reply('Gotcha!!')
//     message.channel.send('Hey channel!')
//   }
// })

function startWatching () {
  setInterval(updateData, 5000)
}

function updateData () {
  request('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd', (err, res, body) => {
    const usd = JSON.parse(res.body)["bitcoin"].usd
    console.log(usd)
    if (usd) {
      client.user.setActivity(`$${usd}`, { type: "WATCHING" });
    }
  })
}