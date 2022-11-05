import { CommandInteraction } from "discord.js";

module.exports = {
    data: {
        name: "die",
        description : "you die"
    },
    command : async (interaction : CommandInteraction) => {
        await interaction.reply("kills you")
    }
}