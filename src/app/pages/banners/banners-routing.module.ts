/**
* @author devmahi <devmahi.me@gmail.com>
* @copyright Quantum Quotes 2020
* @version 01.01.01
* @license licenses.txt
*
* @date 2020-09-27 06:17:06
**/

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BannersPage } from "./banners.page";

const routes: Routes = [
	{
		path: "",
		component: BannersPage,
	}
];
@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class BannersPageRoutingModule {}
