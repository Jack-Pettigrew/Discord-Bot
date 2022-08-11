// Require the necessary discord.js classes
const { Client, GatewayIntentBits, Partials, InteractionType } = require("discord.js");
const { token } = require("./config.json");
const { search } = require("./youtube-test.js");
const { setupCommands, handleAnnoy } = require("./commands/commands.js");
const { youtube } = require("googleapis/build/src/apis/youtube");

var annoyees = [];

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

	const { commandName, options } = interaction;

	switch (commandName) {
		case 'help':
			interaction.reply({
				content: "This is some extremely unhelpful text!",
				ephemeral: true,
			})
			break;

		// TODO: Use embed builder for this
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
		
		case 'annoy':
			annoyees.push(interaction.options.data[0].user.id);
			interaction.reply({
				content: "Annoying " + interaction.options.data[0].user.username + "...",
				ephemeral: true
			})
			break;
		
		case 'stopannoy':
			const index = annoyees.indexOf(interaction.options.data[0].user.id);
			if (index > -1) {
				annoyees.splice(index, 1);
			}
			else {
				interaction.reply({
					content: "This user is not being annoyed!",
					ephemeral: true
				})
				return;
			}
						
			interaction.reply({
				content: "Stopping annoying " + interaction.options.data[0].user.username + "...",
				ephemeral: true
			})
			break;

	}
});

// Login to Discord with your client's token
client.login(token);