/**
* @author devmahi <devmahi.me@gmail.com>
* @copyright Quantum Quotes 2020
* @version 01.01.01
* @license licenses.txt
*
* @date 2020-09-27 06:17:06
**/

import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";

const routes: Routes = [
	{
		path: "",
		redirectTo: "home",
		pathMatch: "full"
	},
	{
		path: "about-us",
		loadChildren: () => import("./pages/about-us/about-us.module").then(m => m.AboutUsPageModule)
	},
	{
		path: "banners",
		loadChildren: () => import("./pages/banners/banners.module").then(m => m.BannersPageModule)
	},
	{
		path: "categories",
		loadChildren: () => import("./pages/categories/categories.module").then(m => m.CategoriesPageModule)
	},
	{
		path: "home",
		loadChildren: () => import("./pages/home/home.module").then(m => m.HomePageModule)
	},
	{
		path: "privacy-policy",
		loadChildren: () => import("./pages/privacy-policy/privacy-policy.module").then(m => m.PrivacyPolicyPageModule)
	},
	{
		path: "quotes-bookmarks",
		loadChildren: () => import("./pages/quotes-bookmarks/quotes-bookmarks.module").then(m => m.QuotesBookmarksPageModule)
	},
	{
		path: "quotes-detail",
		loadChildren: () => import("./pages/quotes-detail/quotes-detail.module").then(m => m.QuotesDetailPageModule)
	},
	{
		path: "quotes-detail/:id",
		loadChildren: () => import("./pages/quotes-detail/quotes-detail.module").then(m => m.QuotesDetailPageModule)
	},
	{
		path: "quotes",
		loadChildren: () => import("./pages/quotes/quotes.module").then(m => m.QuotesPageModule)
	},
	{
		path: "quotes/:param_id",
		loadChildren: () => import("./pages/quotes/quotes.module").then(m => m.QuotesPageModule)
	},
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
	],
	exports: [RouterModule]
})
export class AppRoutingModule {}
