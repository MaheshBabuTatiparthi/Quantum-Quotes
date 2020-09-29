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
import { BannersService } from "./../../services/banners/banners.service";
import { CategoriesService } from "./../../services/categories/categories.service";
import { QuotesService } from "./../../services/quotes/quotes.service";
import { QuotesStorageService } from "./../../services/quotes-storage/quotes-storage.service";
import { PopoverController } from "@ionic/angular";
import { PopoverComponent } from "../../components/popover/popover.component";
import { Platform } from "@ionic/angular";
import { ToastController } from "@ionic/angular";
import { ViewChild } from "@angular/core";
import { IonInfiniteScroll } from "@ionic/angular";



@Component({
	selector: "app-home",
	templateUrl: "home.page.html",
	styleUrls: ["home.page.scss"],
})

export class HomePage {
	
	pageName:string = `home` ;
	
	/**
	* HomePage:constructor()
	**/
	constructor(
		private router: Router,
		public statusBar: StatusBar,
		public bannersService: BannersService,
		public categoriesService: CategoriesService,
		public quotesService: QuotesService,
		public quotesStorageService: QuotesStorageService,
		public popoverController: PopoverController,
		public toastController: ToastController,
		public platform: Platform,
		private storage: Storage,
		private globals: Globals
	){
	
		// statusbar
		this.statusBar.styleLightContent();
		this.statusBar.overlaysWebView(false);
		this.statusBar.backgroundColorByHexString("#263238");
	
	

		console.log(`HomePage`,`pageName`,this.pageName);
	}
	
	/**
	* HomePage:showPopover()
	**/
	async showPopover(ev: any) {
		const popover = await this.popoverController.create({
			component: PopoverComponent,
			event: ev,
			translucent: true
		});
		return await popover.present();
	}
	
	
	count_bookmarks:number = 0;
	temp_count_bookmarks:number = 0 ;
	item_bookmarks : any = [];
	runBadge: any;

	/**
	* QuotesPage:createBadge()
	**/
	createBadge(){
		this.runBadge = setInterval(()=>{
			this.getBadges();
		},1000)
	}
	
	
	/**
	* QuotesPage:ionViewDidLeave()
	**/
	ionViewDidLeave(){
		clearInterval(this.runBadge);
	}
	
	
	/**
	* QuotesPage:getBadges()
	**/
	getBadges(){
		this.getBookmarks();
	}
	
	
	/**
	*  Quotes.getBookmarks()
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
	
	
	//for infinite-scroll
	lastId:number = 0;
	firstLoad:number = 20;
	perPage:number = 20;
	
	@ViewChild("IonInfiniteScroll",{static: false}) infiniteScroll: IonInfiniteScroll;
	
	
	
	/**
	* QuotesPage:saveBookmark(data:any)
	**/
	saveBookmark(dataId:string,data:any){
		this.quotesStorageService.setItem(`quotes-bookmark`,dataId,data).then(()=>{
			this.showToast(`Quote Loved`);
		})
	}

		/**
	* QuotesPage:showToast(message:string)
	**/
	async showToast(message:string){
		const toast = await this.toastController.create({
			message: message,
			position: "bottom",
			color: "dark",
			duration: 500
		});
		await toast.present();
	}

	
	
	
	/**
	* Init for Banners
	* api: https://localhost/quantumquotes/restapi.php?api=banner
	**/
	banners: Observable<any>;
	dataBanners: any = [];
	
	
	/**
	* HomePage:getBanners();
	**/
	getBanners(){
		this.banners = this.bannersService.getItems();
		this.banners.subscribe(data => {
			this.dataBanners = data ;
		});
	}
	
	/**
	* Init for Categories
	* api: https://localhost/quantumquotes/restapi.php?api=categories
	**/
	categories: Observable<any>;
	dataCategories: any = [];
	
	
	/**
	* HomePage:getCategories();
	**/
	getCategories(){
		this.categories = this.categoriesService.getItems();
		this.categories.subscribe(data => {
			this.dataCategories = data ;
		});
	}
	
	/**
	* Init for Quotes
	* api: https://localhost/quantumquotes/restapi.php?api=quotes&quote-category={id}&orderby=id&sort=desc
	**/
	quotes: Observable<any>;
	dataQuotes: any = [];
	
	
	/**
	* HomePage:getQuotes();
	**/
	getQuotes(){
		this.quotes = this.quotesService.getItems("-1");
		this.quotes.subscribe(data => {
			this.dataQuotes = data ;
		});
	}
	
	
	/**
	* HomePage:ngOnInit();
	**/
	public ngOnInit(){
		this.getBanners();
		this.getCategories();
		this.getQuotes();
	}




}
