module.exports = {
  type: process.env.type,
  host: process.env.host,
  port: process.env.port,
  username: process.env.username,
  password: process.env.password,
  database: process.env.database,
  authSource: process.env.authSource,
  autoLoadEntities: true,
  synchronize: true,
};
