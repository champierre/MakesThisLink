// ==UserScript==
// @name          MakesThisLink
// @namespace     http://champierre.com
// @description	  TwitterのWebサイトのユーザー名部分にMakesThis(http://makesthis.com)へのリンクを追加
// @author        Junya Ishihara(http://champierre.com)
// @include       http://twitter.com/*
// @license       MIT License(http://en.wikipedia.org/wiki/MIT_License)
// ==/UserScript==
//
// == ライセンス ==
// 本ソフトウェアの著作権は、
// コードに特に明記がない物は Junya Ishihara(http://champierre.com) に帰属します。
// また、本ソフトウェアのライセンスは MIT License(http://en.wikipedia.org/wiki/MIT_License) とします。
// 
//
// == 謝辞 ==
//
// Chromeに対応するためumezo氏が作られたgmWrapperを使わせていただきました。
//
// gmWrapperのソースをgithubで公開しました
// http://d.hatena.ne.jp/umezo/20091121/1258819422
//
// グリモンuserscriptをChromeに移植するときに使う、GM APIのラッパっぽいものとプロジェクトテンプレートを書いた
// http://d.hatena.ne.jp/umezo/20091121/1258819422
//
//
// == リリースノート ==
// 0.0.1
// - イニシャルバージョン


var makesthis = makesthis ? makesthis : new Object();
makesthis.version = "0.0.1";

function initialize() {
  document.addEventListener('click', function(event) {
		var target = event.target;
		if (target.className == "tab-text") {
		  addMakesThisLink();
		}
	}, true);
}

function addMakesThisLink(){
  setTimeout(function() {
    var divs = document.querySelectorAll('.tweet-screen-name');
    for (var i = 0; i < divs.length; i++) {
      var screenName = divs[i].innerHTML;
      var div = divs[i];
      addLink(div, screenName);
    }
  }, 3000);
}

function addLink(div, screenName) {
  GM_xmlhttpRequest({
    method: "GET",
    url: "http://makesthis.com/profiles/" + screenName + ".js",
    onload: function(response){
      if (response['responseText'] != 'null') {
        var span = document.createElement('span');
        span.innerHTML = '<a href="http://' + screenName + '.makesthis.com" target="_blank"><span style="background-color:#588db5;">&nbsp;<span style="color:#ffffff;">MAKES</span> <span style="color:#082134;">THIS</span></span></a>';
        div.parentNode.appendChild(span);
      }
    }
  });
}

if (typeof isChromeExtension == "undefined"){ //chrome wrapperが読み込まれていない場合 = グリモンに読み込まれている
  initialize();
  addMakesThisLink();
} else { //こっちの場合はラッパーと一緒に読み込まれているのでonReadyGMイベントを受け取ってから初期化
  function onReadyGM(){
    initialize();
    addMakesThisLink();
  }
}
