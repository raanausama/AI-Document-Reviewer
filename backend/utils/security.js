const _ = require("lodash");
const fs = require("fs");
const nonce = require("nonce")();
const crypto = require("crypto");
const qs = require("querystring");
const jwt = require("jsonwebtoken");
// const jose = require('jose');
const jose = require("node-jose");
const JWT_D = require("jwt-decode");

var security = {};

// Sorts a JSON object based on the key value in alphabetical order
function sortJSON(json) {
  if (_.isNil(json)) {
    return json;
  }

  var newJSON = {};
  var keys = Object.keys(json);
  keys.sort();

  for (key in keys) {
    newJSON[keys[key]] = json[keys[key]];
  }

  return newJSON;
}

/**
 * @param url Full API URL
 * @param params JSON object of params sent, key/value pair.
 * @param method
 * @param appId ClientId
 * @param keyCertContent Private Key Certificate content
 * @param keyCertPassphrase Private Key Certificate Passphrase
 * @returns {string}
 */
function generateSHA256withRSAHeader(
  url,
  params,
  method,
  strContentType,
  appId,
  keyCertContent,
  keyCertPassphrase
) {
  const nonceValue = nonce();
  const timestamp = new Date().getTime();

  // A) Construct the Authorisation Token
  const defaultApexHeaders = {
    app_id: appId, // App ID assigned to your application
    nonce: nonceValue, // secure random number
    signature_method: "RS256",
    timestamp: timestamp, // Unix epoch time
  };

  // Remove params unless Content-Type is "application/x-www-form-urlencoded"
  if (
    method == "POST" &&
    strContentType != "application/x-www-form-urlencoded"
  ) {
    params = {};
  }

  // B) Forming the Signature Base String

  // i) Normalize request parameters
  const baseParams = sortJSON(_.merge(defaultApexHeaders, params));

  let baseParamsStr = qs.stringify(baseParams);
  baseParamsStr = qs.unescape(baseParamsStr);

  // ii) construct request URL ---> url is passed in to this function

  // iii) concatenate request elements
  const baseString = method.toUpperCase() + "&" + url + "&" + baseParamsStr;

  // console.log("baseString", baseString);

  // C) Signing Base String to get Digital Signature
  const signWith = {
    key: fs.readFileSync(keyCertContent, "utf8"),
  };

  // if (!_.isUndefined(keyCertPassphrase) && !_.isEmpty(keyCertPassphrase))
  //   _.set(signWith, "passphrase", keyCertPassphrase);

  // Load pem file containing the x509 cert & private key & sign the base string with it.
  const signature = crypto
    .createSign("RSA-SHA256")
    .update(baseString)
    .sign(signWith, "base64");

  // D) Assembling the Header
  const strAuthHeader =
    'PKI_SIGN app_id="' +
    appId + // Defaults to 1st part of incoming request hostname
    '",timestamp="' +
    timestamp +
    '",nonce="' +
    nonceValue +
    '",signature_method="RS256"' +
    ',signature="' +
    signature +
    '"';

  return strAuthHeader;
}

/**
 * @param url API URL
 * @param params JSON object of params sent, key/value pair.
 * @param method
 * @param appId API ClientId
 * @param passphrase API Secret or certificate passphrase
 * @returns {string}
 */
security.generateAuthorizationHeader = function (
  url,
  params,
  method,
  strContentType,
  appId,
  keyCertContent,
  passphrase
) {
  return generateSHA256withRSAHeader(
    url,
    params,
    method,
    strContentType,
    appId,
    keyCertContent,
    passphrase
  );
};

// Verify & Decode JWS or JWT
security.verifyJWS = function (jws, publicCert) {
  try {
    const decoded = JWT_D(jws);
    return decoded;
    // const decoded = jwt.verify(jws, fs.readFileSync(publicCert, "utf8"), {
    //   algorithms: ["RS256"],
    //   ignoreNotBefore: true,
    // });
    // let base64Url = jws.split('.')[1]; // token you get
    // let base64 = base64Url.replace('-', '+').replace('_', '/');
    // let decodedData = JSON.parse(Buffer.from(base64, 'base64').toString('binary'));
    // // console.log(decodedData)
    // return decodedData;fs.readFileSync(publicCert, "utf8")
    return decoded;
  } catch (error) {
    // console.log("verifyJWS :", error);
    return null;
  }
};

// Decrypt JWE using private key
security.decryptJWE = function (
  header,
  encryptedKey,
  iv,
  cipherText,
  tag,
  privateKey
) {
  return new Promise((resolve, reject) => {
    const keystore = jose.JWK.createKeyStore();

    const data = {
      type: "compact",
      ciphertext: cipherText,
      protected: header,
      encrypted_key: encryptedKey,
      tag: tag,
      iv: iv,
      header: JSON.parse(jose.util.base64url.decode(header).toString()),
    };
    keystore
      .add(fs.readFileSync(privateKey, "utf8"), "pem")
      .then(function (jweKey) {
        // {result} is a jose.JWK.Key
        jose.JWE.createDecrypt(jweKey)
          .decrypt(data)
          .then(function (result) {
            resolve(JSON.parse(result.payload.toString()));
          })
          .catch(function (error) {
            reject(error);
          });
      });
  }).catch((error) => {
    // console.log("decrypting JWE: ", error);
    return null;
  });
};

module.exports = security;

//POST&https://api.myinfo.gov.sg/com/v3/token&app_id=PROD-200900189E-ESTATEPLAN-TRUSTSETUP&client_id=PROD-200900189E-ESTATEPLAN-TRUSTSETUP&client_secret=5zZL4YQZzygPxYeZHv3zNbxiuAZPAdu7&code=4afb162074fc0b57e39f6f516c1fa02cfea26687&grant_type=authorization_code&nonce=167878232633900&redirect_uri=https://assuretrust.asia/register&signature_method=RS256&timestamp=1678782326339
