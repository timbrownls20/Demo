using System;
using System.Linq;
using Microsoft.TeamFoundation.Client;
using Microsoft.TeamFoundation.VersionControl.Client;

namespace TFSTools.Actions
{
    public class ShelfsetAction: IAction
    {
        public void Execute(TfsTeamProjectCollection tpc)
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
    }
}