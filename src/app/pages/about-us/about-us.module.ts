/**
* @author devmahi <devmahi.me@gmail.com>
* @copyright Quantum Quotes 2020
* @version 01.01.01
* @license licenses.txt
*
* @date 2020-09-27 06:17:05
**/

import { NgModule, LOCALE_ID } from "@angular/core";
import { CommonModule, registerLocaleData } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { IonicStorageModule } from "@ionic/storage";
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HttpClientModule, HttpClient } from "@angular/common/http";

import { DirectivesModule } from "./../../directives/directives.module";
import { PipesModule } from "./../../pipes/pipes.module";
import { ComponentsModule } from "./../../components/components.module";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { AboutUsPageRoutingModule } from "./about-us-routing.module";
import { environment } from "./../../../../src/environments/environment";
import { Globals } from "../../class/globals/globals";
import { AppVersion } from "@ionic-native/app-version/ngx";
import { Platform } from "@ionic/angular";
import { PopoverController } from "@ionic/angular";
import { PopoverComponent } from "../../components/popover/popover.component";
import { AboutUsPage } from "./about-us.page";


/** i18n **/
import localeEnGb from "@angular/common/locales/en-GB";
registerLocaleData(localeEnGb, "en-GB");


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		IonicModule,
		HttpClientModule,
		DirectivesModule,
		PipesModule,
		ComponentsModule,
		IonicStorageModule.forRoot({ name : "QuantumQuotes"  }),
		AboutUsPageRoutingModule
	],
	declarations: [AboutUsPage],
	exports: [],
	entryComponents: [],
	providers: [{ provide: LOCALE_ID, useValue: "en-GB" },StatusBar,AppVersion,Platform,PopoverController,Globals]
})
export class AboutUsPageModule {}
