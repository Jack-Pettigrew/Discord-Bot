// Require the necessary discord.js classes
const Discord = require("discord.js");
const { token } = require("./config.json");
const { search } = require("./youtube-test.js");
const { setupCommands } = require("./commands/commands.js");
const { youtube } = require("googleapis/build/src/apis/youtube");

// Create a new client instance
const client = new Discord.Client({
  intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES],
});

// When the client is ready, run this code (only once)
client.once("ready", () => {
	setupCommands(client);

	console.log("Bot Ready!!");
});

client.on('interactionCreate', async (interaction) => {
	if (!interaction.isCommand()) {
		return;
	}

	const { commandName, options } = interaction;

	switch (commandName) {
		case 'help':
			interaction.reply({
				content: "This is some extremely unhelpful text!",
				ephemeral: true,
			})
			break;
		case 'darkdax':
			let links = await search();
			let reply = "";

			links.forEach(element => {
				reply = reply + element.link + "\n";
			});

			interaction.reply({
				content: reply,
				ephemeral: true
			});
			break;
	}
});

// Login to Discord with your client's token
client.login(token);