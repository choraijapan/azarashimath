window.__require = function t(e, o, n) {
function r(c, a) {
if (!o[c]) {
if (!e[c]) {
var s = c.split("/");
s = s[s.length - 1];
if (!e[s]) {
var d = "function" == typeof __require && __require;
if (!a && d) return d(s, !0);
if (i) return i(s, !0);
throw new Error("Cannot find module '" + c + "'");
}
}
var u = o[c] = {
exports: {}
};
e[c][0].call(u.exports, function(t) {
return r(e[c][1][t] || t);
}, u, u.exports, t, e, o, n);
}
return o[c].exports;
}
for (var i = "function" == typeof __require && __require, c = 0; c < n.length; c++) r(n[c]);
return r;
}({
Game: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "3bbc4NE11xGyZazcw8wedmQ", "Game");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = cc._decorator, r = n.ccclass, i = n.property, c = function(t) {
__extends(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.nodeTitle = null;
e.nodeLogo = null;
e.btnQa1 = null;
e.btnQa2 = null;
e.btnQa3 = null;
e.btnQa4 = null;
e.btnQa5 = null;
e.btnQa6 = null;
e.btnQa7 = null;
e.currentQaNode = null;
e.btnQaNodeArray = new Array();
e.mark = null;
e.nodeQa = null;
e.progressBarNode = null;
e.readyCountdownNode = null;
e.sealNode = null;
e.nodeStart = null;
e.countdownAudio_1 = null;
e.countdownAudio_2 = null;
e.countdownTime = 0;
e.questionTotal = 10;
e.progressBar = null;
e.readyCountdown = null;
e.currentTime = 0;
e.current = 0;
e.inProgress = !1;
e.qdata = null;
e.isMockData = !0;
e.sealAnime = null;
return e;
}
e.prototype.onLoad = function() {
this.initStartLayer();
this.initGameLayer();
};
e.prototype.initStartLayer = function() {
var t = this, e = cc.sequence(cc.fadeIn(1.8), cc.fadeOut(2), cc.callFunc(function() {
t.nodeTitle.active = !1;
}));
this.nodeLogo.runAction(e);
this.btnQaNodeArray = [ this.btnQa1, this.btnQa2, this.btnQa3, this.btnQa4, this.btnQa5, this.btnQa6, this.btnQa7 ];
};
e.prototype.qaClick = function(t, e) {
this.currentQaNode = this.btnQaNodeArray[e];
console.log("######### Label " + Number(this.getChildrenLabel(this.currentQaNode).string));
this.questionTotal = Number(this.getChildrenLabel(this.currentQaNode).string);
console.log("######### questionTotal " + this.questionTotal);
this.createQaData();
this.startGame();
};
e.prototype.createQaData = function() {
this.qdata = new Array();
for (var t = 0; t <= this.questionTotal; t++) {
var e = t % 3 + 1, o = this.randomInt(1, 8 - e), n = {
id: e + o,
qa: e + " + " + o
};
this.qdata.push(n);
}
};
e.prototype.requestData = function() {
var t = this, e = new XMLHttpRequest();
e.onload = function() {
var o = JSON.parse(e.responseText);
if (0 == o.status) {
t.qdata = new Array();
o.result.list.every(function(e, o) {
if (("A" === e.answer || "B" === e.answer || "C" === e.answer || "D" === e.answer || "E" === e.answer || "F" === e.answer || "G" === e.answer || "H" === e.answer || "I" === e.answer) && !e.pic) {
var n = {
id: o,
title: e.question,
right: e.answer,
pic: e.pic,
answer: [ {
id: "A",
txt: e.option1
}, {
id: "B",
txt: e.option2
}, {
id: "C",
txt: e.option3
}, {
id: "D",
txt: e.option4
}, {
id: "E",
txt: e.option5
}, {
id: "F",
txt: e.option6
}, {
id: "G",
txt: e.option7
}, {
id: "H",
txt: e.option8
}, {
id: "I",
txt: e.option9
} ]
};
t.qdata.push(n);
if (t.qdata.length >= t.questionTotal) return !1;
}
return !0;
});
console.log(t.qdata);
}
};
e.open("get", "https://jisujiakao.market.alicloudapi.com/driverexam/query?pagenum=1&pagesize=100&sort=rand&subject=1&type=C1", !0);
e.setRequestHeader("Authorization", "APPCODE d1f7d1f2048841eca46b1a56a941554b");
console.log(e.send());
};
e.prototype.initGameLayer = function() {
this.progressBarNode.active = !1;
this.progressBar = this.progressBarNode.getComponent(cc.ProgressBar);
this.progressBar.progress = 1;
this.readyCountdownNode.active = !1;
this.readyCountdown = this.readyCountdownNode.getComponent(cc.Label);
this.nodeQa.active = !1;
this.nodeQa.opacity = 0;
this.nodeStart.active = !0;
this.current = 0;
this.mark.active = !1;
};
e.prototype.ready = function() {
var t = this, e = 2;
this.readyCountdownNode.active = !0;
this.sealNode.active = !0;
this.sealAnime = this.sealNode.getComponent(cc.Animation);
this.playSealAnimeJump();
this.readyCountdown.string = "Ready";
var o = cc.sequence(cc.scaleTo(.2, 1.6), cc.scaleTo(.6, .8)), n = cc.sequence(cc.scaleTo(.2, 1.6), cc.callFunc(function() {
console.log("anim end!");
setTimeout(function() {
var e = t.readyCountdownNode.position, o = e.x, n = e.y;
t.readyCountdownNode.runAction(cc.sequence(cc.moveTo(.5, 0, 1e3), cc.callFunc(function() {
t.readyCountdownNode.active = !1;
t.readyCountdownNode.x = o;
t.readyCountdownNode.y = n;
t.readyCountdownNode.scale = 1;
t.progressBarNode.active = !0;
t.nodeQa.active = !0;
t.starRound();
})));
}, 300);
}));
this.readyCountdownNode.runAction(o);
this.schedule(function() {
if (e <= 0) {
t.readyCountdown.string = "Go";
t.readyCountdownNode.runAction(n);
} else {
t.readyCountdown.string = e.toString();
t.readyCountdownNode.runAction(o);
e -= 1;
}
}, 1, e, 0);
this.scheduleOnce(function() {
cc.audioEngine.play(t.countdownAudio_1, !1, 1);
}, 1);
};
e.prototype.startGame = function() {
this.nodeStart.active = !1;
this.ready();
};
e.prototype.starRound = function() {
var t = this;
console.log("######### this.current " + this.current);
console.log("######### his.qdata.length " + this.qdata.length);
this.playSealAnimeIdle();
if (this.current >= this.questionTotal) {
this.initGameLayer();
this.unschedule(this.updateCountdownTime);
} else {
this.mark.active = !0;
this.mark.getComponent(cc.Label).string = "第 " + (this.current + 1) + " 题";
this.mark.runAction(cc.sequence(cc.scaleTo(.2, 1.2), cc.scaleTo(.2, 1), cc.callFunc(function() {
t.scheduleOnce(function() {
t.mark.active = !1;
t.nodeQa.runAction(cc.fadeIn(.2));
t.inProgress = !0;
t.nodeQa.getComponent("Qa").initQa(t.qdata[t.current]);
t.progressBar.progress = 1;
t.schedule(t.updateCountdownTime, 1);
t.current += 1;
}, 1);
})));
}
};
e.prototype.endRound = function() {
var t = this;
this.currentTime = 0;
this.inProgress = !1;
var e = cc.sequence(cc.fadeOut(.2), cc.callFunc(function() {
t.nodeQa.getComponent("Qa").resetStatus();
t.scheduleOnce(function() {
t.starRound();
}, .5);
}));
this.nodeQa.runAction(e);
};
e.prototype.playSealAnimeAway = function() {};
e.prototype.playSealAnimeJump = function() {
this.sealAnime.play("seal_jump");
};
e.prototype.playSealAnimeIdle = function() {
this.sealAnime.play("seal_idle");
};
e.prototype.stopSchedule = function() {
this.unschedule(this.updateCountdownTime);
};
e.prototype.updateCountdownTime = function() {
this.currentTime += 1;
this.progressBar.progress = 1 - this.currentTime / this.countdownTime;
cc.audioEngine.play(this.countdownAudio_2, !1, 1);
if (this.currentTime >= this.countdownTime) {
this.unschedule(this.updateCountdownTime);
this.endRound();
}
};
e.prototype.getChildrenLabel = function(t) {
return t.getChildByName("Label").getComponent(cc.Label);
};
e.prototype.randomInt = function(t, e) {
return Math.floor(Math.random() * (e - t + 1)) + t;
};
__decorate([ i(cc.Node) ], e.prototype, "nodeTitle", void 0);
__decorate([ i(cc.Node) ], e.prototype, "nodeLogo", void 0);
__decorate([ i(cc.Node) ], e.prototype, "btnQa1", void 0);
__decorate([ i(cc.Node) ], e.prototype, "btnQa2", void 0);
__decorate([ i(cc.Node) ], e.prototype, "btnQa3", void 0);
__decorate([ i(cc.Node) ], e.prototype, "btnQa4", void 0);
__decorate([ i(cc.Node) ], e.prototype, "btnQa5", void 0);
__decorate([ i(cc.Node) ], e.prototype, "btnQa6", void 0);
__decorate([ i(cc.Node) ], e.prototype, "btnQa7", void 0);
__decorate([ i(cc.Node) ], e.prototype, "mark", void 0);
__decorate([ i(cc.Node) ], e.prototype, "nodeQa", void 0);
__decorate([ i(cc.Node) ], e.prototype, "progressBarNode", void 0);
__decorate([ i(cc.Node) ], e.prototype, "readyCountdownNode", void 0);
__decorate([ i(cc.Node) ], e.prototype, "sealNode", void 0);
__decorate([ i(cc.Node) ], e.prototype, "nodeStart", void 0);
__decorate([ i(cc.AudioClip) ], e.prototype, "countdownAudio_1", void 0);
__decorate([ i(cc.AudioClip) ], e.prototype, "countdownAudio_2", void 0);
__decorate([ i(cc.Integer) ], e.prototype, "countdownTime", void 0);
return e = __decorate([ r ], e);
}(cc.Component);
o.default = c;
cc._RF.pop();
}, {} ],
Qa: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "43a45WEJW1Pr4y9hfLJQXmJ", "Qa");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = cc._decorator, r = n.ccclass, i = n.property, c = function(t) {
__extends(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.questionNode = null;
e.btnAnswerNode_1 = null;
e.btnAnswerNode_2 = null;
e.btnAnswerNode_3 = null;
e.btnAnswerNode_4 = null;
e.btnAnswerNode_5 = null;
e.btnAnswerNode_6 = null;
e.btnAnswerNode_7 = null;
e.btnAnswerNode_8 = null;
e.btnAnswerNode_9 = null;
e.game = null;
e.faildAudio = null;
e.successAudio = null;
e.btnAnswerNodeArray = new Array();
e.currentNode = null;
e.rightNode = null;
return e;
}
e.prototype.onLoad = function() {
this.btnAnswerNodeArray = [ this.btnAnswerNode_1, this.btnAnswerNode_2, this.btnAnswerNode_3, this.btnAnswerNode_4, this.btnAnswerNode_5, this.btnAnswerNode_6, this.btnAnswerNode_7, this.btnAnswerNode_8, this.btnAnswerNode_9 ];
};
e.prototype.getQuestionResult = function() {
var t = this.questionNode.getComponent(cc.Label).string;
return Number(t.charAt(0)) + Number(t.substr(t.length - 1));
};
e.prototype.answerClick = function(t, e) {
if (!this.isAnswer && this.game.getComponent("Game").inProgress) {
this.isAnswer = !0;
this.currentNode = this.btnAnswerNodeArray[e];
console.log("######### getQuestionResult " + this.getQuestionResult());
console.log("######### Number(option) " + Number(e));
console.log("######### Label " + Number(this.getChildrenLabel(this.currentNode).string));
this.answer = this.getQuestionResult();
if (this.getQuestionResult() == Number(this.getChildrenLabel(this.currentNode).string)) {
this.correct();
return;
}
this.wrong();
}
};
e.prototype.initQa = function(t) {
this.isAnswer = !1;
this.questionNode.getComponent(cc.Label).string = t.qa;
this.right = this.getQuestionResult();
};
e.prototype.correct = function() {
this.animStart();
cc.audioEngine.play(this.successAudio, !1, 1);
this.currentNode.color = new cc.Color(88, 165, 92);
this.game.getComponent("Game").playSealAnimeJump();
};
e.prototype.wrong = function() {
this.animStart();
cc.audioEngine.play(this.faildAudio, !1, 1);
this.currentNode.color = new cc.Color(217, 80, 84);
this.game.getComponent("Game").playSealAnimeAway();
};
e.prototype.animStart = function() {
var t = this, e = cc.sequence(cc.scaleTo(.2, 1.1), cc.callFunc(this.animOver, this));
this.currentNode.runAction(e);
var o = this.right === this.answer;
this.currentNode.getChildByName("Label").color = cc.Color.WHITE;
this.rightNode = this.btnAnswerNodeArray[this.right - 1];
this.btnAnswerNodeArray.forEach(function(e) {
if (o || t.rightNode !== e) t.currentNode !== e && e.runAction(cc.scaleTo(.2, 0)); else {
e.color = new cc.Color(88, 165, 92);
e.getChildByName("Label").color = cc.Color.WHITE;
}
});
this.currentNode !== this.rightNode && this.rightNode.runAction(cc.scaleTo(1.1, 1.1));
};
e.prototype.animOver = function() {
var t = this;
this.game.getComponent("Game").stopSchedule();
this.scheduleOnce(function() {
t.game.getComponent("Game").endRound();
}, 1);
};
e.prototype.resetStatus = function() {
var t = this;
if (this.currentNode) {
this.currentNode.runAction(cc.scaleTo(1, 1));
this.currentNode.color = cc.Color.WHITE;
this.rightNode.color = cc.Color.WHITE;
this.btnAnswerNodeArray.forEach(function(e) {
t.currentNode !== e && e.runAction(cc.scaleTo(1, 1));
});
this.currentNode = null;
}
};
e.prototype.getChildrenLabel = function(t) {
return t.getChildByName("Label").getComponent(cc.Label);
};
__decorate([ i(cc.Node) ], e.prototype, "questionNode", void 0);
__decorate([ i(cc.Node) ], e.prototype, "btnAnswerNode_1", void 0);
__decorate([ i(cc.Node) ], e.prototype, "btnAnswerNode_2", void 0);
__decorate([ i(cc.Node) ], e.prototype, "btnAnswerNode_3", void 0);
__decorate([ i(cc.Node) ], e.prototype, "btnAnswerNode_4", void 0);
__decorate([ i(cc.Node) ], e.prototype, "btnAnswerNode_5", void 0);
__decorate([ i(cc.Node) ], e.prototype, "btnAnswerNode_6", void 0);
__decorate([ i(cc.Node) ], e.prototype, "btnAnswerNode_7", void 0);
__decorate([ i(cc.Node) ], e.prototype, "btnAnswerNode_8", void 0);
__decorate([ i(cc.Node) ], e.prototype, "btnAnswerNode_9", void 0);
__decorate([ i(cc.Node) ], e.prototype, "game", void 0);
__decorate([ i(cc.AudioClip) ], e.prototype, "faildAudio", void 0);
__decorate([ i(cc.AudioClip) ], e.prototype, "successAudio", void 0);
return e = __decorate([ r ], e);
}(cc.Component);
o.default = c;
cc._RF.pop();
}, {} ],
mock: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "2c8d9DgpDdBfYhhdno4j26K", "mock");
Object.defineProperty(o, "__esModule", {
value: !0
});
o.default = [ {
id: 1001,
title: "6 + 3",
right: 1,
answer: [ {
id: 1,
txt: "1"
}, {
id: 2,
txt: "2"
}, {
id: 3,
txt: "3"
}, {
id: 4,
txt: "4"
}, {
id: 5,
txt: "5"
}, {
id: 6,
txt: "6"
}, {
id: 7,
txt: "7"
}, {
id: 8,
txt: "8"
}, {
id: 9,
txt: "9"
} ]
} ];
cc._RF.pop();
}, {} ]
}, {}, [ "Game", "Qa", "mock" ]);