using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Forms;

namespace Demo1
{
    public partial class SquareRootPage : ContentPage
    {
        public SquareRootPage()
        {
            InitializeComponent();
        }

        public void OnCalculate(object sender, EventArgs e)
        {
            //this.lblOutput.Text = "Button clicked";
            int numberIn;

            if (Int32.TryParse(this.txtNumber.Text, out numberIn))
            {

            }
        }
    }
}
