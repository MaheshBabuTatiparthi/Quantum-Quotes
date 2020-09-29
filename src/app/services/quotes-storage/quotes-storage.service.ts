/**
* @author devmahi <devmahi.me@gmail.com>
* @copyright Quantum Quotes 2020
* @version 01.01.01
* @license licenses.txt
*
* @date 2020-09-27 06:17:07
**/

import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";


@Injectable({
	providedIn: "root"
})

export class QuotesStorageService {
	
	constructor(
		private storage: Storage
	){



	}


	/**
	* QuotesStorageService.getItems(table:string)
	**/
	public async getItems(table:string){
		let data:any = [] ;
		this.storage.forEach((val,key,index) => {
			let prefix : string = `${table}:`;
			if(key.substring(0,prefix.length) ==  prefix){
				data.push(val);
			}
		});
		return await data;
	}
	
	
	/**
	* QuotesStorageService.getItem(table:string,key:string)
	**/
	public async getItem(table:string,key:string){
		return await this.storage.get(`${table}:${key}`);
	}
	
	
	/**
	* QuotesStorageService.setItem(table:string,key:string,val:any)
	**/
	public async setItem(table:string,key:string,value:any){
		return await this.storage.set(`${table}:${key}`,value);
	}
	
	
	/**
	* QuotesStorageService.removeItem(table:string,key:string)
	**/
	public async removeItem(table:string,key:string){
		return await this.storage.remove(`${table}:${key}`);
	}
	
	
	/**
	* QuotesStorageService.clearItems(table:string)
	**/
	public async clearItems(table:string) {
		this.storage.forEach((iValue, iKey, iIndex) => {
			let prefix : string = `${table}:`;
			if(iKey.substring(0,prefix.length) ==  prefix){
				this.storage.remove(`${iKey}`);
			}
		});
	}



}

