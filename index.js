const {Client, GatewayIntentBits} = require("discord.js")
const fs = require("fs")
require("dotenv").config()
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
})
let commands = {}
fs.readdir("./commands/", (err, files) => {
    if (err){
        console.log(err)
    } else {
        files.forEach(file => {
            const required = require(file)
            commands[required.data.name] = required
        })
    }
})
client.on("interactionCreate", interaction => {

})
client.on("ready", () => {

})
client.login(process.env.token)