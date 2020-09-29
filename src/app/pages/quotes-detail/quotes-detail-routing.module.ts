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
import { QuotesDetailPage } from "./quotes-detail.page";

const routes: Routes = [
	{
		path: "",
		component: QuotesDetailPage,
	}
];
@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class QuotesDetailPageRoutingModule {}
