import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	vscode.window.showInformationMessage('I am alive!');
	context.subscriptions.push(
		vscode.commands.registerCommand('gearstick.helloWorld', () => {
			vscode.window.showInformationMessage('Hello World!');
		}),
		vscode.commands.registerCommand('gearstick.shiftArgumentsLeft', () => {
			const editor = vscode.window.activeTextEditor;
			if (!editor) {
				return;
			}
			let cursorPosition = editor.selection.start;
			let cursorLine = editor.document.lineAt(cursorPosition.line);
			let cursorLineText = cursorLine.text;

			// get what's between the opening and closing parentheses
			let args = cursorLineText.substring(cursorLineText.indexOf('(') + 1, cursorLineText.indexOf(')'));

			// split the arguments into an array
			let argsArray = args.split(',');
			if (argsArray.length < 2) {
				vscode.window.showInformationMessage('There are no arguments to shift');
				return;
			}

			// get current argument
			let currentArg = argsArray.find((arg) => {
				let argStart = cursorLineText.indexOf(arg);
				let argEnd = argStart + arg.length;
				return cursorPosition.character >= argStart && cursorPosition.character <= argEnd;
			});


			if (!currentArg) {
				vscode.window.showInformationMessage('No argument found');
				return;
			}

			// shift the current argument to the left
			let currentArgIndex = argsArray.indexOf(currentArg);
			let shiftedArgIndex = currentArgIndex - 1;

			// currentArg = currentArg.trim();
			// if the current argument is the first argument, shift it to the end
			if (currentArgIndex === 0) {
				shiftedArgIndex = argsArray.length - 1;
				argsArray[shiftedArgIndex] = argsArray[shiftedArgIndex].trim();
			}

			// swap the current argument with the shifted argument
			let shiftedArg = argsArray[shiftedArgIndex];
			argsArray[shiftedArgIndex] = currentArg;
			argsArray[currentArgIndex] = shiftedArg;

			// trim the arguments
			argsArray = argsArray.map((arg) => {
				return arg.trim();
			});

			// join the arguments back into a string
			let newArgs = argsArray.join(', ');
			let newLineText = cursorLineText.replace(args, newArgs);

			// replace the line with the new line text
			editor.edit((editBuilder) => {
				editBuilder.replace(cursorLine.range, newLineText);
			});

			// move the cursor to the end of the shifted argument
			let shiftedArgStart = cursorLineText.indexOf(shiftedArg);
			let shiftedArgEnd = shiftedArgStart + shiftedArg.length;
			let shiftedArgRange = new vscode.Range(cursorPosition.line, shiftedArgStart, cursorPosition.line, shiftedArgEnd);
			editor.selection = new vscode.Selection(shiftedArgRange.end, shiftedArgRange.end);
		}),
		vscode.commands.registerCommand('gearstick.shiftArgumentsRight', () => {
			const editor = vscode.window.activeTextEditor;
			if (!editor) {
				return;
			}
			let cursorPosition = editor.selection.start;
			let cursorLine = editor.document.lineAt(cursorPosition.line);
			let cursorLineText = cursorLine.text;

			// get what's between the opening and closing parentheses
			let args = cursorLineText.substring(cursorLineText.indexOf('(') + 1, cursorLineText.indexOf(')'));

			// split the arguments into an array
			let argsArray = args.split(', ');
			if (argsArray.length < 2) {
				vscode.window.showInformationMessage('There are no arguments to shift');
				return;
			}

			// get current argument
			let currentArg = argsArray.find((arg) => {
				let argStart = cursorLineText.indexOf(arg);
				let argEnd = argStart + arg.length;
				return cursorPosition.character >= argStart && cursorPosition.character <= argEnd;
			});

			if (!currentArg) {
				vscode.window.showInformationMessage('No argument found');
				return;
			}

			// shift the current argument to the right
			let currentArgIndex = argsArray.indexOf(currentArg);
			let shiftedArgIndex = currentArgIndex + 1;

			// if the current argument is the last argument, shift it to the beginning
			if (currentArgIndex === argsArray.length - 1) {
				shiftedArgIndex = 0;
				argsArray[shiftedArgIndex] = argsArray[shiftedArgIndex].trim();
			}

			// swap the current argument with the shifted argument
			let shiftedArg = argsArray[shiftedArgIndex];
			argsArray[shiftedArgIndex] = currentArg;
			argsArray[currentArgIndex] = shiftedArg;

			// trim the arguments
			argsArray = argsArray.map((arg) => {
				return arg.trim();
			});

			// join the arguments back into a string
			let newArgs = argsArray.join(', ');
			let newLineText = cursorLineText.replace(args, newArgs);

			// replace the line with the new line text
			editor.edit((editBuilder) => {
				editBuilder.replace(cursorLine.range, newLineText);
			});

			// move the cursor to the end of the shifted argument
			let shiftedArgStart = cursorLineText.indexOf(shiftedArg);
			let shiftedArgEnd = shiftedArgStart + shiftedArg.length;
			let shiftedArgRange = new vscode.Range(cursorPosition.line, shiftedArgStart, cursorPosition.line, shiftedArgEnd);
			editor.selection = new vscode.Selection(shiftedArgRange.end, shiftedArgRange.end);
		}),
	);
}
