using MeditationTimer.Core.Services;
using MeditationTimer.Core.Utils;
using MvvmCross.Core.ViewModels;
using System;
using System.Windows.Input;

namespace MeditationTimer.Core.ViewModels
{
    public class MeditationTimerViewModel : MvxViewModel
    {   
        private Timer _timer;
        private MeditationSession _model;
        IAudioService _audioService;

        public ICommand ToggleCommand { get { return new MvxCommand(() => Toggle());  } }

        public ICommand ResetCommand { get { return new MvxCommand(() => Reset()); } }

        public bool CanReset => _model.InProgress;

        public string ActionButtonText => _timer.IsOn ? "Stop" : "Start";

        public string TimeRemaining
        {
            get
            {
                return _model.TimeRemaining.ToString();
            }

        }

        //..TB TODO timer by DO so can swap implementations
        public MeditationTimerViewModel(IAudioService audioService)
        {
            _timer = new Timer(DecreaseTime, null, 1000, 1000);
            _model = new MeditationSession(new TimeSpan(0, 20, 0));
            _audioService = audioService;
        }

        public void Toggle()
        {
            _timer.Toggle();
            _audioService.Play("chime_glissando");
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
            _model.Reset();
            Stop();
            RaisePropertyChanged(() => TimeRemaining);
        }


        public void DecreaseTime(object state)
        {
            bool starting = false;
            if(!_model.InProgress)
                starting = true;

            _model.Decrement();
            RaisePropertyChanged(() => TimeRemaining);

            if(starting)
                RaisePropertyChanged(() => CanReset);
        }

    }
}
