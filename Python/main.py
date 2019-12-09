import discord
import os

import music
import functions
import asyncio

from dotenv import load_dotenv
from discord.ext import commands

load_dotenv()
bot = commands.Bot(command_prefix='!')
token = os.getenv("DISCORD_BOT_SECRET")

music.setup(bot)
functions.setup(bot)
    
@bot.event
async def on_ready():
    print("I'm in")
    print(bot.user)
    servers = list(bot.guilds)
    await bot.change_presence(activity=discord.Game(name='LoL as Zoe'))
    print('Servers: ')
    printServers(servers)

def printServers(servers):
  for i in range(len(servers)):
    print(servers[i].name)

#@bot.event
#async def on_message(message):
#    await vsfhirohen()
    
async def vsfhirohen():
    await moveMemberToChannel(220201127830880257, 243733703153549323, 448205358469611523)#220211562663772160
    
async def moveMemberToChannel(serverId, memberId, channelId):
    channel = bot.get_channel(channelId)
    member = bot.get_guild(serverId).get_member(memberId)
    await bot.wait_until_ready()
    await member.edit(voice_channel = channel)
   
async def background_loop():
    while true:
        await asyncio.sleep(60*randint(1, 3))
        await vsfhirohen()
   
print(discord.version_info)
bot.run(token)

background_loop()