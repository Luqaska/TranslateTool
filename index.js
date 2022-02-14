const Nertivia = require("nertivia.js");
const client = new Nertivia.Client();
const translate = require('translate-google');
const moji = require('moji-translate');
const prefix = "/";
var data;



client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}! ${client.user.id}`);
  client.user.setStatus("ltp");
  client.user.setActivity("Ready to translate");
})


client.on("message", msg => {
  /* --- NerluCTX --- */
  /* Start */
  var ctx = msg.content;
  if (ctx.split("")[0] == prefix) {
    // Extract prefix
    ctx = ctx.split("");
    var fChar = ctx.shift();
    //console.log(ctx);
    ctx = ctx.join("");
    // Extract command
    var command = ctx.split(" ")[0].toLowerCase();
    // Extract subcommands (or ctx)
    ctx = ctx.split(" ");
    ctx.shift();
  } else {
    var command = [""];
  }
  /* End */



  /* Commands */
  if (command === "trans") {
    var lang = ctx.shift();
    var text = ctx.join(" ");
    if(lang.toLowerCase() == ("moji" || "emoji")){
      msg.send(moji.translate(text));
    }else{
      translate(text, {to: lang}).then(res => {
        msg.send(res)
      }).catch(err => {
        msg.reply("an error has ocurred. Cannot translate the text you've sent.")
      })
    }
  } else if (command === "about-trans") {
    msg.send("**Translate:Tool** v1.0.0\n\nPowered by **[link: translate.google.com -> Google Translate]** and **[link: github.com/notwaldorf/emoji-translate -> Emoji Translate]**\n(via [link: npmjs.com/package/translate-google -> translate-google] and [link: npmjs.com/package/moji-translate -> moji-translate])\n\n**Author:** some:dude\n\nHuge thanks to the Nertivia official guild, for the help\nhttps://github.com/luqaska/TranslateTool")
  }


})

//require('./server')();
client.login("[TOKEN]");
