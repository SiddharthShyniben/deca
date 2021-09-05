module.exports = (text, cursorPos, str, key) => {
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
				let nextLine = text.slice(cursorPos).split('\n');
				nextLine.shift();
				nextLine = prevLine.shift() || '';

				cursorPos += currLine.length + 1;
				cursorPos += nextLine.length - currLine.length;
				break;
			}

			default:
				text = text.slice(0, cursorPos) + str + text.slice(cursorPos);
				cursorPos++;
		}
	}
	return {text, cursorPos};
}
