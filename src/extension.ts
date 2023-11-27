// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { setFips } from 'crypto';
import * as vscode from 'vscode';


export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "docjumper" is now active!');

	let setDocument: vscode.TextDocument | undefined = undefined;
	// TODO: По умолчанию присвоить к "docs\README.md" в открытой папке

	let workDirPath: string | undefined = undefined;
	// TODO: Перенести присвоение дефолтных значений workDirPath и setDocument в отдельную функцию
	// TODO: Выполнять эту функцию при каждой смене workspace'a с помощью workspace.onDidChangeWorkspaceFolder

	if (vscode.workspace.workspaceFolders !== undefined) {

		workDirPath = vscode.workspace.workspaceFolders[0].uri.path;

		// Ищем "docs\README.md"
		// TODO: Сделать файл по умолчанию настраиваемым
		vscode.workspace.openTextDocument(workDirPath + "\\docs\\README.md").then(
			(readmeDoc) => {
				// Нашли
				setDocument = readmeDoc;
				vscode.window.showInformationMessage('JumpDoc set to "' + workDirPath?.split("/").at(-1) + '\\docs\\README.md' + '" by default.');
			},
			() => {
				// Не нашли
			}
		);
	}

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

	// Отобразить запомненный документ
	let disposable2 = vscode.commands.registerCommand('docjumper.showDocument', () => {

		if (setDocument === undefined) {
			vscode.window.showErrorMessage("No document is set!");
			return;
		}

		let tempDocument: vscode.TextDocument | undefined = vscode.window.activeTextEditor?.document;

		vscode.window.showTextDocument(setDocument, -1, true);

		if (tempDocument !== undefined) {
			setDocument = tempDocument;
		}
	});

	context.subscriptions.push(disposable1, disposable2);
}

// This method is called when your extension is deactivated
export function deactivate() { }
