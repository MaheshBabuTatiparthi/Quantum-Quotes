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
import { AppVersion } from "@ionic-native/app-version/ngx";
import { Platform } from "@ionic/angular";
import { PopoverController } from "@ionic/angular";
import { PopoverComponent } from "../../components/popover/popover.component";



@Component({
	selector: "app-about-us",
	templateUrl: "about-us.page.html",
	styleUrls: ["about-us.page.scss"],
})

export class AboutUsPage {
	
	pageName:string = `about-us` ;
	
	/**
	* AboutUsPage:constructor()
	**/
	constructor(
		private router: Router,
		public statusBar: StatusBar,
		public appVersion: AppVersion,
		public platform: Platform,
		public popoverController: PopoverController,
		private storage: Storage,
		private globals: Globals
	){
	
		// statusbar
		this.statusBar.styleLightContent();
		this.statusBar.overlaysWebView(false);
		this.statusBar.backgroundColorByHexString("#263238");
	
	
	this.getAppVersion();
		console.log(`AboutUsPage`,`pageName`,this.pageName);
	}
	
	/**
	* AboutUsPage:showPopover()
	**/
	async showPopover(ev: any) {
		const popover = await this.popoverController.create({
			component: PopoverComponent,
			event: ev,
			translucent: true
		});
		return await popover.present();
	}
	
	


		
	
	AppName: string = "?";
	PackageName: string = "?";
	VersionCode: string = "?";
	VersionNumber:string = "?";
	
	
	/**
	* getAppVersion()
	**/
	getAppVersion(){
		if (this.platform.is("cordova")){
	
			this.appVersion.getAppName().then(appName=>{
				this.AppName = appName;
			});
	
			this.appVersion.getPackageName().then(packageName=>{
				this.PackageName = packageName;
			});
	
			this.appVersion.getVersionCode().then(versionCode=>{
				this.VersionCode = versionCode.toString();
			});
	
			this.appVersion.getVersionNumber().then(versionNumber=>{
				this.VersionNumber = versionNumber.toString();
			});
	
		}
	}



	/**
	* AboutUsPage:ngOnInit()
	* @param string $url = 'http://ihsana.com/'
	**/
	public ngOnInit()
	{
	}  


}
