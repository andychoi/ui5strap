/*
 * 
 * UI5Strap
 *
 * Heading
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

	jQuery.sap.declare("de_pksoftware.ui5strap.controls.Heading");
	
	sap.ui.core.Control.extend("de_pksoftware.ui5strap.controls.Heading", {
		metadata : {

			// ---- object ----
			defaultAggregation : "content",
			// ---- control specific ----
			library : "de_pksoftware.ui5strap",
			properties : { 
				text : {
					type: "string", 
					defaultValue: ""
				},
				level : {
					type: "int", 
					defaultValue: 3
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