const { Client, REST, Routes, ApplicationCommandType, SlashCommandBuilder, MessageMentions, Message } = require("discord.js");
const { token, applicationID, guildID } = require("../config.json");

const commands = [
	new SlashCommandBuilder().setName('help').setDescription('Replies with some help!'),
	new SlashCommandBuilder().setName('darkdax').setDescription('Replies with some DarkDax links!'),
	new SlashCommandBuilder().setName('annoy').setDescription('Annoy a server member until further notice!')
		.addUserOption((option) => {
			return option.setName('userid')
				.setDescription('Annoy a server member until further notice!')
				.setRequired(true);
		}),
	new SlashCommandBuilder().setName('stopannoy').setDescription('Stop annoying a server member!')
		.addUserOption((option) => {
			return option.setName('userid')
				.setDescription('The ID of the user to stop annoying!')
				.setRequired(true);
		}),
].map(command => command.toJSON());

const rest = new REST({ version: 10 }).setToken(token);

const setupCommands = async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(Routes.applicationCommands(applicationID, guildID), { body: commands })
			.then(() => console.log('Successfully refreshed application (/) commands.'))
			.catch(console.error);
	} catch (error) {
		console.error(error);
	}	
};

module.exports.setupCommands = setupCommands;

/**
 * @param {Message} message 
 */
 const handleAnnoy = async (message) => {
    if (message.author.bot || annoyees.length < 1 || !annoyees.includes(message.author.id)) return;
	
	var text = message.content;
	var modifiedText = '';

	var modUpperCaseStart = Math.floor(Math.random() * 2);

	for (let index = 0; index < text.length; index++) {
		let letter = index % 2 == modUpperCaseStart ? text.charAt(index).toUpperCase() : text.charAt(index).toLowerCase();
		modifiedText += letter;
	}
	
	message.channel.send(modifiedText);
 };

module.exports.handleAnnoy = handleAnnoy;