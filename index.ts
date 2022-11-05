import {Client, GatewayIntentBits} from "discord.js"
import fs from "fs"
require("./modules/server")
import {config} from "dotenv"
config()
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
})
type commandsObject = Object
let commands : commandsObject = {}
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
    console.log("ready")
    const commandsData = client.application?.commands
    type commandType = {
        data : any;
    };
    for (let [_, command] of Object.entries(commands)){
        let cmd : commandType = command 
        commandsData?.create(cmd?.data)
    }
})
client.login(process.env.token)