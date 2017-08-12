using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Android.App;
using Android.Content;
using Android.OS;
using Android.Runtime;
using Android.Views;
using Android.Widget;
using MeditationTimer.Core.Services;
using Android.Media;

namespace MeditationTimer.Droid.Services
{
    public class AudioService : IAudioService
    {
        public void Play(string fileName)
        {
            //Application.GetApp
            Uri audioUri = new Uri("android.resource://com.companyname.MeditationTimer/raw/" + fileName);

            //var i = Resource.Raw.chime_glissando;
            //MediaPlayer.Create(ApplicationContext, Resource.Raw.chime_glissando);

            MediaPlayer mp = new MediaPlayer();
            ////mediaplayer.setDataSource(context, Uri.parse("android.resource://urpackagename/res/raw/urmp3name");
            mp.SetDataSource(audioUri.ToString());
            mp.Prepare();
            mp.Start();

        }
    }
}