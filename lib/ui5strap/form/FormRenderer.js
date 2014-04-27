/*
 * 
 * UI5Strap
 *
 * form.FormRenderer
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

	jQuery.sap.declare("de_pksoftware.ui5strap.form.FormRenderer");

	de_pksoftware.ui5strap.form.FormRenderer = {};

	de_pksoftware.ui5strap.form.FormRenderer.render = function(rm, oControl) {
		var content = oControl.getContent(),
			action = oControl.getAction(),
			method = oControl.getMethod(),
			navbarAlign = oControl.getNavbarAlign(),
			type = oControl.getType();

		rm.write("<form");
		
		rm.writeControlData(oControl);
		rm.writeAttribute('role', 'form');
		if('' !== action){
			rm.writeAttribute('action', action);
		}
		if('' !== method){
			rm.writeAttribute('method', method);
		}
		if(ui5strap.FormType.Horizontal === type){
			rm.addClass('form-horizontal');
		}
		if(ui5strap.NavBarAlignment.None !== navbarAlign){
			rm.addClass('navbar-form');
			if(ui5strap.NavBarAlignment.Default !== navbarAlign){
				rm.addClass(ui5strap.BSNavBarAlignment[navbarAlign]);
			}
		}
		rm.writeClasses();
		rm.write(">");
		
		for(var i = 0; i < content.length; i++){ 
			rm.renderControl(content[i]);
		}
		
		rm.write("</form>");
	};

}());