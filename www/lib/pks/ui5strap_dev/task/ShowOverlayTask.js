/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.task.ShowOverlayTask
 * 
 * @author Jan Philipp Knöller <info@pksoftware.de>
 * 
 * Homepage: http://ui5strap.com
 *
 * Copyright (c) 2013 Jan Philipp Knöller <info@pksoftware.de>
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

sap.ui.define(["./library", "../viewer/Task"], function(ui5strapTaskLib, Task){
	
	"use strict";
	
	/**
	 * Constructor for a new ShowOverlayTask instance.
	 * 
	 * @param {object} mSettings The task settings.
	 * @param {pks.ui5strap.viewer.ActionContext} oActionContext The action context to run the task on.
	 * 
	 * @class
	 * Shows an overlay.
	 * @extends pks.ui5strap.viewer.Task
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 1.0.2-SNAPSHOT
	 * 
	 * @constructor
	 * @public
	 * @alias pks.ui5strap.task.ShowOverlayTask
	 * 
	 */
	var ShowOverlayTask = Task.extend("pks.ui5strap.task.ShowOverlayTask"),
	/**
	 * @alias pks.ui5strap.task.ShowOverlayTask.prototype
	 */
		ShowOverlayTaskProto = ShowOverlayTask.prototype;

	/*
	* @Override
	*/
	ShowOverlayTaskProto.parameters = {
		"id" : {
			"required" : false, 
			"defaultValue" : null, 
			"type" : "string"
		},
		"type" : {
			"required" : false, 
			"defaultValue" : "HTML", 
			"type" : "string"
		},
		"viewName" : {
			"required" : true, 
			"type" : "string"
		},
		"target" : {
			"required" : true, 
			"type" : "string"
		},
		"parameters" : {
			"required" : false, 
			"defaultValue" : null, 
			"type" : "object"
		},
		"transition" : {
			"required" : false, 
			"defaultValue" : "slide-ttb", 
			"type" : "string"
		},
		"scope" : {
			"required" : false,
			"defaultValue" : "APP",
			"type" : "string"
		}
	};

	/**
	 * Run the task.
	* @override
	* @protected
	*/
	ShowOverlayTaskProto.run = function(){

		var _this = this,
			viewId = this.getParameter("id"),
			viewType = this.getParameter("type"),
			viewName = this.getParameter("viewName"),
			target = this.getParameter("target"),
			parameters = this.getParameter("parameters"),
			app = this.context.app,
			overlayParent = app;

		var viewOptions = {
			"appId" : app.getId(),
			"id" : viewId,
			"type" : viewType,
			"viewName" : viewName,
			"target" : target,
			"parameters" : parameters
		};
		
		if("VIEWER" === this.getParameter("scope")){
			if(!(app instanceof pks.ui5strap.viewer.SystemApp)){
				throw new Error("Only System Apps can open global overlays!");
			}
			overlayParent = app.getViewer();
		}
		
		overlayParent.showOverlay(viewOptions, function ShowOverlayTaskRunComplete(){
			_this.then();
		}, this.getParameter('transition'));
	};
	
	//Legacy
	ShowOverlayTaskProto.completed = function(){};

	return ShowOverlayTask;
});