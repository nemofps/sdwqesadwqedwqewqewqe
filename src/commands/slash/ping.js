const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const config = require("../../config.js")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("sıfırla")
    .setDescription("sifirliyon iste aq"),
    run: async (client, interaction) => {
    
    await interaction.reply({ content: `Ping, Pong!`, ephemeral: true})
    }
 };
