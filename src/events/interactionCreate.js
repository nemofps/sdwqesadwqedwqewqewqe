const {
    Events,
    InteractionType,
    ButtonStyle,
    ActionRowBuilder,
    ButtonBuilder,
    EmbedBuilder,
} = require('discord.js');
const fetch = require('node-fetch');
const config = require('../config');

module.exports = {
    name: Events.InteractionCreate,
    execute: async (interaction) => {
        let client = interaction.client;
        if (interaction.type == InteractionType.ApplicationCommand) {
            if (interaction.user.bot) return;
            try {
                const command = client.slashcommands.get(interaction.commandName);
                command.run(client, interaction);
            } catch (e) {
                console.error(e);
                interaction.reply({
                    content:
                        'undefined',
                    ephemeral: true,
                });
            }
        }

        if (interaction.customId == 'modal') {
            await interaction.deferReply({ ephemeral: true });
            const input = interaction.fields.getTextInputValue('input');
            const input2 = interaction.fields.getTextInputValue('input2');
            
            const api_key = "O0RW9fNi4cWy0beAbV6cIcAH6yUK6Y	";
            const title = `Tempaste.com Automation`;
            const paste_content = `<p><img src="https://cdn.discordapp.com/attachments/1174575887589593089/1175315381494231072/standard_1.gif" alt="exstadev"></p>`;
            const paste_content_code = `${input}`;
            const paste_content_code_language = "javascript";
            const visibility = "password";
            const password = `${input2}`;
            const expiry_date_type = "minutes";
            const expiry_date = config.Tempaste.Expiry_Date;
            
            const apiUrl = "https://tempaste.com/api/v1/create-paste/";
            
            const requestData = {
              api_key,
              title,
              paste_content_code,
              paste_content,
              paste_content_code_language,
              visibility,
              password,
              expiry_date_type,
              expiry_date,
              custom_url: "",
            };

            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestData),
                });

                if (response.ok) {
                    const data = await response.json();
                    const pasteUrl = data.link;

                    var buton = new ButtonBuilder()
                        .setLabel(`Paste Link`)
                        .setStyle(ButtonStyle.Link)
                        .setURL(`https://tempaste.com/${data.url}`);

                    var buton2 = new ButtonBuilder()
                        .setCustomId('sifre')
                        .setLabel(`Password: ${input2}`)
                        .setStyle(ButtonStyle.Primary)
                        .setDisabled(true);

                    var buton3 = new ButtonBuilder()
                    .setCustomId('paylasimci')
                    .setLabel(`${interaction.user.username}`)
                    .setStyle(ButtonStyle.Danger)
                    .setDisabled(true);

                    const row = new ActionRowBuilder().addComponents([buton, buton2, buton3]);

                    var buton3 = new ButtonBuilder()
                        .setLabel(`Paste Link`)
                        .setStyle(ButtonStyle.Link)
                        .setURL(`https://tempaste.com/${data.url}`)
                        .setDisabled(true);

                        var buton4 = new ButtonBuilder()
                        .setCustomId('sifre')
                        .setLabel(`Password: -`)
                        .setStyle(ButtonStyle.Primary)
                        .setDisabled(true);

                    var buton5 = new ButtonBuilder()
                    .setCustomId('paylasimci')
                    .setLabel(`${interaction.user.username}`)
                    .setStyle(ButtonStyle.Danger)
                    .setDisabled(true);

                    const row2 = new ActionRowBuilder().addComponents([buton3, buton4, buton5]);
                    let embed2 = new EmbedBuilder()
                    .setDescription(`Paste oluşturludu sh başarlı @everyone **tempaste.com**.\n\nCreation Date: <t:${Math.floor(Date.now() / 1000)}:R>\nCreator: <@${interaction.user.id}>\nExpiry: \`${config.Tempaste.Expiry_Date}\` minutes`)
                    .setFooter({
                        text: `Developed with ❤️ by Nemo`,
                        iconURL: interaction.guild.iconURL({ dynamic: true }),
                    })
                    .setImage(`https://cdn.discordapp.com/attachments/1181612908040421398/1181653030135939152/indir.png`)
                    .setAuthor({
                        name: interaction.guild.name,
                        iconURL: interaction.guild.iconURL({ dynamic: true }),
                    })
                    .setThumbnail(interaction.guild.iconURL({ dynamic: true, size: 2048 }));
                    const sentMessage = await interaction.channel.send({
                        embeds: [embed2],
                        components: [row],
                    });

                    setTimeout(async () => {
                        const updatedMessage = await sentMessage.edit({
                            components: [row2],
                        });
                    }, config.Tempaste.Expiry_Date * 60 * 1000);
                } else {
                    const errorData = await response.json();
                    console.log('Yapıştırma oluşturulamadı:', errorData);
                }
            } catch (error) {
                console.log('Hata:', error);
            }

            await interaction.editReply({
                content: 'İşlem başarılı!',
                ephemeral: true,
            });
        }
    },
};
