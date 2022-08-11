// Require the necessary discord.js classes
const { Client, GatewayIntentBits, Partials, InteractionType } = require("discord.js");
const { token } = require("./config.json");
const { search } = require("./youtube-test.js");
const { setupCommands } = require("./commands/commands.js");
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
	if (message.author.bot || annoyees.length < 1 || !annoyees.includes(message.author.id)) return;
	
	var text = message.content;
	var modifiedText = '';

	var modUpperCaseStart = Math.floor(Math.random() * 2);

	for (let index = 0; index < text.length; index++) {
		let letter = index % 2 == modUpperCaseStart ? text.charAt(index).toUpperCase() : text.charAt(index).toLowerCase();
		modifiedText += letter;
	}
	
	message.channel.send(modifiedText);
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
			annoyees.pop(interaction.options.data[0].user.id);
			interaction.reply({
				content: "Stopping annoying " + interaction.options.data[0].user.username + "...",
				ephemeral: true
			})
			break;

	}
});

// Login to Discord with your client's token
client.login(token);