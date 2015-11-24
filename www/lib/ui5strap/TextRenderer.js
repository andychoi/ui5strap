/*
 * 
 * UI5Strap
 *
 * ui5strap.TextRenderer
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

(function(){

	jQuery.sap.declare("ui5strap.TextRenderer");


	ui5strap.TextRenderer = {
		typeToTag : {
			Default : { 
				tagName : null,
				className : null
			},
			Phrasing : {
				tagName : "span",
				className : null
			},
			Strong : {
				tagName : "strong",
				className : null
			},
			Emphasized : {
				tagName : "em",
				className : null
			},
			Paragraph : {
				tagName : "p",
				className : null
			},
			Blockquote : {
				tagName : "blockquote",
				className : null
			},
			Quote : {
				tagName : "q",
				className : null
			},
			Preformatted : {
				tagName : "pre",
				className : null
			},
			Code : {
				tagName : "code",
				className : null
			},
			Small : {
				tagName : "small",
				className : null
			},
			Lead : {
				tagName : "p",
				className : "lead"
			},
			Abbreviation : {
				tagName : "abbr",
				className : null
			},
			HelpBlock : {
				tagName : "p",
				className : "help-block"
			},
			Label : {
				tagName : "span",
				className : "label"
			},
			Badge : {
				tagName : "span",
				className : "badge"
			}
 		}

	};

	ui5strap.TextRenderer.render = function(rm, oControl) {
		var severity = oControl.getSeverity(),
			type = oControl.getType(),
			text = oControl.getText(),
			parse = oControl.getParse(),
			title = oControl.getTitle(),
			textAlign = oControl.getTextAlign();

		if(parse){
			text = ui5strap.RenderUtils.parseText(text);
		}

		if(ui5strap.TextType.Default === type){
			//Text only
			//TODO still needed?
			if(parse){
				rm.write(text);
			}
			else{
				rm.writeEscaped(text);
			}
		}
		else{
			//Text with tag
			var tagData = this.typeToTag[type];

			rm.write("<" + tagData.tagName);
			rm.writeControlData(oControl);
			
			//CSS Classes
			if(ui5strap.Severity.None !== severity){
				rm.addClass("text-" + ui5strap.BSSeverity[severity]);
			}
			
			if(ui5strap.TextAlignment.Default !== textAlign){
				rm.addClass("ui5strap-text-align-" + textAlign.toLowerCase());
			}
			
			if(tagData.className){
				rm.addClass(tagData.className);
			}
			
			rm.writeClasses();
			
			//Title
			if('' !== title){
	    		rm.writeAttribute('title', title);
	    	}
			
			rm.write(">");
				
				//Content
				ui5strap.RenderUtils.renderContent(rm, oControl, text, parse);
			
			rm.write("</" + tagData.tagName + ">");

		}
		
		//Trail
		ui5strap.RenderUtils.renderTrail(rm, oControl);
	};

}());
