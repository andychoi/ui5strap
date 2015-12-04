/*
 * 
 * UI5Strap
 *
 * ui5strap.Link
 * 
 * @author Jan Philipp Knöller <info@pksoftware.de>
 * 
 * Homepage: http://ui5strap.com
 *
 * Copyright (c) 2013-2014 Jan Philipp Knöller <info@pksoftware.de>
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * Released under Apache2 license: http://www.apache.org/licenses/LICENSE-2.0.txt
 * 
 */

(function(){

	jQuery.sap.declare("ui5strap.Link");
	jQuery.sap.require("ui5strap.library");
	
	ui5strap.ControlBase.extend("ui5strap.Link", {
		metadata : {

			// ---- object ----
			defaultAggregation : "content",
			// ---- control specific ----
			library : "ui5strap",

			properties : { 
				type : {
					type : "ui5strap.LinkType",
					defaultValue : ui5strap.LinkType.Default
				},
				bsAction : {
					deprecated : true,
					type: "ui5strap.BsAction", 
					defaultValue: ui5strap.BsAction.None
				},
				text : {
					type:"string", 
					defaultValue:""
				},
				parse : {
					type : "boolean",
					defaultValue : false
				},
				title : {
					type: "string", 
					defaultValue: ""
				},
				bubbleUp : {
					type : "boolean",
					defaultValue : false
				},
				href : {
					type:"string", 
					defaultValue:""
				},
				contentPlacement : {
					type:"ui5strap.ContentPlacement",
					defaultValue : ui5strap.ContentPlacement.Start
				},
				trail : {
					type:"ui5strap.TrailHtml", 
					defaultValue:ui5strap.TrailHtml.None
				},
				target  : {
					type:"string", 
					defaultValue : ""
				}			
			},

			aggregations : { 
				content : {
					singularName: "content"
				}
			},
			events:{
		        tap : {allowPreventDefault : true}
		    }

		}
	});

	ui5strap.Utils.dynamicAttributes(
		ui5strap.Link.prototype, 
		[
			"title",
			"href",
			"target"
		]
	);

	ui5strap.Utils.dynamicText(ui5strap.Link.prototype);
	
	var _handlePress = function(oEvent) {
		//if (this.getEnabled()) {
			oEvent.setMarked();

			if (!this.fireTap() || !this.getHref()) {
				oEvent.preventDefault();
			}
		//} else {
		//	oEvent.preventDefault();
		//}
	};
	
	if(ui5strap.options.enableTapEvents){
		ui5strap.Link.prototype.ontap = _handlePress;
	}

	if(ui5strap.options.enableClickEvents){
		ui5strap.Link.prototype.onclick = _handlePress;
	}

}());