/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.bs3.PanelRenderer
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

sap.ui.define(['jquery.sap.global', "../core/RenderUtils"], function(jQuery, RenderUtils) {
	
	"use strict";
	
	/**
	 * Panel renderer.
	 * @namespace
	 */
	var PanelRenderer = {};

	PanelRenderer.render = function(rm, oControl) {
		var severity = oControl.getSeverity(),
			collapse = oControl.getCollapse();

		rm.write("<div");
		rm.writeControlData(oControl);
		rm.addClass(oControl._getStyleClass());
		rm.writeClasses();
		rm.write(">");
		
		if(oControl.getTitle() || oControl.getTitleContent().length){
			rm.write("<div");
			rm.addClass("panel-heading");
			rm.writeClasses();
			rm.write(">");
			
			RenderUtils.renderTitleContent(rm, oControl);

			rm.write("</div>");
		}
		
		if(collapse){
			rm.write('<div id="panel-collapse---' + oControl.getId()+'"');
			rm.addClass("panel-collapse collapse");
			if(!oControl.getCollapsed()){
				rm.addClass('in');
			}
			rm.writeClasses();
			rm.write(">");
		}

		rm.write("<div");
		rm.addClass("panel-body");
		rm.writeClasses();
		rm.write(">");

		RenderUtils.renderContent(rm, oControl);
		
		rm.write("</div>");
		
		if(collapse){
			rm.write("</div>");
		}
		
		rm.write("</div>");
	};

	return PanelRenderer;
}, true);