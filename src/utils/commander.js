import { Command }from 'commander'

const commander = new Command()

commander
      .option('--mode <mode>', 'Modo de trabajo', 'development')
      .parse()


export default commander 