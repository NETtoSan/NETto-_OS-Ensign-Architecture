const discord = require('discord.js')
const download = require('download')
const fs = require('fs')

module.exports={
    name:"install",
    description:"Install a program to NETto!_OS",
    aliases:[''],
    restrictions:['419767571571539979','676696728065277992'],
    usage:"!install",
    execute(message,args,bot){

        if(!message.attachments.first()) return message.channel.send(new discord.MessageEmbed().setTitle("Please provide .js file to execute this program").setDescription("Otherwise it cant install anything").setColor(0xFF3333))
        if(!message.attachments.first().attachment.endsWith(".js")) return message.channel.send(new discord.MessageEmbed().setTitle("Invalid file format").setDescription("NETto!_OS only supports .js file at this moment").setColor(0xFF3333))

        download(message.attachments.first().url,"./system/etc/download")
        const name = message.attachments.first().name
        let filter = m=> m.author.id == message.author.id && !m.author.bot
        try{
            const downloadEvent = require(`../etc/download/${name}`)
            message.channel.send(new discord.MessageEmbed().setTitle("Install prompt").setDescription(`Are you sure you want to install ${downloadEvent.name}?`).setColor(0x33FFEC))
            message.channel.awaitMessages(filter,{max:1}).then(collected=>{
                if(collected.first().content.toLowerCase() == "y") {
                    download(message.attachments.first().url, "./progfiles")
                    setTimeout(() => {
                        bot.userprograms = new discord.Collection()
                        const userprograms = fs.readdirSync('./progfiles').filter(file=>file.endsWith('.js'))
                        for(const file of userprograms){
                        const userprogram = require(`/home/nettosan/Documents/Ensign1/progfiles/${file}`)
                        bot.userprograms.set(userprogram.name,userprogram)
                        console.log(`Loaded program ${userprogram.name}`)
                    }
                    }, (1000));
                    return message.channel.send(new discord.MessageEmbed().setTitle("Install prompt").setDescription(`Successfully installed ${downloadEvent.name}`).setFooter("If the program doesnt work or any install program suddenly dies. \nRun $reload to reload the entire program directory").setColor(0x33FFEC))
                }
            })
        }
        catch(e){
            return message.channel.send(new discord.MessageEmbed().setTitle("Illegal operation").setDescription("Detailed info " + e).setColor(0xFF3333))
        }
    
    }
}