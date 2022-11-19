const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
const louritydb = require("croxydb")
const Discord = require("discord.js")
module.exports = {
    name: "uptime-ayarla",
    description: "Uptime sistemini ayarlarsınız",
    type: 1,
    options: [

        {
            name: "ayarla",
            description: "Uptime sistemini açar/kapatırsınız",
            type: 5,
            required: true,
        },

        {
            name: "kanal",
            description: "Uptime sisteminin kullanılacağı kanalı ayarlarsınız",
            type: 7,
            required: true,
            channel_types: [0]
        },

    ],

    run: async (client, interaction) => {

        const row1 = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setEmoji("🗑️")
                    .setLabel("Sistemi Sıfırla")
                    .setStyle(Discord.ButtonStyle.Danger)
                    .setCustomId("sistemSıfırla")
            )

        const yetki = new Discord.EmbedBuilder()
            .setColor("Red")
            .setTitle("Yetersiz Yetki!")
            .setDescription("> Bu komutu kullanabilmek için `Yönetici` yetkisine sahip olmalısın!")
            .setFooter({ text: "Uptime" })

        const boolean = interaction.options.getBoolean('ayarla')
        const kanal = interaction.options.getChannel('kanal')

        const ayarlandi = new Discord.EmbedBuilder()
            .setColor("Green")
            .setTitle("Başarıyla Ayarlandı!")
            .setDescription(`Uptime sistemi başarıyla ${kanal} olarak **ayarlandı**!`)
            .setFooter({ text: "Uptime" })

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [yetki], ephemeral: true })

        interaction.reply({ embeds: [ayarlandi], components: [row1], ephemeral: true })

        louritydb.set(`uptimeBoolan_${interaction.guild.id}`, boolean)
        louritydb.set(`uptimeChannel_${interaction.guild.id}`, kanal.id)

    }

};