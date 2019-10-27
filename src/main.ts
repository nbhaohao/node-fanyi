import chalk from "chalk";
import nodeEmoji from "node-emoji";
import { requestBaiDuTranslate } from "./service/baidu-translate";
import { isEnglish } from "./utils/utils";
import { BaiDuLanguageEnum } from "./types/types";

const handleError = (errorString: string): void => {
  console.error(errorString);
  process.exit(2);
};

const translate = async (word: string): Promise<any> => {
  const isEnglishWord = isEnglish(word);
  const [errorString, result] = await requestBaiDuTranslate(word, {
    from: isEnglishWord ? BaiDuLanguageEnum.EN : BaiDuLanguageEnum.ZH,
    to: isEnglishWord ? BaiDuLanguageEnum.ZH : BaiDuLanguageEnum.EN
  });
  if (errorString) {
    handleError(errorString);
    return;
  }
  const eyesEmoji = nodeEmoji.get("eyes");
  console.log(chalk.yellow(`${eyesEmoji} 输入：${word}`));
  if (result) {
    const tadaEmoji = nodeEmoji.get("tada");
    console.log(
      chalk.green(`${tadaEmoji} 结果：${result.trans_result[0].dst}`)
    );
  }
};

export { translate };
