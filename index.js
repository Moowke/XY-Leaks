const { Client, Intents, Collection } = require("discord.js");
const botConfig = require("./botConfig.json");
const fs = require("fs");
const console = require("console")

const client = new Client({ 
    intents: [Intents.FLAGS.GUILDS, 
        Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGES_REACTIONS] 
     });

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith(".js"));

for (const file of commandFiles) {

    const command = require(`./commands/${file}`);

    client.commands.set(command.help.name, command);

    console.log(`De file ${command.help.name}.js is geladen`);
}

client.once("ready", () =>{

    console.log('${client.user.username} is online.')
    client.user.setActivity("Nexus Roleplay", { type: "PLAYING"});
});

client.on("messageCreate", async message => {
    if (message.author.bot) return;
    
    var prefix = botConfig.prefix;

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    if (!message.content.startsWith(prefix)) return;

    const commandData = client.commands.get(command.slice(prefix.length));

    if (!commandData) return;

    var arguments = messageArray.slice(1);

    try {

        await commandData.run(client, message, arguments);

    }  catch (error) {
        console.log(error);
        await message.reply(" Er was een probleem tijdens het uitvoeren van deze command.");
    }

});

client.login(process.env.token);