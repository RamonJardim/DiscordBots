using System;
using System.Collections.Generic;
using System.Text;

namespace wushuBOT.Models.Steam
{
    public class GameReturn
    {
        public int game_count { get; set; }
        public List<Game> games { get; set; }
    }
}
