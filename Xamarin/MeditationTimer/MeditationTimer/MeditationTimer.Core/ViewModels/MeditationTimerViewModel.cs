using MeditationTimer.Core.Utils;
using MvvmCross.Core.ViewModels;

namespace MeditationTimer.Core.ViewModels
{
    public class MeditationTimerViewModel : MvxViewModel
    {   
        private Timer _timer;
       

        public int _ticks { get; set; }
        //public IMvxCommand StartCommand { get; }
        //public IMvxCommand StopCommand { get; }
        public IMvxCommand ToggleCommand { get; }
        public IMvxCommand ResetCommand { get; }

        public int Ticks
        {
            get { return _ticks; }
            set
            {
                _ticks = value;
                RaisePropertyChanged(() => Ticks);
                //OnPropertyChanged("Ticks");
            }
        }

        public MeditationTimerViewModel()
        {
            _timer = new Timer(thisCallback, null, 1000, 1000);
            _timer.Start();

            //StartCommand = new Command(Start);
            //StopCommand = new Command(Stop);
            ToggleCommand = new MvxCommand(() => Toggle(), () => true);
            ResetCommand = new MvxCommand(() => Reset(), () => true);

           S
        }

        //void Start() => _timer.Start();

        //void Stop() => _timer.Stop();

        void Toggle()
        {
            //OnPropertyChanged("ActionButtonText");
            RaisePropertyChanged(() => ActionButtonText);
            _timer.Toggle();
        }

        void Reset()
        {
            Ticks = 0;
            _timer.Stop();


        }


        public string ActionButtonText
        {
            get
            {
                return _timer.IsOn ? "Stop" : "Start";
            }
            
        }

        public void thisCallback(object state)
        {
            Ticks++;
        }

    }
}
