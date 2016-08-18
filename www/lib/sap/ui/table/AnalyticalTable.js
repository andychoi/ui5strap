/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./AnalyticalColumn','./Table','./TreeTable','./library','sap/ui/model/analytics/ODataModelAdapter','sap/ui/model/SelectionModel','sap/ui/model/Sorter','sap/ui/base/ManagedObject','sap/ui/core/Popup','sap/ui/unified/Menu','sap/ui/unified/MenuItem'],function(q,A,T,a,b,O,S,c,M,P,d,e){"use strict";var G=b.GroupEventType,f=b.SelectionBehavior,g=b.SelectionMode,h=b.SortOrder;var k=T.extend("sap.ui.table.AnalyticalTable",{metadata:{library:"sap.ui.table",properties:{sumOnTop:{type:"boolean",group:"Appearance",defaultValue:false},numberOfExpandedLevels:{type:"int",group:"Misc",defaultValue:0},autoExpandMode:{type:"string",group:"Misc",defaultValue:"Bundled"},columnVisibilityMenuSorter:{type:"any",group:"Appearance",defaultValue:null},collapseRecursive:{type:"boolean",defaultValue:true},dirty:{type:"boolean",group:"Appearance",defaultValue:null,deprecated:true}},designTime:true}});k.prototype._getFixedBottomRowContexts=function(){var B=this.getBinding("rows");if(B){return[B.getGrandTotalNode()];}};k.prototype._getContexts=a.prototype._getContexts;k.prototype.init=function(){T.prototype.init.apply(this,arguments);this.addStyleClass("sapUiAnalyticalTable");this.attachBrowserEvent("contextmenu",this._onContextMenu);this.setSelectionMode(g.MultiToggle);this.setShowColumnVisibilityMenu(true);this.setEnableColumnFreeze(true);this.setEnableCellFilter(true);this._aGroupedColumns=[];this._bSuspendUpdateAnalyticalInfo=false;};k.prototype.setFixedRowCount=function(){q.sap.log.error("The property fixedRowCount is not supported by the AnalyticalTable and must not be set!");return this;};k.prototype.setFixedBottomRowCount=function(){q.sap.log.error("The property fixedBottomRowCount is managed by the AnalyticalTable and must not be set!");return this;};k.prototype.setDirty=function(D){q.sap.log.error("The property \"dirty\" is deprecated. Please use \"showOverlay\".");this.setProperty("dirty",D,true);this.setShowOverlay(this.getDirty());return this;};k.prototype.getModel=function(n){var m=T.prototype.getModel.apply(this,arguments);var r=this.getBindingInfo("rows");if(m&&r&&r.model==n){O.apply(m);}return m;};k.prototype._onBindingChange=function(E){T.prototype._onBindingChange.apply(this,arguments);var r=typeof(E)==="object"?E.getParameter("reason"):E;if(r!=="sort"){this._invalidateColumnMenus();}};k.prototype.bindRows=function(B){var o=this._sanitizeBindingInfo.apply(this,arguments);var r=this.bindAggregation("rows",o);this._updateTotalRow(true);return r;};k.prototype._bindAggregation=function(n,p,t,s,F){if(n==="rows"){this.setProperty("firstVisibleRow",0,true);this._sanitizeBindingInfo.call(this,p,t,s,F);}return T.prototype._bindAggregation.apply(this,arguments);};k.prototype._initSelectionModel=function(s){this._oSelection=new S(s);return this;};k.prototype.setSelectionMode=function(s){if(s===g.None){q.sap.log.fatal("SelectionMode 'None' is not supported by the AnalyticalTable.");return this;}var B=this.getBinding("rows");if(B&&B.clearSelection){B.clearSelection();}this.setProperty("selectionMode",s);return this;};k.prototype.setSelectionBehavior=function(B){if(B===f.RowOnly){q.sap.log.fatal("SelectionBehavior 'RowOnly' is not supported by the AnalyticalTable.");return this;}else{return T.prototype.setSelectionBehavior.apply(this,arguments);}};k.prototype._sanitizeBindingInfo=function(B){var p,t,s,F;if(typeof B=="string"){p=arguments[0];t=arguments[1];s=arguments[2];F=arguments[3];B={path:p,sorter:s,filters:F};if(t instanceof M){B.template=t;}else if(typeof t==="function"){B.factory=t;}}var C=this.getColumns();for(var i=0,l=C.length;i<l;i++){if(C[i].getSorted()){B.sorter=B.sorter||[];B.sorter.push(new c(C[i].getSortProperty()||C[i].getLeadingProperty(),C[i].getSortOrder()===h.Descending));}}B.parameters=B.parameters||{};B.parameters.analyticalInfo=this._getColumnInformation();B.parameters.sumOnTop=this.getSumOnTop();B.parameters.numberOfExpandedLevels=this.getNumberOfExpandedLevels();B.parameters.autoExpandMode=this.getAutoExpandMode();var m=this.getModel(B.model);if(m){O.apply(m);}return B;};k.prototype._setSuppressRefresh=function(s){this._bSupressRefresh=s;return this;};k.prototype._attachBindingListener=function(){var B=this.getBinding("rows");if(B&&!B.hasListeners("selectionChanged")){B.attachSelectionChanged(this._onSelectionChanged,this);}T.prototype._attachDataRequestedListeners.apply(this);};k.prototype._getColumnInformation=function(){var C=[],t=this.getColumns();for(var i=0;i<this._aGroupedColumns.length;i++){var o=sap.ui.getCore().byId(this._aGroupedColumns[i]);if(!o){continue;}C.push({name:o.getLeadingProperty(),visible:o.getVisible(),grouped:o.getGrouped(),total:o.getSummed(),sorted:o.getSorted(),sortOrder:o.getSortOrder(),inResult:o.getInResult(),formatter:o.getGroupHeaderFormatter()});}for(var i=0;i<t.length;i++){var o=t[i];if(q.inArray(o.getId(),this._aGroupedColumns)>-1){continue;}if(!o instanceof A){q.sap.log.error("You have to use AnalyticalColumns for the Analytical table");}C.push({name:o.getLeadingProperty(),visible:o.getVisible(),grouped:o.getGrouped(),total:o.getSummed(),sorted:o.getSorted(),sortOrder:o.getSortOrder(),inResult:o.getInResult(),formatter:o.getGroupHeaderFormatter()});}return C;};k.prototype._updateTableRowContent=function(r,C,E,H,s,l,j){var R=r.$(),F=r.$("fixed"),$=this.$().find("div[data-sap-ui-rowindex="+R.attr("data-sap-ui-rowindex")+"]"),m=[R,F,$];this._getAccExtension().updateAriaForAnalyticalRow(r,R,$,F,C,E,l);for(var i=0;i<m.length;i++){m[i].attr({"data-sap-ui-level":l});m[i].data("sap-ui-level",l);m[i].toggleClass("sapUiAnalyticalTableSum",!C&&s).toggleClass("sapUiAnalyticalTableDummy",false).toggleClass("sapUiTableGroupHeader",C).toggleClass("sapUiTableRowHidden",C&&H);}q.sap.byId(r.getId()+"-groupHeader").toggleClass("sapUiTableGroupIconOpen",C&&E).toggleClass("sapUiTableGroupIconClosed",C&&!E).attr("title",j||null).text(j||"");if('ontouchstart'in document){var n=0;if(this.$().hasClass("sapUiTableVScr")){n+=this.$().find('.sapUiTableVSb').width();}var o=$.find(".sapUiTableGroupMenuButton");if(this._bRtlMode){o.css("right",(this.$().width()-o.width()+$.position().left-n)+"px");}else{o.css("left",(this.$().width()-o.width()-$.position().left-n)+"px");}}};k.prototype._updateTableContent=function(){var B=this.getBinding("rows"),F=this.getFirstVisibleRow(),j=this.getFixedBottomRowCount(),C=this.getVisibleRowCount(),m=this.getColumns(),t=this;var r=function(p){var $=p.getDomRefs(true);$.row.removeAttr("data-sap-ui-level");$.row.removeData("sap-ui-level");$.row.removeClass("sapUiTableGroupHeader sapUiAnalyticalTableSum sapUiAnalyticalTableDummy");t._getAccExtension().updateAriaForAnalyticalRow(p,$.rowScrollPart,$.rowSelector,$.rowFixedPart,false,false,-1);};var R=this.getRows();if(!B){for(var i=0;i<R.length;i++){r(R[i]);}return;}for(var n=0,l=Math.min(C,R.length);n<l;n++){var I=n>(C-j-1)&&B.getLength()>C,o=I?(B.getLength()-1-(C-1-n)):F+n,p=R[n],$=p.$(),s=this.$().find("div[data-sap-ui-rowindex="+$.attr("data-sap-ui-rowindex")+"]");var u;if(I&&B.bProvideGrandTotals){u=B.getGrandTotalContextInfo();}else{u=this.getContextInfoByIndex(o);}var L=u?u.level:0;if(!u||!u.context){r(p);if(u&&!u.context){$.addClass("sapUiAnalyticalTableDummy");s.addClass("sapUiAnalyticalTableDummy");}continue;}if(B.nodeHasChildren&&B.nodeHasChildren(u)){this._updateTableRowContent(p,true,u.nodeState.expanded,u.nodeState.expanded&&!this.getSumOnTop(),false,L,B.getGroupName(u.context,u.level));}else{this._updateTableRowContent(p,false,false,false,u.nodeState.sum,L,u.nodeState.sum&&u.level>0?B.getGroupName(u.context,u.level):null);}var v=p.getCells();for(var i=0,w=v.length;i<w;i++){var x=v[i].data("sap-ui-colindex");var y=m[x];var z=q(v[i].$().closest("td"));if(B.isMeasure(y.getLeadingProperty())){z.addClass("sapUiTableMeasureCell");z.toggleClass("sapUiTableCellHidden",u.nodeState.sum&&!y.getSummed());}else{z.removeClass("sapUiTableMeasureCell");}}}};k.prototype._onContextMenu=function(E){if(q(E.target).closest('tr').hasClass('sapUiTableGroupHeader')||q(E.target).closest('.sapUiTableRowHdr.sapUiTableGroupHeader').length>0){this._iGroupedLevel=q(E.target).closest('[data-sap-ui-level]').data('sap-ui-level');var m=this._getGroupHeaderMenu();var i=P.Dock;var l=E.pageX||E.clientX;var L=E.pageY||E.clientY;m.open(false,E.target,i.LeftTop,i.LeftTop,document,(l-2)+" "+(L-2));E.preventDefault();E.stopPropagation();return;}return true;};k.prototype._getGroupHeaderMenu=function(){var t=this;function j(){var i=t._iGroupedLevel-1;if(t._aGroupedColumns[i]){var l=t.getColumns().filter(function(C){if(t._aGroupedColumns[i]==C.getId()){return true;}})[0];return{column:l,index:i};}else{return undefined;}}if(!this._oGroupHeaderMenu){this._oGroupHeaderMenu=new d();this._oGroupHeaderMenuVisibilityItem=new e({text:this._oResBundle.getText("TBL_SHOW_COLUMN"),select:function(){var o=j();if(o){var C=o.column,s=C.getShowIfGrouped();C.setShowIfGrouped(!s);t.fireGroup({column:C,groupedColumns:C.getParent()._aGroupedColumns,type:(!s?G.showGroupedColumn:G.hideGroupedColumn)});}}});this._oGroupHeaderMenu.addItem(this._oGroupHeaderMenuVisibilityItem);this._oGroupHeaderMenu.addItem(new e({text:this._oResBundle.getText("TBL_UNGROUP"),select:function(){var l=t.getColumns(),F=0,L=-1,u=-1,C;for(var i=0;i<l.length;i++){C=l[i];if(C.getGrouped()){F++;if(F==t._iGroupedLevel){C._bSkipUpdateAI=true;var B=t.getBinding("rows");B.setNumberOfExpandedLevels(0);C.setGrouped(false);C._bSkipUpdateAI=false;u=i;t.fireGroup({column:C,groupedColumns:C.getParent()._aGroupedColumns,type:G.ungroup});}else{L=i;}}}if(L>-1&&u>-1&&u<L){var U=l[u];var H=U.getHeaderSpan();if(q.isArray(H)){H=H[0];}var r=[];for(var i=u;i<u+H;i++){r.push(l[i]);}q.each(r,function(I,C){t.removeColumn(C);t.insertColumn(C,L);});}t._updateColumns();t._getRowContexts();}}));this._oGroupHeaderMenu.addItem(new e({text:this._oResBundle.getText("TBL_UNGROUP_ALL"),select:function(){var l=t.getColumns();for(var i=0;i<l.length;i++){l[i]._bSkipUpdateAI=true;var B=t.getBinding("rows");B.setNumberOfExpandedLevels(0);l[i].setGrouped(false);l[i]._bSkipUpdateAI=false;}t._bSupressRefresh=true;t._updateColumns();t._getRowContexts();t._bSupressRefresh=false;t.fireGroup({column:undefined,groupedColumns:[],type:G.ungroupAll});}}));this._oGroupHeaderMoveUpItem=new e({text:this._oResBundle.getText("TBL_MOVE_UP"),select:function(){var o=j();if(o){var C=o.column;var i=q.inArray(C.getId(),t._aGroupedColumns);if(i>0){t._aGroupedColumns[i]=t._aGroupedColumns.splice(i-1,1,t._aGroupedColumns[i])[0];t.updateAnalyticalInfo();t.fireGroup({column:C,groupedColumns:C.getParent()._aGroupedColumns,type:G.moveUp});}}},icon:"sap-icon://arrow-top"});this._oGroupHeaderMenu.addItem(this._oGroupHeaderMoveUpItem);this._oGroupHeaderMoveDownItem=new e({text:this._oResBundle.getText("TBL_MOVE_DOWN"),select:function(){var o=j();if(o){var C=o.column;var i=q.inArray(C.getId(),t._aGroupedColumns);if(i<t._aGroupedColumns.length){t._aGroupedColumns[i]=t._aGroupedColumns.splice(i+1,1,t._aGroupedColumns[i])[0];t.updateAnalyticalInfo();t.fireGroup({column:C,groupedColumns:C.getParent()._aGroupedColumns,type:G.moveDown});}}},icon:"sap-icon://arrow-bottom"});this._oGroupHeaderMenu.addItem(this._oGroupHeaderMoveDownItem);this._oGroupHeaderMenu.addItem(new e({text:this._oResBundle.getText("TBL_SORT_ASC"),select:function(){var o=j();if(o){var C=o.column;C.sort(false);}},icon:"sap-icon://up"}));this._oGroupHeaderMenu.addItem(new e({text:this._oResBundle.getText("TBL_SORT_DESC"),select:function(){var o=j();if(o){var C=o.column;C.sort(true);}},icon:"sap-icon://down"}));this._oGroupHeaderMenu.addItem(new e({text:this._oResBundle.getText("TBL_COLLAPSE_LEVEL"),select:function(){t.getBinding("rows").collapseToLevel(t._iGroupedLevel-1);t.setFirstVisibleRow(0);t.clearSelection();}}));this._oGroupHeaderMenu.addItem(new e({text:this._oResBundle.getText("TBL_COLLAPSE_ALL"),select:function(){t.getBinding("rows").collapseToLevel(0);t.setFirstVisibleRow(0);t.clearSelection();}}));}var o=j();if(o){var C=o.column;if(C.getShowIfGrouped()){this._oGroupHeaderMenuVisibilityItem.setText(this._oResBundle.getText("TBL_HIDE_COLUMN"));}else{this._oGroupHeaderMenuVisibilityItem.setText(this._oResBundle.getText("TBL_SHOW_COLUMN"));}this._oGroupHeaderMoveUpItem.setEnabled(o.index>0);this._oGroupHeaderMoveDownItem.setEnabled(o.index<this._aGroupedColumns.length-1);}else{this._oGroupHeaderMoveUpItem.setEnabled(true);this._oGroupHeaderMoveDownItem.setEnabled(true);}return this._oGroupHeaderMenu;};k.prototype.expand=function(r){var B=this.getBinding("rows");if(B){B.expand(r);}};k.prototype.collapse=function(r){var B=this.getBinding("rows");if(B){B.collapse(r);}};k.prototype.collapseAll=function(){var B=this.getBinding("rows");if(B){B.collapseToLevel(0);this.setFirstVisibleRow(0);}return this;};k.prototype.isExpanded=function(r){var B=this.getBinding("rows");if(B){return B.isExpanded(r);}return false;};k.prototype.getContextByIndex=function(i){var B=this.getBinding("rows");return i>=0&&B?B.getContextByIndex(i):null;};k.prototype.getContextInfoByIndex=function(i){var B=this.getBinding("rows");return i>=0&&B?B.getNodeByIndex(i):null;};k.prototype._onColumnMoved=function(E){T.prototype._onColumnMoved.apply(this,arguments);this.updateAnalyticalInfo(true,true);};k.prototype.suspendUpdateAnalyticalInfo=function(){this._bSuspendUpdateAnalyticalInfo=true;};k.prototype.resumeUpdateAnalyticalInfo=function(s,F){this._bSuspendUpdateAnalyticalInfo=false;this._updateColumns(s,(F===false?false:true));};k.prototype.addColumn=function(C,s){var o=this._getColumn(C);if(o.getGrouped()){this._addGroupedColumn(o.getId());}T.prototype.addColumn.call(this,o,s);this._updateColumns(s);return this;};k.prototype.insertColumn=function(C,i,s){var o=this._getColumn(C);if(o.getGrouped()){this._addGroupedColumn(o.getId());}T.prototype.insertColumn.call(this,o,i,s);this._updateColumns(s);return this;};k.prototype.removeColumn=function(C,s){var r=T.prototype.removeColumn.apply(this,arguments);if(!this._iNewColPos){this._aGroupedColumns=q.grep(this._aGroupedColumns,function(v){if(C.getId){return v!=C.getId();}else{return v==C;}});}this.updateAnalyticalInfo(s);return r;};k.prototype.removeAllColumns=function(s){this._aGroupedColumns=[];var r=T.prototype.removeAllColumns.apply(this,arguments);this._updateColumns(s);return r;};k.prototype._getColumn=function(C){if(typeof C==="string"){var o=new A({leadingProperty:C,template:C,managed:true});return o;}else if(C instanceof A){return C;}else{throw new Error("Wrong column type. You need to define a string (property) or pass an AnalyticalColumnObject");}};k.prototype._updateColumns=function(s,F){if(!this._bSuspendUpdateAnalyticalInfo){this._updateTableColumnDetails();this.updateAnalyticalInfo(s,F);}};k.prototype.updateAnalyticalInfo=function(s,F){if(this._bSuspendUpdateAnalyticalInfo){return;}var B=this.getBinding("rows");if(B){var C=this._getColumnInformation();B.updateAnalyticalInfo(C,F);this._updateTotalRow(s);if(F&&this._bBusyIndicatorAllowed&&this.getEnableBusyIndicator()==true){this.setBusy(true);}}};k.prototype.refreshRows=function(){sap.ui.table.Table.prototype.refreshRows.apply(this,arguments);this._updateTotalRow();};k.prototype._updateTotalRow=function(s){var B=this.getBinding("rows");var F=this.getFixedBottomRowCount();if(B&&(B.providesGrandTotal()&&B.hasTotaledMeasures())){if(F!==1){this.setProperty("fixedBottomRowCount",1,s);}}else{if(F!==0){this.setProperty("fixedBottomRowCount",0,s);}}};k.prototype._updateTableColumnDetails=function(){if(this._bSuspendUpdateAnalyticalInfo){return;}var B=this.getBinding("rows"),r=B&&B.getAnalyticalQueryResult();if(r){var C=this.getColumns(),l=[],u=[],D=[],m={},n,p;for(var i=0;i<C.length;i++){n=C[i];n._isLastGroupableLeft=false;n._bLastGroupAndGrouped=false;n._bDependendGrouped=false;if(!n.getVisible()){continue;}var L=n.getLeadingProperty();p=r.findDimensionByPropertyName(L);if(p){var t=p.getName();if(!m[t]){m[t]={dimension:p,columns:[n]};}else{m[t].columns.push(n);}if(n.getGrouped()&&q.inArray(t,l)==-1){l.push(t);}if(q.inArray(t,D)==-1){D.push(t);}}}u=q.grep(D,function(s){return(q.inArray(s,l)==-1);});if(l.length>0){q.each(l,function(i,s){q.each(m[s].columns,function(j,o){if(!o.getGrouped()){o._bDependendGrouped=true;}});});if(l.length==D.length){p=r.findDimensionByPropertyName(sap.ui.getCore().byId(this._aGroupedColumns[this._aGroupedColumns.length-1]).getLeadingProperty());var v=m[p.getName()].columns;q.each(v,function(i,o){o._bLastGroupAndGrouped=true;});}}if(u.length==1){q.each(m[u[0]].columns,function(j,o){o._isLastGroupableLeft=true;});}}};k.prototype._getFirstMeasureColumnIndex=function(){var B=this.getBinding("rows"),r=B&&B.getAnalyticalQueryResult(),C=this._getVisibleColumns();if(!r){return-1;}for(var i=0;i<C.length;i++){var o=C[i],l=o.getLeadingProperty();if(r.findMeasureByName(l)||r.findMeasureByPropertyName(l)){return i;}}};k.prototype.getTotalSize=function(){var B=this.getBinding("rows");if(B){return B.getTotalSize();}return 0;};k.prototype._onPersoApplied=function(){T.prototype._onPersoApplied.apply(this,arguments);this._aGroupedColumns=[];var C=this.getColumns();for(var i=0,l=C.length;i<l;i++){if(C[i].getGrouped()){this._addGroupedColumn(C[i].getId());}}this._updateColumns();};k.prototype._addGroupedColumn=function(C){if(q.inArray(C,this._aGroupedColumns)<0){this._aGroupedColumns.push(C);}};k.prototype.getGroupedColumns=function(){return this._aGroupedColumns;};k.prototype.setCollapseRecursive=function(C){var B=this.getBinding("rows");if(B){if(B.setCollapseRecursive){B.setCollapseRecursive(C);}}this.setProperty("collapseRecursive",!!C,true);return this;};k.prototype._getSelectableRowCount=function(){var B=this.getBinding("rows");if(B){var r=B.getGrandTotalContextInfo();return r?r.numberOfLeafs:0;}};k.prototype.isIndexSelected=function(r){return a.prototype.isIndexSelected.call(this,r);};k.prototype.setSelectedIndex=function(r){return a.prototype.setSelectedIndex.call(this,r);};k.prototype.getSelectedIndices=function(){return a.prototype.getSelectedIndices.call(this);};k.prototype.setSelectionInterval=function(F,t){return a.prototype.setSelectionInterval.call(this,F,t);};k.prototype.addSelectionInterval=function(F,t){return a.prototype.addSelectionInterval.call(this,F,t);};k.prototype.removeSelectionInterval=function(F,t){return a.prototype.removeSelectionInterval.call(this,F,t);};k.prototype.selectAll=function(){return a.prototype.selectAll.call(this);};k.prototype.getSelectedIndex=function(){return a.prototype.getSelectedIndex.call(this);};k.prototype.clearSelection=function(){return a.prototype.clearSelection.call(this);};k.prototype._isRowSelectable=function(r){var B=this.getBinding("rows");if(B){return B.isIndexSelectable(r);}else{return false;}};k.prototype._getSelectedIndicesCount=a.prototype._getSelectedIndicesCount;return k;});
