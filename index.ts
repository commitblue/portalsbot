import { ApplicationCommandDataResolvable, Client, CommandInteraction, GatewayIntentBits } from "discord.js"
import fs from "fs"
require("./modules/server")
import { config } from "dotenv"
config()
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
})
let commands = {} as any
let commandsArray = [] as Array<ApplicationCommandDataResolvable>
fs.readdir("./commands/", (err, files) => {
    if (err){
        console.log(err)
    } else {
        type requireType = {
            data : {
                name : string
            },
            command
        }
        files.forEach(file => {
            file = "./commands/" + file
            const required : requireType = require(file)
            commands[required.data.name] = required
            let noCommandRequired : requireType = required
            noCommandRequired["command"] = null
            //@ts-ignore:next-line
            commandsArray.push(noCommandRequired)
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
        data : ApplicationCommandDataResolvable;
    };
    for (let i = 0; i > commandsArray.length; i++){
        const data = commandsArray[i]
        commandsData?.create(data)
    }
    console.log("ready")
})
client.login(process.env.token)