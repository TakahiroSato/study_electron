'use strict'

const fs = require('fs');
const {BrowserWindow, dialog} = require('electron').remote;

let inputArea = null;
let inputTxt = null;
let footerArea = null;

let currentPath = "";
let editor = null;

function onLoad(){
	inputArea = document.getElementById("input_area");
	inputTxt = document.getElementById("input_txt");
	footerArea = document.getElementById("footer_fixed");

	editor = ace.edit("input_txt");
	editor.getSession().setMode("ace/mode/javascript");
	editor.setTheme("ace/theme/twilight");	

	document.ondragover = document.ondrop = function(e){
		e.preventDefault(); // イベントの伝搬を止めて、アプリケーションのHTMLとファイルがさしかわらないようにする
		return false;
	};

	inputArea.ondragover = function(){
		return false;
	};
	inputArea.ondragleave = inputArea.ondragend = function(){
		return false;
	};
	inputArea.ondrop = function(e){
		e.preventDefault();
		var file = e.dataTransfer.files[0];
		readFile(file.path);
		return false;
	};
};

function openLoadFIle(){
	const win = BrowserWindow.getForusedWindow();

	dialog.showOpenDialog(
		win,
		{
			properties: ['openFile'],
			filters: [
				{
					name: 'Documents',
					extensions: ['txt', 'text', 'html', 'js']
				}
			]
		},
		function (filenames){
			if(filenames){
				readFile(filenames[0]);
			}
		});
}

function readFile(path){
	currentPath = path;
}