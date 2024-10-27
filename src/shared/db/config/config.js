// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

module.exports = {
  development: {
    use_env_variable: 'DB_CONNECTION',
    dialect: 'mariadb',
  },
  test: {
    use_env_variable: 'DB_CONNECTION',
    dialect: 'mariadb',
  },
  production: {
    use_env_variable: 'DB_CONNECTION',
    dialect: 'mariadb',
  },
};
