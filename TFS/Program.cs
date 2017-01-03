using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.TeamFoundation.Build.Client;
using Microsoft.TeamFoundation.Client;
using Microsoft.TeamFoundation.Framework.Client;
using Microsoft.TeamFoundation.VersionControl.Client;
using Microsoft.TeamFoundation.WorkItemTracking.Client;

namespace TFSTools
{
    class Program
    {
        static void Main(string[] args)
        {
            //int workItemId = 9320;
            //string textToDelete = "Test 1";

            // querying workitems
            Uri collectionUri = new Uri("http://lds-tfs-01.medisoft.local:8080/tfs/DefaultCollection");
            TfsTeamProjectCollection tpc = new TfsTeamProjectCollection(collectionUri);
            
            QueryWorkItems(tpc);

            QuerySubscriptions(tpc);

            QueryBuilds(tpc);

            QueryShelfSets(tpc);

            QueryVersionControl(tpc);

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

        
        private static void QueryVersionControl(TfsTeamProjectCollection tpc)
        {
            //.. email people about with work item override
            //https://msdn.microsoft.com/en-gb/magazine/jj883959.aspx
            var versionControl = tpc.GetService<VersionControlServer>();
            var changesets = versionControl.QueryHistory(@"$/MedisoftEMR", RecursionType.Full).ToList();
            var changesetsWithOverride = changesets.Where(x => !string.IsNullOrEmpty(x.PolicyOverride.Comment));

            foreach (var changeset in changesetsWithOverride)
            {
                var commitedBy = changeset.Committer;
            }

        }

        private static void QueryShelfSets(TfsTeamProjectCollection tpc)
        {
            //.. clean up shelvesets
            var versionControl = tpc.GetService<VersionControlServer>();
            var shelveSets = versionControl.QueryShelvesets(null, null);
            var oldShelves = shelveSets.Where(x => x.CreationDate < DateTime.Today.AddYears(-1));
            foreach (var oldShelve in oldShelves)
            {
                versionControl.DeleteShelveset(oldShelve);
            }

            //.. email people about with work item override
            //https://msdn.microsoft.com/en-gb/magazine/jj883959.aspx
            //versionControl.QueryHistory()
            
        }

        private static void QueryBuilds(TfsTeamProjectCollection tpc)
        {
            //.. querying builds
            IBuildServer buildServer = tpc.GetService<IBuildServer>();
            string apiTemplate = "REL{0}.Build_API";
            string uiTemplate = "REL{0}.Build_UI";

            string apiBuildName = string.Format(apiTemplate, "1");
            string uiBuildName = string.Format(uiTemplate, "1");

            var apiBuilds = buildServer.QueryBuilds("MedisoftEMR", apiBuildName);
        }

        private static void QuerySubscriptions(TfsTeamProjectCollection tpc)
        {
            //querying subscriptions
            //list current subscriptions
            IEventService eventService = tpc.GetService<IEventService>();
            Subscription[] subscriptions = eventService.GetAllEventSubscriptions();

            Console.WriteLine("There are {0} subscriptions:", subscriptions.Length);
            foreach (Subscription s in subscriptions)
            {
                Console.WriteLine();
                PrintSubscription(s);
                Console.WriteLine();
            }
        }

        private static void QueryWorkItems(TfsTeamProjectCollection tpc)
        {
            //..TODO move ready for test items
            //..Email people about test on hold
            WorkItemStore workItemStore = tpc.GetService<WorkItemStore>();

            //string query = @"SELECT * from workitem WHERE ID = " + workItemId +
            //                " and [Iteration Path] Under 'MEDISOFT_DEMO'";

            string query = @"SELECT System.ID, System.Title from workitems" +
                           @" WHERE State = 'Ready to Test'" +
                           @" and [Work Item Type] In Group 'Microsoft.BugCategory'" +
                           @" and [Iteration Path] Under 'MedisoftEMR\Release 1'";

            var workItem = workItemStore.Query(query).Cast<WorkItem>().SingleOrDefault();
        }


        private static void PrintSubscription(Subscription s)
        {
            Console.WriteLine("Subscription Id:    {0}", s.ID);
            Console.WriteLine("EventType:          {0}", s.EventType);
            Console.WriteLine("Subscriber:         {0}", s.Subscriber);
            Console.WriteLine("Delivery Address:   {0}", s.DeliveryPreference.Address);
            Console.WriteLine("Delivery Schedule:  {0}", s.DeliveryPreference.Schedule);
            Console.WriteLine("Delivery Type:      {0}", s.DeliveryPreference.Type);
            Console.WriteLine("Tag:                {0}", s.Tag);
            Console.WriteLine("Filter:             {0}", s.ConditionString);
        }
    }
}
