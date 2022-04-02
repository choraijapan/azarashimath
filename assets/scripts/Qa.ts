const { ccclass, property } = cc._decorator;

@ccclass
export default class Qa extends cc.Component {

    @property(cc.Node)
    questionNode: cc.Node = null;
    @property(cc.Node)
    btnAnswerNode_1: cc.Node = null;
    @property(cc.Node)
    btnAnswerNode_2: cc.Node = null;
    @property(cc.Node)
    btnAnswerNode_3: cc.Node = null;
    @property(cc.Node)
    btnAnswerNode_4: cc.Node = null;
    @property(cc.Node)
    btnAnswerNode_5: cc.Node = null;
    @property(cc.Node)
    btnAnswerNode_6: cc.Node = null;
    @property(cc.Node)
    btnAnswerNode_7: cc.Node = null;
    @property(cc.Node)
    btnAnswerNode_8: cc.Node = null;
    @property(cc.Node)
    btnAnswerNode_9: cc.Node = null;

    @property(cc.Node)
    game: cc.Node = null;

    @property(cc.AudioClip)
    faildAudio: cc.AudioClip = null;

    @property(cc.AudioClip)
    successAudio: cc.AudioClip = null;

    btnAnswerNodeArray: Array<cc.Node> = new Array<cc.Node>();

    currentNode: cc.Node = null; // 选择答案的节点
    rightNode: cc.Node = null; // 正确答案的节点

    right: number; // 正确答案的id
    answer: number; // 选择的id
    isAnswer: boolean; // 是否已经回答了

    onLoad(): void {
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
        ]
    }

    getQuestionResult(): number {
        var questString = this.questionNode.getComponent(cc.Label).string 
        return Number(questString.charAt(0)) + Number(questString.substr(questString.length - 1));
    }

    answerClick(event, option): void {
        if (!this.isAnswer && this.game.getComponent('Game').inProgress) {
            this.isAnswer = true;
            this.currentNode = this.btnAnswerNodeArray[option];

            console.log("######### getQuestionResult " + this.getQuestionResult());
            console.log("######### Number(option) " + Number(option));
            console.log("######### Label " + Number(this.getChildrenLabel(this.currentNode).string);

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
    }

    initQa(question): void {
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
    }

    correct(): void {
        this.animStart();
        cc.audioEngine.play(this.successAudio as any, false, 1);
        this.currentNode.color = new cc.Color(88, 165, 92);
        this.game.getComponent('Game').playSealAnimeJump();
    }

    wrong(): void {
        this.animStart();
        cc.audioEngine.play(this.faildAudio as any, false, 1);
        this.currentNode.color = new cc.Color(217, 80, 84);
        this.game.getComponent('Game').playSealAnimeAway();
    }

    animStart(): void {
        const seqAction = cc.sequence(cc.scaleTo(.2, 1.1), cc.callFunc(this.animOver, this));
        this.currentNode.runAction(seqAction);
        const isRight = this.right === this.answer;
        this.currentNode.getChildByName('Label').color = cc.Color.WHITE;
        this.rightNode = this.btnAnswerNodeArray[this.right - 1];


        this.btnAnswerNodeArray.forEach(node => {
            if (!isRight && this.rightNode === node) {
                // 答错了把正确答案也展示给用户
                node.color = new cc.Color(88, 165, 92);
                node.getChildByName('Label').color = cc.Color.WHITE;
                return;
            }
            if (this.currentNode !== node) {
                node.runAction(cc.scaleTo(.2, 0));
            }
        })

        
        if (this.currentNode !== this.rightNode) {
            this.rightNode.runAction(cc.scaleTo(1.1, 1.1));
        }
    }

    animOver(): void {
        this.game.getComponent('Game').stopSchedule();
        this.scheduleOnce(() => {
            this.game.getComponent('Game').endRound();
        }, 1)
    }

    resetStatus(): void {
        if (this.currentNode) {
            // 将正确答案缩放重置
            this.currentNode.runAction(cc.scaleTo(1, 1));
            // 将错误答案和正确答案背景颜色重置
            this.currentNode.color = cc.Color.WHITE;
            this.rightNode.color = cc.Color.WHITE;
            // 将lable颜色重置
            //this.rightNode.getChildByName('Label').color = cc.Color.BLACK;
            //this.currentNode.getChildByName('Label').color = cc.Color.BLACK;

            this.btnAnswerNodeArray.forEach(node => {
                if (this.currentNode !== node) {
                    node.runAction(cc.scaleTo(1, 1));
                }
            })
            this.currentNode = null;
        }
    }

    getChildrenLabel(node: cc.Node): cc.Label {
        return node.getChildByName('Label').getComponent(cc.Label);
    }

}
