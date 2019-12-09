import discord

from discord.ext import commands
from random import random

class Functions(commands.Cog):

    __slots__ = ('bot')
    
    def __init__(self, bot):
        self.bot = bot

    @commands.command()
    async def rng(self, ctx):
        rand = random()
        msg = "Erro"
        if rand < (1/3):
            msg = "Vocês vão jogar LoL!"
        elif rand > (1/3) and rand < (2/3):
            msg = "Vocês vão jogar Battlerite!"
        elif rand > (2/3):
            msg = "Vcs vão jogar CS!"
        await ctx.send(msg)
        
    @commands.command()
    async def vsfhirohen(self, ctx):
        await self.moveMemberToChannel(220201127830880257, 243733703153549323, 448205358469611523)#220211562663772160
        
    @commands.command()
    async def vsfcaio(self, ctx):
        await self.moveMemberToChannel(220201127830880257, 220254256148643840, 448205358469611523)
        
    async def moveMemberToChannel(self, serverId, memberId, channelId):
        channel = self.bot.get_channel(channelId)
        member = self.bot.get_guild(serverId).get_member(memberId)
        await self.bot.wait_until_ready()
        await member.edit(voice_channel = channel)
        
def setup(bot):
    bot.add_cog(Functions(bot))