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
import { Observable } from "rxjs";
import { QuotesStorageService } from "./../../services/quotes-storage/quotes-storage.service";
import { ToastController } from "@ionic/angular";
import { LoadingController } from "@ionic/angular";
import { PopoverController } from "@ionic/angular";
import { PopoverComponent } from "../../components/popover/popover.component";



@Component({
	selector: "app-quotes-bookmarks",
	templateUrl: "quotes-bookmarks.page.html",
	styleUrls: ["quotes-bookmarks.page.scss"],
})

export class QuotesBookmarksPage {
	
	pageName:string = `quotes-bookmarks` ;
	
	/**
	* QuotesBookmarksPage:constructor()
	**/
	constructor(
		private router: Router,
		public statusBar: StatusBar,
		public quotesStorageService: QuotesStorageService,
		public toastController: ToastController,
		public loadingController: LoadingController,
		public popoverController: PopoverController,
		private storage: Storage,
		private globals: Globals
	){
	
		// statusbar
		this.statusBar.styleLightContent();
		this.statusBar.overlaysWebView(false);
		this.statusBar.backgroundColorByHexString("#37474f");
	
	

		console.log(`QuotesBookmarksPage`,`pageName`,this.pageName);
	}
	
	/**
	* QuotesBookmarksPage:showPopover()
	**/
	async showPopover(ev: any) {
		const popover = await this.popoverController.create({
			component: PopoverComponent,
			event: ev,
			translucent: true
		});
		return await popover.present();
	}
	
	


		
	dataBookmarks : any = [];
	loading:any;
	
	/**
	* QuotesBookmarksPage.ngOnInit()
	**/
	public ngOnInit(){
		this.presentLoading();
		this.quotesStorageService.getItems(`quotes-bookmark`).then((items)=>{
			this.dataBookmarks = items;
			this.dismissLoading();
		});
	}
	
	
	/**
	* QuotesBookmarksPage.presentLoading()
	**/
	async presentLoading() {
		this.loading = await this.loadingController.create({
			message: "Please wait...!",
			spinner: "crescent",
			duration: 2000
		});
		await this.loading.present();
	}
	
	
	/**
	* QuotesBookmarksPage.dismissLoading()
	**/
	async dismissLoading() {
		if(this.loading){
			await this.loading.dismiss();
		}
	}
	
	
	/**
	* QuotesBookmarksPage.removeWishlist()
	**/
	public removeBookmark(id:string){
		this.quotesStorageService.removeItem(`quotes-bookmark`,id).then((items)=>{
			this.presentLoading();
		});
		setTimeout(() => {
			this.quotesStorageService.getItems(`quotes-bookmark`).then((items)=>{
				this.dataBookmarks = items;
				this.dismissLoading();
			});
		}, 1000);
	}
	
	
	/**
	* QuotesBookmarksPage.clearWishlist()
	**/
	public clearBookmarks(){
		this.quotesStorageService.clearItems(`quotes-bookmark`).then((items)=>{
			this.presentLoading();
		});
		setTimeout(() => {
			this.quotesStorageService.getItems(`quotes-bookmark`).then((items)=>{
				this.dataBookmarks = items;
				this.dismissLoading();
			});
		}, 1000);
	}
	
	
	
	
	/**
	* QuotesBookmarksPage.doRefresh()
	**/
	public doRefresh(refresher){
		this.quotesStorageService.getItems(`quotes-bookmark`).then((items)=>{
			this.dataBookmarks = items;
		});
		setTimeout(() => {
			refresher.target.complete();
		}, 2000);
	}
	
	




}
