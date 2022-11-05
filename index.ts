const { ApplicationCommandDataResolvable, Client, GatewayIntentBits } = require("discord.js")
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
        found.command(interaction)
    }
})
client.on("ready", () => {
    const commandsData = client.application?.commands
    type commandType = {
        data : typeof ApplicationCommandDataResolvable;
    };
    for (let index = 0; index > commands.length; index++){
        let cmd = commands[index] as commandType
        commandsData?.create(cmd?.data)
    }
    console.log("ready")
})
client.login(process.env.token)