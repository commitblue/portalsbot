import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import cyrptoAES from "crypto-js/aes"
module.exports = {
    data: new SlashCommandBuilder()
    .setName("cyrptography")
    .setDescription("cyrptography stuff (no this is not related to cyrpto)")
    .addSubcommand(command => 
        command
        .setName("aesonetwoeightencrypt")
        .setDescription("uses aes128 encoder to encrypt")
        .addStringOption(option => option
            .setName("value")
            .setDescription("value")
        )
        .addStringOption(option => option
            .setName("blob")
            .setDescription("blob")
        )
    ),
    async execute(interaction : CommandInteraction){
        if (!interaction.isChatInputCommand()){return} // ts === good
        const val = interaction.options.getString("value")
        const blob = interaction.options.getString("blob")
        if (interaction.options.getSubcommand() === "aesonetwoeightEncrypt"){
            await interaction.reply(cyrptoAES.encrypt())
        }
    }
}