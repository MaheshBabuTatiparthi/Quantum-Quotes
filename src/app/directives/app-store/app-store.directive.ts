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
	selector: "[appStore]"
})

export class AppStoreDirective {

	@Input() appURL: string;

	constructor( 
		private elementRef: ElementRef,
		private inAppBrowser: InAppBrowser
	 ){


	}






	@HostListener("click", ["$event"]) onClick(e){
		this.runAppStore(this.appURL);
	}


	
	/**
	* runAppStore(appURL)
	* @param string appURL = "https://apps.apple.com/us/app/xxxx/id123456"
	**/
	
	private runAppStore(appURL: string){
		this.inAppBrowser.create(appURL,"_system");
	}
	


}
