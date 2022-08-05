const Discord = require("discord.js");

const setupCommands = (client) => {
    
    // help
    client.application?.commands.create({
		name: "help",
		description: "Replies with some help!",	  
	})

    // darkdax
	client.application?.commands.create({
		name: "darkdax",
		description: "Replies with some DarkDax links!",	  
	})

	// annoy
	client.application?.commands.create({
		name: "annoy",
		description: "Annoy a server member until further notice!",
		options: [
			{
				name: "userid",
				description: "The ID of the user to annoy",
				type: "USER",
				required: true,
			}
		],
	})

};

module.exports.setupCommands = setupCommands;