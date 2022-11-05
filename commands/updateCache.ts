import { CommandInteraction } from "discord.js"
module.exports = {
    data: {
        name : "updateCache",
        description : "updates the cache"
    },
    command : async (interaction : CommandInteraction) => {
        if (interaction.member?.user.id === ""){
            await interaction.guild?.fetch()
            await interaction.reply("Updated cache.")
        }
    }
}