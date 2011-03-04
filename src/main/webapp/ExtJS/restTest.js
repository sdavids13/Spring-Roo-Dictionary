Ext.onReady(function(){
	var app = new Ext.FormPanel({
		renderTo: 'ext-placeholder',
		labelAlign: 'top',
        autoScroll: true,
        width: 400,
        margins: '5',
        padding: '5',
        labelWidth: 100,
        defaults: {
    		width: 390
    	},
    	buttons: [{
        	text: 'Test',
        	width: 75,
        	handler: function() {
        		var form = app.getForm();
        		form.findField('status').reset();
    			form.findField('headers').reset();
				form.findField('rawview').reset();
        		var url = form.findField('uri').getValue();
        		var method = form.findField('method').getValue();
        		var mimetype = form.findField('mimetype').getValue();
        		var content = form.findField('content').getValue();
        		var params = {
        			url: url,
	        		headers: {
	        			'Accept': mimetype
	        		},
	        		jsonData: content,
	        		method: method,
	        		callback: function(opts, success, response) {
        				form.findField('status').setValue(response.status + ' ' + response.statusText);
        				form.findField('headers').setValue(response.getAllResponseHeaders());
	        			form.findField('rawview').setValue(response.responseText);
	        		}	
        		};
        		if(mimetype == 'application/json') {
        			params['jsonData'] = content;
        		} else if (mimetype == 'application/xml') {
        			params['xmlData'] = content;
        		}
        		Ext.Ajax.request(params);
        	}
        }],
        items: [{
        	xtype: 'textfield',
        	name: 'uri',
        	fieldLabel: 'Resource URI',
        	value: '/Dictionary/words'
    	}, {
        	xtype: 'combo',
        	name: 'method',
        	mode: 'local',
        	triggerAction: 'all',
        	fieldLabel: 'Method',
        	displayField: 'name',
        	value: 'GET',
        	listeners: {
        		'select' : function(combo, record, index){
        			var content = combo.findParentByType('form').getForm().findField('content');
        			if(record.data.name == 'GET' || record.data.name == 'DELETE') {
        				content.disable();
        			} else {
        				content.enable();
        			}
        		}
        	},
        	store: new Ext.data.ArrayStore({
        	    autoDestroy: true,
        	    fields: [
        	       'name'
        	    ],
        	    data: [['GET'], ['POST'], ['PUT'], ['DELETE']]
        	})
        },{
        	xtype: 'combo',
        	mode: 'local',
        	name: 'mimetype',
        	triggerAction: 'all',
        	fieldLabel: 'Choose Mime Type',
        	displayField: 'name',
        	value: 'application/json',
        	store: new Ext.data.ArrayStore({
        	    autoDestroy: true,
        	    fields: [
        	       'name'
        	    ],
        	    data: [['application/json'], ['application/xml']]
        	})
        },{
        	xtype: 'textarea',
        	name: 'content',
        	fieldLabel: 'Content',
        	disabled: true
        },{
        	xtype: 'displayfield',
        	name: 'status',
        	fieldLabel: 'Status'
        },{
        	xtype: 'tabpanel',
        	fieldLabel: 'Response',
        	activeItem: 0,
        	height: 200,
        	items: [{
        		xtype: 'textarea',
        		name: 'rawview',
        		title: 'Raw View'
        	},{
        		xtype: 'textarea',
        		name: 'headers',
        		title: 'Headers'
        	}],
        	bbar: [{
        		text: 'View Response as HTML',
        		handler: function() {
        			var content = app.getForm().findField('rawview').getValue();
        			var win = new Ext.Window({
        				title: 'Http Response',
        				width: 400,
        				height: 300,
        				autoScroll: true,
        				closable: true,
        				plain: true,
        				html: content
        			});
        			win.show();
        		}
        	}]
        }]
	});
//	
//	new Ext.Window({
//		width: '700px',
//		items: app,
//		buttons: [{
//        	text: 'Test',
//        	width: 75,
//        	handler: function() {
//        		var form = app.getForm();
//        		form.findField('status').reset();
//    			form.findField('headers').reset();
//				form.findField('rawview').reset();
//        		var url = form.findField('uri').getValue();
//        		var name = form.findField('name').getValue();
//        		var method = form.findField('method').getValue();
//        		var mimetype = form.findField('mimetype').getValue();
//        		var content = form.findField('content').getValue();
//        		var params = {
//        			url: servletUrl + url + (name != null && name != '' ? '/' + name : ''),
//	        		headers: {
//	        			'Accept': mimetype
//	        		},
//	        		jsonData: content,
//	        		method: method,
//	        		callback: function(opts, success, response) {
//        				form.findField('status').setValue(response.status + ' ' + response.statusText);
//        				form.findField('headers').setValue(response.getAllResponseHeaders());
//	        			form.findField('rawview').setValue(response.responseText);
//	        		}	
//        		};
//        		if(mimetype == 'application/json') {
//        			params['jsonData'] = content;
//        		} else if (mimetype == 'application/xml') {
//        			params['xmlData'] = content;
//        		}
//        		Ext.Ajax.request(params);
//        	}
//        }]
//	}).show();
});