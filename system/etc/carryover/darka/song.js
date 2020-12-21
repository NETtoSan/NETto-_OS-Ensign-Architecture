const discord = require('discord.js')
var ytdl = require('ytdl-core');
const ffmpeg = require('ffmpeg')
const search = require('youtube-search')
const si = require('systeminformation')
const queue = new Map();
const YOUTUBE_API = "AIzaSyAm5doszJzGGQGdWgRiAgVxgir2a6MAwXc"
const opts = {
    maxResults: 25,
    key: YOUTUBE_API,
    type:'video'
}

module.exports={
    name:'song',
    description:"Plays a song for everyone",
    aliases:["play" , "skip" , "stop" , "nextsong","songinfo","start","search"],
    async execute(message,bot,args,customargs){
        let thisGuild = bot.guilds.cache.get(message.guild.id)
        let bannedBot = "235088799074484224"
        //if(thisGuild.member(bannedBot)) return message.channel.send(new discord.MessageEmbed().setTitle("Rythm bot exists in this discord guild!").setDescription("To avoid possible interference and hates. NETto!_OS has disabled MIDI abilities for this discord guild").setColor(0xFF3333))
        console.log(customargs)
        console.log("!FILE "+ customargs[0])
        const serverQueue = queue.get(message.guild.id);
        if(customargs[0] == "play" || customargs[0] == "!start"){
            run(message,customargs,serverQueue)
        }
        else if(customargs[0] == "skip"){
            skip(message,customargs,serverQueue)
        }
        else if(customargs[0] == "stop"){
            stop(message,customargs,serverQueue)
        }
        else if(customargs[0] == "nextsong"){
            queues(message,customargs,serverQueue)
        }
        else if(customargs[0] == "songinfo"){
            if(!serverQueue) return message.channel.send("E")
            console.log(serverQueue.songs.length)
            const embed = new discord.MessageEmbed().setTitle("Song queues").setColor(0x33FFEC)
            for(let i = 0 ; i < serverQueue.songs.length ; i++){
                console.log(i)
                if(i == 0) embed.addField("Now playing ->"+serverQueue.songs[0].title,serverQueue.songs[0].url)
                embed.addField(i + " ) "+ serverQueue.songs[i].title,serverQueue.songs[i].url)
            }
            if(!message.content.endsWith("-!Sy")) embed.setFooter("To see advanced system statistics. Please add -!Sy to the end of message")

            const embed2 = new discord.MessageEmbed().setTitle("Advanced system statistics to overcome errors while processing sound data").setColor(0x33FFEC)
            if(!serverQueue) embed.setDescription("SONG NOT PLAYING").setColor(0xFF3333)
            embed2.addField("Heap usage" , process.memoryUsage().heapUsed,true).addField("Buffers", process.memoryUsage().arrayBuffers,true)
            embed2.addField("Transcoding process", (await si.processes()).all,true).addField("FFMPEG Location","C:/ffmpeg/bin",true)
            message.channel.send(embed)
            if(message.content.endsWith("-!Sy")) message.channel.send(embed2)

            return
        }
        else if (customargs[0] == "search") {
            let embed = new discord.MessageEmbed()
                .setColor("#73ffdc")
                .setDescription("Please enter a search query. Remember to narrow down your search.")
                .setTitle("YouTube Search API");
            let embedMsg = await message.channel.send(embed);
            let filter = m => m.author.id === message.author.id;
            let query = await message.channel.awaitMessages(filter, { max: 1 });
            let results = await search(query.first().content, opts).catch(err => console.log(err));
            if (results) {
                let youtubeResults = results.results;
                let i = 0;
                let titles = youtubeResults.map(result => {
                    i++;
                    return i + ") " + result.title;
                });
                console.log(titles);
                message.channel.send({
                    embed: {
                        title: 'Select which song you want by typing the number',
                        description: titles.join("\n")
                    }
                }).catch(err => console.log(err));

                filter = m => (m.author.id === message.author.id) && m.content >= 1 && m.content <= youtubeResults.length;
                let collected = await message.channel.awaitMessages(filter, { maxMatches: 1 });
                let selected = youtubeResults[collected.first().content - 1];

                embed = new discord.MessageEmbed()
                    .setTitle(`${selected.title}`)
                    .setURL(`${selected.link}`)
                    .setDescription(`${selected.description}`)
                    .setThumbnail(`${selected.thumbnails.default.url}`);

                message.channel.send(embed);
            }
        }
        else{
            if(message.author.bot) return;
            message.channel.send("!song is long gone!. my brother. i've improved myself")
        }
    }
}

async function run(message,customargs,serverQueue) {
    try{
        const voiceChannel = message.member.voice.channel
        if(!voiceChannel){
            const embed = new discord.MessageEmbed()
            .setTitle("NETto!_OS")
            .setDescription("You need to join the voice channel!")
            .setColor(0xFF3333)
            message.channel.send(embed)
            return;
        }
        const permissions = voiceChannel.permissionsFor(message.client.user)
        if(!permissions.has('CONNECT') || !permissions.has('SPEAK')){
            const embed = new discord.MessageEmbed()
            .setTitle("NETto!_OS")
            .setDescription("I need to have permissions to connect!")
            .setColor(0xFF3333)
            message.channel.send(embed)
        }
        
        const songInfo = await ytdl.getInfo(customargs[1])
        const song = {
            
            title: songInfo.videoDetails.title,
            url: songInfo.videoDetails.video_url,
            duration: songInfo.videoDetails.lengthSeconds,
            thumbnail: songInfo.videoDetails.thumbnail,
            songauth: message.author.username
        }
        if(!serverQueue){
            const queueConstruct={
                textChannel: message.channel,
                voiceChannel: voiceChannel,
                connection: null,
                songs: [],
                volume: 5,
                playing: true
            }
            queue.set(message.guild.id,queueConstruct)
            queueConstruct.songs.push(song)
            
            try{
                var connection = await voiceChannel.join()
                queueConstruct.connection = connection
                play(message.guild, queueConstruct.songs[0])
            }
            catch(err){
                console.log(err)
                queue.delete(message.guild.id)
                return message.channel.send(err)
            }
        }
        else{
            serverQueue.songs.push(song)
            const embed = new discord.MessageEmbed()
            .setTitle(`**${song.title}**`)
            .setDescription(`The song : **${song.title}** has been added to the playlist!`)
            .setColor(0x33FFEC)
            message.channel.send(embed)
        }
    }
    catch(e){
        message.channel.send("Something went wrong! aas\n " +e)
    }
}
function play(guild,song) {
    try{
        const serverQueue = queue.get(guild.id)
        if(!song){
            queue.delete(guild.id)
            return
        }
        console.log(song.url)

            const dispatcher = serverQueue.connection
            
                .play(ytdl(song.url, {
                    quality: 'highestaudio',
                    
                    highWaterMark: 1 << 25,

                }))
                .on('finish', () => {
                    serverQueue.songs.shift()
                    play(guild, serverQueue.songs[0])
                })
                .on('error', error => {
                    serverQueue.textChannel.send('Something went wrong!')
                    serverQueue.textChannel.send('skipping songs')
                    serverQueue.songs.shift();
                    play(guild, serverQueue.songs[0])
                    return;
                })
        try {
            dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
        } catch (err) {
            console.log(err)
        }
        const embed = new discord.MessageEmbed()
        .setTitle(`**${song.title}**`)
        .setDescription(`Now playing : **${song.title}**`)
        .addField("Song duration" , `${song.duration} seconds` , true)
        .addField("URL", `${song.url}`,true)
        .setFooter(`Song requested by ${song.songauth}`)
        .setColor(0x33FFEC)
        serverQueue.textChannel.send(embed)
    }
    catch(err){
        console.log(err)
    }
    
}
function skip(message,customargs,serverQueue) {
    try{if (!message.member.voice.channel){
       const embed = new discord.MessageEmbed()
      .setTitle("Songs")
      .setDescription("You need to be in a voice channel!")
      .setColor(0x33FFEC)
      message.channel.send(embed)
    }
    if (!serverQueue)
    {
        const embed = new discord.MessageEmbed()
       .setTitle("Songs")
       .setDescription("There's no songs i can skip!")
       .setColor(0x33FFEC)
       message.channel.send(embed)
     }
    serverQueue.connection.dispatcher.end()
    const embed = new discord.MessageEmbed()
    .setTitle("Songs")
    .setDescription('Skipped the song!')
    .setColor(0x33FFEC)
    message.channel.send(embed)
    }catch(e){
        console.log(e)
      const embed = new discord.MessageEmbed()
      .setTitle("Process aborted")
      .setDescription(`Possible causes for error :\n ${e}`)
      .setColor(0xFF3333)
      message.channel.send(embed)
    }
}
function stop(message,customargs,serverQueue) {
    try{if (!message.member.voice.channel)
      {
        const embed = new discord.MessageEmbed()
       .setTitle("Songs")
       .setDescription("You need to be in a voice channel!")
       .setColor(0x33FFEC)
       message.channel.send(embed)
     }
     else{
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end();
        const embed = new discord.MessageEmbed()
        .setTitle("Songs")
        .setDescription('stopped the song!')
        .setColor(0x33FFEC)
        message.channel.send(embed)
     }
}catch(e){
    console.log(e)
    .setTitle("Process aborted")
    .setDescription(`Possible causes for error :\n ${e}`)
    .setColor(0xFF3333)
    message.channel.send(embed)
    }
}
function queues(message,customargs,serverQueue) {
    try{
        if(!serverQueue.songs[1]){
            const embed = new discord.MessageEmbed()
            .setTitle("The song queue is empty!")
            .setDescription("Consider putting a next song for queues!")
            .setColor(0xFFFF33)
            message.channel.send(embed)
        }
        else{
            const embed = new discord.MessageEmbed()
            .setTitle(`Next song : ${serverQueue.songs[1].title}`)
            .addField("Song name " ,`**${serverQueue.songs[1].title}**`)
            .addField("Duration" , `**${serverQueue.songs[1].duration}**`)
            .addField("URL", `**${serverQueue.songs[1].url}**`)
            .setFooter(`Song requested by ${serverQueue.songs[1].songauth}`)
            .setColor(0x33FFEC)
            message.channel.send(embed)
        }
    }
    catch(err){
        console.log(err)
    }
}