const Discord = require("discord.js");

const setupCommands = (client = new Discord.Client) => {
    
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

};

module.exports.setupCommands = setupCommands;