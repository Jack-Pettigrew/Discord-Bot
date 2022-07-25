// Require the necessary discord.js classes
const Discord = require("discord.js");
const { token } = require("./config.json");

// Create a new client instance
const client = new Discord.Client({
  intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES],
});

// When the client is ready, run this code (only once)
client.once("ready", () => {
	console.log("Bot Ready!!");
	
	client.application?.commands.create({
		name: "help",
		description: "Replies with some help!",	  
	})
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
	}
});

// Login to Discord with your client's token
client.login(token);