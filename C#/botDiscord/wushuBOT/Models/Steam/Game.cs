using System;
using System.Collections.Generic;
using System.Text;

namespace wushuBOT.Models
{
    public class Game
    {
        public int appid { get; set; }
        public string name { get; set; }
        public int playtime_forever { get; set; }
        public string img_icon_url { get; set; }
        public string img_logo_url { get; set; }
        public bool has_community_visible_status { get; set; }
        
        public bool Equals(Game x, Game y)
        {
            return x.appid == y.appid;
        }

        public int GetHashCode(Game obj)
        {
            return obj.appid;
        }
    }

    public class GameComparer : IEqualityComparer<Game>
    {
        public bool Equals(Game x, Game y)
        {
            return x.appid == y.appid;
        }

        public int GetHashCode(Game obj)
        {
            return obj.appid;
        }
    }
}
