const {Client, GatewayIntentBits} = require("discord.js")
require("dotenv").config()
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
})
let commands = {}

client.on("ready", () => {

})
client.login(process.env.token)