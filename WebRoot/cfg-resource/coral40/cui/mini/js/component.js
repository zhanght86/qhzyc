/*!
 * jQuery coral component 4.0.1
 */
(function(b,d){var a=0,c=Array.prototype.slice;b.cleanData=(function(e){return function(f){var h,j,g;for(g=0;(j=f[g])!=null;g++){try{h=b._data(j,"events");if(h&&h.remove){b(j).triggerHandler("remove")}}catch(k){}}e(f)}})(b.cleanData);b.component=function(e,f,m){var j,k,h,l,g={},i=e.split(".")[0];e=e.split(".")[1];j=i+"-"+e;if(!m){m=f;f=b.Component}b.expr[":"][j.toLowerCase()]=function(n){return !!b.data(n,j)};b[i]=b[i]||{};k=b[i][e];h=b[i][e]=function(n,o){if(!this._createComponent){return new h(n,o)}if(arguments.length){n=b.component.extend({},b.fn[e].defaults||{},this._parseOptions(o),n);this._createComponent(n,o)}};b.extend(h,k,{version:m.version,_proto:b.extend({},m),_childConstructors:[]});l=new f();l.options=b.component.extend({},l.options);b.each(m,function(o,n){if(!b.isFunction(n)){g[o]=n;return}g[o]=(function(){var p=function(){return f.prototype[o].apply(this,arguments)},q=function(r){return f.prototype[o].apply(this,r)};return function(){var t=this._super,r=this._superApply,s;this._super=p;this._superApply=q;s=n.apply(this,arguments);this._super=t;this._superApply=r;return s}})()});h.prototype=b.component.extend(l,{componentEventPrefix:k?(l.componentEventPrefix||e):e},g,{constructor:h,namespace:i,componentName:e,componentFullName:j});if(k){b.each(k._childConstructors,function(o,p){var n=p.prototype;b.component(n.namespace+"."+n.componentName,h,p._proto)});delete k._childConstructors}else{f._childConstructors.push(h)}b.component.bridge(e,h);return h};b.component.extend=function(j){var f=c.call(arguments,1),i=0,e=f.length,g,h;for(;i<e;i++){for(g in f[i]){h=f[i][g];if(f[i].hasOwnProperty(g)&&h!==d){if(b.isPlainObject(h)){j[g]=b.isPlainObject(j[g])?b.component.extend({},j[g],h):b.component.extend({},h)}else{j[g]=h}}}}return j};b.component.bridge=function(f,e){var g=e.prototype.componentFullName||f;b.fn[f]=function(j){var h=typeof j==="string",i=c.call(arguments,1),k=this;j=!h&&i.length?b.component.extend.apply(null,[j].concat(i)):j;
if(h){this.each(function(){var m,l=b.data(this,g);if(!l){return b.error("cannot call methods on "+f+" prior to initialization; attempted to call method '"+j+"'")}if(j==="instance"){k=l;return false}if(!b.isFunction(l[j])||j.charAt(0)==="_"){return b.error("no such method '"+j+"' for "+f+" component instance")}m=l[j].apply(l,i);if(m!==l&&m!==d){k=m&&m.jquery?k.pushStack(m.get()):m;return false}})}else{this.each(function(){var l=b.data(this,g);if(l){l.option(j||{});if(l._init){l._init()}}else{b.data(this,g,new e(j,this))}})}return k}};b.Component=function(){};b.Component._childConstructors=[];b.Component.prototype={componentName:"component",componentEventPrefix:"",defaultElement:"<div>",castProperties:null,options:{disabled:false,authorized:true,rendered:true,onCreate:null},formFieldArray:["autocomplete","autocompletetree","combobox","combotree","combogrid","checkbox","checkboxlist","datepicker","radio","radiolist","spinner","textbox","fileuploader"],panelArray:["accordion","dialog","form","grid","layout","panel","tabs","toolbar"],_createComponent:function(e,f){var g=this;f=b(f||this.defaultElement||this)[0];this.element=b(f);this.uuid=a++;this.eventNamespace="."+this.componentName+this.uuid;if(!this.element.attr("component-role")){this.element.attr("component-role",this.componentName)}this.options=b.component.extend({},this.options,this._getCreateOptions(),e);if(!this.options.authorized||this.options.authorized==="false"){this.element.remove()}this.bindings=b();this.hoverable=b();this.focusable=b();if(f!==this){b.data(f,this.componentFullName,this);this._on(true,this.element,{remove:function(h){if(h.target===f){this.destroy()}}});this.document=b(f.style?f.ownerDocument:f.document||f);this.window=b(this.document[0].defaultView||this.document[0].parentWindow)}this.element.prop("rendered",!!this.options.rendered);if(!this.options.rendered){this.element.addClass("coral-no-rendered");return}else{this.element.addClass("ctrl-init ctrl-init-"+this.componentName);this._create()
}this._renderComponent()},_renderComponent:function(){if(this.options.componentCls){this.component().addClass(this.options.componentCls)}if(this.options.cls){this.element.addClass(this.options.cls)}if(b.inArray(this.componentName,this.formFieldArray)>-1){this.element.addClass("ctrl-form-element coral-validation-"+this.componentName);b.validate.addField(this.element,this.options)}if(b.inArray(this.componentName,this.panelArray)>-1){this.component().addClass("ctrl-fit-element")}if(typeof this.element.attr("id")!="undefined"){this.options.id=this.element.attr("id")}else{if(this.options.id){this.element.attr("id",this.options.id)}else{this.options.id=this.element.uniqueId(this.componentName).attr("id")}}this.component().attr("component-id",this.options.id);this._trigger("onCreate",null,this._getCreateEventData());this._init()},_parseOptions:function(f){var e=b(f);return b.extend({},b.parser.parseOptions(f,[],this.castProperties))},_getCreateOptions:b.noop,_getCreateEventData:b.noop,_create:b.noop,_init:b.noop,valid:function(){var e={hasTips:false,element:this.element};return(b.validate.validateField(null,e).length>0?false:true)},isValid:function(){},destroy:function(){this._destroy();this.element.unbind(this.eventNamespace).removeData(this.componentName).removeData(this.componentFullName).removeData(b.camelCase(this.componentFullName));this.element.removeClass("ctrl-form-element ctrl-init ctrl-init-"+this.componentName);this.component().unbind(this.eventNamespace).removeAttr("aria-disabled").removeAttr("component-role").removeClass(this.componentFullName+"-disabled coral-state-disabled");this.element.removeAttr("component-role");this.element.removeAttr("data-options");this.bindings.unbind(this.eventNamespace);this.hoverable.removeClass("coral-state-hover");this.focusable.removeClass("coral-state-focus")},_destroy:b.noop,component:function(){return this.element},option:function(h,j){var e=h,k,g,f;if(arguments.length===0){return b.component.extend({},this.options)}if(typeof h==="string"){e={};
k=h.split(".");h=k.shift();if(k.length){g=e[h]=b.component.extend({},this.options[h]);for(f=0;f<k.length-1;f++){g[k[f]]=g[k[f]]||{};g=g[k[f]]}h=k.pop();if(arguments.length===1){return g[h]===d?null:g[h]}g[h]=j}else{if(arguments.length===1){return this.options[h]===d?null:this.options[h]}e[h]=j}}this._setOptions(e);return this},_setOptions:function(e){var f;for(f in e){this._setOption(f,e[f]);this.element.trigger("onOptionChange",{key:f,value:e[f]})}return this},_setOption:function(e,f){this.options[e]=f;if(e==="disabled"){this.component().toggleClass(this.componentFullName+"-disabled coral-state-disabled",!!f).attr("aria-disabled",f);if(f){this.hoverable.removeClass("coral-state-hover");this.focusable.removeClass("coral-state-focus")}}return this},enable:function(){return this._setOptions({disabled:false})},disable:function(){return this._setOptions({disabled:true})},show:function(){this.component().removeClass("coral-state-hidden").show()},hide:function(){this.component().addClass("coral-state-hidden").hide()},_pinyinEngine:function(){return new pinyinEngine()},_pinyinSetCache:function(h,f,g){for(var e in g){h.setCache([g[e][f]],g[e])}return h},_pinyinSearch:function(g,f,h){var e=[];g.search(f,function(i){e.push(i)});h(e)},_on:function(h,g,f){var i,e=this;if(typeof h!=="boolean"){f=g;g=h;h=false}if(!f){f=g;g=this.element;i=this.component()}else{g=i=b(g);this.bindings=this.bindings.add(g)}b.each(f,function(o,n){function l(){if(!h&&(e.options.disabled===true||b(this).hasClass("coral-state-disabled"))){return}return(typeof n==="string"?e[n]:n).apply(e,arguments)}if(typeof n!=="string"){l.guid=n.guid=n.guid||l.guid||b.guid++}var m=o.match(/^([\w:-]*)\s*(.*)$/),k=m[1]+e.eventNamespace,j=m[2];if(j){i.delegate(j,k,l)}else{g.bind(k,l)}})},_off:function(f,e){e=(e||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace;f.unbind(e).undelegate(e)},_delay:function(h,g){function f(){return(typeof h==="string"?e[h]:h).apply(e,arguments)}var e=this;return setTimeout(f,g||0)
},_hoverable:function(e){this.hoverable=this.hoverable.add(e);this._on(e,{mouseenter:function(f){b(f.currentTarget).addClass("coral-state-hover")},mouseleave:function(f){b(f.currentTarget).removeClass("coral-state-hover")}})},_focusable:function(e){this.focusable=this.focusable.add(e);this._on(e,{focusin:function(f){b(f.currentTarget).addClass("coral-state-focus")},focusout:function(f){b(f.currentTarget).removeClass("coral-state-focus")}})},addNoTrigger:function(e){this.options.noTriggerEvent.push(e)},_trigger:function(k,f,g){var h=this.options.noTriggerEvent||[];if(h.length){for(var j=0;j<h.length;j++){if(k==h[j]){h.splice(j,1);return}}}var e,m,l=b.isFunction(k)?k:b.coral.toFunction(this.options[k]),n={};g=g||{};f=b.Event(f);f.type=(k===this.componentEventPrefix?k:this.componentEventPrefix+k).toLowerCase();f.target=this.element[0];m=f.originalEvent;if(m){for(e in m){if(!(e in f)){f[e]=m[e]}}}this.element.trigger(f,g);f.data=f.data||{};b.extend(f.data,this.options.dataCustom);return !(b.isFunction(l)&&l.apply(this.element[0],[f].concat(g))===false||f.isDefaultPrevented())}};b.each({show:"fadeIn",hide:"fadeOut"},function(f,e){b.Component.prototype["_"+f]=function(i,h,k){if(typeof h==="string"){h={effect:h}}var j,g=!h?f:h===true||typeof h==="number"?e:h.effect||e;h=h||{};if(typeof h==="number"){h={duration:h}}j=!b.isEmptyObject(h);h.complete=k;if(h.delay){i.delay(h.delay)}if(j&&b.effects&&b.effects.effect[g]){i[f](h)}else{if(g!==f&&i[g]){i[g](h.duration,h.easing,k)}else{i.queue(function(l){b(this)[f]();if(k){k.call(i[0])}l()})}}}})})(jQuery);