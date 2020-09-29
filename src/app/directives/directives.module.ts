/**
* @author devmahi <devmahi.me@gmail.com>
* @copyright Quantum Quotes 2020
* @version 01.01.01
* @license licenses.txt
*
* @date 2020-09-27 06:17:06
**/

import { NgModule } from "@angular/core";

import { AppBrowserDirective } from "./app-browser/app-browser.directive";
import { AppRateDirective } from "./app-rate/app-rate.directive";
import { AppStoreDirective } from "./app-store/app-store.directive";
import { AppWebviewDirective } from "./app-webview/app-webview.directive";
import { CallAppDirective } from "./call-app/call-app.directive";
import { ContactUsDirective } from "./contact-us/contact-us.directive";
import { CopyToClipboardDirective } from "./copy-to-clipboard/copy-to-clipboard.directive";
import { CordovaWebviewDirective } from "./cordova-webview/cordova-webview.directive";
import { FacebookAppDirective } from "./facebook-app/facebook-app.directive";
import { GeoAppDirective } from "./geo-app/geo-app.directive";
import { GooglePlayAppDirective } from "./google-play-app/google-play-app.directive";
import { ImageZoomDirective } from "./image-zoom/image-zoom.directive";
import { LineAppDirective } from "./line-app/line-app.directive";
import { MailAppDirective } from "./mail-app/mail-app.directive";
import { SaveAssetDirective } from "./save-asset/save-asset.directive";
import { SmsAppDirective } from "./sms-app/sms-app.directive";
import { SystemBrowserDirective } from "./system-browser/system-browser.directive";
import { TwitterAppDirective } from "./twitter-app/twitter-app.directive";
import { WhatsappAppDirective } from "./whatsapp-app/whatsapp-app.directive";
import { XSocialSharingDirective } from "./x-social-sharing/x-social-sharing.directive";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { AppRate } from "@ionic-native/app-rate/ngx";
import { Clipboard } from "@ionic-native/clipboard/ngx";
import { File } from "@ionic-native/file/ngx";
import { FileOpener } from "@ionic-native/file-opener/ngx";
import { SocialSharing } from "@ionic-native/social-sharing/ngx";

@NgModule({
	declarations: [
		AppBrowserDirective,
		AppRateDirective,
		AppStoreDirective,
		AppWebviewDirective,
		CallAppDirective,
		ContactUsDirective,
		CopyToClipboardDirective,
		CordovaWebviewDirective,
		FacebookAppDirective,
		GeoAppDirective,
		GooglePlayAppDirective,
		ImageZoomDirective,
		LineAppDirective,
		MailAppDirective,
		SaveAssetDirective,
		SmsAppDirective,
		SystemBrowserDirective,
		TwitterAppDirective,
		WhatsappAppDirective,
		XSocialSharingDirective
	],
	imports: [],
	exports: [
		AppBrowserDirective,
		AppRateDirective,
		AppStoreDirective,
		AppWebviewDirective,
		CallAppDirective,
		ContactUsDirective,
		CopyToClipboardDirective,
		CordovaWebviewDirective,
		FacebookAppDirective,
		GeoAppDirective,
		GooglePlayAppDirective,
		ImageZoomDirective,
		LineAppDirective,
		MailAppDirective,
		SaveAssetDirective,
		SmsAppDirective,
		SystemBrowserDirective,
		TwitterAppDirective,
		WhatsappAppDirective,
		XSocialSharingDirective
	],
	providers: [
		InAppBrowser,
		AppRate,
		Clipboard,
		File,
		FileOpener,
		SocialSharing
	]
})

export class DirectivesModule {}
