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
        api : "http://127.0.0.1:3010"
    },
    {
        env: qa_env,
        api : "http://127.0.0.1:3011"
    },
    {
        env: regression_env,
        api : "http://127.0.0.1:3012"
    },
    {
        env: production_env,
        api : "http://127.0.0.1:3013"
    }
];

const config: IConfig = environments.find(e => e.env === current_env) || environments.find(e => e.env === production_env) as IConfig;

export default config;

