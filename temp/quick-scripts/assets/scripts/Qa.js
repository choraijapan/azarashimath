(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Qa.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '43a45WEJW1Pr4y9hfLJQXmJ', 'Qa', __filename);
// scripts/Qa.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Qa = /** @class */ (function (_super) {
    __extends(Qa, _super);
    function Qa() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.questionNode = null;
        _this.btnAnswerNode_1 = null;
        _this.btnAnswerNode_2 = null;
        _this.btnAnswerNode_3 = null;
        _this.btnAnswerNode_4 = null;
        _this.btnAnswerNode_5 = null;
        _this.btnAnswerNode_6 = null;
        _this.btnAnswerNode_7 = null;
        _this.btnAnswerNode_8 = null;
        _this.btnAnswerNode_9 = null;
        _this.game = null;
        _this.faildAudio = null;
        _this.successAudio = null;
        _this.btnAnswerNodeArray = new Array();
        _this.currentNode = null; // 选择答案的节点
        _this.rightNode = null; // 正确答案的节点
        return _this;
    }
    Qa.prototype.onLoad = function () {
        this.btnAnswerNodeArray = [
            this.btnAnswerNode_1,
            this.btnAnswerNode_2,
            this.btnAnswerNode_3,
            this.btnAnswerNode_4,
            this.btnAnswerNode_5,
            this.btnAnswerNode_6,
            this.btnAnswerNode_7,
            this.btnAnswerNode_8,
            this.btnAnswerNode_9
        ];
    };
    Qa.prototype.getQuestionResult = function () {
        var questString = this.questionNode.getComponent(cc.Label).string;
        return Number(questString.charAt(0)) + Number(questString.substr(questString.length - 1));
    };
    Qa.prototype.answerClick = function (event, option) {
        if (!this.isAnswer && this.game.getComponent('Game').inProgress) {
            this.isAnswer = true;
            this.currentNode = this.btnAnswerNodeArray[option];
            console.log("######### getQuestionResult " + this.getQuestionResult());
            console.log("######### Number(option) " + Number(option));
            console.log("######### Label " + Number(this.getChildrenLabel(this.currentNode).string));
            // judge
            //this.answer = Number(option);
            this.answer = this.getQuestionResult();
            //if (this.right === Number(option)) {
            if (this.getQuestionResult() == Number(this.getChildrenLabel(this.currentNode).string)) {
                this.correct();
                return;
            }
            this.wrong();
        }
    };
    Qa.prototype.initQa = function (question) {
        // init status
        this.isAnswer = false;
        // init q & a
        this.questionNode.getComponent(cc.Label).string = question.qa;
        //const [A, B, C, D, E, F, G, H, I] = question.answer;
        //this.getChildrenLabel(this.btnAnswerNode_1).string = `${A.txt}`; // A.
        //this.getChildrenLabel(this.btnAnswerNode_2).string = `${B.txt}`; // B.
        //this.getChildrenLabel(this.btnAnswerNode_3).string = `${C.txt}`; // C.
        //this.getChildrenLabel(this.btnAnswerNode_4).string = `${D.txt}`; // D.
        //this.getChildrenLabel(this.btnAnswerNode_5).string = `${E.txt}`; // E.
        //this.getChildrenLabel(this.btnAnswerNode_6).string = `${F.txt}`; // F.
        //this.getChildrenLabel(this.btnAnswerNode_7).string = `${G.txt}`; // G.
        //this.getChildrenLabel(this.btnAnswerNode_8).string = `${H.txt}`; // H.
        //this.getChildrenLabel(this.btnAnswerNode_9).string = `${I.txt}`; // I.
        // init right
        //this.right = question.answer.findIndex(item => item.id === question.right);
        this.right = this.getQuestionResult();
        // init pic
        // if (question.pic) {
        //     this.picNode.active = true;
        //     this.picNode.getComponent(cc.WebView).url = question.pic;
        // }
    };
    Qa.prototype.correct = function () {
        this.animStart();
        cc.audioEngine.play(this.successAudio, false, 1);
        this.currentNode.color = new cc.Color(88, 165, 92);
        this.game.getComponent('Game').playSealAnimeJump();
    };
    Qa.prototype.wrong = function () {
        this.animStart();
        cc.audioEngine.play(this.faildAudio, false, 1);
        this.currentNode.color = new cc.Color(217, 80, 84);
        this.game.getComponent('Game').playSealAnimeAway();
    };
    Qa.prototype.animStart = function () {
        var _this = this;
        var seqAction = cc.sequence(cc.scaleTo(.2, 1.1), cc.callFunc(this.animOver, this));
        this.currentNode.runAction(seqAction);
        var isRight = this.right === this.answer;
        this.currentNode.getChildByName('Label').color = cc.Color.WHITE;
        this.rightNode = this.btnAnswerNodeArray[this.right - 1];
        this.btnAnswerNodeArray.forEach(function (node) {
            if (!isRight && _this.rightNode === node) {
                // 答错了把正确答案也展示给用户
                node.color = new cc.Color(88, 165, 92);
                node.getChildByName('Label').color = cc.Color.WHITE;
                return;
            }
            if (_this.currentNode !== node) {
                node.runAction(cc.scaleTo(.2, 0));
            }
        });
        if (this.currentNode !== this.rightNode) {
            this.rightNode.runAction(cc.scaleTo(1.1, 1.1));
        }
    };
    Qa.prototype.animOver = function () {
        var _this = this;
        this.game.getComponent('Game').stopSchedule();
        this.scheduleOnce(function () {
            _this.game.getComponent('Game').endRound();
        }, 1);
    };
    Qa.prototype.resetStatus = function () {
        var _this = this;
        if (this.currentNode) {
            // 将正确答案缩放重置
            this.currentNode.runAction(cc.scaleTo(1, 1));
            // 将错误答案和正确答案背景颜色重置
            this.currentNode.color = cc.Color.WHITE;
            this.rightNode.color = cc.Color.WHITE;
            // 将lable颜色重置
            //this.rightNode.getChildByName('Label').color = cc.Color.BLACK;
            //this.currentNode.getChildByName('Label').color = cc.Color.BLACK;
            this.btnAnswerNodeArray.forEach(function (node) {
                if (_this.currentNode !== node) {
                    node.runAction(cc.scaleTo(1, 1));
                }
            });
            this.currentNode = null;
        }
    };
    Qa.prototype.getChildrenLabel = function (node) {
        return node.getChildByName('Label').getComponent(cc.Label);
    };
    __decorate([
        property(cc.Node)
    ], Qa.prototype, "questionNode", void 0);
    __decorate([
        property(cc.Node)
    ], Qa.prototype, "btnAnswerNode_1", void 0);
    __decorate([
        property(cc.Node)
    ], Qa.prototype, "btnAnswerNode_2", void 0);
    __decorate([
        property(cc.Node)
    ], Qa.prototype, "btnAnswerNode_3", void 0);
    __decorate([
        property(cc.Node)
    ], Qa.prototype, "btnAnswerNode_4", void 0);
    __decorate([
        property(cc.Node)
    ], Qa.prototype, "btnAnswerNode_5", void 0);
    __decorate([
        property(cc.Node)
    ], Qa.prototype, "btnAnswerNode_6", void 0);
    __decorate([
        property(cc.Node)
    ], Qa.prototype, "btnAnswerNode_7", void 0);
    __decorate([
        property(cc.Node)
    ], Qa.prototype, "btnAnswerNode_8", void 0);
    __decorate([
        property(cc.Node)
    ], Qa.prototype, "btnAnswerNode_9", void 0);
    __decorate([
        property(cc.Node)
    ], Qa.prototype, "game", void 0);
    __decorate([
        property(cc.AudioClip)
    ], Qa.prototype, "faildAudio", void 0);
    __decorate([
        property(cc.AudioClip)
    ], Qa.prototype, "successAudio", void 0);
    Qa = __decorate([
        ccclass
    ], Qa);
    return Qa;
}(cc.Component));
exports.default = Qa;

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
        //# sourceMappingURL=Qa.js.map
        