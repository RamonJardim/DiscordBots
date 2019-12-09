using Discord;
using Discord.Commands;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using wushuBOT.Models;
using System.Net.Http.Formatting;
using wushuBOT.Models.Steam;
using Newtonsoft.Json;
using System.Linq;
using System.Threading;

namespace wushuBOT
{
    public class Commands : ModuleBase
    {
        [Command("ping")]
        public async Task Ping()
        {
            var msg = await ReplyAsync("Calculando ping");

            await ReplyAsync("a");
        }

        [Command("rng")]
        public async Task Rng()
        {
            Random random = new Random();
            double rand = random.NextDouble();
            string msg = "Erro";
            if (rand < (1.0 / 3))
            {
                msg = "Vocês vão jogar LoL!";
            }
            else if (rand > (1.0 / 3) && rand < (2.0 / 3))
            {
                msg = "Vocês vão jogar Battlerite!";
            }
            else if (rand > (2.0 / 3))
            {
                msg = "Vcs vão jogar CS!";
            }
            await ReplyAsync(msg);
        }

        [Command("vsfhirohen")]
        public async Task VsfHirohen()
        {
            ulong userId = 243733703153549323; //id do hirohen
            ulong channelId = 448205358469611523; //id the maciota
            await moveMember(userId, channelId);
        }

        [Command("vsfcaio")]
        public async Task VsfCaio()
        {
            while (true)
            {
                VsfHirohen();
                Thread.Sleep(1000);
            }
            //ulong userId = 220254256148643840; //id do caio
            //ulong channelId = 448205358469611523; //id the maciota
            //await moveMember(userId, channelId);
        }

        /*[Command("play", RunMode = RunMode.Async)]
        public async Task Play(string par)
        {
            var voiceChannel = (Context.User as IGuildUser).VoiceChannel;

            if(voiceChannel != null)
            {
                await voiceChannel.ConnectAsync();
            }
            else
            {
                await ReplyAsync("Você não está em um canal de voz...");
            }
        }*/

        private async Task moveMember(ulong userId, ulong channelId)
        {
            var user = await Context.Guild.GetUserAsync(userId);
            await user.ModifyAsync(u => u.ChannelId = channelId);
        }

        [Command("getGamesID")]
        private async Task getGamesID(string steamID1, string steamID2)
        {
            string accessKey = "05F8B01D40AA050D30C0620C5C996505";

            HttpClient client = new HttpClient();

            string basePath = "http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/";
            string parameters = "?include_appinfo=1&key=" + accessKey + "&steamid=";
            string format =  "&format=json";
            string path1 = basePath + parameters + steamID1 + format;
            string path2 = basePath + parameters + steamID2 + format;

            HttpResponseMessage responseGame1 = await client.GetAsync(path1);
            HttpResponseMessage responseGame2 = await client.GetAsync(path2);

            if (responseGame1.IsSuccessStatusCode && responseGame2.IsSuccessStatusCode)
            {
                string gamesJSON1 = await responseGame1.Content.ReadAsStringAsync();
                string gamesJSON2 = await responseGame2.Content.ReadAsStringAsync();

                var games1 = JsonConvert.DeserializeObject<SteamResponseGame>(gamesJSON1);
                var games2 = JsonConvert.DeserializeObject<SteamResponseGame>(gamesJSON2);

                StringBuilder commomGames = new StringBuilder().Append("```").Append(Environment.NewLine).Append("Jogos em comum:").Append(Environment.NewLine);

                var listCommomGames = games1.response.games.Intersect(games2.response.games, new GameComparer());
                foreach (var item in listCommomGames)
                {
                    commomGames.Append(item.name).Append(Environment.NewLine);
                }

                commomGames.Append("```");
                await Context.Message.Channel.SendMessageAsync(new string(commomGames.ToString().Take(1999).ToArray()));
            }
            else
            {
                await Context.Message.Channel.SendMessageAsync("Ocorreu um errinho, esqueci qual foi");
            }        
        }
    }
}
