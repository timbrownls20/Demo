using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace MeditationTimer.Core.Utils
{
    public delegate void TimerCallback(object state);

    public sealed class Timer : IDisposable //: CancellationTokenSource, IDisposable
    {
        private TimerCallback _callback;
        private object _state;
        private int _dueTime;
        private int _period;
        private CancellationTokenSource _cts = new CancellationTokenSource();
        private bool _on;

        public bool IsOn => _on;

        public Timer(TimerCallback callback, object state, int dueTime, int period)
        {
            _callback = callback;
            _state = state;
            _dueTime = dueTime;
            _period = period;

        }

        public void Toggle()
        {
            if (_on)
            {
                Stop();
            }
            else
            {
                Start();
            }
        }

        public void Start()
        {
            _cts = new CancellationTokenSource();
            _on = true;
            RunTimer(_cts.Token);
        }

        public void Stop()
        {
            _on = false;
            _cts.Cancel();
        }

        public new void Dispose() { _cts.Cancel(); }

        private void RunTimer(CancellationToken cancelToken)
        {
            Task.Delay(_dueTime, cancelToken).ContinueWith(async (t, s) =>
            {
                var tuple = (Tuple<TimerCallback, object>)s;

                while (true)
                {
                    if (_cts.IsCancellationRequested)
                        break;
                    Task.Run(() => tuple.Item1(tuple.Item2));
                    await Task.Delay(_period);
                }

            }, Tuple.Create(_callback, _state), CancellationToken.None,
              TaskContinuationOptions.ExecuteSynchronously | TaskContinuationOptions.OnlyOnRanToCompletion,
              TaskScheduler.Default);
        }
    }
}
