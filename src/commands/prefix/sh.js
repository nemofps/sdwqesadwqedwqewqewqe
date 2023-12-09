const {
    PermissionsBitField,
    ButtonStyle,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
} = require('discord.js');
let conf = require('../../config.js');
const fetch = require('node-fetch');
module.exports = {
    name: 'sh',
    aliases: ['share', 'paste'],
    cooldown: 300000,
    run: async (client, message, args) => {

        if (!message.member.permissions.has(PermissionsBitField.Flags.ViewAuditLog)) {
            message.reply({ content: `You do not have the permission for this command.` }).then((e) =>
                setTimeout(() => {
                    e.delete();
                }, 5000)
            );
            return;
        }

        let ac = new ButtonBuilder()
            .setCustomId('gonder')
            .setStyle(ButtonStyle.Secondary)
            .setLabel('Yeni Sh');

        const row = new ActionRowBuilder().addComponents([ac]);

        let embed = new EmbedBuilder()
            .setDescription(`Yeni Sh Atmak İçin **Yeni Sh** Butonununa Bas.`)
            .setFooter({
                text: `Developed with ❤️ by Nemo`,
                iconURL: message.guild.iconURL({ dynamic: true }),
            })
            .setAuthor({
                name: message.guild.name,
                iconURL: message.guild.iconURL({ dynamic: true }),
            })
            .setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))
            .setImage(`https://cdn.discordapp.com/attachments/1181612908040421398/1181653030135939152/indir.png`);

        let msg = await message.channel.send({ embeds: [embed], components: [row] });

        var filter = (button) => button.user.id === message.author.id;

        let collector = await msg.createMessageComponentCollector({ filter, time: 60000 });

        collector.on('collect', async (interaction) => {
            if (interaction.customId === 'gonder') {
                const modal = new ModalBuilder()
                    .setCustomId('modal')
                    .setTitle(`Tempaste.com Automation`);

                const input = new TextInputBuilder()
                    .setCustomId('input')
                    .setStyle(TextInputStyle.Paragraph)
                    .setLabel('Content:')
                    .setPlaceholder('Sh Bilgilerini gir. **NOT**civciv bilgileri')
                    .setMinLength(1)
                    .setMaxLength(1000)
                    .setRequired(true);
                
                const input2 = new TextInputBuilder()
                    .setCustomId('input2')
                    .setStyle(TextInputStyle.Short)
                    .setLabel('Password:')
                    .setPlaceholder('şifre gir:')
                    .setMinLength(1)
                    .setMaxLength(10)
                    .setRequired(true);
                    

                const field = new ActionRowBuilder().addComponents(input);
                const field2 = new ActionRowBuilder().addComponents(input2);

                modal.addComponents(field, field2);

                await interaction.showModal(modal);
                await msg.delete();
                await message.delete();
            }
        });
    },
};