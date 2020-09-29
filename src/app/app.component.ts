/**
* @author devmahi <devmahi.me@gmail.com>
* @copyright Quantum Quotes 2020
* @version 01.01.01
* @license licenses.txt
*
* @date 2020-09-27 06:17:06
**/

import { Component } from "@angular/core";
import { MenuController } from "@ionic/angular";
import { AppSideMenus } from "./app.side-menus";

import { Platform, NavController } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { InAppBrowser,InAppBrowserOptions } from "@ionic-native/in-app-browser/ngx";
import { ActivatedRoute, Router, Event, NavigationStart, NavigationEnd, NavigationError } from "@angular/router";
import { Device } from "@ionic-native/device/ngx";
import { Globals } from "./class/globals/globals";
import { environment } from "./../../src/environments/environment";
import { AdMobFree } from "@ionic-native/admob-free/ngx";
import { AdMobFreeBannerConfig } from "@ionic-native/admob-free/ngx";
import { AdMobFreeInterstitialConfig } from "@ionic-native/admob-free/ngx";
import { AdMobFreeRewardVideoConfig } from "@ionic-native/admob-free/ngx";
import { OneSignal } from "@ionic-native/onesignal/ngx";

/**
* Admob Option
**/
const bannerConfig: AdMobFreeBannerConfig = {
	//id: "ca-app-pub-6361855049583960/3564530534",
	isTesting: true,
	autoShow: true
}

const interstitialConfig: AdMobFreeInterstitialConfig = {
	//id: "ca-app-pub-6361855049583960/6517996934",
	isTesting: true,
	autoShow: true
}

const rewardVideoConfig: AdMobFreeRewardVideoConfig = {
	//id: "",
	isTesting: true,
	autoShow: false
}

/**
* OneSignal Setting
**/
const oneSignalAppId = "7b06562d-1481-4c0e-8925-becfdc055862"; 
const firebaseSenderID = "1009641681785"; 



@Component({
	selector: "app-root",
	templateUrl: "app.component.html"
})
export class AppComponent {

	appTitle:string = "Quantum Quotes";
	appSubTitle:string = "A Ionic Quotes App for Android";
	appMenus:any = [] ;



	/**
	* QuantumQuotes:constructor()
	**/

	constructor(
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private menuController: MenuController,
		private platform: Platform,
		private storage: Storage,
		private statusBar: StatusBar,
		private navController: NavController,
		private splashScreen: SplashScreen,
		private device: Device,
		private appSideMenus: AppSideMenus,
		private globals: Globals,
		private adMobFree: AdMobFree,
		private oneSignal: OneSignal){
			//initialization items for static menu
			this.appMenus = this.appSideMenus.items;
			//initialization app
			this.initializeApp();
	}
	

	/**
	* QuantumQuotes:initializeApp()
	**/

	initializeApp() {
		this.platform.ready().then(() => {

			// set status bar
			this.statusBar.backgroundColorByHexString("#263238");

			// hide splashscreen
			this.splashScreen.hide();


		});


		// This code is used for Admob Free
		this.handlerAdmobFree();

		// This code is used for One Signal
		this.handlerNotifications();

		this.handlerBackButton();
		
	}


	/**
	* QuantumQuotes:handlerBackButton();
	**/
	private handlerBackButton(){
		let pageName = `home`;
		this.router.events.subscribe((event: Event) =>{
			if(event instanceof NavigationStart){
				let getPage = event.url.toString().split("/");
				pageName = getPage[1];
				console.log(`pageName`,pageName);
			}
		});
		this.platform.backButton.subscribeWithPriority(666666,()=>{
			if(( pageName == "" ) || ( pageName == `home` )){
				console.log(`Hardware Exit`);
				if(window.confirm("Do you want to exit App?")){
					navigator["app"].exitApp(); 
				}
			}else{
				console.log(`Hardware Back`);
				this.navController.back();
			}
		})
	}


	/**
	* QuantumQuotes:showBanner()
	**/
	private handlerAdmobFree(){
		this.showBanner();
		this.showInterstitial();
		//this.showRewardVideo();
	}

	/**
	* QuantumQuotes:showBanner()
	**/
	private showBanner(){
		this.platform.ready().then(() =>{
			if (this.platform.is("cordova")){
				this.adMobFree.banner.config(bannerConfig);
				this.adMobFree.banner.prepare().then(() => {
				}).catch(e => alert(e));
				this.router.events.subscribe((event: Event) =>{
					if(event instanceof NavigationStart){
						let getPage = event.url.toString().split("/");
						let pageName = getPage[1];
						console.log("banner",pageName);
						
						// show banner only for certain page
						if((pageName == "about-us") || 
							(pageName == "banners") || 
							(pageName == "categories") || 
							(pageName == "home") || 
							(pageName == "privacy-policy") || 
							(pageName == "quotes-bookmarks") || 
							(pageName == "quotes-detail") || 
							(pageName == "quotes")){
							this.adMobFree.banner.show();
						}else{
							this.adMobFree.banner.hide();
						}
					}
				});
			}
		});
	}

	/**
	* QuantumQuotes:showInterstitial()
	**/
	private showInterstitial(){
		this.platform.ready().then(() =>{
			if (this.platform.is("cordova")){
				this.adMobFree.interstitial.config(interstitialConfig);
				this.adMobFree.interstitial.prepare().then(() => {
				}).catch(e => alert(e));
				this.router.events.subscribe((event: Event) =>{
					if(event instanceof NavigationStart){
						let getPage = event.url.toString().split("/");
						let pageName = getPage[1];
						console.log(pageName);
						
						// show interstitial only for certain page
						if((pageName == "categories") || 
								(pageName == "quotes-detail")){
							this.adMobFree.interstitial.show();
						}
					}
				});
			}
		});
	}


	/**
	* QuantumQuotes:showRewardVideo()
	**/
	private showRewardVideo(){
		this.platform.ready().then(() =>{
			if (this.platform.is("cordova")){
				this.adMobFree.rewardVideo.config(rewardVideoConfig);
				this.adMobFree.rewardVideo.prepare().then(() => {
				}).catch(e => alert(e));
			}
		});
	}


	/**
	* QuantumQuotes:handlerNotifications()
	**/
	public handlerNotifications(){
		this.platform.ready().then(() =>{
			if (this.platform.is("cordova")){
				if (this.platform.is("android")){
					this.oneSignal.startInit(oneSignalAppId,firebaseSenderID);
				}else{
					this.oneSignal.startInit(oneSignalAppId);
				}
				this.oneSignal.endInit();
			}
		});
	}


}
