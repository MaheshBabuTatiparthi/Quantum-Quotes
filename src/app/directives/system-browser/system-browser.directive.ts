/**
* @author devmahi <devmahi.me@gmail.com>
* @copyright Quantum Quotes 2020
* @version 01.01.01
* @license licenses.txt
*
* @date 2020-09-27 06:17:07
**/

import { Directive, HostListener, Input, ElementRef } from "@angular/core";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { InAppBrowserOptions } from "@ionic-native/in-app-browser/ngx";

@Directive({
	selector: "[systemBrowser]"
})

export class SystemBrowserDirective {

	@Input() url: string;

	constructor( 
		private elementRef: ElementRef,
		private inAppBrowser: InAppBrowser
	 ){


	}






	@HostListener("click", ["$event"]) onClick(e){
		this.runSystemBrowser(this.url);
	}


	
	/**
	* runSystemBrowser($url)
	* @param string $url = "http://ihsana.com"
	**/
	
	private runSystemBrowser(url: string){
		let urlAddr = url || "http://ihsana.com";
		this.inAppBrowser.create(urlAddr,"_system");
	}
	


}
