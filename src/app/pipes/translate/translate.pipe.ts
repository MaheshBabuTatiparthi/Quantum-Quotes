/**
* @author devmahi <devmahi.me@gmail.com>
* @copyright Quantum Quotes 2020
* @version 01.01.01
* @license licenses.txt
*
* @date 2020-09-27 06:17:06
**/

import { Pipe, PipeTransform } from "@angular/core";

/**
 * Translate pipe
 * Just error prevention

 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */


@Pipe({
	name: "translate",
})

export class TranslatePipe implements PipeTransform {

	constructor(
		
	){



	}

	transform(value:string): string{

			return value;


	}
}
