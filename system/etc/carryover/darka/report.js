//This program calls when user executed a suggsted commands
const discord = require('discord.js')

module.exports={
    name:"report",
    description:"Report an issues to NETto (The bot owner)",
    aliases:["blame"],
    execute(message,bot,args,customargs){
        if(customargs[1]){
            //Slices a message
            const editedMessage = message.content.slice(1+customargs[0].length)
            console.log(editedMessage)
            //Actually sends a suggestion to a desginated guild channel ID
            //If you dont know what name.SUGGEST_ID is. i recommend you to take a look at ./system/channels.json
            const fwd = bot.users.cache.get('419767571571539979')
            const embed = new discord.MessageEmbed()
            .setTitle("New report!")
            .setThumbnail(message.author.avatarURL())
            .addField(`${message.author.username} reported` , editedMessage)
            .setColor(0x33FFEC)
            fwd.send(embed)
            //Then sends a feedback to the users
            const embed2 = new discord.MessageEmbed()
            .setTitle("Report submitted")
            .setDescription("Your report has been sent to NETto!. Please be patient")
            .setColor(0x33FFEC)
            message.channel.send(embed2)
        }
    }
}