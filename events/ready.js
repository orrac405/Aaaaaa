const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const { TOKEN } = require("../config.json");
const { Client, GatewayIntentBits, Partials } = require("discord.js");
const INTENTS = Object.values(GatewayIntentBits);
const louritydb = require("croxydb")
const PARTIALS = Object.values(Partials);

const {  Monitor } = require("uprobot.js");

const links = louritydb.fetch("uptimeLinks");
const monitor = new Monitor({ array: links, duration: 5000 });

const client = new Client({
  intents: INTENTS,
  allowedMentions: {
    parse: ["users"]
  },
  partials: PARTIALS,
  retryLimit: 3
});

module.exports = async (client) => {

  const rest = new REST({ version: "10" }).setToken(TOKEN || process.env.token);
  try {
    await rest.put(Routes.applicationCommands(client.user.id), {
      body: client.commands,
    });
  } catch (error) {
    console.error(error);
  }

  console.log(`${client.user.tag} Aktif!`);
  client.user.setActivity(`🌍 ${client.guilds.cache.size} Sunucuya Ve 👤 ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} Kullanıcya Hizmet!`)
 // client.guilds.cache.size("dnd")  


  monitor.start();

};
