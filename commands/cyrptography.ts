import { CommandInteraction, InteractionResponse, SlashCommandBuilder } from "discord.js";
import cyrptojs from "crypto-js"
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
            .setRequired(true)
        )
        .addStringOption(option => option
            .setName("blob")
            .setDescription("blob")
            .setRequired(true)
        )
    ),
    async execute(interaction : CommandInteraction){
        if (!interaction.isChatInputCommand()){return} // ts === good
        if (interaction.options.getSubcommand() === "aesonetwoeightEncrypt"){
            const val : string | null = interaction.options.getString("value")
            const blob : string | null = interaction.options.getString("blob")
            if (!val || !blob){return await interaction.reply("no")}
            await interaction.reply(cyrptojs.AES.encrypt(val, blob).toString())
        }
    }
}