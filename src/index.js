
import Game from './Game.js';
import TaskQueue from './TaskQueue.js';
import SpeedRate from './SpeedRate.js';
import Card from "./Card.js";

class Creature extends Card {

    getDescriptions() {
        let firstString;
        if (isDuck(this) && isDog(this)) {
            firstString = 'Утка-Собака';
        } else if (isDuck(this)) {
            firstString = 'Утка';
        } else if (isDog(this)) {
            firstString = 'Собака';
        } else {
            firstString = 'Существо';
        }

        let cardDescription = super.getDescriptions();

        return [firstString, ...cardDescription];
    }
}

// Отвечает является ли карта уткой.
function isDuck(card) {
    return card instanceof Duck;
}

// Отвечает является ли карта собакой.
function isDog(card) {
    return card instanceof Dog;
}


// Основа для утки.
class Duck extends Creature {
    constructor(name = 'Мирная утка', maxPower = 2) {
        super(name, maxPower);
    }

    quacks() {
        console.log('quack');
    }

    swims() {
        console.log('float: both;');
    }
}

// Основа для собаки.
class Dog extends Creature {
    constructor(name = 'Пес-бандит', maxPower = 3) {
        super(name, maxPower);
    }
}

class Trasher extends Dog {
    constructor(name = 'Громила', maxPower = 5) {
        super(name, maxPower);
    }

    modifyTakenDamage(value, fromCard, gameContext, continuation) {
        this.view.signalAbility(() => {
            continuation(value - 1);
        });
    }

    getDescriptions() {
        return ['принимает на 1 меньше урона', ...super.getDescriptions()];
    }
}

// Колода Шерифа, нижнего игрока.
const seriffStartDeck = [
    new Duck(),
    new Duck(),
    new Duck(),
    new Duck(),
];
const banditStartDeck = [
    new Trasher(),
];

// Создание игры.
const game = new Game(seriffStartDeck, banditStartDeck);

// Глобальный объект, позволяющий управлять скоростью всех анимаций.
SpeedRate.set(1);

// Запуск игры.
game.play(false, (winner) => {
    alert('Победил ' + winner.name);
});