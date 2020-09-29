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
import { ViewChild } from "@angular/core";
import { IonInfiniteScroll } from "@ionic/angular";
import { PopoverController } from "@ionic/angular";
import { PopoverComponent } from "../../components/popover/popover.component";



@Component({
	selector: "app-banners",
	templateUrl: "banners.page.html",
	styleUrls: ["banners.page.scss"],
})

export class BannersPage {

	// search query
	filterQuery: string = "";

	
	pageName:string = `banners` ;
	
	/**
	* BannersPage:constructor()
	**/
	constructor(
		private router: Router,
		public statusBar: StatusBar,
		public bannersService: BannersService,
		public popoverController: PopoverController,
		private storage: Storage,
		private globals: Globals
	){
	
		// statusbar
		this.statusBar.styleLightContent();
		this.statusBar.overlaysWebView(false);
		this.statusBar.backgroundColorByHexString("#263238");
	
	

		console.log(`BannersPage`,`pageName`,this.pageName);
	}
	
	/**
	* BannersPage:showPopover()
	**/
	async showPopover(ev: any) {
		const popover = await this.popoverController.create({
			component: PopoverComponent,
			event: ev,
			translucent: true
		});
		return await popover.present();
	}
	
	


		
	
	
	banners: Observable<any>;
	dataBanners: any = [];
	filterDataBanners: any = [];
	
	//for infinite-scroll
	lastId:number = 0;
	firstLoad:number = 20;
	perPage:number = 20;
	
	@ViewChild("IonInfiniteScroll",{static: false}) infiniteScroll: IonInfiniteScroll;
	
	
	
	/**
	* BannersPage:getItems()
	**/
	getItems(){
		this.banners = this.bannersService.getItems();
		this.banners.subscribe(data => {
			this.dataBanners = data ;
			this.lastId = 0;
			let newData : any = [];
			for (let item of data) {
				if(this.lastId <= (this.firstLoad -1) ) {
					newData[this.lastId] = item;
					//console.log(this.lastId);
					this.lastId++;
				}
			}
			this.filterDataBanners = newData;
		});
	}
	
	
	/**
	* BannersPage:filterItems($event)
	* @param any $event
	*
	* @required for searchbar
	**/
	public filterItems(evt: any) {
		this.filterDataBanners = this.dataBanners;
		let filterVal = evt.target.value;
		if (filterVal && filterVal.trim() !== "") {
			this.filterDataBanners = this.dataBanners.filter((newItem) => {
				if(newItem.banner_title){
					return newItem.banner_title.toLowerCase().indexOf(filterVal.toLowerCase()) > -1;
				}
			});
		}
	}
	
	
	/**
	* BannersPage:loadMore(event)
	* @param event $event
	**/
	public loadMore(event){
		let newData : any = [];
		let nextPage:number = this.perPage + this.lastId;
		for (let item of this.dataBanners){
			if(this.lastId < this.dataBanners.length){
				if(this.lastId < nextPage){
					this.filterDataBanners[this.lastId] = this.dataBanners[this.lastId];
					//console.log("more data",this.lastId);
					this.lastId++;
				}
			}
		}
		setTimeout(() => {
			event.target.complete();
			if( this.lastId >= this.dataBanners.length){
				event.target.enable = false;
			}
		}, 500);
	}
	
	
	/**
	* BannersPage:doRefresh()
	**/
	public doRefresh(refresher){
		this.dataBanners = [] ;
		this.filterDataBanners = [] ;
		setTimeout(() => {
			refresher.target.complete();
		}, 100);
		this.getItems();
	}
	
	
	/**
	* BannersPage:ngOnInit()
	**/
	public ngOnInit(){
		this.dataBanners = [] ;
		this.filterDataBanners = [] ;
		this.getItems();
	}
	




}
