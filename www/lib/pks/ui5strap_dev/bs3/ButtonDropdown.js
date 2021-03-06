/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.bs3.ButtonDropdown
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

sap.ui.define(['./library', './Button', "../core/Utils", "./PositionSupport"], function(ui5strapBs3Lib, Button, Utils, PositionSupport){
	
	"use strict";
	
	var mMetaData = {
		interfaces : ["pks.ui5strap.bs3.IDropdownMenuHost"],
		
		defaultAggregation : "menu",
			
		library : "pks.ui5strap.bs3",

		properties : { 
			update : {
				type : "pks.ui5strap.bs3.DropdownMenuHostUpdate",
				defaultValue : ui5strapBs3Lib.DropdownMenuHostUpdate.None
			},
			dropup : {
				type:"boolean", 
				defaultValue:false
			},
			split : {
				type:"boolean", 
				defaultValue:false
			}
		},
				
		aggregations : { 
			menu : {
				type : "pks.ui5strap.bs3.DropdownMenu",
				multiple : false
			} 
		}

	};
	
	PositionSupport.meta(mMetaData);
	
	/**
	 * Constructor for a new ButtonDropdown instance.
	 * 
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * 
	 * @class
	 * Control for creating Bootstrap buttons with dropdown.
	 * @extends pks.ui5strap.bs3.Button
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 1.0.2-SNAPSHOT
	 * 
	 * @constructor
	 * @public
	 * @alias pks.ui5strap.bs3.ButtonDropdown
	 * 
	 */
	var ButtonDropdown = Button.extend("pks.ui5strap.bs3.ButtonDropdown", /** @lends pks.ui5strap.bs3.ButtonDropdown.prototype */ {
		metadata : mMetaData
	}),
	/**
	 * @alias pks.ui5strap.bs3.ButtonDropdown.prototype
	 */
	ButtonDropdownProto = ButtonDropdown.prototype;

	PositionSupport.proto(ButtonDropdownProto);
	
	/**
	 * Returns the style prefix of this control.
	 * @override
	 * @protected
	 */
	ButtonDropdownProto._getStyleClassPrefix = function(){
		return "ui5strapButtonDropdown";
	};
	
	/**
	 * @Protected
	 * @Override
	 */
	ButtonDropdownProto._getStyleClassDesign = function(){
		var styleClass = " btn-group";
		if(this.getDropup()){
			styleClass += " dropup";
		}
		return styleClass;
	};
	
	/**
	 * @Protected
	 * @Override
	 */
	ButtonDropdownProto._getStyleClassRoot = function(){
		return "";
	};
	
	ButtonDropdownProto.setText = function(newText, suppressInvalidate){
		if(this.getMenu() === null){
			if(this.getDomRef() && this.getContent().length === 0){
              jQuery('#' + this.getId() + '---' + (this.getSplit() ? 'button' : 'toggle')).text(newText);
              this.setProperty('text', newText, true);
          	}
            else{
                 this.setProperty('text', newText, suppressInvalidate);
            }
		}
		else{
			this.setProperty('text', newText, suppressInvalidate);
		}
	};

	ButtonDropdownProto.setSelected = function(newValue){ 
        Utils.updateClass(this, jQuery('#' + this.getId() + '---' + (this.getSplit() ? 'button' : 'toggle')), "selected", newValue, { 'true' : 'active' });
    };
	
	ButtonDropdownProto.open = function(){
		this.$().addClass('open');
	};
	
	ButtonDropdownProto.close = function(){
		this.$().removeClass('open');
	};

	ButtonDropdownProto.toggle = function(){
		this.$().toggleClass('open');
	};
	
	/**
	 * Handler for Tap / Click Events
	 * @Protected
	 */
	ButtonDropdownProto._handlePress = function(oEvent){
		oEvent.setMarked();
		oEvent.setMarked("pks.ui5strap.core.ISelectableItem");
		oEvent.setMarked("pks.ui5strap.bs3.ButtonDropdown");
		
		if (this.getEnabled()) {
			if(oEvent.isMarked("pks.ui5strap.bs3.DropdownMenu")){
				this.close();
				
				var menuListItem = Utils.findClosestParentControl(oEvent.srcControl, pks.ui5strap.core.ListItemBase),
					hostUpdate = this.getUpdate();
				
				if(menuListItem){
					var DropdownMenuHostUpdate = ui5strapBs3Lib.DropdownMenuHostUpdate;
					if(hostUpdate === DropdownMenuHostUpdate.TextAndData
						|| hostUpdate === DropdownMenuHostUpdate.Text){
						this.setText(menuListItem.getText());
					}
					
					if(hostUpdate === DropdownMenuHostUpdate.TextAndData
						|| hostUpdate === DropdownMenuHostUpdate.Data){
						
						this.data(menuListItem.data());
					}
					
					if(hostUpdate !== DropdownMenuHostUpdate.None){
						oEvent.setMarked("pks.ui5strap.core.ISelectableItem.update");
					}
				}
			}
			else{
				var $target = jQuery(oEvent.target);
				if(this.getSplit()){
					if($target.hasClass('dropdown-toggle') || $target.hasClass('caret')){
						this.$().toggleClass('open');
					}
					else{
						this.fireTap();
					}
				}
				else{
					this.$().toggleClass('open');
					this.fireTap();
				}
			}
		}
	};
	
	if(ui5strapBs3Lib.support.touch){	
		ButtonDropdownProto.ontap = ButtonDropdownProto._handlePress;
	}
	else{
		ButtonDropdownProto.onclick = ButtonDropdownProto._handlePress;
	}
	
	return ButtonDropdown;
});