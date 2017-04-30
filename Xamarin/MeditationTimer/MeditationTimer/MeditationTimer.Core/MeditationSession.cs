using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MeditationTimer.Core
{
    public class MeditationSession
    {
        public TimeSpan TargetTime { get; set; }

        public TimeSpan TimeRemaining { get; set; }

        public MeditationSession(TimeSpan targetTime)
        {
            TargetTime = TimeRemaining = targetTime;
        }

        public void Decrement()
        {
            TimeRemaining = TimeRemaining.Subtract(TimeSpan.FromSeconds(1));
        }

    }
}
