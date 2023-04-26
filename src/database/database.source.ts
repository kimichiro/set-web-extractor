import { config } from 'dotenv'

import 'reflect-metadata'

import { DataSource } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import entities from './entity'

config()

const defaultDataSource = new DataSource({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port:
        process.env.POSTGRES_PORT != null
            ? parseInt(process.env.POSTGRES_PORT)
            : undefined,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: false,
    logging: false,
    entities: [...entities],
    migrationsTableName: 'typeorm_migration',
    migrations: [__dirname + '/migration/*.ts'],
    namingStrategy: new SnakeNamingStrategy(),
    subscribers: [],
})

export default defaultDataSource
