import { Client, Events, GatewayIntentBits } from "discord.js";
import { config } from "dotenv";

config();

const client = new Client({
    intents: [GatewayIntentBits.Guilds],
});

function onDiscordReady() {
    console.log("🎉 Logged into Discord 🎉");
    console.log(client.user.username);
    console.log(client.user.tag);
}

client.once(Events.ClientReady, onDiscordReady);

client.login(process.env.TOKEN);