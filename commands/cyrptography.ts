import { CommandInteraction, SlashCommandBuilder } from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
    .setName("cyrptography")
    .setDescription("cyrptography stuff (no this is not related to cyrpto)")
    .addSubcommand(command => 
        command
        .setName("aesonetwoeightencrypt")
        .setDescription("uses aes128 encoder to encrypt")
    ),
    async execute(interaction : CommandInteraction){
        if (!interaction.isChatInputCommand()){return} // ts === good
        if (interaction.options.getSubcommand() === "aesonetwoeightEncrypt"){
            await interaction.reply("w")
        }
    }
}