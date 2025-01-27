export async function handleCommand(interaction) {
  if (!interaction.isCommand()) {
    return;
  }

  const { commandName } = interaction;

  switch (commandName) {
    case "help":
      interaction.reply({
        content: "This is some extremely unhelpful text!",
        ephemeral: true,
      });
      break;

    // TODO Update this way of handling

    // case "darkdax":
    //   handleDarkDax(interaction);
    //   break;

    // case "annoy":
    //   subscribeUserToAnnoy(interaction);
    //   break;

    // case "stopannoy":
    //   unsubscribeUserFromAnnoy(interaction);
    //   break;

    // case "randomuser":
    //   var list = await client.guilds.fetch(interaction.guildId);
    //   var users = await list.members.fetch();

    //   var arr = Array.from(users);
    //   let randomindex = Math.floor(Math.random() * arr.length);
    //   interaction.reply({
    //     content: `${arr[randomindex]} has been picked!`,
    //   });
    //   break;

    // case "setstreamlink":
    //   setStreamLink(interaction);
    //   break;

    // case "announcestream":
    //   announceStream(client, interaction);
    //   break;

    default:
        interaction.reply({
            content: `Oops! This command hasn't been implemented yet!`
        })
        break;
  }
}
