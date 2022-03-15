const discord = require('discord.js');

module.exports.run = async (Client, message, args) => {

    const categoryID = "949864016786907217";

    if (!message.member.permissions.has("KICK_MEMBERS")) return message.reply("Sorry jij kan dit niet doen");

    if(message.channel.parentId == categoryID){

        message.channel.delete();

        var embedTicket = new  discord.MessageEmbed()
          .setTitle("Ticket, " + message.channel.name)
          .setDescription("De ticket is gesloten ")
          .setFooter("Ticket gesloten");

         var ticketChannel = message.member.guild.channels.cache.find(channel => channel.name === "ticket-logs");
         if(!ticketChannel) return message.reply("Kanaal bestaat niet");

         return ticketChannel.send({ embeds: [embedTicket] });


    } else {
        return message.channel.send("Gelieve dit commando in een ticket kanaal uit te voeren.");
    }

}

module.exports.help = {
    name: "close",
    category: "general",
    description: "Zegt hallo"
}