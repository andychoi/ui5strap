/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.ex.BarMenuItem
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

sap.ui.define(['./library', '../core/library', '../core/ListItemBase', '../core/Utils'], function(ui5strapExLib, ui5strapCoreLib, ListItemBase, Utils){
	
	"use strict";
	
	/**
	 * Constructor for a new ListItem instance.
	 * 
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * 
	 * @class
	 * Control for creating menu entries for the BarMenu control.
	 * @extends pks.ui5strap.core.ListItemBase
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 1.0.2-SNAPSHOT
	 * 
	 * @constructor
	 * @public
	 * @alias pks.ui5strap.ex.BarMenuItem
	 * 
	 */
	var BarMenuItem = ListItemBase.extend("pks.ui5strap.ex.BarMenuItem", /** @lends pks.ui5strap.ex.BarMenuItem.prototype */ {
		metadata : {

			library : "pks.ui5strap.ex",
			
			properties : { 
				text : {
					type:"string", 
					defaultValue:""
				},
				parse : {
					type : "boolean",
					defaultValue : false
				},
				contentPlacement : {
					type:"pks.ui5strap.core.ContentPlacement",
					defaultValue : ui5strapCoreLib.ContentPlacement.Start
				},
				icon : {
					type:"string",
					defaultValue : ""
				}
			},
			
			defaultAggregation : "content"
		},
		
		renderer : function(rm, oControl) {
			var icon = oControl.getIcon(),
				text = oControl.getText(),
				parse = oControl.getParse(),
				content = oControl.getContent(),
		        contentPlacement = oControl.getContentPlacement();

			rm.write("<li");
			rm.writeControlData(oControl);
			rm.addClass('u5sl-barmenu-item');
			if(oControl.getSelected()){
				rm.addClass('active');
			}
			rm.writeClasses();
			rm.write(">");
			
			if(contentPlacement === ui5strapCoreLib.ContentPlacement.Start){
		    	for(var i = 0; i < content.length; i++){ 
					rm.renderControl(content[i]);
				}
		    }

			if(icon){
				rm.write('<span class="u5sl-barmenu-item-icon fa fa-' + icon + '"></span>');
			}
			
			if(text){
				if(parse){
					text = Utils.parseText(text);
				}
				
				rm.write('<span class="u5sl-barmenu-item-text">');
				if(parse){
					rm.write(text);
				}
				else{
					rm.writeEscaped(text);
				}
				rm.write('</span>');
			}
			
			if(contentPlacement === ui5strapCoreLib.ContentPlacement.End){
				for(var i = 0; i < content.length; i++){ 
					rm.renderControl(content[i]);
				}
	        }

			rm.write("</li>");
		}
	}),
	/**
	 * @alias pks.ui5strap.ex.BarMenuItem.prototype
	 */
	BarMenuItemProto = BarMenuItem.prototype;
	
	/**
	 * Returns the style prefix of this control.
	 * @override
	 * @protected
	 */
	BarMenuItemProto._getStyleClassPrefix = function(){
		return "ui5strapBarMenuItem";
	};
	
	return BarMenuItem;
});