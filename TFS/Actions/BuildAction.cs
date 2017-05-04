using Microsoft.TeamFoundation.Build.Client;
using Microsoft.TeamFoundation.Client;

namespace TFSTools.Actions
{
    public class BuildAction: IAction
    {
        public void Execute(TfsTeamProjectCollection tpc)
        {
            //.. querying builds
            IBuildServer buildServer = tpc.GetService<IBuildServer>();
            string apiTemplate = "REL{0}.Build_API";
            string uiTemplate = "REL{0}.Build_UI";

            string apiBuildName = string.Format(apiTemplate, "1");
            string uiBuildName = string.Format(uiTemplate, "1");

            var apiBuilds = buildServer.QueryBuilds("MedisoftEMR", apiBuildName);
        } 
    }
}