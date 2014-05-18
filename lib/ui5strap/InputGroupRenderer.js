/*
 * 
 * UI5Strap
 *
 * InputGroup Renderer
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

	jQuery.sap.declare("ui5strap.InputGroupRenderer");

	ui5strap.InputGroupRenderer = {
	};

	ui5strap.InputGroupRenderer.render = function(rm, oControl) {
		var content = oControl.getContent(),
			size = oControl.getSize();
		
		rm.write("<div");
		rm.writeControlData(oControl);
		rm.addClass('input-group');

		if(ui5strap.Size.Default !== size){
			rm.addClass('input-group-' + ui5strap.BSSize[size]);
		}
		rm.writeClasses();
		rm.write(">");
		    
		for(var i = 0; i < content.length; i++){ 
			var item = content[i];
			
			var addonClass = null;
			if(item instanceof ui5strap.Text){
				item.setType(ui5strap.TextType.Default);
				addonClass = 'input-group-addon';
			}
			else if(item instanceof ui5strap.Button){
				addonClass = 'input-group-btn';
			}
			else if(item instanceof ui5strap.Checkbox || item instanceof ui5strap.Radio){
				addonClass = 'input-group-addon';
			}
			else if(item instanceof ui5strap.Input){

			}
			else{
				throw new Error('Control is not allowed witin InputGroup');
			}

			if(null !== addonClass){
				rm.write('<span class="' + addonClass + '">');
				rm.renderControl(item);
				rm.write("</span>");
			}
			else{
				rm.renderControl(item);
			}
		}
		    
		rm.write("</div>");
	};

}());