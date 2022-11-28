import { ApplicationCommandDataResolvable, Client, CommandInteraction, GatewayIntentBits } from "discord.js"
import fs from "fs"
require("./modules/server")
import { config } from "dotenv"
config()
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
})
let commands = {} as any
fs.readdir("./commands/", (err, files) => {
    if (err){
        console.log(err)
    } else {
        type requireType = {
            data : {
                name : string
            }
        }
        files.forEach(file => {
            file = "./commands/" + file
            const required : requireType = require(file)
            commands[required.data.name] = required
        })
    }
})
client.on("interactionCreate", interaction => {
    type interaction = {
        isCommand : () => boolean;
    }
    if (!interaction.isCommand()){
        return
    }
    const found = commands[interaction.commandName]
    if (found){
        found.execute(interaction)
    }
})
client.on("ready", async () => {
    const commandsData = await client.guilds.fetch("1025114367991230556")
    if (!commandsData){return console.warn("bad")}
    for (let i = 0; i > commands.length; i++){
        const value = commands[i]
        commandsData.commands.create(value.data)
    }
    console.log("ready")
})
client.login(process.env.token)