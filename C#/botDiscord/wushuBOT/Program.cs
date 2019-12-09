using System;
using System.Reflection;
using System.Threading.Tasks;

using Discord;
using Discord.Commands;
using Discord.WebSocket;
using DotNetEnv;
using Microsoft.Extensions.DependencyInjection;

namespace wushuBOT
{
    class Program
    {
        private DiscordSocketClient Client;
        private CommandHandler Handler;
        //private IServiceProvider Services;

        static void Main(string[] args)
            => new Program().Start().GetAwaiter().GetResult();

        private async Task Start()
        {
            Client = new DiscordSocketClient();
            GlobalClient.Client = Client;
            Handler = new CommandHandler();
            DotNetEnv.Env.Load();
            //Services = new ServiceCollection().AddSingleton(new AudioService());

            await Client.LoginAsync(TokenType.Bot, DotNetEnv.Env.GetString("DISCORD_BOT_SECRET"), true);
            await Client.StartAsync();

            await Handler.Install(Client);

            Client.Ready += Client_Ready;
            await Task.Delay(-1);
        }

        private async Task Client_Ready()
        {
            await Client.SetGameAsync("LoL as Zoe");
            Console.WriteLine("Bot online!");
            Console.WriteLine("Conectado em:");

            foreach (var guild in Client.Guilds)
            {
                Console.WriteLine(guild.Name);
            }

            return;
        }
    }
}
