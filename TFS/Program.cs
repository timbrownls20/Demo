using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.TeamFoundation.Build.Client;
using Microsoft.TeamFoundation.Client;
using Microsoft.TeamFoundation.Framework.Client;
using Microsoft.TeamFoundation.VersionControl.Client;
using Microsoft.TeamFoundation.WorkItemTracking.Client;
using TFSTools.Actions;

namespace TFSTools
{
    class Program
    {
        static void Main(string[] args)
        {
            //int workItemId = 9320;
            //string textToDelete = "Test 1";

            string tpcUrl = ConfigurationManager.AppSettings["TeamProjectCollection"];
            Uri collectionUri = new Uri(tpcUrl);
            TfsTeamProjectCollection tpc = new TfsTeamProjectCollection(collectionUri);


            var input = GetMenu();

            while (input.Key != ConsoleKey.Q)
            {
                input = GetMenu();

                if (input.Key == ConsoleKey.NumPad1)
                {
                    DoAction(new WorkItemAction(), tpc);    
                }
                else if (input.Key == ConsoleKey.NumPad2)
                {
                    DoAction(new BuildAction(), tpc);    
                }
                else if (input.Key == ConsoleKey.NumPad3)
                {
                    DoAction(new VersionControlAction(), tpc);        
                }
                else if (input.Key == ConsoleKey.NumPad4)
                {
                    DoAction(new ShelfsetAction(), tpc);        
                }
                else if (input.Key == ConsoleKey.NumPad5)
                {
                    DoAction(new SubscriptionAction(), tpc);                    
                }
            }

            #region work item history

            //changeSet.AssociatedWorkItems

            //var fieldCollections = workItem.Revisions.Cast<Revision>().Select(x => x.Fields);

            //foreach (var fieldCollection in fieldCollections)
            //{
            //    foreach (var field in fieldCollection.Cast<Field>())
            //    {
            //        if (field.Name == "History")
            //        {

            //            if (field.Value != null && (string)field.Value == textToDelete)
            //            {
            //                field.Value = "TEXT DELETED";
            //            }

            //        }
            //    }
            //}


            //if (workItems.Count > 0)
            //{
            //    workItems.
            //}


            //string query = string.Format(@"SELECT System.ID, System.Title from workitems" +
            //                          @" WHERE Title = 'TB Test 1'" +
            //                          @" and [Work Item Type] In Group 'Microsoft.BugCategory'" +
            //                          @" and [Iteration Path] Under 'MedisoftEMR\Release {0}'", opt.ReleaseIdentifier);

            #endregion

        }

        private static ConsoleKeyInfo GetMenu()
        {
            Console.WriteLine("***********************");
            Console.WriteLine("1. WorkItemAction");
            Console.WriteLine("2. BuildAction");
            Console.WriteLine("3. VersionControlAction");
            Console.WriteLine("4. ShelfsetAction");
            Console.WriteLine("5. SubscriptionAction");
            Console.WriteLine("Q. Quit");
            Console.WriteLine("***********************");
            Console.WriteLine("Select an option");
            return Console.ReadKey();
        }


        private static void DoAction(IAction action, TfsTeamProjectCollection tpc)
        {
            action.Execute(tpc);
        }
    }
}
