const discord = require('discord.js')
const fs = require('fs')
const si = require('systeminformation')
module.exports={
    name:"system",
    aliases:["sys","kr"],
    usage:"!system <command>",
    description:"A system integration",
    restrictions:["everyone"],
    async execute(message,args,bot){
        const config = require('../config/bot.json')
        if(!args[1]) return message.channel.send(new discord.MessageEmbed().setTitle("<:settings:786205983713525761> System settings").setDescription("Change server configuration or NETto!_OS coonfiguration of choice").addField("Information commands", "serverinfo , botinfo , colorinfo , userinfo , sysctl").addField("Emergency command","$reload , $globalprefix , $response , $reactionTest").setColor(0x33FFEC))
        if(args[1] == "serverinfo"){
            const embed = new discord.MessageEmbed().setTitle(message.guild.name)
        .setThumbnail(message.guild.iconURL())
        .setDescription("About this server")
        .addField("Created on ", message.guild.createdAt)
        .addField("Dedicated server location", message.guild.region,true)
        .addField("This server is owned by" , message.guild.owner,true)
        .addField("This server has", `${message.guild.memberCount.toLocaleString()} members \n ${message.guild.channels.cache.filter((c)=> c.type !== "category").size} channels **With** \n ${message.guild.channels.cache.filter((c) => c.type === "text").size} text channels **and** \n ${message.guild.channels.cache.filter((c) => c.type === "voice").size} voice channels`,true)
        .addField("The server ID is", message.guild.id,)
        
        
        if(message.member.permissions.has("ADMINISTRATOR")) {embed.addField("Channel lists", message.guild.channels.cache.map(channel=>channel.name).join('\n'),true)
                                                             embed.addField("Channel ID", message.guild.channels.cache.map(channel=>channel.id).join("\n"),true)
                                                             embed.addField("Total roles", message.guild.roles.cache.map(role=>role.name).join("\n"))
                                                             embed.setFooter("You are viewing detailed information on this guild")
                                                            }
                                                            else{
                                                                embed.setFooter("Server owner can view detailed information on this guild")
                                                            }
        embed.addField("Highest role", message.guild.roles.highest,true)
        embed.addField("Bot's obtained role", message.guild.me.roles.cache.map(role=>role.name),true)
        embed.addField("Your obtained role", message.member.roles.cache.map(role=>role.name),true)
        
        
        embed.setColor(0x33FFEC)
        message.channel.send(embed)
        }
        else if(args[1] == "userinfo"){
            if(!args[2]){
                return message.channel.send(new discord.MessageEmbed().setTitle(`${message.author.username}`).setDescription(`About you in ${message.guild.name}`).addField("You were born on",message.author.createdAt).addField("Your ID is",`${message.author.id}`,true).addField(`Your highest role on ${message.guild.name} is`,message.member.roles.highest).setThumbnail(message.author.avatarURL()).setColor(0x33FFEC).addField("Your obtained role on " + message.guild.name, message.member.roles.cache.map(role=>role.name).join(" , "),true))
            }
        }
        else if(args[1] == "botinfo"){
            if(args[2] == "-!s") return detI(message,args,bot)
            if(args[2] == "-!r" && message.author.id == "419767571571539979") return message.channel.send(new discord.MessageEmbed().setTitle("NETto!_OS configuration reset").setDescription("You may start this bot clean").setColor(0x33FFEC))
            const embed = new discord.MessageEmbed().setTitle(`${bot.user.username}`).setDescription("About this bot")
            .setColor(0x33FFEC)
            .setThumbnail(bot.user.avatarURL())
            .addField("This bot is","A NETto hobbyist project. Being developed during his free time and school rule violations. Useful functions may vary \n Mostly used to operate NETSU Labs and STPGraphy database handling \n Uses vary of kernels and execution layer to emulate old programs and run old databses stringsystem")
            .addField("This bot uses", "Ensign architecture to run stuffs \n Citic engine for performance improvements and real time program translation \n CompatX to recompile error'd programs")
            .addField("This bot has", `${(await si.cpu()).brand} @ ${(await si.cpu()).speed} GHz\n ${(await si.memLayout()).map(mem=>mem.size)/1024/1024} Megabytes of ram`)
            .addField("Ensign kernel version", "NT recompiled revision 21.0",true)
            .addField("Citic engine version","Alpha 13",true)
            .setFooter("Bot owner can view detailed information of this bot")
            if(message.author.id == "419767571571539979"){
                embed.addField("A bot has a file system of" , `-${fs.readdirSync('./').join("\n-")}`)
                embed.addField("A bot has joined" , `${bot.guilds.cache.map(guild=>guild.name).join('\n')}`,true)
                embed.setFooter("You are the owner of this bot")
            }
            
            
            message.channel.send(embed)
            
        }
        else if(args[1] == "colorinfo"){
            const embed = new discord.MessageEmbed().setTitle("NETto!_OS color display embed")
            .setDescription("This embed will explain what each color on embed means")
            .addField("Blue (0x33FFEC)","Normal operation , Compiled programs , Program running",true)
            .addField("Green", "Program compiling , Pending operation , Queued tasks",true)
            .addField("Red (0xFF3333)", "Fatal error , Missing files , Failed to compile , Permission denied , General error",true)
            .addField("Pink", "Message forwarding , Special programs",true)
            .addField("Black" , "Incompleted program",true)
            .setFooter("These color hex codes are unique for NETto!_OS. For clone detection and copied filesystems if it were used outside NETto!_OS \nOther colors than these original colors can be displayed as ***User installed*** programs")
            .setColor(0x33FFEC)
            message.channel.send(embed)
        }
        else if(args[1] == "!s"){
            const eb1 = new discord.MessageEmbed().setTitle(`${message.guild.name}`).setDescription("Server settings for how NETSU Labs should act")
        }
        else if(args[1] == "sysctl") return ctl(message,args,bot,config)
    }
}

function detI(message,args,bot){
    let sh = ["1","2","3","4"]
    let embed1 = new discord.MessageEmbed().setTitle("NETto!_OS is inspired by MS-DOS").setDescription("You can noticed the subcommands are likely to be the exact thing as you will do on MSDOS").setColor(0x33FFEC)
    let embed3 = new discord.MessageEmbed().setTitle("Dedicated thanks to these contributors").setDescription("Peter1095 \nLJMSU \nElvin \nAuserwaulth \nKnilios \nAnd NETSU Labs teams").setColor(0x33FFEC)
    let embed4 = new discord.MessageEmbed().setTitle("3 Transitions had been made during its NETSU Labs service").setDescription("Alot of major changes had been made but the style of usage remains the same").setColor(0x33FFEC)
    let embed2 = new discord.MessageEmbed().setTitle("NETto!_OS is a double edged tool").setDescription("You can use it for good and make good fundamentals with it \n Or you can get yourself hated for using the bot").setImage('https://cdn.discordapp.com/attachments/753612710582681630/779012023790600222/doubleedged.png').setColor(0x33FFEC)
   let choices = sh[Math.floor(Math.random()*sh.length)]
   switch(choices){
       case"1": message.channel.send(embed1)
       break
       case"2": message.channel.send(embed2)
           break
       case"3": message.channel.send(embed3)
       break
       case"4": message.channel.send(embed4)
   }
}
function ctl(message,args,bot,config){
    const {programs , userprograms,carryover}= message.client
    if(!args[2]) return message.channel.send(new discord.MessageEmbed().setTitle("NETto!_OS control panel").setDescription("Enter settings below \nApps : appctl \nInternal framework : mnftctl \nGlobal settings value : mainctl\nico : Completely reloads NETto!_OS and dump memory \nstart : Startup wffect").setColor(0x33FFEC))
    if(args[2] == "start"){
        if(!args[3]) return message.channel.send(new discord.MessageEmbed().setTitle("Please enter a valid option!").setDescription("The options for startup are true/false").setColor(0xFF3333))
        if(args[3] == "true"){
            config["startup"] = true
            fs.writeFileSync('./system/config/bot.json',JSON.stringify(config,null,4),err=>{
                if(err) return;

            })
            return message.channel.send(new discord.MessageEmbed().setTitle("Startup behavior has been changed").setDescription("The bot will now report system statistics").setColor(0x33FFEc))
        }
        if(args[3] == "false"){
            config["startup"] = false
            fs.writeFileSync('./system/config/bot.json',JSON.stringify(config,null,4),err=>{
                if(err) return;

            })
            return message.channel.send(new discord.MessageEmbed().setTitle("Startup behavior has been changed").setDescription("The bot will not report system statistics").setColor(0x33FFEc))
        }
    }
    if(args[2] == "appctl"){
        if(!args[3]){
            const prog = programs.map(program=>program.name).join('\n')
            const progdesc = programs.map(program=>program.restrictions).join('\n')

        const eb = new discord.MessageEmbed().setTitle("List of installed programs")
        .addField("System programs",prog,true)
        .addField("Restrictions", progdesc,true)

        eb.setColor(0x33FFEC)
        eb.setFooter("To remove or modify programs : Use !system sysctl appctl <name> <options> \nOptions : remove/mod <var>")
        return message.channel.send(eb)
        }
        if(args[3]){
            //return fx here

            if(!args[4]) return message.channel.send(new discord.MessageEmbed().setTitle("Please use valid options below").setDescription("mod : Modify program , remove : Remove program"))
            if(args[4] == "remove"){
                if(args[3].toLowerCase().includes("net")) return message.channel.send(new discord.MessageEmbed().setTitle("You are about to remove the bot owner").setDescription("Are you sure you want to remove the god?").setFooter("NETto!_OS will automatically go suspended").setColor(0xFF3333))
                const embed = new discord.MessageEmbed().setTitle(`You are about to remove ${args[3]}`).setDescription("Are you sure you want to proceed removing this program?").setColor(0xFF3333)
                return message.channel.send(embed)
            }
        }
    }
    if(args[2] == "mainctl"){
        const embed = new discord.MessageEmbed().setTitle("Global settings value")
        .setDescription("This menu shows what the specific values are and may explain how NETto!_OS works")
        .addField("Role restrictions", "no")
        .addField("Channel restrictions", "%chCTL_NAME<bot> (execute in channel that contains 'bot' no matter what)")
        .addField("NETto!_OS all kernel support", "NETto!_NT , NETto!_SMT , Darka architecture").addField("Execution restrictions type" , "user")
        .setColor(0x33FFEC)
        return message.channel.send(embed)
    }
    if(args[2] == "ico"){
        message.channel.send(new discord.MessageEmbed().setTitle("NETto!_OS self check sequence").setColor(0x33FFEC).setDescription("Collecting essential data..."))
        .then(message=>{
            const userprograms = fs.readdirSync('./progfiles').filter(file=>file.endsWith('.js'))
            const program = fs.readdirSync('./system/executables').filter(file=>file.endsWith('.js'))
            message.edit(
            
            new discord.MessageEmbed().setTitle("NETto!_OS self check sequence").setDescription("Collecting system data..")
            .addField("System programs" , `${program.length}`)
            .addField("User programs" , `${userprograms.length}`)
            .setColor(0x33FFEC)
        ).then(message=>{
            message.edit(
                new discord.MessageEmbed().setTitle("NETto!_OS self check sequence").setDescription("Done. Good to go").setColor(0x33FFEC)
            )
        })
    
    })
    }
    else return message.channel.send(new discord.MessageEmbed().setTitle("Unknown option!").setDescription("Please use valid settings below \nApps : appctl \nInternal framework : mnftctl \nGlobal settings value : mainctl \nico : Completely reloads NETto!_OS and dump memory \nstart : Startup wffect").setColor(0xFF3333))
}