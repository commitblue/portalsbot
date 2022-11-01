import {Client, GatewayIntentBits} from "discord.js"
import fs from "fs"
import {} from "./modules/server"
import {config} from "dotenv"
config()
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
    const commandsData = client.application?.commands
    for (const [_, command] of Object.entries(commands)){
        type command = {
            data? : string;
        }
        commandsData?.create(command?.data)
    }
})
client.login(process.env.token)