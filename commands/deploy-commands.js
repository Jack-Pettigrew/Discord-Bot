import { REST, Routes, SlashCommandBuilder } from "discord.js";
import { config } from "dotenv";

config();

/**
 * Array of all possible commands
 */
const commands = [
  new SlashCommandBuilder()
    .setName("help")
    .setDescription("Replies with some help!"),

  new SlashCommandBuilder()
    .setName("darkdax")
    .setDescription("Replies with some DarkDax links!"),

  new SlashCommandBuilder()
    .setName("annoy")
    .setDescription("Annoy a server member until further notice!")
    .addUserOption((option) => {
      return option
        .setName("userid")
        .setDescription("Annoy a server member until further notice!")
        .setRequired(true);
    }),

  new SlashCommandBuilder()
    .setName("stopannoy")
    .setDescription("Stop annoying a server member!")
    .addUserOption((option) => {
      return option
        .setName("userid")
        .setDescription("The ID of the user to stop annoying!")
        .setRequired(true);
    }),

  new SlashCommandBuilder()
    .setName("randomuser")
    .setDescription("Picks a random user from the server!"),

  new SlashCommandBuilder()
    .setName("announcestream")
    .setDescription("Announce a stream time")
    .addStringOption((option) =>
      option
        .setName("time")
        .setDescription("The time of stream")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("timezone")
        .setDescription("The timezone of the stream")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("The announcement message")
        .setRequired(true)
    ),

  new SlashCommandBuilder()
    .setName("setstreamlink")
    .setDescription("Sets the link to be shared for stream related commands")
    .addStringOption((option) => option.setName("link").setDescription("The link of the stream location").setRequired(true)),
    
].map((command) => command.toJSON());

const rest = new REST().setToken(process.env.TOKEN);

/**
 * Sets the bot's slash (/) commands
 */
try {
  console.log("Started setting application (/) commands.");

  await rest
    .put(Routes.applicationCommands(process.env.CLIENTID, process.env.SERVERID), {
      body: commands,
    })
    .then(() => console.log("Successfully set application (/) commands."))
    .catch(console.error);
} catch (error) {
  console.error(error);
}
