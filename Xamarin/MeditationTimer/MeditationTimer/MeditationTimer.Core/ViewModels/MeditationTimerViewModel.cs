using MeditationTimer.Core.Utils;
using MvvmCross.Core.ViewModels;
using System.Windows.Input;

namespace MeditationTimer.Core.ViewModels
{
    public class MeditationTimerViewModel : MvxViewModel
    {   
        private Timer _timer;
        private int _ticks { get; set; }

        public ICommand ToggleCommand { get { return new MvxCommand(() => Toggle(), () => true);  } }
        public ICommand ResetCommand { get { return new MvxCommand(() => Reset(), () => true); } }

        public int Ticks
        {
            get { return _ticks; }
            set
            {
                _ticks = value;
                RaisePropertyChanged(() => Ticks);
            }
        }

        public bool ButtonEnabled => true;

        public MeditationTimerViewModel()
        {
            _timer = new Timer(thisCallback, null, 1000, 1000);
        }

        public void Toggle()
        {
            _timer.Toggle();
            RaisePropertyChanged(() => ActionButtonText);
        }

        public void Reset()
        {
            Ticks = 0;
            _timer.Stop();
        }

        public string ActionButtonText => _timer.IsOn ? "Stop" : "Start";

        public void thisCallback(object state)
        {
            Ticks++;
        }

    }
}
