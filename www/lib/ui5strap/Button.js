/*
 * 
 * UI5Strap
 *
 * ui5strap.Button
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

	jQuery.sap.declare("ui5strap.Button");
	jQuery.sap.require("ui5strap.library");

	ui5strap.ControlBase.extend("ui5strap.Button", {
		metadata : {
			interfaces : ["ui5strap.ISelectableItem"],
			
			defaultAggregation : "content",
			library : "ui5strap",
			
			properties : { 
				type : {
					type: "ui5strap.ButtonType", 
					defaultValue: ui5strap.ButtonType.Button
				},
				bsAction : {
					deprecated : true,
					type: "ui5strap.BsAction", 
					defaultValue: ui5strap.BsAction.None
				},
				text : {
					type: "string", 
					defaultValue: ""
				},
				title : {
					type: "string", 
					defaultValue: ""
				},
				severity : {
					type: "ui5strap.Severity", 
					defaultValue: ui5strap.Severity.Default
				},
				size : {
					type: "ui5strap.Size", 
					defaultValue: ui5strap.Size.Default
				},
				selectable : {
					type : "boolean",
					defaultValue : true
				},
				selected : {
					type:"boolean", 
					defaultValue:false
				}, 
				enabled : {
					type:"boolean", 
					defaultValue:true
				},
				trail : {
					type:"ui5strap.TrailHtml", 
					defaultValue:ui5strap.TrailHtml.Space
				},
				contentPlacement : {
					type:"ui5strap.ContentPlacement",
					defaultValue : ui5strap.ContentPlacement.Start
				},
				align : {
					type:"ui5strap.Alignment",
					defaultValue:ui5strap.Alignment.Default
				}
			},
			aggregations : { 
				"content" : {
					singularName: "content"
				} 
			},
			events:{
		        "tap":{}
		    }

		}
	});

	var ButtonPrototype = ui5strap.Button.prototype;

	ui5strap.Utils.dynamicAttributes(
		ButtonPrototype, 
		[
			"title"
		]
	);

	ui5strap.Utils.dynamicText(ButtonPrototype);

	ui5strap.Utils.dynamicClass(ButtonPrototype, 'selected', { 'true' : 'active' });
	
	/**
	 * Handler for Tap / Click Events
	 * @Protected
	 */
	ButtonPrototype._handlePress = function(oEvent) {
		oEvent.setMarked();
		
		if (this.getEnabled()) {
			this.fireTap({});
		}
	};
	
	if(ui5strap.support.touch){	
		ButtonPrototype.ontap = ButtonPrototype._handlePress;
	}
	else{
		ButtonPrototype.onclick = ButtonPrototype._handlePress;
	}

}());