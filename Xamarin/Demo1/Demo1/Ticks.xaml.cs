using Demo1.ViewModels;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading;
using System.Windows.Input;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace Demo1
{

    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class Ticks : ContentPage
    {
        public Ticks()
        {
            InitializeComponent();
            BindingContext = new TicksViewModel();
        }
    }

   
}
