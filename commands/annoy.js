const { Message, Interaction } = require("discord.js");


var annoyees = [];

/**
 * Subscribes the user to being annoyed
 * @param {Interaction} interaction 
 */
export async function subscribeUserToAnnoy(interaction) {
    annoyees.push(interaction.options.data[0].user.id);

    interaction.reply({
        content: "Annoying " + interaction.options.data[0].user.username + "...",
        ephemeral: true
    })
};

/**
 * Unsubscribes the user from being annoyed
 * @param {Interaction} interaction 
 * @returns 
 */
 export async function unsubscribeUserFromAnnoy (interaction) {
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
};

/**
 * Handles annoying valid annoyee (User)
 * @param {Message} message 
 */
 export async function handleAnnoy(message) {
    if (message.author.bot || annoyees.length < 1 || !annoyees.includes(message.author.id)) return;
	
    // SpOnGeBoB rEpLy
	var text = message.content;
	var modifiedText = '';

	var modUpperCaseStart = Math.floor(Math.random() * 2);

	for (let index = 0; index < text.length; index++) {
		let letter = index % 2 == modUpperCaseStart ? text.charAt(index).toUpperCase() : text.charAt(index).toLowerCase();
		modifiedText += letter;
	}
	
	message.channel.send(modifiedText);
 };