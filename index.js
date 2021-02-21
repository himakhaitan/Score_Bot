const Discord = require("discord.js");
const client = new Discord.Client();
const token = process.env.TOKEN;

const getScore = require("./utils/getScore");
const getMatches = require("./utils/getMatches");
const searchMatch = require("./utils/searchMatch")
const subsMatch = require("./utils/subsMatch");

const prefix = "-";

client.once("ready", () => {
  console.log("Score Bot is Online!");
});

client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) {
    return;
  } else {
    const input = message.content.slice(prefix.length).split(/ + /);
    const command = input.shift().toLowerCase();
    const match_id = message.content.slice(3).split(/ + /);
    if (command.startsWith("sc")) {
      if (message.member.roles.cache.has("812032198546686012")) {
        getScore(parseInt(match_id), (data) => {
          if (data.data.error === true) {
            message.channel.send({
              embed: {
                color: 3447003,
                author: {
                  name: client.user.username,
                  icon_url: client.user.avatarURL(),
                },
                title: "Message",
                description: "None of the Match is Live!",
                timestamp: new Date(),
                footer: {
                  icon_url: client.user.avatarURL(),
                  text: "© Score Bot",
                },
              },
            });
          } else {
            message.channel.send({
              embed: {
                color: 3447003,
                author: {
                  name: client.user.username,
                  icon_url: client.user.avatarURL(),
                },
                title: "Live Scores",
                description: "Live Scores your way!😏",
                fields: [
                  {
                    name: "Match Score",
                    value: `The Score of the match is (**__${data.data.score}__*).`,
                  },
                  {
                    name: "Competition Name",
                    value: `${data.data.comp_name}`,
                  },
                  {
                    name: "Team One",
                    value: `${data.data.team_one}`,
                  },
                  {
                    name: "Team Two",
                    value: `${data.data.team_two}`,
                  },
                  {
                    name: "Match Status",
                    value: `${data.data.status}`,
                  },
                ],
                timestamp: new Date(),
                footer: {
                  icon_url: client.user.avatarURL(),
                  text: "© Score Bot",
                },
              },
            });
          }
        });
      } else {
        message.channel.send({
          embed: {
            color: 3447003,
            author: {
              name: client.user.username,
              icon_url: client.user.avatarURL(),
            },
            title: "Message",
            description: `You must have <@&812032198546686012> role to use this command! Let me Give you the Permissions!😉`,
          },
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL(),
            text: "© Score Bot",
          },
        });
        message.member.roles.add("812032198546686012");
      }
    } else if (command.startsWith("help")) {
      message.channel.send({
        embed: {
          color: 3447003,
          author: {
            name: client.user.username,
            icon_url: client.user.avatarURL(),
          },
          title: "Score Bot Command List",
          description: "Live Scores your way!😏",
          fields: [
            {
              name: "Bot Prefix",
              value: " `(-)` is the bot prefix!",
            },
            {
              name: "List Matches",
              value: "`(lm)`",
            },
            {
              name: "Get Live Score",
              value:
                "`(sc <n>)` where n is the number of match! For eg: `(-sc 1)`",
            },
            {
              name: "Subscribe a Match",
              value:
                "`(subs <n>)` where n is the number of match! For eg: `(-subs 1)`",
            },{
              name: "Search a Match",
              value: "`(sm <name>)` where League Name is reffered as name. For e.g `(-sm Bundesliga)`"
            },
            {
              name: "Note",
              value: "Above commands are to be used with prefix mentioned!",
            },
          ],
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL(),
            text: "© Score Bot",
          },
        },
      });
    } else if (command.startsWith("lm")) {
      getMatches((data) => {
        var i;
        const field = [];

        if (data.length > 15) {
          for (i = 0; i < 15; i++) {
            field.push({
              name: `Match Number ${i}`,
              value: `${data[i].team_one} vs ${data[i].team_two}`,
            });
          }
        } else {
          for (i = 0; i < data.length; i++) {
            field.push({
              name: `Match Number ${i}`,
              value: `${data[i].team_one} vs ${data[i].team_two}`,
            });
          }
        }

        message.channel.send({
          embed: {
            color: 3447003,
            author: {
              name: client.user.username,
              icon_url: client.user.avatarURL(),
            },
            title: "Match List",
            description:
              "Here are the recent matches! There might be more of them!",
            fields: field,
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL(),
              text: "© Score Bot",
            },
          },
        });
      });
    } else if (command.startsWith("subs")) {
      const match_no = message.content.slice(5).split(/ + /);
      getScore(parseInt(match_no[0]), (data) => {
        message.channel.send({
          embed: {
            color: 3447003,
            author: {
              name: client.user.username,
              icon_url: client.user.avatarURL(),
            },
            title: "Match Subscribed",
            fields: [
              {
                name: "Name of the Match",
                value: `${data.data.comp_name}`,
              },
              {
                name: "Game",
                value: `${data.data.team_one} vs ${data.data.team_two}`,
              },
            ],
            description: `Thanks for Subscribing <@${message.author.id}>`,
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL(),
              text: "© Score Bot",
            },
          },
        });
      });
      subsMatch(parseInt(match_no[0]), (data) => {
        message.channel.send({
          embed: {
            color: 3447003,
            author: {
              name: client.user.username,
              icon_url: client.user.avatarURL(),
            },
            description: `${data} <@${message.author.id}>`,
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL(),
              text: "© Score Bot",
            },
          },
        });
      });
    }
    else if (command.startsWith('sm')) {
      const leauge = message.content.slice(4).split(/ + /);
      const leauge_name = leauge[0].toString()
      searchMatch(leauge_name, (data) => {
        message.channel.send({
          embed: {
            color: 3447003,
            author: {
              name: client.user.username,
              icon_url: client.user.avatarURL(),
            },
            title: "Search Result",
            description: "Live Score your way!",
            fields: data,
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL(),
              text: "© Score Bot",
            },
          },
        });
        console.log(data)
      })
      
    }
  }
});

client.login(token);

// Docker
// Notification (Change in live score)
// Floating Window
