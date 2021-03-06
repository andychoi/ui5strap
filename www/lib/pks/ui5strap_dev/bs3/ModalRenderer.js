/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.bs3.ModalRenderer
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

sap.ui.define(['jquery.sap.global', "./StaticOverlayRenderer"], function(jQuery, StaticOverlayRenderer) {
	
	"use strict";
	
	/**
	 * Modal renderer.
	 * @namespace
	 */
	var ModalRenderer = {};

	ModalRenderer.render = function(rm, oControl) {
		var header = oControl.getHeader(),
			body = oControl.getContent(),
			footer = oControl.getFooter();
		
		StaticOverlayRenderer.startRender(rm, oControl);

		rm.write("<div class='modal-dialog'>");
			rm.write('<div class="modal-content">');

			if(header.length > 0){
				rm.write('<div class="modal-header">');
				for(var i = 0; i < header.length; i++){ 
					rm.renderControl(header[i]);
				}
				rm.write("</div>");
			}

			if(body.length > 0){
				rm.write('<div class="modal-body">');
				
				StaticOverlayRenderer.renderContent(rm, oControl);
				
				rm.write("</div>");
			}

			if(footer.length > 0){
				rm.write('<div class="modal-footer">');
				for(var i = 0; i < footer.length; i++){ 
					rm.renderControl(footer[i]);
				}
				rm.write("</div>");
			}
			
			rm.write("</div>");
			
		rm.write("</div>");
		
		StaticOverlayRenderer.endRender(rm, oControl);
	};
	
	return ModalRenderer;

}, true);
