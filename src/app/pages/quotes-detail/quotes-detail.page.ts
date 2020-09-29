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
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { QuotesService } from "./../../services/quotes/quotes.service";
import { QuotesStorageService } from "./../../services/quotes-storage/quotes-storage.service";
import { ToastController } from "@ionic/angular";
import { PopoverController } from "@ionic/angular";
import { PopoverComponent } from "../../components/popover/popover.component";



@Component({
	selector: "app-quotes-detail",
	templateUrl: "quotes-detail.page.html",
	styleUrls: ["quotes-detail.page.scss"],
})

export class QuotesDetailPage {

	//url parameter
	public id : string;

	
	pageName:string = `quotes-detail` ;
	
	/**
	* QuotesDetailPage:constructor()
	**/
	constructor(
		private router: Router,
		public statusBar: StatusBar,
		public quotesService: QuotesService,
		public quotesStorageService: QuotesStorageService,
		public toastController: ToastController,
		public popoverController: PopoverController,
		public activatedRoute: ActivatedRoute,
		private storage: Storage,
		private globals: Globals
	){
	
		// statusbar
		this.statusBar.styleLightContent();
		this.statusBar.overlaysWebView(false);
		this.statusBar.backgroundColorByHexString("#263238");
	
	
		this.id = this.activatedRoute.snapshot.paramMap.get("id");
		//badge for bookmarks
		this.createBadge();
		

		console.log(`QuotesDetailPage`,`pageName`,this.pageName);
	}
	
	/**
	* QuotesDetailPage:showPopover()
	**/
	async showPopover(ev: any) {
		const popover = await this.popoverController.create({
			component: PopoverComponent,
			event: ev,
			translucent: true
		});
		return await popover.present();
	}
	
	


		
	
	
	quotes: Observable<any>;
	dataQuotes: any = {};
	
	
	count_bookmarks:number = 0;
	temp_count_bookmarks:number = 0 ;
	item_bookmarks : any = [];
	runBadge: any;
	
	
	/**
	* QuotesDetailPage:createBadge()
	**/
	createBadge(){
		this.runBadge = setInterval(()=>{
			this.getBadges();
		},1000)
	}
	
	
	/**
	* QuotesDetailPage:ionViewDidLeave()
	**/
	ionViewDidLeave(){
		clearInterval(this.runBadge);
	}
	
	
	/**
	* QuotesDetailPage:getBadges()
	**/
	getBadges(){
		this.getBookmarks();
	}
	
	
	/**
	*  QuotesDetail.getBookmarks()
	**/
	public async getBookmarks(){
		this.count_bookmarks = this.temp_count_bookmarks;
		this.temp_count_bookmarks = 0;
		this.item_bookmarks = []; 
		this.storage.forEach((iValue, iKey, iIndex) => {
			let bookmarkKey = iKey.substring(0,16);
			console.log(`key`,bookmarkKey);
			if( bookmarkKey ==  `quotes-bookmark:`){
				this.pushBookmark(iValue);
			}
		});
	}
	
	
	/**
	* .pushBookmark(item)
	**/
	private pushBookmark(item){
		this.temp_count_bookmarks++;
		this.item_bookmarks.push(item);
	}
	
	
	/**
	* QuotesDetailPage:saveBookmark(data:any)
	**/
	saveBookmark(dataId:string,data:any){
		this.quotesStorageService.setItem(`quotes-bookmark`,dataId,data).then(()=>{
			this.showToast(`Quote Loved`);
		})
	}
	
	
	/**
	* QuotesDetailPage:showToast(message:string)
	**/
	async showToast(message:string){
		const toast = await this.toastController.create({
			message: message,
			position: "bottom",
			color: "danger",
			duration: 500
		});
		await toast.present();
	}
	
	
	/**
	* QuotesDetailPage:getJSON(url: string)
	**/
	public getItem(){
		this.quotes = this.quotesService.getItem(this.id);
		this.quotes.subscribe(data => {
			this.dataQuotes = data ;
		});
	}
	
	
	
	/**
	* QuotesDetailPage:doRefresh()
	**/
	public doRefresh(refresher){
		this.dataQuotes = {};
		setTimeout(() => {
			refresher.target.complete();
		}, 100);
		this.getItem();
	}
	
	
	/**
	* QuotesDetailPage:ngOnInit()
	**/
	public ngOnInit(){
		this.dataQuotes = {};
		this.getItem();
	}
	




}
