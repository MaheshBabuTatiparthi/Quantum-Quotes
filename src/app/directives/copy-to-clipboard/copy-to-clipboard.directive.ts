/**
* @author devmahi <devmahi.me@gmail.com>
* @copyright Quantum Quotes 2020
* @version 01.01.01
* @license licenses.txt
*
* @date 2020-09-27 06:17:06
**/

import { Directive, HostListener, Input, ElementRef } from "@angular/core";
import { Clipboard } from "@ionic-native/clipboard/ngx";
import { Platform } from "@ionic/angular";
import { AlertController } from "@ionic/angular";

@Directive({
	selector: "[copyToClipboard]"
})

export class CopyToClipboardDirective {

	@Input() text: string;

	constructor( 
		private elementRef: ElementRef,
		private clipboard: Clipboard,
		private platform: Platform,
		private alertController: AlertController
	 ){


	}






	@HostListener("click", ["$event"]) onClick(e){
			
		if (this.platform.is("cordova")){
			this.runClipboard(this.text);
			//this.showAlert("Copy Text To Clipboard","Successfully","You have successfully copied the text to the clipboard");
			this.showAlert("Quote Copied","","");
		}else{
			this.showAlert("Copy Text To Clipboard","Error","Only support on real Device!");
		}

	}


	
	/**
	* runClipboard($text)
	* @param string $text = "lorem ipsum"
	**/
	
	private runClipboard(text:string){
		this.clipboard.copy(text);
	}
	
	
	/**
	* showAlert($header)
	* @param string $header = "header"
	* @param string $subHeader = "sub header"
	* @param string $message = "your message"
	**/
	
	async showAlert(header:string,subHeader:string,message:string){
		const alert = await this.alertController.create({
			keyboardClose: false,
			backdropDismiss: false,
			header: header,
			subHeader: subHeader,
			message: message,
			buttons: ["OK"]
		});
		await alert.present();
	}
	


}
