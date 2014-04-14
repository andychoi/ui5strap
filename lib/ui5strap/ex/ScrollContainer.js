/*
 * 
 * UI5Strap
 *
 * ScrollContainer
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

	jQuery.sap.declare("de_pksoftware.ui5strap.ex.ScrollContainer");
	
	sap.ui.core.Control.extend("de_pksoftware.ui5strap.ex.ScrollContainer", {
		metadata : {

			library : "de_pksoftware.ui5strap",

			defaultAggregation : "content",
			
			properties : { 
				vertical : {
					type:"boolean", 
					defaultValue:false
				},
				horizontal : {
					type:"boolean", 
					defaultValue:false
				}
			},
			aggregations : { 
				"content" : {
					singularName: "content"
				} 
			}
		}
	});

}());