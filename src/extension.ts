// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { setFips } from 'crypto';
import * as vscode from 'vscode';


export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "docjumper" is now active!');

	let setDocument: vscode.TextDocument | undefined;
	// TODO: По умолчанию присвоить к "README" в открытой папке

	let workingDirectories: any;

	let workDirPath: string | undefined = undefined;

	// Запомнить выбранный документ
	// TODO: Добавить горячие клавиши для этих команд
	let disposable = vscode.commands.registerCommand('docjumper.setDocument', () => {

		let openTextEditor: vscode.TextEditor | undefined = vscode.window.activeTextEditor;

		if (openTextEditor === undefined) {
			vscode.window.showErrorMessage("You did not open a text editor!");
			return;
		}

		if (workingDirectories === undefined) {
			workingDirectories = vscode.workspace.workspaceFolders;
			if (workingDirectories !== undefined) {
				workDirPath = workingDirectories[0].uri.path;
			}
		}

		setDocument = openTextEditor.document;

		vscode.window.showInformationMessage(setDocument.fileName.slice(workDirPath?.length) + " is set!");

	});

	// Отобразить запомненный документ
	let disposable1 = vscode.commands.registerCommand('docjumper.showDocument', () => {

		if (setDocument === undefined) {
			vscode.window.showErrorMessage("No document is remembered!");
			return;
		}

		let tempDocument: vscode.TextDocument | undefined = vscode.window.activeTextEditor?.document;

		vscode.window.showTextDocument(setDocument, -1, true);

		if (tempDocument !== undefined) {
			setDocument = tempDocument;
		}
	});

	context.subscriptions.push(disposable, disposable1);
}

// This method is called when your extension is deactivated
export function deactivate() { }
