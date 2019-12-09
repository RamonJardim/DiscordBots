using Discord.Commands;
using Discord.WebSocket;
using System;
using System.Reflection;
using System.Threading.Tasks;

namespace wushuBOT
{
    public class CommandHandler
    {
        private CommandService _cmds;
        private DiscordSocketClient _client;
        public async Task Install(DiscordSocketClient c)
        {
            _client = c;
            _cmds = new CommandService();

            await _cmds.AddModulesAsync(Assembly.GetEntryAssembly(), null);

            _client.MessageReceived += HandleCommand;
            _client.UserJoined += AnnounceUserJoined;
            _client.UserLeft += AnnounceUserLeft;
        }

        public async Task AnnounceUserJoined(SocketGuildUser user)
        {

        }


        public async Task AnnounceUserLeft(SocketGuildUser user)
        {

        }

        public void code()
        {

        }

        public async Task HandleCommand(SocketMessage s)
        {
            var msg = s as SocketUserMessage;
            if (msg == null) return;

            var context = new CommandContext(_client, msg);

            int argPos = 0;
            string prefix = "!";

            if (msg.HasStringPrefix(prefix, ref argPos))
            {
                var result = await _cmds.ExecuteAsync(context, argPos, null);

                if (!result.IsSuccess)
                {
                    switch (result.ToString())
                    {
                        case "UnknownCommand: Unknown command.":

                            await msg.DeleteAsync();

                            await s.Channel.SendMessageAsync($"Comando não encontrado :(");
                            break;

                        default:

                            await s.Channel.SendMessageAsync($"ERRO! - " + result.ToString());
                            break;

                    }
                }
            }
        }
    }
}
