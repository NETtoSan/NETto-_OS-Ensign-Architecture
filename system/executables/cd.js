const discord = require('discord.js')
const fs = require('fs')
module.exports={
    name:"cd",
    restrictions:["419767571571539979","687347431548911644"],
    aliases:["disk","d"],
    usage:"!cd <file>",
    description:"Finds a file/folder in that drive",
    execute(message,args,bot){
        if(!args[1]) return message.channel.send(new discord.MessageEmbed().setTitle("File directory cannot be empty").setDescription("Please start an argument with ./<file/dir>"))
        if(args[1].startsWith("/") && !this.restrictions.includes(message.author.id)) return message.channel.send(new discord.MessageEmbed().setTitle("/ is a system file. Apparently NETto has locked it").setDescription("For browsing NETto!_OS files. Start with ./"))
        try{
            const file = fs.readdirSync(message.content.slice(args[0].length+2))
            if(!file) return message.channel.send(new discord.MessageEmbed().setTitle("Invalid directory or folder does not exist").setDescription("Please try again"))

            if(file.length >= 1024) return message.channel.send(new discord.MessageEmbed().setTitle("The file namestring is too large").setDescription("If you are NETto. Please do it in file explorer instead").setColor(0xFF3333))

            const emb = new discord.MessageEmbed().setTitle(`${args[1]}`).setDescription("Containing files").addField("1",file)
            if(args[1].startsWith("/")) emb.setFooter("You are accessing root drive").setColor(0x3CFF33)
            else {emb.setColor(0x33FFEC) 
                emb.setFooter("You are accessing NETto!_OS folder")}
            
            message.channel.send(emb)
            
        }
        catch(e){
            message.channel.send(new discord.MessageEmbed().setTitle("Fatal error").setDescription("Description : \n" + e))
        }
    }
}