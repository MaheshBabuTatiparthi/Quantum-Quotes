/**
* @author devmahi <devmahi.me@gmail.com>
* @copyright Quantum Quotes 2020
* @version 01.01.01
* @license licenses.txt
*
* @date 2020-09-27 06:17:06
**/

import { Directive, HostListener, Input, ElementRef } from "@angular/core";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { Platform } from "@ionic/angular";
import { File } from "@ionic-native/file/ngx";
import { AlertController } from "@ionic/angular";
import { FileOpener } from "@ionic-native/file-opener/ngx";

@Directive({
	selector: "[saveAsset]"
})

export class SaveAssetDirective {

	@Input() fileAsset: string;
	@Input() mimeType: string;
	@Input() folderDownload: string;

	constructor( 
		private elementRef: ElementRef,
		private inAppBrowser: InAppBrowser,
		private platform: Platform,
		private file: File,
		private alertController: AlertController,
		private fileOpener: FileOpener
	 ){


	}






	@HostListener("click", ["$event"]) onClick(e){
		this.saveAsset(this.fileAsset,this.mimeType,this.folderDownload);
	}


	
	/**
	* saveAsset($file,$folder)
	**/
	
	private saveAsset(fileAsset: string, mimeType: string, folderDownload:string){
		
		let myFileAsset:string = fileAsset || `assets/pdf/file.pdf`;
		let myMimeType:string = mimeType || `application/pdf`;
		let myFolderDownload:string = folderDownload || `quantum-quotes`;
		
		let myFileName:string = myFileAsset.split("/").pop();
		let myFolder:string = myFileAsset.replace(myFileName,"");
		
		if (this.platform.is("android")){
			let dirApp:string = this.file.applicationDirectory + `www/${myFolder}`;
			let dirDev:string = this.file.externalRootDirectory + `/${myFolderDownload}`;
			let fileName:string = myFileName || `blank`;
			
			this.file.checkDir(this.file.externalRootDirectory, `${myFolderDownload}`).then(data => {
				console.log(`Directory does exist`);
			}).catch(err =>{
				console.log(`Error`,`checkDir`,err);
				this.file.createDir(this.file.externalRootDirectory,`${myFolderDownload}`, false).then(data => {
					console.log(`Directory create :`+ dirApp);
				}).catch(err => {
					console.log(`Error`,`createDir`,err);
					this.showAlert(`Error`,`Permission`,`You have to check permission for this application!`);
				});
			});
			
			this.file.copyFile(dirApp, fileName, dirDev, fileName).then(data=>{
				let localURL = data.nativeURL;
				this.fileOpener.showOpenWithDialog(localURL,`${myMimeType}`).then(data =>{ 
					console.log(`File is opened`);
				}).catch(err => {
					console.log("Error opening file", err);
					this.showAlert(`Information`,`File`,localURL);
				});
				
			}).catch(err=>{
				console.log(`Error`,`copyFile`,err);
				this.showAlert(`Error`,`Save`,err.message);
			});
		}else{
			this.showAlert(`Information`,`Device`,`Only for android device!`);
		}
	}
	
	
	/**
	* showAlert($header,$subheader,$message)
	**/
	async showAlert(header:string, subheader: string, message: string){
		const alert = await this.alertController.create({
			header: header,
			subHeader: subheader,
			message: message,
			buttons: ["OK"]
		});
		await alert.present();
	}
	
	


}
