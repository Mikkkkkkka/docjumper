// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';


export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "docjumper" is now active!');

	let configParameters = {
		defaultDocument: "\\docs\\README.md",
		changeSetDocumentOnShowDocumentCommand: true
	};
	// TODO: Сделать эти параметры настраиваемыми


	let setDocument: vscode.TextDocument | undefined = undefined;

	let workDirPath: string | undefined = undefined;

	// TODO: Выполнять эту функцию при каждой смене workspace'a с помощью workspace.onDidChangeWorkspaceFolder
	function trySetDefaultDocument(): void {

		if (vscode.workspace.workspaceFolders === undefined) {
			return;
		}

		workDirPath = vscode.workspace.workspaceFolders[0].uri.path;

		// Ищем "defaultDocument"
		vscode.workspace.openTextDocument(workDirPath + configParameters.defaultDocument).then(
			(readmeDoc) => {
				// Нашли
				setDocument = readmeDoc;
				vscode.window.showInformationMessage('JumpDoc set to "' + configParameters.defaultDocument + '" by default.');
			}
		);

		if (setDocument === undefined) {
			vscode.window.showInformationMessage("Cannot find default document");
		}
	}

	trySetDefaultDocument();

	// Запомнить выбранный документ
	// TODO: Добавить горячие клавиши для этих команд
	let disposable1 = vscode.commands.registerCommand('docjumper.setDocument', () => {

		let openTextEditor: vscode.TextEditor | undefined = vscode.window.activeTextEditor;

		if (openTextEditor === undefined) {
			vscode.window.showErrorMessage("You did not open a text editor!");
			return;
		}

		if (vscode.workspace.workspaceFolders !== undefined) {
			workDirPath = vscode.workspace.workspaceFolders[0].uri.path;
		}

		setDocument = openTextEditor.document;

		vscode.window.showInformationMessage(setDocument.fileName.split("\\").at(-1) + " is set!");

	});

	let disposable2 = vscode.commands.registerCommand('docjumper.resetDocument', () => {

		trySetDefaultDocument();
	});

	// Отобразить запомненный документ
	let disposable3 = vscode.commands.registerCommand('docjumper.showDocument', () => {

		if (setDocument === undefined) {
			vscode.window.showErrorMessage("No document is set!");
			return;
		}

		let tempDocument: vscode.TextDocument | undefined = undefined;

		if (configParameters.changeSetDocumentOnShowDocumentCommand) {
			tempDocument = vscode.window.activeTextEditor?.document;
		}

		vscode.window.showTextDocument(setDocument, -1, true);

		if (tempDocument !== undefined) {
			setDocument = tempDocument;
		}
	});

	context.subscriptions.push(disposable1, disposable2, disposable3);
}

// This method is called when your extension is deactivated
export function deactivate() { }
