/**
* @author devmahi <devmahi.me@gmail.com>
* @copyright Quantum Quotes 2020
* @version 01.01.01
* @license licenses.txt
*
* @date 2020-09-27 06:17:06
**/

import { Component , OnInit } from "@angular/core";
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from "@angular/router";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { environment } from "./../../../../src/environments/environment";
import { Storage } from "@ionic/storage";
import { Globals } from "../../class/globals/globals";
import { PopoverController } from "@ionic/angular";
import { PopoverComponent } from "../../components/popover/popover.component";



@Component({
	selector: "app-privacy-policy",
	templateUrl: "privacy-policy.page.html",
	styleUrls: ["privacy-policy.page.scss"],
})

export class PrivacyPolicyPage {
	
	pageName:string = `privacy-policy` ;
	
	/**
	* PrivacyPolicyPage:constructor()
	**/
	constructor(
		private router: Router,
		public statusBar: StatusBar,
		public popoverController: PopoverController,
		private storage: Storage,
		private globals: Globals
	){
	
		// statusbar
		this.statusBar.styleLightContent();
		this.statusBar.overlaysWebView(false);
		this.statusBar.backgroundColorByHexString("#263238");
	
	

		console.log(`PrivacyPolicyPage`,`pageName`,this.pageName);
	}
	
	/**
	* PrivacyPolicyPage:showPopover()
	**/
	async showPopover(ev: any) {
		const popover = await this.popoverController.create({
			component: PopoverComponent,
			event: ev,
			translucent: true
		});
		return await popover.present();
	}
	
	


	


	/**
	* PrivacyPolicyPage:ngOnInit()
	* @param string $url = 'http://ihsana.com/'
	**/
	public ngOnInit()
	{
	}  


}
