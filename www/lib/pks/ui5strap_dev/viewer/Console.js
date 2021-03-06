/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.viewer.Console
 * 
 * @author Jan Philipp Knöller <info@pksoftware.de>
 * 
 * Homepage: http://ui5strap.com
 *
 * Copyright (c) 2013-2015 Jan Philipp Knöller <info@pksoftware.de>
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

sap.ui.define(['./library', '../core/ControlBase'], function(ui5strapViewerLib, ControlBase){
	
	"use strict";
	
	var defaultLogName = '__DEFAULT_LOG';
	
	/**
	 * Constructor for a new Console instance.
	 * 
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * 
	 * @class
	 * Control for creating a output console.
	 * @extends pks.ui5strap.core.ControlBase
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 1.0.2-SNAPSHOT
	 * 
	 * @constructor
	 * @public
	 * @alias ui5strap.Console
	 * 
	 */
	var Console = ControlBase.extend("pks.ui5strap.viewer.Console", /** @lends pks.ui5strap.viewer.Console.prototype */ {
		metadata : {

			library : "pks.ui5strap.viewer",
			properties : { 
				"logLevel" : {
					type:"int", 
					defaultValue:6
				},
				"currentLog" : {
					type:"string",
					defaultValue : defaultLogName
				}
			},

		},
		
		renderer : function(rm, oControl) {
			rm.write("<div");
			rm.writeControlData(oControl);
			rm.addClass("ui5strap-console-container");
			rm.writeClasses();
			rm.write(">");
			    
		   		rm.write("<div");
		   		rm.addClass("ui5strap-console");
		   		rm.writeClasses();
			    rm.write(">");
			    
			    rm.write("<div");
		   		rm.addClass("ui5strap-console-inner");
		   		rm.writeClasses();
			    rm.write(">");
			    
			    rm.write("</div>");
			rm.write("</div>");
			    
			rm.write("</div>");
		}
	}),
	/**
	 * @alias pks.ui5strap.viewer.Console.prototype
	 */
	ConsolePrototype = Console.prototype;

	Console.MAX_SIZE = 200;
	Console.MAX_LINES = 500;

	//Object vars
	ConsolePrototype._firstLineNr = null;
	ConsolePrototype._scrollTimer = null;

	ConsolePrototype.init = function(){
		this._scrollTimer = null;

		this._firstLineNr = 0;
		this._logs = {};
		this._logs[defaultLogName] = [];
	};

	ConsolePrototype.setCurrentLog = function(logName){
		if(!logName){
			logName = defaultLogName;
		}
		
		this.setProperty("currentLog", logName, true);
		
		if(!this._logs[logName]){
			this._logs[logName] = [];
		}

	};

	ConsolePrototype.setLogLevel = function(newLogLevel){
		this.setProperty("logLevel", newLogLevel, true);
	}; 

	ConsolePrototype.setBuffer = function(buffer){
		this._logs = buffer;
	};

	ConsolePrototype.getBuffer = function(){
		return this._logs;
	};

	Console.dateString = function(){
	    var d = new Date();
	    
	    var dateMonth = (d.getMonth() + 1);
	    if(dateMonth < 10) dateMonth = '0' + dateMonth;
	    
	    var dateDay = d.getDate();
	    if(dateDay < 10) dateDay = '0' + dateDay;

	    var dateHour = d.getHours();
	    if(dateHour < 10) dateHour = '0' + dateHour;

	    var dateMinutes = d.getMinutes();
	    if(dateMinutes < 10) dateMinutes = '0' + dateMinutes;
	    
	    var dateSeconds = d.getSeconds();
	    if(dateSeconds < 10) dateSeconds = '0' + dateSeconds;

	    return d.getFullYear() + '-' + dateMonth + '-' + dateDay + ' ' + dateHour + ':' + dateMinutes + ':' + dateSeconds;
	};

	ConsolePrototype.addLine = function(line, logType, logName){
		if(typeof logType === 'undefined' || null === logType){
			logType = 'info';
		}

		if(typeof logName === 'undefined' || null === logName){
			logName = defaultLogName;
		}

		if(!(logName in this._logs)){
			this._logs[logName] = [];
		}

		this._logs[logName].push({
			"logType" : logType,
			"message" : line,
			"date" : Console.dateString()
		});

		if(null !== this._scrollTimer){
			return;
		}

		this._scrollTimer = window.setTimeout(jQuery.proxy(function(){

			

			if(logName === this.getCurrentLog()){
					this.flush();

					this._scrollToBottom();
					
			}


			if(this._logs[logName].length > Console.MAX_SIZE){
				var toDelete = this._logs[logName].length - Console.MAX_SIZE;
				this._firstLineNr += toDelete;
				this._logs[logName].splice(0, toDelete);
			}

			this._scrollTimer = null;
		}, this), 100);	
	};

	ConsolePrototype.flush = function(){
		var logName = this.getCurrentLog();
		
		if(!(logName in this._logs)){
			throw new Error("Cannot flush undefined log: '" + logName + "'");
		}

		//We dont need to flush an empty log
		if(0 === this._logs[logName].length){
			return;
		}

		var $console = this.$().find('.ui5strap-console');
		if($console.size() > 0){
			var $consoleInner = $console.find('.ui5strap-console-inner');

			var startAt = 0;

			if($consoleInner.size() > 0){
				var oldLogName = $consoleInner.attr('data-log-name');

				if(oldLogName === logName){
					var lastLineNo = parseInt($consoleInner.attr('data-last-line-no'));

					if(lastLineNo >= this._firstLineNr){
						startAt = lastLineNo - this._firstLineNr + 1;
					}

					$consoleInner.detach();
				}
				else{ 
					$consoleInner.remove();
					$consoleInner = jQuery('<div class="ui5strap-console-inner ui5strap-console-inner-' + logName + '" data-log-name="' + logName + '"></div>');
					
				}
			}
			else{ 
				$consoleInner = jQuery('<div class="ui5strap-console-inner ui5strap-console-inner-' + logName + '" data-log-name="' + logName + '"></div>');
				
			}

			

			var lastLineNo = null;
			for(var i = startAt; i < this._logs[logName].length; i++){
				var line = this._logs[logName][i];
				lastLineNo = i + this._firstLineNr;
				$consoleInner.append('<div class="ui5strap-console-line ui5strap-console-line-' + line.logType  + '" data-line-no="' + lastLineNo + '">' + lastLineNo + ' ' + line.date + ' ' + line.message.replace(/\n/g, '<br />') + '</div>');
			}

			if(null !== lastLineNo){
				$consoleInner.attr('data-last-line-no', lastLineNo);
			}

			
			
			//Remove old lines
			
			var $lines = $consoleInner.find('.ui5strap-console-line');
			var i=0;
			var toDelete = $lines.size() - Console.MAX_LINES;
			while(i < toDelete){
				$lines[i].remove();
				i++;
			}

			$console.append($consoleInner);
			
		}
	};

	ConsolePrototype._scrollToBottom = function(scrollY){
		var $inner = this.$().find('.ui5strap-console');
		if($inner.size() > 0){
				$inner[0].scrollTop = scrollY ? scrollY : $inner[0].scrollHeight;
		}
	};

	ConsolePrototype.info = function(message, logName){
		if(this.getLogLevel() >= jQuery.sap.log.Level.INFO){
			this.addLine(message, 'info', logName);
		}
	};

	ConsolePrototype.debug = function(message, logName){
		if(this.getLogLevel() >= jQuery.sap.log.Level.DEBUG){
			this.addLine(message, 'debug', logName);
		}
	};

	ConsolePrototype.warning = function(message, logName){
		if(this.getLogLevel() >= jQuery.sap.log.Level.WARNING){
			this.addLine(message, 'warning', logName);
		}
	};

	ConsolePrototype.error = function(message, logName){
		if(this.getLogLevel() >= jQuery.sap.log.Level.ERROR){
			this.addLine(message, 'error', logName);
		}
	};

	ConsolePrototype.fatal = function(message, logName){
		if(this.getLogLevel() >= jQuery.sap.log.Level.FATAL){
			this.addLine(message, 'fatal', logName);
		}
	};

	ConsolePrototype.onBeforeRendering = function(){
        if(this.getDomRef()){
            this._scrollTop = this.$().find('.ui5strap-console')[0].scrollTop;

            this._$controlContent = this.$().children().first().detach();
		}
	};

	ConsolePrototype.onAfterRendering = function(){
        if(null !== this._$controlContent){
            this._scrollToBottom(this._scrollTop);
			
			this.flush();

            this.$().html(this._$controlContent);

            this._$controlContent = null;
		}
        else{
            this.flush();
        }
    };
    
    return Console;
});