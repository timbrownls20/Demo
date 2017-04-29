using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Demo1
{
    public delegate void TimerCallback(object state);

    public sealed class Timer : IDisposable //: CancellationTokenSource, IDisposable
    {
        TimerCallback callback;
        object state;
        int dueTime;
        int period;
        CancellationTokenSource cts = new CancellationTokenSource();

        public Timer(TimerCallback callback, object state, int dueTime, int period)
        {
            this.callback = callback;
            this.state = state;
            this.dueTime = dueTime;
            this.period = period;

        }

        public void Start()
        {
            cts = new CancellationTokenSource();
            RunTimer(cts.Token);
        }

        public void Stop()
        {
            cts.Cancel();
        }

        public new void Dispose() { cts.Cancel(); }

        private void RunTimer(CancellationToken cancelToken)
        {
            Task.Delay(dueTime, cancelToken).ContinueWith(async (t, s) =>
            {
                var tuple = (Tuple<TimerCallback, object>)s;

                while (true)
                {
                    if (cts.IsCancellationRequested)
                        break;
                    Task.Run(() => tuple.Item1(tuple.Item2));
                    await Task.Delay(period);
                }

            }, Tuple.Create(callback, state), CancellationToken.None,
              TaskContinuationOptions.ExecuteSynchronously | TaskContinuationOptions.OnlyOnRanToCompletion,
              TaskScheduler.Default);
        }
    }
}
