import 'module-alias/register'
import '@config/dotenv'

async function main () {
  await import('./server')
}

main()
