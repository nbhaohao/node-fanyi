enum BaiDuLanguageEnum {
  EN = "en",
  ZH = "zh"
}

interface BaiDuResult {
  from: string;
  to: string;
  trans_result: [{ src: string; dst: string }];
  error_code?: string;
  error_msg?: string;
}

interface BaiDuLanguageParams {
  from: BaiDuLanguageEnum;
  to: BaiDuLanguageEnum;
}

export { BaiDuResult, BaiDuLanguageParams, BaiDuLanguageEnum };
