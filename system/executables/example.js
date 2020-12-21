const discord = require('discord.js')
module.exports={
    name:"example",
    aliases:["templates","test"],
    usage:"!example",
    description:"Test the function if it works or not",
    restrictions:["everyone"],
    execute(message,args,bot){
        //Test out the embed commands
        try{
            const embed = new discord.MessageEmbed()
            .setTitle("Example")
            .setDescription("If this message shows up. Then your configuration is correct!")
            .setColor(0x33FFEC)
            message.channel.send(embed)
        }
        catch(e){
            message.channel.send(`Example
If this message shows up. Then your OS or npm does not support message embeds`)
        }
    }
}
