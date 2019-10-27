import * as commander from "commander";
import { translate } from "./main";

const program = new commander.Command();
program
  .version("0.0.1")
  .name("fy")
  .usage("<...word>")
  .arguments("word")
  .action((...args) => {
    // 接收用户的所有参数，例如 fy hello world -> hello world
    const words = args.slice(0, -1);
    translate(words.join(" "));
  });

program.parse(process.argv);
