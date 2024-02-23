import chalk from "chalk";

export default class Logging {
  public static log = (args: any) => this.info(args);

  public static info = (args: any) =>
    console.log(
      chalk.blue(`[${new Date().toLocaleString("pt-BR", { timeZone: 'America/Sao_Paulo' })}] [INFO]`),
      typeof args === "string" ? chalk.blueBright(args) : args,
    );

  public static data = (args: any) =>
    console.log(
      chalk.magenta(`[${new Date().toLocaleString("pt-BR", { timeZone: 'America/Sao_Paulo' })}] [DATA]`),
      typeof args === "string" ? chalk.magentaBright(args) : args,
    );

  public static warn = (args: any) =>
    console.log(
      chalk.yellow(`[${new Date().toLocaleString("pt-BR", { timeZone: 'America/Sao_Paulo' })}] [AVISO]`),
      typeof args === "string" ? chalk.yellowBright(args) : args,
    );

  public static err = (args: any) =>
    console.log(
      chalk.red(`[${new Date().toLocaleString("pt-BR", { timeZone: 'America/Sao_Paulo' })}] [ERRO]`),
      typeof args === "string" ? chalk.redBright(args) : args,
    );
}
