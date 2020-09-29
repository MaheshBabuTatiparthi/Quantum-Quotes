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
import { ViewChild } from "@angular/core";
import { IonInfiniteScroll } from "@ionic/angular";
import { PopoverController } from "@ionic/angular";
import { PopoverComponent } from "../../components/popover/popover.component";



@Component({
	selector: "app-quotes",
	templateUrl: "quotes.page.html",
	styleUrls: ["quotes.page.scss"],
})

export class QuotesPage {

	//url parameter
	public paramId : string;

	
	pageName:string = `quotes` ;
	
	/**
	* QuotesPage:constructor()
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
	
	
		this.paramId = this.activatedRoute.snapshot.paramMap.get("param_id");
		//badge for bookmarks
		this.createBadge();
		

		console.log(`QuotesPage`,`pageName`,this.pageName);
	}
	
	/**
	* QuotesPage:showPopover()
	**/
	async showPopover(ev: any) {
		const popover = await this.popoverController.create({
			component: PopoverComponent,
			event: ev,
			translucent: true
		});
		return await popover.present();
	}
	
	


		
	
	
	filterQuery: string = "";
	
	
	quotes: Observable<any>;
	dataQuotes: any = [];
	filterDataQuotes: any = [];
	
	
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
			color: "danger",
			duration: 500
		});
		await toast.present();
	}
	
	
	/**
	* QuotesPage:getItems()
	**/
	getItems(){
		if(this.paramId == null){
			this.paramId = "-1";
		}
		this.quotes = this.quotesService.getItems(this.paramId);
		this.quotes.subscribe(data => {
			this.dataQuotes = data ;
			this.lastId = 0;
			let newData : any = [];
			for (let item of data) {
				if(this.lastId <= (this.firstLoad -1) ) {
					newData[this.lastId] = item;
					//console.log(this.lastId);
					this.lastId++;
				}
			}
			this.filterDataQuotes = newData;
		});
	}
	
	
	/**
	* QuotesPage:filterItems($event)
	* @param any $event
	*
	* @required for searchbar
	**/
	public filterItems(evt: any) {
		this.filterDataQuotes = this.dataQuotes;
		let filterVal = evt.target.value;
		if (filterVal && filterVal.trim() !== "") {
			this.filterDataQuotes = this.dataQuotes.filter((newItem) => {
				if(newItem.quote){
					return newItem.quote.toLowerCase().indexOf(filterVal.toLowerCase()) > -1;
				}
			});
		}
	}
	
	
	/**
	* QuotesPage:loadMore(event)
	* @param event $event
	**/
	public loadMore(event){
		let newData : any = [];
		let nextPage:number = this.perPage + this.lastId;
		for (let item of this.dataQuotes){
			if(this.lastId < this.dataQuotes.length){
				if(this.lastId < nextPage){
					this.filterDataQuotes[this.lastId] = this.dataQuotes[this.lastId];
					//console.log("more data",this.lastId);
					this.lastId++;
				}
			}
		}
		setTimeout(() => {
			event.target.complete();
			if( this.lastId >= this.dataQuotes.length){
				event.target.enable = false;
			}
		}, 500);
	}
	
	
	/**
	* QuotesPage:doRefresh()
	**/
	public doRefresh(refresher){
		this.dataQuotes = [] ;
		this.filterDataQuotes = [] ;
		setTimeout(() => {
			refresher.target.complete();
		}, 100);
		this.getItems();
	}
	
	
	/**
	* QuotesPage:ngOnInit()
	**/
	public ngOnInit(){
		this.dataQuotes = [] ;
		this.filterDataQuotes = [] ;
		this.getItems();
	}
	




}
