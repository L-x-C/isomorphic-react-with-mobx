'use strict';

const mobileUaArry = [
  "iPhone", //iPhone是否也转wap？不管它，先区分出来再说。Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_1 like Mac OS X; zh-cn) AppleWebKit/532.9 (KHTML, like Gecko) Mobile/8B117
  "Android", //Android是否也转wap？Mozilla/5.0 (Linux; U; Android 2.1-update1; zh-cn; XT800 Build/TITA_M2_16.22.7) AppleWebKit/530.17 (KHTML, like Gecko) Version/4.0 Mobile Safari/530.17
  'MicroMessenger',
  "Nokia", //诺基亚，有山寨机也写这个的，总还算是手机，Mozilla/5.0 (Nokia5800 XpressMusic)UC AppleWebkit(like Gecko) Safari/530
  "SAMSUNG", //三星手机 SAMSUNG-GT-B7722/1.0+SHP/VPP/R5+Dolfin/1.5+Nextreaming+SMM-MMS/1.2.0+profile/MIDP-2.1+configuration/CLDC-1.1
  "MIDP-2", //j2me2.0，Mozilla/5.0 (SymbianOS/9.3; U; Series60/3.2 NokiaE75-1 /110.48.125 Profile/MIDP-2.1 Configuration/CLDC-1.1 ) AppleWebKit/413 (KHTML, like Gecko) Safari/413
  "CLDC1.1", //M600/MIDP2.0/CLDC1.1/Screen-240X320
  "SymbianOS", //塞班系统的，
  "MAUI", //MTK山寨机默认ua
  "UNTRUSTED/1.0", //疑似山寨机的ua，基本可以确定还是手机
  "Windows CE", //Windows CE，Mozilla/4.0 (compatible; MSIE 6.0; Windows CE; IEMobile 7.11)
  //"iPad",iPad的ua，Mozilla/5.0 (iPad; U; CPU OS 3_2 like Mac OS X; zh-cn) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B367 Safari/531.21.10
  "BlackBerry", //BlackBerry8310/2.7.0.106-4.5.0.182
  "UCWEB", //ucweb是否只给wap页面？ Nokia5800 XpressMusic/UCWEB7.5.0.66/50/999
  "ucweb", //小写的ucweb,貌似是uc的代理服务器,Mozilla/6.0 (compatible; MSIE 6.0;) Opera ucweb-squid
  "BREW", //很奇怪的ua，例如：REW-Applet/0x20068888 (BREW/3.1.5.20; DeviceId: 40105; Lang: zhcn) ucweb-squid
  "J2ME", //,很奇怪的ua，只有J2ME四个字母
  "YULONG", //宇龙手机，YULONG-CoolpadN68/10.14 IPANEL/2.0 CTC/1.0
  "YuLong", //还是宇龙
  "COOLPAD", //宇龙酷派,YL-COOLPADS100/08.10.S100 POLARIS/2.9 CTC/1.0
  "TIANYU", //天语手机,TIANYU-KTOUCH/V209/MIDP2.0/CLDC1.1/Screen-240X320
  "TY-", //天语，TY-F6229/701116_6215_V0230 JUPITOR/2.2 CTC/1.0
  "K-Touch", //还是天语,K-Touch_N2200_CMCC/TBG110022_1223_V0801 MTK/6223 Release/30.07.2008 Browser/WAP2.0
  "Haier", //海尔手机，Haier-HG-M217_CMCC/3.0 Release/12.1.2007 Browser/WAP2.0
  "DOPOD", //多普达手机,
  "Lenovo", //联想手机，Lenovo-P650WG/S100 LMP/LML Release/2010.02.22 Profile/MIDP2.0 Configuration/CLDC1.1
  "LENOVO", //联想手机，比如：LENOVO-P780/176A
  "HUAQIN", //华勤手机
  "AIGO-", //爱国者居然也出过手机，AIGO-800C/2.04 TMSS-BROWSER/1.0.0 CTC/1.0
  "CTC/1.0", //含义不明
  "CTC/2.0", //含义不明
  "CMCC", //移动定制手机，K-Touch_N2200_CMCC/TBG110022_1223_V0801 MTK/6223 Release/30.07.2008 Browser/WAP2.0
  "DAXIAN", //大显手机,DAXIAN X180 UP.Browser/6.2.3.2(GUI) MMP/2.0
  "MOT-", //摩托罗拉，MOT-MOTOROKRE6/1.0 LinuxOS/2.4.20 Release/8.4.2006 Browser/Opera8.00 Profile/MIDP2.0 Configuration/CLDC1.1 Software/R533_G_11.10.54R
  "SonyEricsson", //索爱手机，SonyEricssonP990i/R100 Mozilla/4.0 (compatible; MSIE 6.0; Symbian OS; 405) Opera 8.65 [zh-CN]
  "GIONEE", //金立手机
  "HTC", //HTC手机
  "ZTE", //中兴手机，ZTE-A211/P109A2V1.0.0/WAP2.0 Profile
  "HUAWEI", //华为手机，
  "webOS", //palm手机，Mozilla/5.0 (webOS/1.4.5; U; zh-CN) AppleWebKit/532.2 (KHTML, like Gecko) Version/1.0 Safari/532.2 Pre/1.0
  "GoBrowser", //3g GoBrowser.User-Agent=Nokia5230/GoBrowser/2.0.290 Safari
  "IEMobile", //Windows CE手机自带浏览器，
  "WAP2.0" //支持wap 2.0的
];

const redirectMapping = {
  '/job/list/c/': 'http://job.qiaobutang.com/c/',
  '/job/list/': 'http://job.qiaobutang.com/',
  '/job/list': 'http://job.qiaobutang.com/list'
};

module.exports = (req, res, next) => {
  //这是为了PC端有一个切换PC版M版的强制跳转,不根据ua
  let viewPort = req.cookies['VIEW_PORT'];
  if (viewPort && viewPort == 'M') {
    req.isMobile = true;
  } else if (viewPort && viewPort == 'PC') {
    req.isMobile = false;
  } else {
    const ua = req.headers['user-agent'];
    if (!ua) {
      return next();
    }
    for (let keyword of mobileUaArry) {
      if (ua.includes(keyword)) {
        req.isMobile = true;
        break;
      }
    }
  }


  if (!req.isMobile) {
    const reqPath = req.path;
    for (let path of Object.keys(redirectMapping)) {
      if (reqPath.startsWith(path)) {
        return res.redirect(reqPath.replace(path, redirectMapping[path]));
      }
    }
  }
  next();
};
