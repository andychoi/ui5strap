/*
 * 
 * UI5Strap
 *
 * Label Renderer
 * 
 * Author: Jan Philipp Knöller
 * 
 * Copyright (c) 2013 Jan Philipp Knöller
 * 
 * http://pksoftware.de
 *
 * Get the latest version: https://github.com/pks5/ui5strap
 * 
 * Released under Apache2 license: http://www.apache.org/licenses/LICENSE-2.0.txt
 * 
 */

(function(){

	jQuery.sap.declare("de_pksoftware.ui5strap.controls.LabelRenderer");

	de_pksoftware.ui5strap.controls.LabelRenderer = {};

	de_pksoftware.ui5strap.controls.LabelRenderer.render = function(rm, oControl) {
		rm.write("<span");
		rm.writeControlData(oControl);
		rm.addClass("label label-" + oControl.getType() );
		rm.writeClasses();
		rm.write(">");
		
		rm.write(oControl.getText());
		
		rm.write("</span>");

	};

}());