/**
 * Encoding Js
 * @JsName index
 * @Description Encoding 编码库.
 * @DateTime 2019-03-13 20:39:22
 * @author Finn
 */
import { JSEncrypt } from "jsencrypt";

/**
 * 公钥
 */
const publicKey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCT5BgPil7472plJGufJCY6dEqCKp10a1x/YFFjpgBvqZI5iBSq9mY9fad1yixZL9jCt47dz2gH8O4NvaqQhh4C4Rp298AZBtK8pNyHNPGAm/Au9Aimpvpi/UccO6xK1Oz5sp+T+fewGmOwn5G2zZJ3cy7qQlUaFkCiiJFJervjNwIDAQAB";

/**
 * RSA 加密
 * -- 公钥
 * @param {*} origin 编码字符
 */
const rsaEncrypt = (origin) => {
    let encrypt = new JSEncrypt();
    encrypt.setPublicKey(publicKey);
    return encrypt.encrypt(origin);
};

/**
 * 导出 or 默认导出
 * -- 导出清单
 * - rsaEncrypt（ RSA 加密 :: 公钥 ）
 */
export { rsaEncrypt };
export default { rsaEncrypt };