require('script!../../bower_components/cryptojslib/components/core-min.js');
require('script!../../bower_components/cryptojslib/components/cipher-core-min.js');
require('script!../../bower_components/cryptojslib/components/pad-zeropadding-min.js');
require('script!../../bower_components/cryptojslib/components/md5-min.js');
require('script!../../bower_components/cryptojslib/components/aes-min.js');
require('script!../../bower_components/cryptojslib/components/enc-base64-min.js');
var dateUtil=require('./date.js');
var getAesString = function(data, key, iv) { //加密
  var key = CryptoJS.enc.Utf8.parse(key);
  var iv = CryptoJS.enc.Utf8.parse(iv);
  var encrypted = CryptoJS.AES.encrypt(data, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding
  });
  return encrypted;
};
var date = new Date();
const TOKEN="super";
var privateKey=CryptoJS.MD5('qupr-'+dateUtil.formatCurrent('yyyy-MM-dd')+'-cinless.qu').toString().substring(8,24);
var iv = 'www.qupr.com';
var encrypt = function(data){
  var encrypted = getAesString(data,privateKey, iv);
  return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
};
var generateToken = function() {
  return CryptoJS.MD5('qupr-2014-01-01-cinless.qu').toString();
  //return encrypt(TOKEN);
};
module.exports = {
  generateToken: generateToken,
  encrypt:encrypt
};
