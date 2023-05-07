import { NestFactory } from '@nestjs/core'
import { json } from 'body-parser'
import { AppModule } from './app.module'

async function bootstrap() {
    const port = process.env['PORT'] || 3000

    const app = await NestFactory.create(AppModule)

    app.use(json())

    await app.listen(port)
}
bootstrap()
