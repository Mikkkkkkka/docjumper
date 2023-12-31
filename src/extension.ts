// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';


export function activate(context: vscode.ExtensionContext) {

	console.log('DocJumper is active!');

	let setDocument: vscode.TextDocument | undefined = undefined;

	let workDirPath: string | undefined = undefined;

	// TODO: Выполнять эту функцию при каждой смене workspace'a с помощью workspace.onDidChangeWorkspaceFolder
	function trySetDefaultSetDocument(): void {

		if (vscode.workspace.workspaceFolders === undefined) { return; }

		workDirPath = vscode.workspace.workspaceFolders[0].uri.path;

		// Ищем "defaultSetDocument"
		vscode.workspace.openTextDocument(workDirPath + vscode.workspace.getConfiguration('docjumper')["defaultSetDocument"]).then(
			(defaultDoc) => {
				// Нашли
				setDocument = defaultDoc;
				vscode.window.showInformationMessage('DocJumper is set to "' + vscode.workspace.getConfiguration('docjumper')["defaultSetDocument"] + '" by default.');
			}
		);

		if (setDocument !== undefined) {
			return;
		}

		// Ищем по названию в корне
		vscode.workspace.openTextDocument(workDirPath + "\\" + vscode.workspace.getConfiguration('docjumper')["defaultSetDocument"].split("\\").at(-1)).then(
			(defaultDoc) => {
				// Нашли
				setDocument = defaultDoc;
				vscode.window.showInformationMessage('DocJumper is set to "' + defaultDoc.fileName.split("\\").at(-1) + '" due to name similarity.');
			},
			() => {
				vscode.window.showInformationMessage("Cannot set DocJumper by default");
			}
		);
	}

	trySetDefaultSetDocument();

	// Запомнить выбранный документ
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
		trySetDefaultSetDocument();
	});

	// Отобразить запомненный документ
	let disposable3 = vscode.commands.registerCommand('docjumper.showDocument', () => {

		if (setDocument === undefined) {
			vscode.window.showErrorMessage("No document is set!");
			return;
		}

		let tempDocument: vscode.TextDocument | undefined = undefined;

		if (vscode.workspace.getConfiguration('docjumper')["changeSetDocumentOnShowDocumentCommand"]) {
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
