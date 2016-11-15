sap.ui.define(['./library', 'sap/ui/core/Component'], function(library, Component){

	/**
	 * Constructor for a new RootComponent instance.
	 * 
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * 
	 * @class
	 * Root component for apps.
	 * @extends sap.ui.core.Component
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 0.11.0
	 * 
	 * @constructor
	 * @public
	 * @alias ui5strap.RootComponent
	 * 
	 */
	var RootComponent = Component.extend("ui5strap.RootComponent", {
		metadata : {
	    	interfaces : ["ui5strap.IRootComponent", "ui5strap.IRootNavigator"],
	    	
			properties : {
	            app: {
	            	type : "ui5strap.AppBase"
	            }
	        }
	    }
	
	}),
	RootComponentProto = RootComponent.prototype;
	
	/**
	 * Creates the Root Control asynchronously.
	 * FIXME: When using ui5strap.AppBase as app module, there is no method called _createRootControl.
	 */
	RootComponentProto._createRootControl = function(callback){
		return this.getApp()._createRootControl(callback);
	};
	
	/**
	 * Shows the app's initial content.
	 * TODO: This is only relevant when using ui5strap.App as app module.
	 */
	RootComponentProto._showInitialContent = function(callback, useTransitions){
		return this.getApp()._showInitialContent(callback, useTransitions);
	};
	
	/**
	 * Makes the app navigate to a certain page.
	 * TODO: This is only relevant when using ui5strap.App as app module.
	 */
	RootComponentProto._navigateTo = function(navControl, viewConfig, callback, suppressResolve, suppressHashChange, suppressTransitions){
		return this.getApp()._navigateTo(navControl, viewConfig, callback, suppressResolve, suppressHashChange, suppressTransitions);
	};
		
	return RootComponent;
});