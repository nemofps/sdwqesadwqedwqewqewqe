const { ActivityType, Events, ActivityPlatform } = require("discord.js")
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");

module.exports = {
 name: Events.ClientReady,
 once: true,
 execute(client) {
  const rest = new REST({ version: "10" }).setToken(client.token);
  const activities = [ `Developed by Nemo`, `KuveytTürk Sh BotBy:Nemo`, `ZÜMRALİMMMM❤️` ]
  const status = [ `online`, `dnd`, `idle` ]
  let nowActivity = 0;
  let nowStatus = 0;
  function botPresence() {
  client.user.presence.set(
    { activities: [{ name: `${activities[nowActivity++ % activities.length]}`, type: ActivityType.Watching }],
      status: `${status[nowStatus++ % status.length]}`
  }
)
  setTimeout(botPresence, 15000)
  }
  botPresence()
  
  client.log(`Logged in as ${client.user.username}.`);
  //
    try {
      rest.put(Routes.applicationCommands(client.user.id), {
      body: client.slashDatas,
    });
  } catch (error) {
    console.error(error);
  }
}};
