!function(t,e){t.Backbone=e(t,{},t._,t.jQuery||t.Zepto||t.ender||t.$)}(this,function(t,e,i,s){{var n=t.Backbone,r=[],a=(r.push,r.slice);r.splice}e.VERSION="1.1.2",e.$=s,e.noConflict=function(){return t.Backbone=n,this},e.emulateHTTP=!1,e.emulateJSON=!1;var o=e.Events={on:function(t,e,i){if(!c(this,"on",t,[e,i])||!e)return this;this._events||(this._events={});var s=this._events[t]||(this._events[t]=[]);return s.push({callback:e,context:i,ctx:i||this}),this},once:function(t,e,s){if(!c(this,"once",t,[e,s])||!e)return this;var n=this,r=i.once(function(){n.off(t,r),e.apply(this,arguments)});return r._callback=e,this.on(t,r,s)},off:function(t,e,s){var n,r,a,o,h,u,l,d;if(!this._events||!c(this,"off",t,[e,s]))return this;if(!t&&!e&&!s)return this._events=void 0,this;for(o=t?[t]:i.keys(this._events),h=0,u=o.length;u>h;h++)if(t=o[h],a=this._events[t]){if(this._events[t]=n=[],e||s)for(l=0,d=a.length;d>l;l++)r=a[l],(e&&e!==r.callback&&e!==r.callback._callback||s&&s!==r.context)&&n.push(r);n.length||delete this._events[t]}return this},trigger:function(t){if(!this._events)return this;var e=a.call(arguments,1);if(!c(this,"trigger",t,e))return this;var i=this._events[t],s=this._events.all;return i&&u(i,e),s&&u(s,arguments),this},stopListening:function(t,e,s){var n=this._listeningTo;if(!n)return this;var r=!e&&!s;s||"object"!=typeof e||(s=this),t&&((n={})[t._listenId]=t);for(var a in n)t=n[a],t.off(e,s,this),(r||i.isEmpty(t._events))&&delete this._listeningTo[a];return this}},h=/\s+/,c=function(t,e,i,s){if(!i)return!0;if("object"==typeof i){for(var n in i)t[e].apply(t,[n,i[n]].concat(s));return!1}if(h.test(i)){for(var r=i.split(h),a=0,o=r.length;o>a;a++)t[e].apply(t,[r[a]].concat(s));return!1}return!0},u=function(t,e){var i,s=-1,n=t.length,r=e[0],a=e[1],o=e[2];switch(e.length){case 0:for(;++s<n;)(i=t[s]).callback.call(i.ctx);return;case 1:for(;++s<n;)(i=t[s]).callback.call(i.ctx,r);return;case 2:for(;++s<n;)(i=t[s]).callback.call(i.ctx,r,a);return;case 3:for(;++s<n;)(i=t[s]).callback.call(i.ctx,r,a,o);return;default:for(;++s<n;)(i=t[s]).callback.apply(i.ctx,e);return}},l={listenTo:"on",listenToOnce:"once"};i.each(l,function(t,e){o[e]=function(e,s,n){var r=this._listeningTo||(this._listeningTo={}),a=e._listenId||(e._listenId=i.uniqueId("l"));return r[a]=e,n||"object"!=typeof s||(n=this),e[t](s,n,this),this}}),o.bind=o.on,o.unbind=o.off,i.extend(e,o);var d=e.Model=function(t,e){var s=t||{};e||(e={}),this.cid=i.uniqueId("c"),this.attributes={},e.collection&&(this.collection=e.collection),e.parse&&(s=this.parse(s,e)||{}),s=i.defaults({},s,i.result(this,"defaults")),this.set(s,e),this.changed={},this.initialize.apply(this,arguments)};i.extend(d.prototype,o,{changed:null,validationError:null,idAttribute:"id",initialize:function(){},toJSON:function(){return i.clone(this.attributes)},sync:function(){return e.sync.apply(this,arguments)},get:function(t){return this.attributes[t]},escape:function(t){return i.escape(this.get(t))},has:function(t){return null!=this.get(t)},set:function(t,e,s){var n,r,a,o,h,c,u,l;if(null==t)return this;if("object"==typeof t?(r=t,s=e):(r={})[t]=e,s||(s={}),!this._validate(r,s))return!1;a=s.unset,h=s.silent,o=[],c=this._changing,this._changing=!0,c||(this._previousAttributes=i.clone(this.attributes),this.changed={}),l=this.attributes,u=this._previousAttributes,this.idAttribute in r&&(this.id=r[this.idAttribute]);for(n in r)e=r[n],i.isEqual(l[n],e)||o.push(n),i.isEqual(u[n],e)?delete this.changed[n]:this.changed[n]=e,a?delete l[n]:l[n]=e;if(!h){o.length&&(this._pending=s);for(var d=0,f=o.length;f>d;d++)this.trigger("change:"+o[d],this,l[o[d]],s)}if(c)return this;if(!h)for(;this._pending;)s=this._pending,this._pending=!1,this.trigger("change",this,s);return this._pending=!1,this._changing=!1,this},unset:function(t,e){return this.set(t,void 0,i.extend({},e,{unset:!0}))},clear:function(t){var e={};for(var s in this.attributes)e[s]=void 0;return this.set(e,i.extend({},t,{unset:!0}))},hasChanged:function(t){return null==t?!i.isEmpty(this.changed):i.has(this.changed,t)},changedAttributes:function(t){if(!t)return this.hasChanged()?i.clone(this.changed):!1;var e,s=!1,n=this._changing?this._previousAttributes:this.attributes;for(var r in t)i.isEqual(n[r],e=t[r])||((s||(s={}))[r]=e);return s},previous:function(t){return null!=t&&this._previousAttributes?this._previousAttributes[t]:null},previousAttributes:function(){return i.clone(this._previousAttributes)},fetch:function(t){t=t?i.clone(t):{},void 0===t.parse&&(t.parse=!0);var e=this,s=t.success;return t.success=function(i){return e.set(e.parse(i,t),t)?(s&&s(e,i,t),void e.trigger("sync",e,i,t)):!1},P(this,t),this.sync("read",this,t)},save:function(t,e,s){var n,r,a,o=this.attributes;if(null==t||"object"==typeof t?(n=t,s=e):(n={})[t]=e,s=i.extend({validate:!0},s),n&&!s.wait){if(!this.set(n,s))return!1}else if(!this._validate(n,s))return!1;n&&s.wait&&(this.attributes=i.extend({},o,n)),void 0===s.parse&&(s.parse=!0);var h=this,c=s.success;return s.success=function(t){h.attributes=o;var e=h.parse(t,s);return s.wait&&(e=i.extend(n||{},e)),i.isObject(e)&&!h.set(e,s)?!1:(c&&c(h,t,s),void h.trigger("sync",h,t,s))},P(this,s),r=this.isNew()?"create":s.patch?"patch":"update","patch"===r&&(s.attrs=n),a=this.sync(r,this,s),n&&s.wait&&(this.attributes=o),a},destroy:function(t){t=t?i.clone(t):{};var e=this,s=t.success,n=function(){e.trigger("destroy",e,e.collection,t)};if(t.success=function(i){(t.wait||e.isNew())&&n(),s&&s(e,i,t),e.isNew()||e.trigger("sync",e,i,t)},this.isNew())return t.success(),!1;P(this,t);var r=this.sync("delete",this,t);return t.wait||n(),r},url:function(){var t=i.result(this,"urlRoot")||i.result(this.collection,"url")||B();return this.isNew()?t:t.replace(/([^\/])$/,"$1/")+encodeURIComponent(this.id)},parse:function(t){return t},clone:function(){return new this.constructor(this.attributes)},isNew:function(){return!this.has(this.idAttribute)},isValid:function(t){return this._validate({},i.extend(t||{},{validate:!0}))},_validate:function(t,e){if(!e.validate||!this.validate)return!0;t=i.extend({},this.attributes,t);var s=this.validationError=this.validate(t,e)||null;return s?(this.trigger("invalid",this,s,i.extend(e,{validationError:s})),!1):!0}});var f=["keys","values","pairs","invert","pick","omit"];i.each(f,function(t){d.prototype[t]=function(){var e=a.call(arguments);return e.unshift(this.attributes),i[t].apply(i,e)}});var g=e.Collection=function(t,e){e||(e={}),e.model&&(this.model=e.model),void 0!==e.comparator&&(this.comparator=e.comparator),this._reset(),this.initialize.apply(this,arguments),t&&this.reset(t,i.extend({silent:!0},e))},p={add:!0,remove:!0,merge:!0},v={add:!0,remove:!1};i.extend(g.prototype,o,{model:d,initialize:function(){},toJSON:function(t){return this.map(function(e){return e.toJSON(t)})},sync:function(){return e.sync.apply(this,arguments)},add:function(t,e){return this.set(t,i.extend({merge:!1},e,v))},remove:function(t,e){var s=!i.isArray(t);t=s?[t]:i.clone(t),e||(e={});var n,r,a,o;for(n=0,r=t.length;r>n;n++)o=t[n]=this.get(t[n]),o&&(delete this._byId[o.id],delete this._byId[o.cid],a=this.indexOf(o),this.models.splice(a,1),this.length--,e.silent||(e.index=a,o.trigger("remove",o,this,e)),this._removeReference(o,e));return s?t[0]:t},set:function(t,e){e=i.defaults({},e,p),e.parse&&(t=this.parse(t,e));var s=!i.isArray(t);t=s?t?[t]:[]:i.clone(t);var n,r,a,o,h,c,u,l=e.at,f=this.model,g=this.comparator&&null==l&&e.sort!==!1,v=i.isString(this.comparator)?this.comparator:null,m=[],w=[],_={},y=e.add,x=e.merge,b=e.remove,k=!g&&y&&b?[]:!1;for(n=0,r=t.length;r>n;n++){if(h=t[n]||{},a=h instanceof d?o=h:h[f.prototype.idAttribute||"id"],c=this.get(a))b&&(_[c.cid]=!0),x&&(h=h===o?o.attributes:h,e.parse&&(h=c.parse(h,e)),c.set(h,e),g&&!u&&c.hasChanged(v)&&(u=!0)),t[n]=c;else if(y){if(o=t[n]=this._prepareModel(h,e),!o)continue;m.push(o),this._addReference(o,e)}o=c||o,!k||!o.isNew()&&_[o.id]||k.push(o),_[o.id]=!0}if(b){for(n=0,r=this.length;r>n;++n)_[(o=this.models[n]).cid]||w.push(o);w.length&&this.remove(w,e)}if(m.length||k&&k.length)if(g&&(u=!0),this.length+=m.length,null!=l)for(n=0,r=m.length;r>n;n++)this.models.splice(l+n,0,m[n]);else{k&&(this.models.length=0);var E=k||m;for(n=0,r=E.length;r>n;n++)this.models.push(E[n])}if(u&&this.sort({silent:!0}),!e.silent){for(n=0,r=m.length;r>n;n++)(o=m[n]).trigger("add",o,this,e);(u||k&&k.length)&&this.trigger("sort",this,e)}return s?t[0]:t},reset:function(t,e){e||(e={});for(var s=0,n=this.models.length;n>s;s++)this._removeReference(this.models[s],e);return e.previousModels=this.models,this._reset(),t=this.add(t,i.extend({silent:!0},e)),e.silent||this.trigger("reset",this,e),t},push:function(t,e){return this.add(t,i.extend({at:this.length},e))},pop:function(t){var e=this.at(this.length-1);return this.remove(e,t),e},unshift:function(t,e){return this.add(t,i.extend({at:0},e))},shift:function(t){var e=this.at(0);return this.remove(e,t),e},slice:function(){return a.apply(this.models,arguments)},get:function(t){return null==t?void 0:this._byId[t]||this._byId[t.id]||this._byId[t.cid]},at:function(t){return this.models[t]},where:function(t,e){return i.isEmpty(t)?e?void 0:[]:this[e?"find":"filter"](function(e){for(var i in t)if(t[i]!==e.get(i))return!1;return!0})},findWhere:function(t){return this.where(t,!0)},sort:function(t){if(!this.comparator)throw new Error("Cannot sort a set without a comparator");return t||(t={}),i.isString(this.comparator)||1===this.comparator.length?this.models=this.sortBy(this.comparator,this):this.models.sort(i.bind(this.comparator,this)),t.silent||this.trigger("sort",this,t),this},pluck:function(t){return i.invoke(this.models,"get",t)},fetch:function(t){t=t?i.clone(t):{},void 0===t.parse&&(t.parse=!0);var e=t.success,s=this;return t.success=function(i){var n=t.reset?"reset":"set";s[n](i,t),e&&e(s,i,t),s.trigger("sync",s,i,t)},P(this,t),this.sync("read",this,t)},create:function(t,e){if(e=e?i.clone(e):{},!(t=this._prepareModel(t,e)))return!1;e.wait||this.add(t,e);var s=this,n=e.success;return e.success=function(t,i){e.wait&&s.add(t,e),n&&n(t,i,e)},t.save(null,e),t},parse:function(t){return t},clone:function(){return new this.constructor(this.models)},_reset:function(){this.length=0,this.models=[],this._byId={}},_prepareModel:function(t,e){if(t instanceof d)return t;e=e?i.clone(e):{},e.collection=this;var s=new this.model(t,e);return s.validationError?(this.trigger("invalid",this,s.validationError,e),!1):s},_addReference:function(t){this._byId[t.cid]=t,null!=t.id&&(this._byId[t.id]=t),t.collection||(t.collection=this),t.on("all",this._onModelEvent,this)},_removeReference:function(t){this===t.collection&&delete t.collection,t.off("all",this._onModelEvent,this)},_onModelEvent:function(t,e,i,s){("add"!==t&&"remove"!==t||i===this)&&("destroy"===t&&this.remove(e,s),e&&t==="change:"+e.idAttribute&&(delete this._byId[e.previous(e.idAttribute)],null!=e.id&&(this._byId[e.id]=e)),this.trigger.apply(this,arguments))}});var m=["forEach","each","map","collect","reduce","foldl","inject","reduceRight","foldr","find","detect","filter","select","reject","every","all","some","any","include","contains","invoke","max","min","toArray","size","first","head","take","initial","rest","tail","drop","last","without","difference","indexOf","shuffle","lastIndexOf","isEmpty","chain","sample"];i.each(m,function(t){g.prototype[t]=function(){var e=a.call(arguments);return e.unshift(this.models),i[t].apply(i,e)}});var w=["groupBy","countBy","sortBy","indexBy"];i.each(w,function(t){g.prototype[t]=function(e,s){var n=i.isFunction(e)?e:function(t){return t.get(e)};return i[t](this.models,n,s)}});var _=e.View=function(t){this.cid=i.uniqueId("view"),t||(t={}),i.extend(this,i.pick(t,x)),this._ensureElement(),this.initialize.apply(this,arguments),this.delegateEvents()},y=/^(\S+)\s*(.*)$/,x=["model","collection","el","id","attributes","className","tagName","events"];i.extend(_.prototype,o,{tagName:"div",$:function(t){return this.$el.find(t)},initialize:function(){},render:function(){return this},remove:function(){return this.$el.remove(),this.stopListening(),this},setElement:function(t,i){return this.$el&&this.undelegateEvents(),this.$el=t instanceof e.$?t:e.$(t),this.el=this.$el[0],i!==!1&&this.delegateEvents(),this},delegateEvents:function(t){if(!t&&!(t=i.result(this,"events")))return this;this.undelegateEvents();for(var e in t){var s=t[e];if(i.isFunction(s)||(s=this[t[e]]),s){var n=e.match(y),r=n[1],a=n[2];s=i.bind(s,this),r+=".delegateEvents"+this.cid,""===a?this.$el.on(r,s):this.$el.on(r,a,s)}}return this},undelegateEvents:function(){return this.$el.off(".delegateEvents"+this.cid),this},_ensureElement:function(){if(this.el)this.setElement(i.result(this,"el"),!1);else{var t=i.extend({},i.result(this,"attributes"));this.id&&(t.id=i.result(this,"id")),this.className&&(t["class"]=i.result(this,"className"));var s=e.$("<"+i.result(this,"tagName")+">").attr(t);this.setElement(s,!1)}}}),e.sync=function(t,s,n){var r=k[t];i.defaults(n||(n={}),{emulateHTTP:e.emulateHTTP,emulateJSON:e.emulateJSON});var a={type:r,dataType:"json"};if(n.url||(a.url=i.result(s,"url")||B()),null!=n.data||!s||"create"!==t&&"update"!==t&&"patch"!==t||(a.contentType="application/json",a.data=JSON.stringify(n.attrs||s.toJSON(n))),n.emulateJSON&&(a.contentType="application/x-www-form-urlencoded",a.data=a.data?{model:a.data}:{}),n.emulateHTTP&&("PUT"===r||"DELETE"===r||"PATCH"===r)){a.type="POST",n.emulateJSON&&(a.data._method=r);var o=n.beforeSend;n.beforeSend=function(t){return t.setRequestHeader("X-HTTP-Method-Override",r),o?o.apply(this,arguments):void 0}}"GET"===a.type||n.emulateJSON||(a.processData=!1),"PATCH"===a.type&&b&&(a.xhr=function(){return new ActiveXObject("Microsoft.XMLHTTP")});var h=n.xhr=e.ajax(i.extend(a,n));return s.trigger("request",s,h,n),h};var b=!("undefined"==typeof window||!window.ActiveXObject||window.XMLHttpRequest&&(new XMLHttpRequest).dispatchEvent),k={create:"POST",update:"PUT",patch:"PATCH","delete":"DELETE",read:"GET"};e.ajax=function(){return e.$.ajax.apply(e.$,arguments)};var E=e.Router=function(t){t||(t={}),t.routes&&(this.routes=t.routes),this._bindRoutes(),this.initialize.apply(this,arguments)},A=/\((.*?)\)/g,I=/(\(\?)?:\w+/g,S=/\*\w+/g,D=/[\-{}\[\]+?.,\\\^$|#\s]/g;i.extend(E.prototype,o,{initialize:function(){},route:function(t,s,n){i.isRegExp(t)||(t=this._routeToRegExp(t)),i.isFunction(s)&&(n=s,s=""),n||(n=this[s]);var r=this;return e.history.route(t,function(i){var a=r._extractParameters(t,i);r.execute(n,a),r.trigger.apply(r,["route:"+s].concat(a)),r.trigger("route",s,a),e.history.trigger("route",r,s,a),e.history.addHistoryData({name:s,fragment:i}),e.history._updateHistory(i,{fragment:i,name:s})}),this},execute:function(t,e){t&&t.apply(this,e)},navigate:function(t,i){return e.history.navigate(t,i),this},_bindRoutes:function(){if(this.routes){this.routes=i.result(this,"routes");for(var t,e=i.keys(this.routes);null!=(t=e.pop());)this.route(t,this.routes[t])}},_routeToRegExp:function(t){return t=t.replace(D,"\\$&").replace(A,"(?:$1)?").replace(I,function(t,e){return e?t:"([^/?]+)"}).replace(S,"([^?]*?)"),new RegExp("^"+t+"(?:\\?([\\s\\S]*))?$")},_extractParameters:function(t,e){var s=t.exec(e).slice(1);return i.map(s,function(t,e){return e===s.length-1?t||null:t?decodeURIComponent(t):null})}});var H=e.History=function(){this.handlers=[],i.bindAll(this,"checkUrl"),"undefined"!=typeof window&&(this.location=window.location,this.history=window.history)},T=/^[#\/]|\s+$/g,F=/msie [\w.]+/;H.started=!1,i.extend(H.prototype,o,{stack:[],_activeIndex:0,_lastActiveIndex:-1,getActive:function(){return this.stack[this._activeIndex]},getLastActive:function(){return this._lastActiveIndex>-1?this.stack[this._lastActiveIndex]:null},getActiveIndex:function(){return this._activeIndex},getLastActiveIndex:function(){return this._lastActiveIndex},getPrev:function(){return this.stack[this._activeIndex-1]},getNext:function(){return this.stack[this._activeIndex+1]},getHistoryIndex:function(t){for(var e=this.stack.length-1;e>-1;e--)if(t===this.stack[e].fragment)return e;return-1},getLastPageHistory:function(){var t=0,e=this.stack;if(e.length>1){var i=this.getActive(),s=i.name;for(t=this._activeIndex-1;t>-1;t--)if(s){if(s!=e[t].name)return e[t]}else s=e[t].name;return this.getPrev()}return null},_setActiveIndex:function(t){t!==this._activeIndex&&(this._lastActiveIndex=this._activeIndex,this._activeIndex=t)},_addNew:function(t){this.getNext()&&this._clearForward(),this.stack.push({fragment:t,title:document.title}),this._setActiveIndex(this.stack.length-1)},_clearForward:function(){this.stack=this.stack.slice(0,this._activeIndex+1)},_updateHistory:function(t,e){for(var i=this.stack.length-1;i>-1;i--)t===this.stack[i].fragment&&(this.stack[i],this.stack[i].fragment=e.fragment,this.stack[i].name=e.name)},directHashChange:function(t){var e,i,n,r=0,a=(this.getActive(),this._activeIndex);s.each(this.stack,function(s,o){t.currentUrl===o.fragment&&(r=s-a,e=0>r,i=!e,n=s)}),this._setActiveIndex(void 0!==n?n:this._activeIndex),(e||i)&&t.either&&t.either(r),e&&t.isBack?t.isBack(0-r):i&&t.isForward&&t.isForward(r)},interval:50,getHash:function(t){var e=t?t.location:window.location,i=e.href.match(/#(.*)$/);return i?i[1]:""},getFragment:function(t,e){if(null==t)if(this._hasPushState||e){t=window.location.pathname;var i=window.location.search;i&&(t+=i)}else t=this.getHash();return t.indexOf(this.options.root)||(t=t.substr(this.options.root.length)),t.replace(T,"")},start:function(t){if(H.started)throw new Error("Backbone.history has already been started");H.started=!0,this.options=i.extend({},{root:"/"},this.options,t),this._wantsHashChange=this.options.hashChange!==!1,this._wantsPushState=!!this.options.pushState,this._hasPushState=!!(this.options.pushState&&window.history&&window.history.pushState);var e=this.getFragment(),n=document.documentMode,r=F.exec(navigator.userAgent.toLowerCase())&&(!n||7>=n);r&&(this.iframe=s('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow,this.navigate(e)),this._hasPushState?s(window).bind("popstate",this.checkUrl):this._wantsHashChange&&"onhashchange"in window&&!r?s(window).bind("hashchange",this.checkUrl):this._wantsHashChange&&(this._checkUrlInterval=setInterval(this.checkUrl,this.interval)),this.fragment=e;var a=window.location,o=a.pathname==this.options.root;return this._wantsHashChange&&this._wantsPushState&&!this._hasPushState&&!o?(this.fragment=this.getFragment(null,!0),window.location.replace(this.options.root+"#"+this.fragment),!0):(this._wantsPushState&&this._hasPushState&&o&&a.hash&&(this.fragment=this.getHash().replace(T,""),window.history.replaceState({},document.title,a.protocol+"//"+a.host+this.options.root+this.fragment)),this._addNew(this.fragment),this.options.silent?void 0:this.loadUrl(null,0))},stop:function(){s(window).unbind("popstate",this.checkUrl).unbind("hashchange",this.checkUrl),clearInterval(this._checkUrlInterval),H.started=!1},route:function(t,e){this.handlers.unshift({route:t,callback:e})},_getDefaultExtDatas:function(){return{distance:0,activeUrl:this.getActive()?this.getActive().fragment:this.fragment,targetUrl:"",isBrowserBack:!1,isBrowserBackClick:!1,isBrowserForward:!1,isBrowserForwardClick:!1,preventDefaultAction:!1,preventDefault:function(){this.preventDefaultAction=!0}}},checkUrl:function(){var t=this.getFragment();if(t==this.fragment&&this.iframe&&(t=this.getFragment(this.getHash(this.iframe))),t==this.fragment)return!1;var e=this;e.extDatas=i.extend(e._getDefaultExtDatas(),e.extDatas||{});this.directHashChange({currentUrl:t,isBack:function(i){e.extDatas.distance=i,e.extDatas.targetUrl=t,e.extDatas.isBrowserBack=!0,e.trigger("browserBack",e.extDatas),e.extDatas.notBrowserAction||(e.extDatas.isBrowserBackClick=!0,e.trigger("browserBackClick",e.extDatas))},isForward:function(i){e.extDatas.distance=i,e.extDatas.targetUrl=t,e.extDatas.isBrowserForward=!0,e.trigger("browserForward",e.extDatas),e.extDatas.notBrowserAction||(e.extDatas.isBrowserForwardClick=!0,e.trigger("browserForwardClick",e.extDatas))},either:function(t){e.extDatas.historyDistance=t}}),e.extDatas.preventDefaultAction||(e.extDatas.distance||this._addNew(t),this.iframe&&this.navigate(t),this.loadUrl(null,this.extDatas)||this.loadUrl(this.getHash(),this.extDatas),this.extDatas=null,this.resetForwardState&&(this._hasPushState?(window.history.pushState({},this.resetForwardState.title,this.options.root+this.resetForwardState.fragment),window.history.back(),this.stack=this.stack.slice(0,this.getActiveIndex()+1),this.stack.push({fragment:this.resetForwardState.fragment,name:this.resetForwardState.name,title:this.resetForwardState.title})):this._wantsHashChange&&(window.location.hash=this.resetForwardState.fragment,window.history.back(),this.stack=this.stack.slice(0,this.getActiveIndex()+1),this.stack.push({fragment:this.resetForwardState.fragment,name:this.resetForwardState.name,title:this.resetForwardState.title})),this.resetForwardState=null))},loadUrl:function(t,e){var s=this.fragment=this.getFragment(t),n=i.any(this.handlers,function(t){return t.route.test(s)?(t.callback(s,e),!0):void 0});return n},_historyDatas:[],addHistoryData:function(t){this._historyDatas.unshift(t)},getHistoryDatas:function(){return this._historyDatas},navigate:function(t,e){if(!H.started)return!1;e&&e!==!0||(e={trigger:e});var s=(t||"").replace(T,"");this.fragment!=s&&(e=i.extend(this._getDefaultExtDatas(),e),e.replace||this._addNew(s),this._hasPushState?(0!=s.indexOf(this.options.root)&&(s=this.options.root+s),this.fragment=s,window.history[e.replace?"replaceState":"pushState"]({},document.title,s)):this._wantsHashChange?(this.fragment=s,this._updateHash(window.location,s,e.replace),this.iframe&&s!=this.getFragment(this.getHash(this.iframe))&&(e.replace||this.iframe.document.open().close(),this._updateHash(this.iframe.location,s,e.replace))):window.location.assign(this.options.root+t),e.trigger&&this.loadUrl(t,e))},_updateHash:function(t,e,i){i?t.replace(t.toString().replace(/(javascript:|#).*$/,"")+"#"+e):t.hash=e}}),e.history=new H;var N=function(t,e){var s,n=this;s=t&&i.has(t,"constructor")?t.constructor:function(){return n.apply(this,arguments)},i.extend(s,n,e);var r=function(){this.constructor=s};return r.prototype=n.prototype,s.prototype=new r,t&&i.extend(s.prototype,t),s.__super__=n.prototype,s};d.extend=g.extend=E.extend=_.extend=H.extend=N;var B=function(){throw new Error('A "url" property or function must be specified')},P=function(t,e){var i=e.error;e.error=function(s){i&&i(t,s,e),t.trigger("error",t,s,e)}};return e});