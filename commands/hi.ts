import { CommandInteraction } from "discord.js";

module.exports = {
    data: {
        name : "hi",
        description : "Says hi back."
    },
    execute: async (interaction : CommandInteraction) => {
        await interaction.reply("Hi")
    }
}