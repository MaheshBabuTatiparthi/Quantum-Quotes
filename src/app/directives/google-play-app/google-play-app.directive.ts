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

@Directive({
	selector: "[googlePlayApp]"
})

export class GooglePlayAppDirective {

	@Input() appId: string;

	constructor( 
		private elementRef: ElementRef,
		private inAppBrowser: InAppBrowser
	 ){


	}






	@HostListener("click", ["$event"]) onClick(e){
		this.runGooglePlayApp(this.appId);
	}


	
	/**
	* runGooglePlayApp($appId)
	* @param string $appId = "com.imabuilder.myapp"
	**/
	
	private runGooglePlayApp(app_id: string){
		let myAppID = app_id || "com.imabuilder.godigitally.quantumquotes";
		if(myAppID == ""){
			myAppID = "com.imabuilder.godigitally.quantumquotes";
		}
		let urlSchema = "market://details?id=" + myAppID;
		this.inAppBrowser.create(urlSchema,"_system");
	}
	


}
