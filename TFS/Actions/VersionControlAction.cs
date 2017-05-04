using System.Linq;
using Microsoft.TeamFoundation.Client;
using Microsoft.TeamFoundation.VersionControl.Client;

namespace TFSTools.Actions
{
    public class VersionControlAction: IAction
    {
        public void Execute(TfsTeamProjectCollection tpc)
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
    }
}