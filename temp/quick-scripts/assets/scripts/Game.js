(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Game.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '3bbc4NE11xGyZazcw8wedmQ', 'Game', __filename);
// scripts/Game.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Game = /** @class */ (function (_super) {
    __extends(Game, _super);
    function Game() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //----------START Layer---------------------- BEGIN
        _this.nodeTitle = null;
        _this.nodeLogo = null;
        _this.btnQa1 = null;
        _this.btnQa2 = null;
        _this.btnQa3 = null;
        _this.btnQa4 = null;
        _this.btnQa5 = null;
        _this.btnQa6 = null;
        _this.btnQa7 = null;
        _this.currentQaNode = null;
        _this.btnQaNodeArray = new Array();
        //----------START Layer---------------------- END
        _this.mark = null; // 第 ？题 
        _this.nodeQa = null;
        _this.progressBarNode = null; // 进度条
        _this.readyCountdownNode = null; // ready go 倒计时
        _this.sealNode = null; // 海豹
        _this.nodeStart = null; // 开始游戏界面
        _this.countdownAudio_1 = null;
        _this.countdownAudio_2 = null;
        _this.countdownTime = 0; // 小题 答题倒计时(s)
        //@property(cc.Integer)
        _this.questionTotal = 10; // 题目数量
        _this.progressBar = null;
        _this.readyCountdown = null;
        _this.currentTime = 0; // 小题 答题使用时间(s)
        _this.current = 0; // 当前小题
        _this.inProgress = false; // 是否在进行中 (小题)
        _this.qdata = null;
        _this.isMockData = true; // mock.ts数据
        _this.sealAnime = null;
        return _this;
    }
    Game.prototype.onLoad = function () {
        this.initStartLayer();
        this.initGameLayer();
    };
    Game.prototype.initStartLayer = function () {
        var _this = this;
        // Logo fade in fade Out
        var action = cc.sequence(cc.fadeIn(1.8), cc.fadeOut(2.0), cc.callFunc(function () {
            _this.nodeTitle.active = false;
        }));
        this.nodeLogo.runAction(action);
        this.btnQaNodeArray = [
            this.btnQa1,
            this.btnQa2,
            this.btnQa3,
            this.btnQa4,
            this.btnQa5,
            this.btnQa6,
            this.btnQa7
        ];
    };
    Game.prototype.qaClick = function (event, option) {
        this.currentQaNode = this.btnQaNodeArray[option];
        console.log("######### Label " + Number(this.getChildrenLabel(this.currentQaNode).string));
        this.questionTotal = Number(this.getChildrenLabel(this.currentQaNode).string);
        console.log("######### questionTotal " + this.questionTotal);
        this.createQaData();
        this.startGame();
    };
    Game.prototype.createQaData = function () {
        this.qdata = new Array();
        for (var i = 0; i <= this.questionTotal; i++) {
            var a = i % 3 + 1;
            var b = this.randomInt(1, 8 - a);
            var q = {
                id: a + b,
                qa: a + " + " + b,
            };
            this.qdata.push(q);
        }
    };
    Game.prototype.requestData = function () {
        var _this = this;
        var oReq = new XMLHttpRequest();
        oReq.onload = function () {
            var res = JSON.parse(oReq.responseText);
            if (res.status == 0) {
                _this.qdata = new Array();
                res.result.list.every(function (item, i) {
                    if ((item.answer === 'A'
                        || item.answer === 'B'
                        || item.answer === 'C'
                        || item.answer === 'D'
                        || item.answer === 'E'
                        || item.answer === 'F'
                        || item.answer === 'G'
                        || item.answer === 'H'
                        || item.answer === 'I') && !item.pic) {
                        // if (item.pic) {
                        var q = {
                            id: i,
                            title: item.question,
                            right: item.answer,
                            pic: item.pic,
                            answer: [
                                {
                                    id: 'A',
                                    txt: item.option1
                                },
                                {
                                    id: 'B',
                                    txt: item.option2
                                },
                                {
                                    id: 'C',
                                    txt: item.option3
                                },
                                {
                                    id: 'D',
                                    txt: item.option4
                                },
                                {
                                    id: 'E',
                                    txt: item.option5
                                },
                                {
                                    id: 'F',
                                    txt: item.option6
                                },
                                {
                                    id: 'G',
                                    txt: item.option7
                                },
                                {
                                    id: 'H',
                                    txt: item.option8
                                },
                                {
                                    id: 'I',
                                    txt: item.option9
                                },
                            ]
                        };
                        _this.qdata.push(q);
                        if (_this.qdata.length >= _this.questionTotal) {
                            return false;
                        }
                    }
                    return true;
                });
                console.log(_this.qdata);
            }
        };
        // https://jisujiakao.market.alicloudapi.com
        oReq.open('get', 'https://jisujiakao.market.alicloudapi.com/driverexam/query?pagenum=1&pagesize=100&sort=rand&subject=1&type=C1', true);
        oReq.setRequestHeader('Authorization', 'APPCODE d1f7d1f2048841eca46b1a56a941554b');
        console.log(oReq.send());
    };
    Game.prototype.initGameLayer = function () {
        // init progressBar
        this.progressBarNode.active = false;
        this.progressBar = this.progressBarNode.getComponent(cc.ProgressBar);
        this.progressBar.progress = 1;
        // init readyCountdown
        this.readyCountdownNode.active = false;
        this.readyCountdown = this.readyCountdownNode.getComponent(cc.Label);
        // init qa node
        this.nodeQa.active = false;
        this.nodeQa.opacity = 0;
        // init btnStart
        this.nodeStart.active = true;
        // init current
        this.current = 0;
        // init mark
        this.mark.active = false;
    };
    Game.prototype.ready = function () {
        var _this = this;
        var startCountingDown = 2;
        // enable readyCountdown
        this.readyCountdownNode.active = true;
        this.sealNode.active = true;
        this.sealAnime = this.sealNode.getComponent(cc.Animation);
        // 最初のアニメーションを再生
        this.playSealAnimeJump();
        this.readyCountdown.string = 'Ready';
        var action = cc.sequence(cc.scaleTo(.2, 1.6), cc.scaleTo(.6, .8)); // 倒计时 action
        var actionEnd = cc.sequence(cc.scaleTo(.2, 1.6), cc.callFunc(function () {
            console.log('anim end!');
            setTimeout(function () {
                // 记录初始位置
                var _a = _this.readyCountdownNode.position, x = _a.x, y = _a.y;
                _this.readyCountdownNode.runAction(cc.sequence(cc.moveTo(.5, 0, 1000), cc.callFunc(function () {
                    // 复位
                    _this.readyCountdownNode.active = false;
                    _this.readyCountdownNode.x = x;
                    _this.readyCountdownNode.y = y;
                    _this.readyCountdownNode.scale = 1;
                    // 激活进度条
                    _this.progressBarNode.active = true;
                    // 激活问答
                    _this.nodeQa.active = true;
                    // 开始游戏
                    _this.starRound();
                })));
            }, 300);
        }));
        this.readyCountdownNode.runAction(action);
        this.schedule(function () {
            // console.log(startCountingDown);
            if (startCountingDown <= 0) {
                _this.readyCountdown.string = 'Go';
                _this.readyCountdownNode.runAction(actionEnd);
                return;
            }
            _this.readyCountdown.string = startCountingDown.toString();
            _this.readyCountdownNode.runAction(action);
            startCountingDown -= 1;
        }, 1, startCountingDown, 0);
        this.scheduleOnce(function () {
            cc.audioEngine.play(_this.countdownAudio_1, false, 1);
        }, 1);
    };
    Game.prototype.startGame = function () {
        this.nodeStart.active = false;
        this.ready();
    };
    Game.prototype.starRound = function () {
        var _this = this;
        console.log("######### this.current " + this.current);
        console.log("######### his.qdata.length " + this.qdata.length);
        this.playSealAnimeIdle();
        if (this.current >= this.questionTotal) {
            //cc.director.loadScene("Result");
            this.initGameLayer();
            this.unschedule(this.updateCountdownTime);
            // unbind scedule
            return;
        }
        this.mark.active = true;
        this.mark.getComponent(cc.Label).string = "\u7B2C " + (this.current + 1) + " \u9898";
        this.mark.runAction(cc.sequence(cc.scaleTo(.2, 1.2), cc.scaleTo(.2, 1), cc.callFunc(function () {
            _this.scheduleOnce(function () {
                _this.mark.active = false;
                // realy start
                _this.nodeQa.runAction(cc.fadeIn(.2));
                _this.inProgress = true; // 回合开始
                _this.nodeQa.getComponent('Qa').initQa(_this.qdata[_this.current]);
                _this.progressBar.progress = 1;
                _this.schedule(_this.updateCountdownTime, 1);
                _this.current += 1;
            }, 1);
        })));
    };
    Game.prototype.endRound = function () {
        var _this = this;
        this.currentTime = 0;
        this.inProgress = false;
        var actionOut = cc.sequence(cc.fadeOut(.2), cc.callFunc(function () {
            _this.nodeQa.getComponent('Qa').resetStatus();
            _this.scheduleOnce(function () {
                _this.starRound();
            }, .5);
        }));
        this.nodeQa.runAction(actionOut);
    };
    Game.prototype.playSealAnimeAway = function () {
        //this.sealAnime.play('seal_away');
    };
    Game.prototype.playSealAnimeJump = function () {
        this.sealAnime.play('seal_jump');
    };
    Game.prototype.playSealAnimeIdle = function () {
        this.sealAnime.play('seal_idle');
    };
    Game.prototype.stopSchedule = function () {
        this.unschedule(this.updateCountdownTime);
    };
    Game.prototype.updateCountdownTime = function () {
        this.currentTime += 1;
        this.progressBar.progress = 1 - this.currentTime / this.countdownTime;
        // console.log(this.currentTime);
        cc.audioEngine.play(this.countdownAudio_2, false, 1);
        if (this.currentTime >= this.countdownTime) {
            this.unschedule(this.updateCountdownTime);
            this.endRound();
        }
    };
    Game.prototype.getChildrenLabel = function (node) {
        return node.getChildByName('Label').getComponent(cc.Label);
    };
    /**
     * generate a random integer between min and max
     * @param {Number} min
     * @param {Number} max
     * @return {Number} random generated integer
     */
    Game.prototype.randomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    __decorate([
        property(cc.Node)
    ], Game.prototype, "nodeTitle", void 0);
    __decorate([
        property(cc.Node)
    ], Game.prototype, "nodeLogo", void 0);
    __decorate([
        property(cc.Node)
    ], Game.prototype, "btnQa1", void 0);
    __decorate([
        property(cc.Node)
    ], Game.prototype, "btnQa2", void 0);
    __decorate([
        property(cc.Node)
    ], Game.prototype, "btnQa3", void 0);
    __decorate([
        property(cc.Node)
    ], Game.prototype, "btnQa4", void 0);
    __decorate([
        property(cc.Node)
    ], Game.prototype, "btnQa5", void 0);
    __decorate([
        property(cc.Node)
    ], Game.prototype, "btnQa6", void 0);
    __decorate([
        property(cc.Node)
    ], Game.prototype, "btnQa7", void 0);
    __decorate([
        property(cc.Node)
    ], Game.prototype, "mark", void 0);
    __decorate([
        property(cc.Node)
    ], Game.prototype, "nodeQa", void 0);
    __decorate([
        property(cc.Node)
    ], Game.prototype, "progressBarNode", void 0);
    __decorate([
        property(cc.Node)
    ], Game.prototype, "readyCountdownNode", void 0);
    __decorate([
        property(cc.Node)
    ], Game.prototype, "sealNode", void 0);
    __decorate([
        property(cc.Node)
    ], Game.prototype, "nodeStart", void 0);
    __decorate([
        property(cc.AudioClip)
    ], Game.prototype, "countdownAudio_1", void 0);
    __decorate([
        property(cc.AudioClip)
    ], Game.prototype, "countdownAudio_2", void 0);
    __decorate([
        property(cc.Integer)
    ], Game.prototype, "countdownTime", void 0);
    Game = __decorate([
        ccclass
    ], Game);
    return Game;
}(cc.Component));
exports.default = Game;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=Game.js.map
        