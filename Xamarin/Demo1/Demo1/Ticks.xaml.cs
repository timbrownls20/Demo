using Demo1.ViewModels;

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
