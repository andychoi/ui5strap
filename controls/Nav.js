/*
 * 
 * UI5Strap
 *
 * Nav
 * 
 * Author: Jan Philipp Knöller
 * 
 * Copyright (c) 2013 Jan Philipp Knöller
 * 
 * http://pksoftware.de
 *
 * Get the latest version: https://github.com/pks5/ui5strap
 * 
 * Released under Apache2 license: http://www.apache.org/licenses/LICENSE-2.0.txt
 * 
 */

(function(){

	jQuery.sap.declare("de_pksoftware.ui5strap.controls.Nav");
	
	sap.ui.core.Control.extend("de_pksoftware.ui5strap.controls.Nav", {
		metadata : {

			// ---- object ----
			defaultAggregation : "items",
				
			// ---- control specific ----
			library : "de_pksoftware.ui5strap",

			properties : { 
				type : {
					type:"string", 
					defaultValue:""
				},
				stacked : {
					type:"boolean", 
					defaultValue:false
				},
				justified : {
					type:"boolean", 
					defaultValue:false
				},
				inNavbar : {
					type:"boolean", 
					defaultValue:false
				},
				navbarAlign : {
					type:"string",
					defaultValue:''
				}
			},
					
			aggregations : { 
				"items" : {
					singularName: "items"
				} 
			}
		}
	});

}());