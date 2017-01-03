using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.TeamFoundation.Client;
using Microsoft.TeamFoundation.Core.WebApi;
using Microsoft.TeamFoundation.WorkItemTracking.Client;

namespace TFSTools.Actions
{
    class WorkItemAction: IAction
    {
        public void Execute(TfsTeamProjectCollection tpc)
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
    }
}
