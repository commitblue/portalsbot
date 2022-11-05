import { CommandInteraction } from "discord.js"
module.exports = {
    data: {
        name : "updateCache",
        description : "updates the cache"
    },
    command : async (interaction : CommandInteraction) => {
        if (interaction.member?.user.id === process.env.owner){
            await interaction.guild?.members.fetch()
            await interaction.reply("Updated cache.")
        } else {
            await interaction.reply("You are not the bot's owner")
        }
    }
}