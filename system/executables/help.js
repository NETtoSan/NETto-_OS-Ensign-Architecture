const discord = require('discord.js')
module.exports={
    name:"help",
    aliases:["bothelp"],
    usage:"!help",
    description:"Help users getting through the bot",
    restrictions:["everyone"],
    execute(message,args,bot){
        //Test out the embed commands
        const {programs , userprograms,carryover}= message.client
        try{
            if(args[1]){
                const command = programs.get(args[1].toLowerCase()) ||programs.find(program=>program.aliases && program.aliases.includes(args[1].toLowerCase()))
                if(!command){
                    const usercommand = userprograms.get(args[1].toLowerCase()) || userprograms.find(program=>program.aliases && program.aliases.includes(args[1].toLowerCase()))
                    if(!usercommand){
                        const over = carryover.get(args[1].toLowerCase()) || carryover.find(over=>over.aliases && over.aliases.includes(args[1].toLowerCase()))
                        if(!over) return message.channel.send(new discord.MessageEmbed().setColor(0xFF3333).setTitle("Program not found"))

                        return message.channel.send(new discord.MessageEmbed().setTitle(`Carriedover program ${over.name}`).setDescription(over.description).addField("usage",over.usage).addField("aliases",over.aliases).setColor(0x33FFEC))
                    }
                    

                    const embed = new discord.MessageEmbed().setTitle(`User program : ${usercommand.name}`).setDescription(`${usercommand.description}`).addField("usage",usercommand.usage).addField("aliases",usercommand.aliases).setColor(0x33FFEC)
                    
                    if(usercommand.type){
                        embed.addField("This program" , `Has created by ${usercommand.type}`)
                    }
                    else{
                        embed.addField("This program" , "Cannot retrace owners who have installed it")
                    }
                    return message.channel.send(embed)
                    
                }
                const embed = new discord.MessageEmbed()
                .setTitle(command.name)
                .setDescription(command.description)
                .addField("usage" , command.usage)
                .addField("aliases", command.aliases)
                if(command.restrictions){
                    if(command.restrictions == "everyone") return embed.addField("Available to", "everyone")
                    else{
                        embed.addField("Available to" , "Certain people")
                    }
                }
                else{
                    embed.addField("Available to" , "This program has not set permissions")
                }
                if(command.type){
                    
                }
                else{
                    embed.addField("This program" , "Is a system program")
                }
                embed.setColor(0x33FFEC)
                message.channel.send(embed)
                return
            }
            const embed = new discord.MessageEmbed()
            .setTitle(bot.user.username)
            .setDescription("This is an older release. Use it with caution :warning:\nHow to use this bot properly")
            .setThumbnail('https://cdn.discordapp.com/attachments/712331256087445566/777989331541295154/help1.png')
            .addField("System programs",programs.map(program=>program.name).join("\n"),true)
            .addField("Installed programs",userprograms.map(program=>program.name).join("\n"),true)
            .addField("NETto!_NT carriedover programs", "null")
            .addField("NETto!_KT, Darka, SMT, Legacy carriedover programs",carryover.map(over=>over.name).join("\n"))
            .setFooter("Ensign architecure is a testing kernel. Major changes will be applied here")
            .setColor(0xFF3333)
            message.channel.send(embed)
        }
        catch(e){
            const embed = new discord.MessageEmbed()
            .setTitle("Fatal error")
            .setColor(0xFF3333)
            message.channel.send(embed)
            console.log(e)
        }
    }
}
