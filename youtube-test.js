const { Interaction } = require("discord.js");
const { google } = require("googleapis");
const { googleApiKey } = require("./config.json");
const youtube = google.youtube({
  version: "v3",
  auth: googleApiKey,
});

/**
 * Searches and returns an array of DarkDax video links
 * @returns array of video links
 */
const search = async () => {
  let response = await youtube.search.list({
    part: "id,snippet",
    q: "DarkDax",
  });

  var videos = [];
  for (const [key, value] of Object.entries(response.data.items)) {
    let link = "";
    switch (value.id.kind.split("#")[1]) {
      case "channel":
        link = "https://www.youtube.com/channel/" + value.id.channelId;
        break;

      case "video":
        link = "https://www.youtube.com/watch?v=" + value.id.videoId;
        break;
    }

    videos.push({
      title: value.snippet.title,
      link: link,
    });
  }
    
    return videos;
};

/**
 * Handles the 'darkdax' slash (/) command
 * @param {Interaction} interaction 
 */
export async function handleDarkDax(interaction) {
  let links = await search();
  let reply = "";

  links.forEach(element => {
    reply = reply + element.link + "\n";
  });

  interaction.reply({
    content: reply,
    ephemeral: true
  });
};