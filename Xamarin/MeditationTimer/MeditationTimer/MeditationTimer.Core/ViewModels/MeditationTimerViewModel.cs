using MeditationTimer.Core.Utils;
using MvvmCross.Core.ViewModels;
using System;
using System.Windows.Input;

namespace MeditationTimer.Core.ViewModels
{
    public class MeditationTimerViewModel : MvxViewModel
    {   
        private Timer _timer;
        private int _ticks { get; set; }
        private MeditationSession _model;

        public ICommand ToggleCommand { get { return new MvxCommand(() => Toggle());  } }

        public ICommand ResetCommand { get { return new MvxCommand(() => Reset()); } }

        public bool CanReset => Ticks > 0;

        public string ActionButtonText => _timer.IsOn ? "Stop" : "Start";

        public int Ticks
        {
            get { return _ticks; }
            set
            {
                _ticks = value;
                RaisePropertyChanged(() => Ticks);
            }
        }

        public string TimeRemaining
        {
            get
            {
                return _model.TimeRemaining.ToString();
            }

        }

        //..TB TODO timer by DO so can swap implementations
        public MeditationTimerViewModel()
        {
            _timer = new Timer(AddTick, null, 1000, 1000);
            _model = new MeditationSession(new TimeSpan(0, 20, 0));
        }

        public void Toggle()
        {
            _timer.Toggle();
            RaisePropertyChanged(() => ActionButtonText);
        }

        public void Stop()
        {
            _timer.Stop();
            RaisePropertyChanged(() => ActionButtonText);
            RaisePropertyChanged(() => CanReset);

        }

        public void Reset()
        {
            Ticks = 0;
            Stop();
        }


        public void AddTick(object state)
        {
            _model.Decrement();
            RaisePropertyChanged(() => TimeRemaining);

            Ticks++;
            if (_ticks == 1)
            {
                RaisePropertyChanged(() => CanReset);
            }
        }

    }
}
