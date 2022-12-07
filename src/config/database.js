export const mongo = {
  url: process.env.ATLAS_URI
}

export const mysql = {
  url: process.env.MYSQL_DATABASE_URL
}

export default {
  adapter: 'mongo',

  // adapters
  mongo,
  mysql
}
