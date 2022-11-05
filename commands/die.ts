import { CommandInteraction } from "discord.js";

module.exports = {
    data: {
        name: "die",
        description : "you die"
    },
    execute : async (interaction : CommandInteraction) => {
        await interaction.reply("kills you")
    }
}