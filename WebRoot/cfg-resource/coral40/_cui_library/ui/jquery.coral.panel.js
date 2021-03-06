/**
 * 组件库4.0：面板
 * 
 * 依赖JS文件：
 *    jquery.coral.core.js
 *    jquery.coral.component.js
 * 
 */

(function($) {
	
var timer = false, resizable = true;
$(window).unbind(".coral-panel").bind("resize.coral-panel",	function() {
	$.coral.beforeDoOverflow();
	if (!resizable) {
		return;
	}
	if (timer !== false) {
		clearTimeout(timer);
	}
	timer = setTimeout(function() {
		resizable = false;
		/*$(".ctrl-init-dialog:visible").each(function() {
			if ($(this).is(":visible")){$(this).dialog("refresh");}
		});*/
		var UI = $(".ctrl-init-layout:visible");
		// 用了layout就不能用refreshAllComponent
		if (UI.length) {
			UI.layout("refresh");
			
			$.coral.doOverflow();
		} else {
			$.coral.refreshAllComponent("body");
		}
		/*if (!resizable) {
			UI = $("div.ctrl-init-panel:visible");
			if (UI.length) {
				UI.panel("resize");
				resizable = true;
			}
		}*/
		timer = false;
		resizable = true;
	}, 200);
});
	
	

$.component( "coral.panel", {
	version: "4.0.2",
	options: {
		id: null,
		title: null,
		iconCls: null, 
		width: "auto", 
		height: "auto", 
		left:null, 
		top: null, 
		cls: null,
		headerCls: null,
		bodyCls: null,
		style: {},
		href:  null,
		cache: true,
		fit:   false,
		border: true,
		doSize: true,
		noheader:false,
		content: null,
		collapsible: false,
		minimizable: false,
		maximizable: false,
		closable:  false,
		collapsed: false,
		minimized: false,
		maximized: false,
		closed:false,
		tools: null,
		url:  null,
		loadtext:"加载中，请耐心等候...",
		loadingMessage:"Loading...",
		extractor: function(content) {
			var reg = /<body[^>]*>((.|[\n\r])*)<\/body>/im;
			var match = reg.exec(content);
			if(match) {
				return match[1];
			} else {
				return content;
			}
		},
		// 事件
		beforeOpen: $.noop,
		beforeClose: $.noop,
		beforeDestroy: $.noop,
		beforeCollapse: $.noop,
		beforeExpand: $.noop,
		
		onLoad: $.noop, 
		onOpen: $.noop,
		onClose: $.noop,
		onDestroy: $.noop,
		onResize: $.noop, /*参数(envent, {width, height})*/
		onMove: $.noop,   /*参数(envent, {left, top})*/
		onMaximize: $.noop,
		onRestore: $.noop,
		onMinimize: $.noop,
		onCollapse: $.noop,
		onExpand: $.noop
	},
	
	_create: function() {

		this.originalTitle = this.element.attr("title");
		this.element.removeAttr("title").addClass("ctrl-init ctrl-init-panel");
		this._createWrapper();
		this.isLoaded = false;
		
		this.element.appendTo(this.uiPanel);
		this._addHeader();
		this._setBorder();
		if (this.options.doSize == true) {
			this.uiPanel.css("display", "block");
			this._doSize();
		}
		if (this.options.closed == true || this.options.minimized == true) {
			this.close();
		} else {
			this.open();
		}
	},
	
	_createWrapper: function() {
		var that = this;
		this.element.addClass("coral-panel-body");
		this.uiPanel = $("<div class=\"coral-panel\"></div>").insertBefore(this.element);
	},
	
	_fit: function(fit) {
		return $.coral.panel.fit(this.uiPanel, fit);
	},
	
	_doSize: function(options){
		var opts  = this.options,
		    panel = this.uiPanel,
		    header = panel.children("div.coral-panel-header"),
		    body   = panel.children("div.coral-panel-body");
		if (options) {
			if (options.width) {
				opts.width = options.width;
			}
			if (options.height) {
				opts.height = options.height;
			}
			if (options.left != null) {
				opts.left = options.left;
			}
			if (options.top != null) {
				opts.top = options.top;
			}
		}
		opts.fit ? $.extend(opts, this._fit()) : this._fit(false);
		panel.css({
			left : opts.left,
			top : opts.top
		});
		if (!isNaN(opts.width)) {
			panel.outerWidth(opts.width);
		} else {
			panel.width("auto");
		}
		header.add(body).outerWidth(panel.width());
		if (!isNaN(opts.height)) {
			panel.outerHeight(opts.height);
			body.outerHeight(panel.height() - header.outerHeight());
		} else {
			body.height("auto");
		}
		panel.css("height", "");
		this._trigger("onResize", null, { width: opts.width, height: opts.height });
		this._doResize();
	},
	
	_setBorder: function() {
		var opts   = this.options,
		    panel  = this.uiPanel,
		    header = this.header(),
		    body   = this.body();
		if (!$.isEmptyObject(opts.style)) {
			panel.css(opts.style);
		}
		if (opts.border) {
			header.removeClass("coral-panel-header-noborder");
			body.removeClass("coral-panel-body-noborder");
		} else {
			header.addClass("coral-panel-header-noborder");
			body.addClass("coral-panel-body-noborder");
		}
		header.addClass(opts.headerCls);
		body.addClass(opts.bodyCls);
		/*if (opts.id) {
			$(this.element).attr("id", opts.id);
		} else {
			$(this.element).attr("id", "");
		}//*/
	},
	
	_addHeader: function() {
		var opts  = this.options,
		    panel = this.uiPanel,
		    that  = this;
		if (opts.tools && typeof opts.tools == "string") {
			panel.find(">div.coral-panel-header>div.coral-panel-tool .coral-panel-tool-a")
				.appendTo(opts.tools);
		}
		panel.children("div.coral-panel-header").remove();
		if ( opts.title && !opts.noheader ) {
			var title = $( "<div class=\"coral-panel-header\"><div class=\"coral-panel-title\">" + 
				opts.title + "</div></div>" ).prependTo(panel);
			if ( opts.iconCls ) {
				title.find(".coral-panel-title").addClass("coral-panel-with-icon");
				$("<div class=\"coral-panel-icon\"></div>").addClass(opts.iconCls).appendTo(title);
			}
			var tool = $("<div class=\"coral-panel-tool\"></div>").appendTo(title);
			tool.bind("click", function(e) {
				e.stopPropagation();
			});
			if ( opts.tools ) {
				if (typeof opts.tools == "string") {
					$(opts.tools).children().each(function() {
						$(this).addClass(
							$(this).attr("iconCls"))
								.addClass("coral-panel-tool-a")
								.appendTo(tool);
					});
				} else {
					for ( var i = 0; i < opts.tools.length; i++) {
						var t = $("<a href=\"javascript:void(0)\"></a>").addClass(opts.tools[i].iconCls).appendTo(tool);
						if (opts.tools[i].handler) {
							t.bind("click", eval(opts.tools[i].handler));
						}
					}
				}
			}
			if ( opts.collapsible ) {
				$("<a class=\"icon icon-arrow-up coral-panel-tool-collapse\" href=\"javascript:void(0)\"></a>")
					.appendTo(tool).bind("click", function() {
						if (opts.collapsed === true) {
							that.expand(true);
						} else {
							that.collapse(true);
						}
						return false;
					});
			}
			if ( opts.minimizable ) {
				$("<a class=\"icon icon-minus coral-panel-tool-min\" href=\"javascript:void(0)\"></a>")
					.appendTo(tool).bind("click", function() {
						that.minimize();
						return false;
					});
			}
			if ( opts.maximizable ) {
				$("<a class=\"icon icon-expand3 coral-panel-tool-max\" href=\"javascript:void(0)\"></a>")
					.appendTo(tool).bind("click", function() {
						if ( opts.maximized === true ) {
							that.restore();
						} else {
							that.maximize();
						}
						return false;
					});
			}
			if ( opts.closable ) {
				$("<a class=\"icon icon-close coral-panel-tool-close\" href=\"javascript:void(0)\"></a>")
					.appendTo(tool).bind("click", function() {
						that.close();
						return false;
					});
			}
			panel.children("div.coral-panel-body").removeClass("coral-panel-body-noheader");
		} else {
			panel.children("div.coral-panel-body").addClass("coral-panel-body-noheader");
		}
	},
	_loadData: function() {
		var opts = this.options,
		    that = this;
		if ( opts.url ) {
			if ( !that.isLoaded || !opts.cache ) {
				that.isLoaded = false;
				if ( opts.loadingMessage ) {
					that.element.html( $("<div class=\"coral-panel-loading\"></div>").html(opts.loadingMessage) );
				}
				/*$(this.element).loading({
					position:   "overlay",
					text:       this.options.loadtext
				});*/
				// 如果重复刷新panel，需要将上一次的请求终止。
				if ( this.xhr ){
					this.xhr.abort();
				}
				this.xhr = $.ajax(this._ajaxSettings( ));
				this.xhr
					.success(function( content ) {
						that.setContent( opts.extractor.call( that.element, content ) );
						that._trigger( "onLoad", null, arguments );
						that.isLoaded = true;
					}).complete(function( jqXHR, status ) {
						if ( jqXHR === that.xhr ) {
						    that.xhr = null;
						}
					});
			}
		} else {
			if (opts.content) {
				if (!that.isLoaded) {
					that.setContent(opts.content);
					that.isLoaded = true;
				}
			}
		}
	},
	_ajaxSettings :function(){
		var opts = this.options,
	        that = this;
		return {
			url : opts.url,
			cache : false,
			dataType : "html"
		};
	},
	_doResize: function() {
		$.coral.refreshAllComponent(this.element);
	},
	_destroy : function(forceDestroy) {
		if (forceDestroy != true) {
			if (this._trigger("beforeDestroy") == false) {
				return;
			}
		}
		if (this.originalTitle) {
			this.element.attr("title", this.originalTitle);
		}
		this.element.removeClass("coral-panel-body").detach();
		this.element.insertAfter(this.component());
		this.component().remove();
		this._trigger("onDestroy");
	},
	component : function() {
		return this.uiPanel;
	},
	getOptions : function() {
		return this.options;
	},
	header : function() {
		return this.uiPanel.find(">div.coral-panel-header");
	},
	body : function() {
		return this.uiPanel.find(">div.coral-panel-body");
	},
	setTitle : function(title) {
		this.options.title = title;
		this.header().find("div.coral-panel-title").html(title);
	},
	// 设置内容
	setContent: function(content) {
		this.element.children().remove();
		this.element.html(content);
		if ($.parser) {
			$.parser.parse(this.element);
		}
	},
	open : function(forceOpen) {
		var opts    = this.options,
		    restore = null;
		if (forceOpen != true) {
			if (this._trigger("beforeOpen", null) === false) {
				return;
			}
		}
		this.uiPanel.show();
		opts.closed = false;
		opts.minimized = false;
		restore = this.uiPanel.children("div.coral-panel-header").find("a.coral-panel-tool-restore");
		if (restore.length) {
			opts.maximized = true;
		}
		this._trigger("onOpen");
		if (opts.maximized === true) {
			opts.maximized = false;
			this.maximize();
		}
		if (opts.collapsed === true) {
			opts.collapsed = false;
			this.collapse();
		}
		if (!opts.collapsed) {
			this._loadData();
			this._doResize();
		}
	},
	close : function(forceClose) {
		var opts = this.options;
		var panel = this.uiPanel;
		if (forceClose != true) {
			if (this._trigger("beforeClose", null) == false) {
				return;
			}
		}
		this._fit(false);
		panel.hide();
		opts.closed = true;
		this._trigger("onClose");
	},
	refresh : function(url) {
		this.isLoaded = false;
		if (url) {
			this.options.url = url;
		}
		this._loadData();
	},
	reLoad : function(url) {
		this.refresh();
	},
	resize : function(options) {
		this._doSize(options);
	},
	move : function(options) {
		var opts = this.options;
		if (options) {
			if (options.left != null) {
				opts.left = options.left;
			}
			if (options.top != null) {
				opts.top = options.top;
			}
		}
		this.uiPanel.css({
			left : opts.left,
			top : opts.top
		});
		this._trigger("onMove", null, { left: opts.left, top: opts.top });
	},
	maximize : function() {
		var opts = this.options;
		if (opts.maximized == true) {
			return;
		}
		this.uiPanel.children("div.coral-panel-header")
		            .find("a.coral-panel-tool-max")
		            .addClass("coral-panel-tool-restore");
		if (!this.original) {
			this.original = {
				width : opts.width,
				height : opts.height,
				left : opts.left,
				top : opts.top,
				fit : opts.fit
			};
		}
		opts.left = 0;
		opts.top = 0;
		opts.fit = true;
		this._doSize();
		opts.minimized = false;
		opts.maximized = true;
		this._trigger("onMaximize");
	},
	minimize : function() {
		this._fit(false);
		this.uiPanel.hide();
		this.options.minimized = true;
		this.options.maximized = false;
		this._trigger("onMinimize");
	},
	restore : function() {
		if (this.options.maximized == false) {
			return;
		}
		this.uiPanel.show();
		this.uiPanel.children("div.coral-panel-header")
		            .find("a.coral-panel-tool-max")
		            .removeClass("coral-panel-tool-restore");
		$.extend(this.options, this.original);
		this._doSize();
		this.options.minimized = false;
		this.options.maximized = false;
		this.original = null;
		this._trigger("onRestore");
	},
	collapse : function(animate) {
		var opts = this.options,
		    body = this.body(),
		    that = this;
		if (opts.collapsed == true) {
			return;
		}
		body.stop(true, true);
		if (that._trigger("beforeCollapse") == false) {
			return;
		}
		this.header().find("a.coral-panel-tool-collapse").addClass("coral-panel-tool-expand");
		if (animate == true) {
			body.slideUp("normal", function() {
				opts.collapsed = true;
				that._trigger("onCollapse");
			});
		} else {
			body.hide();
			opts.collapsed = true;
			that._trigger("onCollapse");
		}
	},
	expand : function(animate) {
		var opts = this.options,
		    body = this.body(),
		    that = this;
		if (opts.collapsed == false) {
			return;
		}
		body.stop(true, true);
		if (that._trigger("beforeExpand") == false) {
			return;
		}
		this.header().find("a.coral-panel-tool-collapse").removeClass("coral-panel-tool-expand");
		if (animate == true) {
			body.slideDown("normal", function() {
				opts.collapsed = false;
				that._trigger("onExpand");
				that._loadData();
				that._doResize();
			});
		} else {
			body.show();
			opts.collapsed = false;
			that._trigger("onExpand");
			that._loadData();
			that._doResize();
		}
	}
});

/**
 * 面板自适应
 */
$.coral.panel.fit = function ($ele, fit) {
	fit = (fit == undefined ? true : fit);
	var jqUI = $ele.parent()[0];
	jqUI = $(jqUI);
	if (fit) {
		if (!jqUI.hasClass("coral-panel-noscroll")) {
			jqUI.addClass("coral-panel-noscroll");
			if (jqUI.attr("tagName") == "BODY") {
				$("html").addClass("coral-panel-fit");
			}
		}
	} else {
		if (jqUI.hasClass("coral-panel-noscroll")) {
			jqUI.removeClass("coral-panel-noscroll");
			if (jqUI.attr("tagName") == "BODY") {
				$("html").removeClass("coral-panel-fit");
			}
		}
	}
	return {
		width: jqUI.width(),
		height: jqUI.height()
	};
};

})(jQuery);
