
const vscode = require('vscode');
const _ = require('lodash');

exports.activate = context => {
	context.subscriptions.push(vscode.commands.registerCommand('bas-uploader.upload', async () => {
		const wFolders = vscode.workspace.workspaceFolders;
		let extensionPath;

		if (_.isEmpty(wFolders)) {
			return vscode.window.showErrorMessage("Upload VSIX: no extension projects are found");
		}

		if (_.size(wFolders) > 1) {
			extensionPath = await vscode.window.showQuickPick(_.map(wFolders, wFolder => {
				return wFolder.uri.fsPath;
			}));
		} else {
			extensionPath = _.get(wFolders, "[0].uri.fsPath");
		}

		await vscode.commands.executeCommand("loadYeomanUI", {
			generator: "bas-up:app",
			data: { extensionPath },
			messages: {
				panel_title: "Upload VSIX",
				yeoman_ui_title: "Upload VSIX to BAS",
				show_progress_message: "Uploading..."
			}
		});
	}));
}
