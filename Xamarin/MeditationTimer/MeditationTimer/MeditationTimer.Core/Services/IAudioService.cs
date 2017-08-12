using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MeditationTimer.Core.Services
{
    public interface IAudioService
    {
        void Play(string fileName);
    }
}
