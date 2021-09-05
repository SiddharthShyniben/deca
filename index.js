const readline = require('readline');
const keyHandler = require('./key-handler');
const {topLine, bottomLine, midLine} = require('./box');

let text = '';
let cursorPos = 0;

function render(str, key) {
	({text, cursorPos} = keyHandler(text, cursorPos, str, key));

	const {rows, columns} = process.stdout;
	const dashWidth = columns - 2;

	console.clear();
	console.log(topLine(dashWidth));
	for (let i = 0; i < rows - 2; i++) console.log(midLine(i))
	process.stdout.write(bottomLine(dashWidth));
}

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

render();
process.stdin.on('keypress', render);
process.stdout.on('resize', render);
