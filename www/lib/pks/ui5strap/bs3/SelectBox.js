/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.bs3.SelectBox
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

sap.ui.define(['./library', "../core/library", "../core/ControlBase", "./PositionSupport"], function(ui5strapBs3Lib, ui5strapCoreLib, ControlBase, PositionSupport){
	
	"use strict";
	
	var mMetaData = {
			interfaces : ["pks.ui5strap.core.IText", "pks.ui5strap.bs3.IInputGroupControl"],
			defaultAggregation : "items",

			library : "pks.ui5strap.bs3",
			
			properties : { 
				type : {
					type: "pks.ui5strap.bs3.SelectBoxType", 
					defaultValue: ui5strapBs3Lib.SelectBoxType.FormControl
				},
				value : {
					type:"string", 
					defaultValue:""
				},
				size : {
					type: "pks.ui5strap.bs3.Size", 
					defaultValue: ui5strapBs3Lib.Size.Default
				},
				disabled : {
					type:"boolean", 
					defaultValue:false
				},
				trail : {
					type:"pks.ui5strap.core.TrailHtml", 
					defaultValue:ui5strapCoreLib.TrailHtml.Space
				}
			},

			aggregations : { 
				items : {
					type : "pks.ui5strap.bs3.Item",
					singularName: "items"
				} 
			}

		};
	
	PositionSupport.meta(mMetaData);
	
	/**
	 * Constructor for a new SelectBox instance.
	 * 
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * 
	 * @class
	 * Control for creating Bootstrap select boxes.
	 * @extends ui5strap.ControlBase
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 0.11.6
	 * 
	 * @constructor
	 * @public
	 * @alias pks.ui5strap.bs3.SelectBox
	 * 
	 */
	var SelectBox = ControlBase.extend("pks.ui5strap.bs3.SelectBox", {
		metadata : mMetaData
	}),
	SelectBoxProto = SelectBox.prototype;
	
	PositionSupport.proto(SelectBoxProto);
	
	var _getInputValue = function(_this){
		return _this.$().val();
	};
	
	var _onChange = function(_this){
		return function(ev){
			var inputValue = _getInputValue(_this);
			if(inputValue !== _this.getValue()){ 
				_this.setProperty("value", inputValue, true);
			}
		}
	};

	SelectBoxProto.onAfterRendering = function(){
		this.$().on('change', _onChange(this));
	};

	SelectBoxProto.onBeforeRendering = function() {
		if (this.getDomRef()) {
			this.$().off();
			//this._curpos = this._$input.cursorPos();
		}
	};

	SelectBoxProto.setValue = function(sValue) {
		sValue = this.validateProperty("value", sValue);
		
		if (sValue != this.getValue()) {
			this.setProperty("value", sValue, true);
			if (this.getDomRef() && this.$().val() != sValue) {
				this.$().val(sValue);
				//this._curpos = this._$input.cursorPos();
			}
		}
		return this;
	};

	return SelectBox;
});