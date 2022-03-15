const discord = require('discord.js');

module.exports.run = async (client, message, args) => {

    const catergoryID = "949864016786907217";//de catergory waar de tickets in komen
    if (!catergoryID) return message.c1hannel.send("Catergory bestaat niet. Neem contact op met S!N#5644!")

    const userName = message.author.username;

    var userDiscriminator = message.author.discriminator;

    var reason = args.join(" ");
    if (!reason) return message.channel.send("Geef een reden op waarom je een ticket wil aanmaken");


    message.guild.channels.cache.forEach((channel) => {

        if (channel.name == userName.toLowerCase() + "-" + userDiscriminator) {

            return message.channel.send("je kan maar 1 ticket tegelijkertijd open hebben staan.")
                .then(m => m.delete({ timeout: 2000 }));

    
        }
    });



    message.guild.channels.create(userName.toLowerCase() + "-" + userDiscriminator, { type: "text" }).then((createdChan) => {

        createdChan.setParent(catergoryID).then((settedParent) => {

            // Perms zodat iedereen niets kan lezen.
            settedParent.permissionOverwrites.edit(message.guild.roles.cache.find(x => x.name === "@everyone"), {

                SEND_MESSAGES: false,
                VIEW_CHANNEL: false,

            });

            // READ_MESSAGE_HISTORY Was vroeger READ_MESSAGES
            // Perms zodat de gebruiker die het command heeft getypt alles kan zien van zijn ticket.
            settedParent.permissionOverwrites.edit(message.author.id, {
                CREATE_INSTANT_INVITE: false,
                READ_MESSAGE_HISTORY: true,
                SEND_MESSAGES: true,
                VIEW_CHANNEL: true,
                ATTACH_FILES: true,
                CONNECT: true,
                ADD_REACTIONS: true
            });

            // Perms zodat de gebruikers die admin zijn alles kunnen zien van zijn ticket.
            settedParent.permissionOverwrites.edit(message.guild.roles.cache.find(x => x.name === "💼 | StaffTeam"), {
                CREATE_INSTANT_INVITE: false,
                READ_MESSAGE_HISTORY: true,
                SEND_MESSAGES: true,
                VIEW_CHANNEL: true,
                ATTACH_FILES: true,
                CONNECT: true,
                ADD_REACTIONS: true
            });

            let today = new Date();
            let dd = String(today.getDate()).padStart(2, '0'); // Nul toevoegen als het bv. 1 is -> 01
            let mm = String(today.getMonth() + 1).padStart(2, '0');
            let yyyy = today.getFullYear();
            today = `${dd}/${mm}/${yyyy}`;

            let embedParent = new discord.MessageEmbed()
                .setAuthor( {name: message.author.username}, message.author.displayAvatarURL({ size: 4096 }))
                .setTitle('Nieuw ticket aangemaakt')
                .addFields(
                    {name: "reden", value: reason, inline: true},
                    {name: "Aangemaakt op", value: today, inline: true}
                );
                message.channel.send('✅ je ticket is aangemaakt').then(m => m.delete({ timeout: 2000 }));

                settedParent.send({embeds: [embedParent]})

        }).catch(err => {
            message.channel.send('❌Er is iets misgegaan')
        })
    }).catch(err => {
        message.channel.send('❌Er is iets misgegaan')
    });

}

module.exports.help = {
    name: "ticket"
}