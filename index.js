const readline = require('readline');

let text = '';
let cursorPos = 0;

function render(str, key) {
	if (key) {
		if (key.ctrl && key.name === 'c') {
			process.exit();
		}

		switch (key.name) {
			case 'return':
				text = text.slice(0, cursorPos) + '\n' + text.slice(cursorPos);
				cursorPos++;
				break;
			case 'backspace':
				text = text.slice(0, cursorPos - 1) + text.slice(cursorPos);
				cursorPos--;
				break;

			case 'left':
				if (cursorPos > 0) cursorPos--;
				break;
			case 'right':
				let line = (text.slice(0, cursorPos).split('\n').pop() || '') + (text.slice(cursorPos).split('\n').shift() || '');
				if (cursorPos < line.length) cursorPos++;
				break;

			case 'up': {
				let currLine = text.slice(0, cursorPos).split('\n').pop() || '';
				let prevLine = text.slice(0, cursorPos).split('\n');
				prevLine.pop();
				prevLine = prevLine.pop() || '';

				cursorPos -= currLine.length + 1;

				const prevLineDiff = prevLine.length - currLine.length
				if (prevLineDiff > 0) cursorPos -= prevLineDiff;
				else cursorPos--;
				break;
			}

			case 'down': {
				let currLine = text.slice(cursorPos).split('\n').shift() || '';
				let prevLine = text.slice(cursorPos).split('\n');
				prevLine.shift();
				prevLine = prevLine.shift() || '';

				cursorPos += currLine.length + 1;
				cursorPos += prevLine.length - currLine.length;
				break;
			}

			default:
				text = text.slice(0, cursorPos) + str + text.slice(cursorPos);
				cursorPos++;
		}

		// setTimeout(() => console.log(key.name), 1000)
		// setTimeout(() => console.log(cursorPos), 1000)
	}

	const {rows, columns} = process.stdout;
	const boxChars = {
		corners: {
			top: {
				left: '┌',
				right: '┐'
			},
			bottom: {
				left: '└',
				right: '┘'
			}
		},
		lines: {
			horizontal: '─',
			vertical: '│'
		}
	};

	const dashWidth = columns - 2;

	const topLine = boxChars.corners.top.left +
		boxChars.lines.horizontal.repeat(dashWidth) +
		boxChars.corners.top.right;

	const midLine = (index = 0) => {
		const textWithCursor = text.substring(0, cursorPos) + ('\u001b[43;1m\u001b[30m' + (text.charAt(cursorPos) || ' ') + '\u001b[0m') + text.substring(cursorPos + 1)

		/*/
		!logged && setTimeout(() => console.log(textWithCursor), 0);
		logged = true;
		/**/

		const lineNumber = (index + 1).toString().padEnd(3, ' ');
		const lineText = (textWithCursor.split('\n')[index] || '');

		const vert = boxChars.lines.vertical;

		return vert +
			lineNumber + vert +
			lineText + ' '.repeat(dashWidth - lineText.length - lineNumber.length - 1) +
			vert;
	}

	const bottomLine = boxChars.corners.bottom.left +
		boxChars.lines.horizontal.repeat(dashWidth) +
		boxChars.corners.bottom.right

	console.clear();
	console.log(topLine);
	for (let i = 0; i < rows - 2; i++) console.log(midLine(i))
	process.stdout.write(bottomLine);
}

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

render();
process.stdin.on('keypress', render);
process.stdout.on('resize', render);
