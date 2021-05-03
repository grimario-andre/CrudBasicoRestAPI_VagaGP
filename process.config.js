module.exports = {
  apps : [
    {
      name      : 'products',
      script    : 'app.provider.service.js',
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
