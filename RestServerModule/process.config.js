module.exports = {
  apps : [
    {
      name      : 'produtos',
      script    : 'produtos.providerservices.js',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_dev : {
        NODE_ENV: 'dev'
      },
      env_prod : {
        NODE_ENV: 'prod'
      }
    }
  ],
};
