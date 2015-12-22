/*
 * 
 * UI5Strap
 *
 * ui5strap.ListDropdownMenu
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

sap.ui.define(['./library', './ListBase'], function(library, ListBase){

	var ListDropdownMenu = ListBase.extend("ui5strap.ListDropdownMenu", {
		metadata : {

			library : "ui5strap",
			
			defaultAggregation : "items",
			
			properties : {
				updateParent : {
					type : "boolean",
					defaultValue : false
				}
			},
	
			aggregations : { 
				items : {
					type : "ui5strap.ListItem",
					singularName: "item"
				} 
			}

		}
	}),
	ListDropdownMenuProto = ListDropdownMenu.prototype;
	
	var _updateParentTap = function(oEvent, data){
		if(this.getUpdateParent()){
			var parent = this.getParent(),
				listItem = oEvent.getParameter("srcItem");
			parent.setText && parent.setText(listItem.getText());
			parent.data(listItem.data());
		}
		
		if(parent.getMetadata().isInstanceOf("ui5strap.IDropdownMenuHost")){
			parent.getParent().pressItem(parent, oEvent.srcControl, this);
		}
	};
	
	
	
	ListDropdownMenuProto.init = function(){
		this.attachEvent("tap", {}, _updateParentTap);
	};
	
	/**
	 * Handler for Tap / Click Events
	 * @Protected
	 * @Override
	 */
	ListDropdownMenuProto._handlePress = function(oEvent){
		ui5strap.ListBase.prototype._handlePress.call(this, oEvent);
		
		oEvent.stopPropagation();
		
		//Close ButtonDropdown or ListDropdownItem
		var parent = this.getParent();
		if("close" in parent){
			parent.close();
		}
	};

	if(ui5strap.support.touch){
		ListDropdownMenuProto.ontap = ListDropdownMenuProto._handlePress;
	}
	else{
		ListDropdownMenuProto.onclick = ListDropdownMenuProto._handlePress;
	}
	
	return ListDropdownMenu;
});