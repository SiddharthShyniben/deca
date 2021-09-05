const boxChars = require('./box-chars');

module.exports.topLine = dashWidth => boxChars.corners.top.left +
	boxChars.lines.horizontal.repeat(dashWidth) +
	boxChars.corners.top.right;

module.exports.bottomLine = dashWidth => boxChars.corners.bottom.left +
	boxChars.lines.horizontal.repeat(dashWidth) +
	boxChars.corners.bottom.right;

module.exports.midLine = (index = 0) => {
	const textWithCursor = text.substring(0, cursorPos) + ('\u001b[43;1m\u001b[30m' + (text.charAt(cursorPos) || ' ') + '\u001b[0m') + text.substring(cursorPos + 1)

	const lineNumber = (index + 1).toString().padEnd(3, ' ');
	const lineText = (textWithCursor.split('\n')[index] || '');

	const vert = boxChars.lines.vertical;

	return vert +
		lineNumber + vert +
		lineText + ' '.repeat(dashWidth - lineText.length - lineNumber.length - 1) +
		vert;
};


