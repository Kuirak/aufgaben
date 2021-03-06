//The new, event-emitting Referee
var Monster = require("./Monster.js");

var EventEmitter = require("events").EventEmitter,
    util = require("util");

function random (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Referee() {
    this._fighters = null;
}

util.inherits(Referee, EventEmitter);

Referee.prototype.maxAttacks = 4;
Referee.prototype.rounds = 4;
Referee.prototype.maxAttackPoints = 20;
Referee.prototype.maxDefensePoints = 12;

Referee.prototype.greetMonsters = function (monster1, monster2) {

    this.emit("moderation","Welcome to the spectacular fight between " + monster1.name + " and " + monster2.name + "\n");

    this._fighters = {
        monster1 : monster1,
        monster2 : monster2
    };
};

Referee.prototype._isCheater = function(monster) {
    var currentAttack,
        attackName,
        usedAttacks = [],
        totalAttacksSum = 0,
        defenseSum = 0,
        attackSum = 0;

    for (attackName in monster.attacks) {
        if (monster.attacks.hasOwnProperty(attackName)) {
            totalAttacksSum++;
            currentAttack = monster.attacks[attackName];
            attackSum += currentAttack.attack;
            defenseSum += currentAttack.defense;
        }
    }

    if (monster.getHealth() !== Monster.prototype.getHealth()) {
        throw new Error("Found '" + monster.getHealth() + "'. Health has to be exactly " + Monster.prototype.getHealth());
    }

    if (totalAttacksSum > this.maxAttacks ) {
        throw new Error("Found '" +totalAttacksSum+ "' different attacks. '" + this.maxAttacks + "' different attacks are allowed.");
    }

    if (defenseSum > this.maxDefensePoints) {
        throw new Error("Found '" + defenseSum + "' defense-points. '" + this.maxDefensePoints + "' defense-points are allowed.");
    }

    if (attackSum > this.maxAttackPoints) {
        throw new Error("Found '" + attackSum + "' attack-points. '" + this.maxAttackPoints + "'  attacks-points are allowed.");
    }

    monster._attackOrder.forEach(function forEachAttack(attackName) {
        if (usedAttacks.indexOf(attackName) !== -1) {
            throw new Error("You can use attack '" + attackName + "' only once");
        }

        usedAttacks.push(attackName);
    });
};

Referee.prototype.checkForCheaters = function() {

    this._isCheater(this._fighters.monster1);
    this._isCheater(this._fighters.monster2);
};

Referee.prototype.startFight = function() {

    var self = this,
        cnt = 0,
        attacking = "monster" + random(1,2),
        defending = "";

    self._fighters.monster1.on("die", endFight);
    self._fighters.monster2.on("die", endFight);

    var roundInterval;

    function endFight() {
        //stop all further rounds
        clearInterval(roundInterval);

        //the currently attacking monster must be the winner
        self.emit("end", self._fighters[attacking].name + " has won the fight");
    }

    roundInterval = setInterval(fightRound, 1000);

    function fightRound() {

        // not very elegant, but obvious to everyone what's going on
        if (attacking === "monster1") {
            defending = "monster1";
            attacking = "monster2";
        }
        else {
            defending = "monster2";
            attacking = "monster1";
        }

        if (++cnt > self.rounds) {
            self.emit("end", "DRAW! Both monsters seem to be very strong.");
            clearInterval(roundInterval);
            return;
        }

        self.emit("round", cnt);

        self._fighters[attacking].attack(self._fighters[defending]);
    }
};

module.exports = Referee;
