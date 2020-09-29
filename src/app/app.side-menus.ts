/**
* @author devmahi <devmahi.me@gmail.com>
* @copyright Quantum Quotes 2020
* @version 01.01.01
* @license licenses.txt
*
* @date 2020-09-27 06:17:06
**/

import { Injectable } from "@angular/core";

@Injectable()

export class AppSideMenus{
	items:any = [
    {
        "item_type": "inlink",
        "item_label": "Home",
        "item_var": "home",
        "item_link": "\/home",
        "item_value": "",
        "item_desc": "",
        "item_color_label": "undefined",
        "item_icon_left": "home",
        "item_color_icon_left": "bluegray",
        "item_icon_right": "",
        "item_color_icon_right": "undefined"
    },
    {
        "item_type": "inlink",
        "item_label": "Quotes",
        "item_var": "quotes",
        "item_link": "\/quotes",
        "item_value": "",
        "item_desc": "",
        "item_color_label": "undefined",
        "item_icon_left": "chatbubble-ellipses",
        "item_color_icon_left": "bluegray",
        "item_icon_right": "",
        "item_color_icon_right": "undefined"
    },
    {
        "item_type": "inlink",
        "item_label": "Categories",
        "item_var": "categories",
        "item_link": "\/categories",
        "item_value": "",
        "item_desc": "",
        "item_color_label": "undefined",
        "item_icon_left": "pizza-sharp",
        "item_color_icon_left": "bluegray",
        "item_icon_right": "",
        "item_color_icon_right": "undefined"
    },
    {
        "item_type": "inlink",
        "item_label": "Loved Quotes",
        "item_var": "quotes_bookmarks",
        "item_link": "\/quotes-bookmarks",
        "item_value": "",
        "item_desc": "",
        "item_color_label": "undefined",
        "item_icon_left": "heart-sharp",
        "item_color_icon_left": "bluegray",
        "item_icon_right": "",
        "item_color_icon_right": "undefined"
    },
    {
        "item_type": "title",
        "item_label": "More Info",
        "item_var": "help",
        "item_link": "\/",
        "item_value": "",
        "item_desc": "",
        "item_color_label": "undefined",
        "item_icon_left": "help-circle",
        "item_color_icon_left": "undefined",
        "item_icon_right": "",
        "item_color_icon_right": "undefined"
    },
    {
        "item_type": "x-social-sharing",
        "item_label": "Share App",
        "item_var": "share_app",
        "item_link": "\/",
        "item_value": "https:\/\/play.google.com\/store\/apps\/details?id=co.in.godigitally.quantumquotes",
        "item_desc": "Download this app from Playstore",
        "item_color_label": "undefined",
        "item_icon_left": "share-social-sharp",
        "item_color_icon_left": "bluegray",
        "item_icon_right": "",
        "item_color_icon_right": "undefined"
    },
    {
        "item_type": "app-rate",
        "item_label": "Rate This App",
        "item_var": "rate_this_app",
        "item_link": "\/",
        "item_value": "",
        "item_desc": "",
        "item_color_label": "undefined",
        "item_icon_left": "star-sharp",
        "item_color_icon_left": "bluegray",
        "item_icon_right": "",
        "item_color_icon_right": "undefined"
    },
    {
        "item_type": "systembrowser",
        "item_label": "More Apps",
        "item_var": "more_apps",
        "item_link": "\/",
        "item_value": "https:\/\/play.google.com\/store\/apps\/developer?id=flucoder",
        "item_desc": "",
        "item_color_label": "undefined",
        "item_icon_left": "logo-google-playstore",
        "item_color_icon_left": "bluegray",
        "item_icon_right": "",
        "item_color_icon_right": "undefined"
    },
    {
        "item_type": "inlink",
        "item_label": "Privacy Policy",
        "item_var": "privacy_policy",
        "item_link": "\/privacy-policy",
        "item_value": "",
        "item_desc": "",
        "item_color_label": "undefined",
        "item_icon_left": "lock-closed",
        "item_color_icon_left": "bluegray",
        "item_icon_right": "",
        "item_color_icon_right": "undefined"
    },
    {
        "item_type": "inlink",
        "item_label": "App Info",
        "item_var": "about_us",
        "item_link": "\/about-us",
        "item_value": "",
        "item_desc": "",
        "item_color_label": "undefined",
        "item_icon_left": "phone-portrait-sharp",
        "item_color_icon_left": "bluegray",
        "item_icon_right": "",
        "item_color_icon_right": "undefined"
    }
] ;

}
