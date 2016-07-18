sap.ui.define(['ui5strap/ControlBase', './jquery.knob.min'], function(ControlBase){

    "use strict";
    
	//Define the Constructor
    var Knob = ControlBase.extend("com.ui5strap.apps.demoapp.controls.Knob", {
    
        metadata : {

            library : "com.ui5strap.apps.demoapp",
      
            properties : {
            	
            	value : {
            		type : "int",
            		defaultValue : 0
            	}
            	
            },
      
            aggregations : {},
            
            events : {}

        }
    }),
    KnobProto = Knob.prototype;

    KnobProto._getStyleClassPrefix = function(){
        //You should specifiy a really unique prefix here.
        return "knob";
    };
    
    KnobProto.onBeforeRendering = function(){
    	this._$knob = null;
    };
    
    KnobProto.onAfterRendering = function(){
    	this._$knob = this._$getPart('knob').knob();
    };
    
    KnobProto.exit = function(){
    	this._$knob = null;
    };
    
    //return Constructor
    return Knob;

});