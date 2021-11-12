const development_env = "development";
const qa_env = "qa";
const regression_env = "regression";
const production_env = "production";
const current_env = process.env.NODE_ENV;

const environments = 
[
    {
        env: development_env,
        hostname: "127.0.0.1",
        port: "3000",
        message: 'node is development'
    },
    {
        env: qa_env,
        hostname: "127.0.0.1",
        port: "3001",
        message: 'node is qa'
    },
    {
        env: regression_env,
        hostname: "127.0.0.1",
        port: "3002",
        message: 'node is regression'
    },
    {
        env: production_env,
        hostname: "127.0.0.1",
        port: "3003",
        message: 'node is production'
    }
];

const config = environments.find(e => e.env === current_env) || environments.find(e => e.env === production_env);

module.exports = config;

