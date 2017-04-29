using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;
using Xamarin.Forms;

namespace Demo1.ViewModels
{
    public class TicksViewModel : INotifyPropertyChanged
    {
        private Timer _timer;

        public int Ticks { get; set; }

        public ICommand StartCommand { get; }

        public ICommand StopCommand { get; }

        public TicksViewModel()
        {
            _timer = new Timer(thisCallback, null, 1000, 1000);
            StartCommand = new Command(Start);
            StopCommand = new Command(Stop);
        }

        void Start() => _timer.Start();

        void Stop() => _timer.Stop();


        public event PropertyChangedEventHandler PropertyChanged;
        void OnPropertyChanged([CallerMemberName]string propertyName = "") =>
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));

        public void thisCallback(object state)
        {
            Ticks++;
            OnPropertyChanged("Ticks");
        }

    }
}
