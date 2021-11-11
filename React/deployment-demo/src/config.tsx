interface IConfig 
{
    env:string,
    api:string
}

const development_env:string = "development";
const qa_env:string = "qa";
const regression_env:string = "regression";
const production_env:string = "production";
const current_env:string | undefined = process.env.REACT_APP_CLIENT_ENV;

const environments: Array<IConfig> = 
[
    {
        env: development_env,
        api : "dev api"
    },
    {
        env: qa_env,
        api : "qa api"
    },
    {
        env: regression_env,
        api : "regression api"
    },
    {
        env: production_env,
        api : "production api"
    }
];

const config: IConfig = environments.find(e => e.env === current_env) || environments.find(e => e.env === production_env) as IConfig;

export default config;

