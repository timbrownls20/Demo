using System;

namespace MeditationTimer.Core
{
    public class MeditationSession
    {
        public TimeSpan TargetTime { get; set; }

        public TimeSpan TimeRemaining { get; set; }

        public bool InProgress => TimeRemaining < TargetTime;
      
        public MeditationSession(TimeSpan targetTime)
        {
            TargetTime = TimeRemaining = targetTime;
        }

        public void Decrement()
        {
            TimeRemaining = TimeRemaining.Subtract(TimeSpan.FromSeconds(1));
        }

        public void Reset()
        {
            TimeRemaining = TargetTime;
        }

       
    }
}
