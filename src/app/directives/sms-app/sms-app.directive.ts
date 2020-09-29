/**
* @author devmahi <devmahi.me@gmail.com>
* @copyright Quantum Quotes 2020
* @version 01.01.01
* @license licenses.txt
*
* @date 2020-09-27 06:17:06
**/

import { Directive, HostListener, Input, ElementRef } from "@angular/core";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { InAppBrowserOptions } from "@ionic-native/in-app-browser/ngx";
import { Platform } from "@ionic/angular";

@Directive({
	selector: "[smsApp]"
})

export class SmsAppDirective {

	@Input() phoneNumber: string;
	@Input() shortMessage: string;

	constructor( 
		private elementRef: ElementRef,
		private inAppBrowser: InAppBrowser,
		private platform: Platform
	 ){


	}






	@HostListener("click", ["$event"]) onClick(e){
		this.runSmsApp(this.phoneNumber,this.shortMessage);
	}


	
	/**
	* runSmsApp($phone_number)
	* @param string $phone_number = "082233333734"
	**/
	
	public runSmsApp(phone_number: string, message : string){
		let phoneNumber = phone_number || "08123456789";
		let textMessage = encodeURI(message) || "";
		let urlSchema;
		if (this.platform.is("ios")){
			urlSchema = "sms:" + phoneNumber + ";?&body=" + textMessage;
		}else{
			urlSchema = "sms:" + phoneNumber + "?body=" + textMessage;
		}
		this.inAppBrowser.create(urlSchema,"_system");
	}
	


}
