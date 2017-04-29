using System.ComponentModel;
using System.Runtime.CompilerServices;
using System.Windows.Input;
using Xamarin.Forms;

namespace Demo1.ViewModels
{
    public class TicksViewModel : INotifyPropertyChanged
    {
        private Timer _timer;
       

        public int _ticks { get; set; }
        public ICommand StartCommand { get; }
        public ICommand StopCommand { get; }
        public ICommand ToggleCommand { get; }
        public ICommand ResetCommand { get; }

        public int Ticks
        {
            get { return _ticks; }
            set
            {
                _ticks = value;
                OnPropertyChanged("Ticks");
            }
        }

        public TicksViewModel()
        {
            _timer = new Timer(thisCallback, null, 1000, 1000);
           
            StartCommand = new Command(Start);
            StopCommand = new Command(Stop);
            ToggleCommand = new Command(Toggle);
            ResetCommand = new Command(Reset);
        }

        void Start() => _timer.Start();

        void Stop() => _timer.Stop();

        void Toggle()
        {
            OnPropertyChanged("ActionButtonText");
            _timer.Toggle();
        }

        void Reset()
        {
            Ticks = 0;
            Stop();
          
        }

        public event PropertyChangedEventHandler PropertyChanged;
        void OnPropertyChanged([CallerMemberName]string propertyName = "") =>
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));

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
