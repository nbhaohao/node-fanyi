import * as qs from "querystring";
import * as https from "https";
import { IncomingMessage } from "http";
import { generateSalt } from "../utils/utils";
import md5 from "md5";
import { BAIDU_APPID, BAIDU_SECRET } from "../constants/private";
import { BaiDuLanguageParams, BaiDuResult } from "../types/types";
import { BAI_DU_API, BAI_DU_CODE_MAP } from "../constants/constants";

const generateBaiDuQueryString = (
  word: string,
  language: BaiDuLanguageParams
): string => {
  const salt = generateSalt();
  const str1 = `${BAIDU_APPID}${word}${salt}${BAIDU_SECRET}`;
  const sign = md5(str1);
  return qs.stringify({
    q: word,
    ...language,
    appid: BAIDU_APPID,
    salt,
    sign
  });
};

const requestBaiDuTranslate = async (
  word: string,
  language: BaiDuLanguageParams
): Promise<[string, null] | [null, BaiDuResult]> => {
  return new Promise(resolve => {
    const request = https.request(
      `${BAI_DU_API}?${generateBaiDuQueryString(word, language)}`,
      {
        method: "GET"
      },
      (response: IncomingMessage) => {
        const chunks: Array<Buffer> = [];
        response.on("data", chunk => {
          chunks.push(chunk);
        });
        response.on("end", () => {
          const string = Buffer.concat(chunks).toString();
          const translateResult: BaiDuResult = JSON.parse(string);
          if (translateResult.error_code) {
            resolve([
              BAI_DU_CODE_MAP[translateResult.error_code] ||
                (translateResult.error_msg || ""),
              null
            ]);
            return;
          }
          resolve([null, translateResult]);
        });
      }
    );
    request.on("error", e => {
      resolve(["请求错误", null]);
    });
    request.end();
  });
};

export { requestBaiDuTranslate };
