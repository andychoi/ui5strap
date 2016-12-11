/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.bs3.ListItemRenderer
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
	 * List item renderer.
	 * @namespace
	 */
	var ListItemRenderer = {};

	ListItemRenderer.render = function(rm, oControl) {
		rm.write("<li");
		rm.writeControlData(oControl);
		
		rm.addClass(oControl._getStyleClass());

		rm.writeClasses();

		rm.write(">");

		RenderUtils.renderContent(rm, oControl);

		rm.write("</li>");
	};
	
	return ListItemRenderer;

}, true);