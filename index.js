const {Client, GatewayIntentBits} = require("discord.js")
const fs = require("fs")
const { off } = require("process")
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
            file = "./commands/" + file
            const required = require(file)
            commands[required.data.name] = required
        })
    }
})
client.on("interactionCreate", interaction => {
    if (!interaction.isCommand()){
        return
    }
    const found = commands[interaction.commandName]
    if (found){
        found.command(interaction)
    }
})
client.on("ready", () => {
    console.log("ready")
    const commandsData = client.application.commands
    for (const [_, command] of Object.entries(commandsData)){
        commandsData.create(command.data)
    }
})
client.login(process.env.token)