import { PrismaClient } from '@prisma/client'

import { mysql } from './database'

export const prisma = new PrismaClient({
  datasources: {
    db: mysql
  }
})
