/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.core.ListItemBase
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

sap.ui.define(['./library', "./ControlBase", './SelectableSupport'], function(ui5strapCoreLib, ControlBase, SelectableSupport){
	
	"use strict";
	
	var _meta = {
			interfaces : [],
			
			defaultAggregation : "content",
			
			library : "pks.ui5strap.core",

			properties : { 
				
			},
			
			aggregations : { 
				content : {
					singularName: "content"
				}
			}

		};
	
	SelectableSupport.meta(_meta);
	
	/**
	 * Constructor for a new ListItemBase instance.
	 * 
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * 
	 * @class
	 * Abstract base class for all list item controls
	 * @extends pks.ui5strap.core.ControlBase
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 1.0.0-SNAPSHOT
	 * 
	 * @constructor
	 * @public
	 * @alias pks.ui5strap.core.ListItemBase
	 * 
	 */
	var ListItemBase = ControlBase.extend("pks.ui5strap.core.ListItemBase", /** @lends pks.ui5strap.core.ListItemBase.prototype */ {
		metadata : _meta,
		renderer: null
	}),
	/**
	 * @alias pks.ui5strap.core.ListItemBase.prototype
	 */
	ListItemBaseProto = ListItemBase.prototype;

	SelectableSupport.proto(ListItemBaseProto);
	
	return ListItemBase;
});