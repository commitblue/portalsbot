import { CommandInteraction, SlashCommandBuilder } from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
    .setName("cyrptography")
    .setDescription("cyrptography stuff (no this is not related to cyrpto)")
    .addSubcommand(command => 
        command
        .setName("AES128Encrypt")),
    async execute(interaction : CommandInteraction){
        if (interaction.options.getSubcommand() === "AES128Encrypt"){
            
        }
    }
}