const { twitchChannelID } = require('../config.json');
const { Interaction, Client } = require("discord.js");

var streamLink = "";

var whitelistedSites = ["youtube.com", "twitch.tv"];

/**
 *
 * @param {Interaction} interaction
 */
const setStreamLink = async (interaction) => {
  // check it is a link to a whitelisted site
  var link = interaction.options.getString("link");
  let www = link.split("//")[1].split(".")[0];

  // Validate link
  if (www !== "www") {
    interaction.reply({
      content: "Please include the full link (https, www, etc).",
      ephemeral: true,
    });
    return;
  }

  var splitLink = link.split(".");
  var domain = splitLink[1] + "." + splitLink[2].split("/")[0];

  var foundDomain = whitelistedSites.find((site) => site === domain);

  if (foundDomain === undefined) {
    interaction.reply({
      content:
        "The site provided is not whitelisted. Please provide a whitelisted domain.",
      ephemeral: true,
    });
    return;
  }

  streamLink = link;
  interaction.reply({
    content: "Stream link set to: " + streamLink,
    ephemeral: true,
  });
};

// module.exports.
module.exports.setStreamLink = setStreamLink;
