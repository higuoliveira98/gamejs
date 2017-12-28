'use strict';

// CRIA O CANVAS
var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// Imagem de fundo
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = 'images/background.png';

// Imagem do heroi
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = 'images/hero.png';

// Imagem do monstro
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = 'images/monster.png';

//Objetos jogo
var hero = {
	speed: 256 //movimento em pxls por segundo
};
var monster = {};
var monstersCaught = 0;

//Controle do teclado
var keysDown = {};

window.addEventListener('keydown', function (e) {
	keysDown[e.keyCode] = true;
}, false);

window.addEventListener('keyup', function (e) {
	delete keysDown[e.keyCode];
}, false);

//Reseta o jogo quando o jogador pegar o monstro
var reset = function reset() {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;
	//posiciona o monstro randomicamente na tela
	monster.x = 32 + Math.random() * (canvas.width - 64);
	monster.y = 32 + Math.random() * (canvas.height - 64);
};

// Atualiza os objetos do jogo
var update = function update(modifier) {
	if (38 in keysDown) {
		// Pressionando a seta cima
		hero.y -= hero.speed * modifier;
	}
	if (40 in keysDown) {
		// Pressionando a seta baixo
		hero.y += hero.speed * modifier;
	}
	if (37 in keysDown) {
		// Pressionando a seta esquerda
		hero.x -= hero.speed * modifier;
	}
	if (39 in keysDown) {
		// Pressionando a seta direita
		hero.x += hero.speed * modifier;
	}

	//Os personagens se encostaram ?
	if (hero.x <= monster.x + 32 && monster.x <= hero.x + 32 && hero.y <= monster.y + 32 && monster.y <= hero.y + 32) {
		++monstersCaught;
		reset();
	}
};

// Renderiza tudo

var render = function render() {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}
	//Pontuação
	ctx.fillStyle = 'rgb(250, 250, 250)';
	ctx.font = '24px Helvetica';
	ctx.textAlign = 'left';
	ctx.baseLine = 'top';
	ctx.fillText('Pokemons pegos: ' + monstersCaught, 32, 32);
};

// Controla o looping do jogo

var main = function main() {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();
	then = now;

	requestAnimationFrame(main);
};
// Suporte cross-browser para requestAnimationFrame
var w = window;
var requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
//Que comece o jogo
var then = Date.now();
reset();
main();
