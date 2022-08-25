// Require the necessary discord.js classes
const { token } = require("./config.json");
const { Client, GatewayIntentBits, Partials, InteractionType } = require("discord.js");
const { setupCommands } = require("./commands/commands.js");
const { subscribeUserToAnnoy, unsubscribeUserFromAnnoy, handleAnnoy } = require("./commands/annoy.js");
const { handleDarkDax } = require("./youtube-test");
const { youtube } = require("googleapis/build/src/apis/youtube");

// Create a new client instance
const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent ],
	partials: [Partials.Channel]
});

// When the client is ready, run this code (only once)
client.once("ready", async () => {
	await setupCommands(client);
	
	console.log("Bot Ready!!");
});

client.on("messageCreate", async (message) => {
	handleAnnoy(message);
});

client.on('interactionCreate', async (interaction) => {
	if (!interaction == InteractionType.ApplicationCommand) {
		return;
	}

	const { commandName } = interaction;

	switch (commandName) {
		case 'help':
			interaction.reply({
				content: "This is some extremely unhelpful text!",
				ephemeral: true,
			})
			break;

		// TODO: Use embed builder for this
		case 'darkdax':
			handleDarkDax(interaction);
			break;
		
		case 'annoy':
			subscribeUserToAnnoy(interaction);
			break;
		
		case 'stopannoy':
			unsubscribeUserFromAnnoy(interaction);
			break;
	}
});

// Login to Discord with your client's token
client.login(token);