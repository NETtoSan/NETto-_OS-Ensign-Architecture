const discord = require('discord.js')
module.exports={
    name:"del",
    aliases:["purge","msgdel"],
    usage:"!del <message amount> \n **Only if deletes a file** !del <filedir>",
    description:"Deletes a message . To clear cache or stuffs",
    restrictions:["419767571571539979","687347431548911644"],
    execute(message,args,bot){
        if(args[1].startsWith("/")){
            if(message.author.username != "419767571571539978") return message.channel.send(new discord.MessageEmbed().setTitle("You may not access root folders").setDescription("Permission denied").setColor(0xFF3333))
        }
        if(args[1].startsWith(".")){
            return message.channel.send(new discord.MessageEmbed().setTitle("If a file directory goes here. It will execute this function").setDescription("Which means that it's working properly").setColor(0x33FFEC))
        }
        if(!isNaN(args[1])){
            message.channel.bulkDelete(args[1]+1)
            .then(message.channel.send(new discord.MessageEmbed().setTitle(`Successfully deleted ${args[1]} messages`)))
            .catch(()=> message.channel.send(new discord.MessageEmbed().setTitle("Something went wrong while deleting message").setDescription("Mostly permissions error")))
        }
        else{
            message.channel.send(new discord.MessageEmbed().setTitle(`${args[1]} is not a number!`).setDescription("Cannot delete message with a string amount"))
        }
    }
}