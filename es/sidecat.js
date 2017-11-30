function getArrayValidator(e){var t=new ArrayOf(e);return Object.freeze(t)}function getTypeValidator(e){var t=new Type(e);return Object.freeze(t)}function getInstanceValidator(e){var t=new InstanceOf(e);return Object.freeze(t)}function getMultipleValidators(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];var a=new OneOfType(t);return Object.freeze(a)}function sideCatClassnames(e){for(var t=SIDE_CAT_CSS+"-"+e,r=arguments.length,a=Array(r>1?r-1:0),n=1;n<r;n++)a[n-1]=arguments[n];return classnames.apply(void 0,[t].concat(a))}function getWidthStyle(e){return{width:e+"px"}}function generateTranslateXCSS(e){var t="translateX("+e+"px)";return{MozTransform:t,msTransform:t,transform:t,WebkitTransform:t}}function generateSliderInline(e){return{knobPosition:generateTranslateXCSS(e),trackCoverWidth:getWidthStyle(e)}}function parseActiveChildren(e,t){var r=!1;return{children:e.map(function(e){var a=e.children&&parseActiveChildren(e.children,t),n=e.value===t||Boolean(a&&a.hasActiveChild);n&&(r=!0);var i=Object.assign({},e,{active:n});return e.children&&(i.children=a.children),i}),hasActiveChild:r}}function findActiveChildren(e,t){return parseActiveChildren(e,t).children}function getRelativeCursorPosition(e,t){var r=t.getBoundingClientRect(),a=r.left,n=r.top,i=e.clientX-a,s=e.clientY-n,o=t.clientWidth,l=t.clientHeight,c={x:i,y:s};return i>o?c.x=o:i<0&&(c.x=0),s>l?c.y=l:s<0&&(c.y=0),c}function boundsCheckValue(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return e&&r?e<t?t:e>r?r:e:0}function getIntervalValue(e,t){if(1===t)return e;var r=e%t;return 0===r?e:e-r+t*Math.round(r/t)}function translateValueToPosition(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},a=r.interval,n=void 0===a?1:a,i=r.max,s=void 0===i?1:i,o=r.min,l=void 0===o?0:o,c=boundsCheckValue(e,l,s);if(e>1&&s>1){c=(getIntervalValue(e,n)-l)/(s-l)}return c>1?t:c<0?0:c*t}import isNil from"ramda/src/isNil";import ramdaGetType from"ramda/src/type";import React from"react";import PropTypes from"prop-types";import classnames from"classnames";var TYPES={ARRAY:"Array",BOOL:"Boolean",FUNC:"Function",NUMBER:"Number",OBJECT:"Object",STRING:"String"},classCallCheck=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},createClass=function(){function e(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,r,a){return r&&e(t.prototype,r),a&&e(t,a),t}}(),inherits=function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)},possibleConstructorReturn=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t},Type=function(){function e(t){classCallCheck(this,e),this.type=t}return createClass(e,[{key:"getType",value:function(){return this.type}},{key:"validate",value:function(e){return ramdaGetType(e)===this.type}},{key:"isOptional",get:function(){return new OptionalType(this)}}]),e}(),OptionalType=function(e){function t(e){return classCallCheck(this,t),possibleConstructorReturn(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return inherits(t,Type),createClass(t,[{key:"validate",value:function(e){return!!isNil(e)||this.type.validate(e)}}]),t}(),InstanceOf=function(e){function t(e){return classCallCheck(this,t),possibleConstructorReturn(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return inherits(t,Type),createClass(t,[{key:"getType",value:function(){return this.type.name}},{key:"validate",value:function(e){var t=this.type.prototype?Object.getOwnPropertyNames(this.type.prototype):Object.keys(this.type);if(!e||!e.constructor||this.getType()!==e.constructor.name)return!1;for(var r=0;r<t.length;r++){if(!e[t[r]])return!1}return!0}}]),t}(),ArrayOf=function(e){function t(e){classCallCheck(this,t);var r=e.validate?e:new InstanceOf(e);return possibleConstructorReturn(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,r))}return inherits(t,Type),createClass(t,[{key:"getType",value:function(){return this.type.constructor.name}},{key:"validate",value:function(e){var t=this;return e.every(function(e){return t.type.validate(e)})}}]),t}(),OneOfType=function(e){function t(e){return classCallCheck(this,t),possibleConstructorReturn(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return inherits(t,Type),createClass(t,[{key:"getType",value:function(){return this.types.reduce(function(e,t){return e.getType()+" "+t.getType()},"")}},{key:"validate",value:function(e){return this.type.some(function(t){return t.validate(e)})}}]),t}(),SideCatProps={};SideCatProps.checkPropTypes=function(e,t,r){return Object.keys(e).every(function(a){var n=e[a],i=t[a];if(n.validate(i))return!0;var s=ramdaGetType(i),o=n.getType();throw new Error("Invalid `"+r+"` structure: type "+s+" supplied to `"+a+"`, expected "+o+".")})},SideCatProps.defineStructure=function(e,t){Object.defineProperty(e,"Structure",{value:Object.freeze(t)})},SideCatProps.any={validate:function(){return!0}},SideCatProps.array=getTypeValidator(TYPES.ARRAY),SideCatProps.bool=getTypeValidator(TYPES.BOOL),SideCatProps.func=getTypeValidator(TYPES.FUNC),SideCatProps.number=getTypeValidator(TYPES.NUMBER),SideCatProps.object=getTypeValidator(TYPES.OBJECT),SideCatProps.string=getTypeValidator(TYPES.STRING),SideCatProps.instanceOf=getInstanceValidator,SideCatProps.oneOf=getMultipleValidators,SideCatProps.arrayOf=getArrayValidator;var SideCatProps$1=Object.freeze(SideCatProps),Model=function(){function e(t){classCallCheck(this,e);try{this.validate(t),this.dataStructure=t}catch(e){this.handleValidateError(e)}}return createClass(e,[{key:"handleValidateError",value:function(e){throw e}},{key:"validate",value:function(t){return SideCatProps$1.checkPropTypes(e.Structure,t,this.constructor.name)}},{key:"serialize",value:function(){return this.dataStructure}}]),e}();SideCatProps$1.defineStructure(Model,{});var CategoryModel=function(e){function t(e){return classCallCheck(this,t),possibleConstructorReturn(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return inherits(t,Model),createClass(t,[{key:"validate",value:function(e){return SideCatProps$1.checkPropTypes(t.Structure,e,this.constructor.name)}},{key:"serialize",value:function(){return Object.assign({},Model.prototype.serialize.call(this),{children:this.serializeChildren(this.dataStructure.children)})}},{key:"serializeChildren",value:function(e){var t=this;return e?e.map(function(e){return Object.assign({},Model.prototype.serialize.call(e),{children:t.serializeChildren(e.dataStructure.children)})}):null}}]),t}();SideCatProps$1.defineStructure(CategoryModel,{label:SideCatProps$1.string,value:SideCatProps$1.any,children:SideCatProps$1.arrayOf(CategoryModel).isOptional});var CategoriesModel=function(e){function t(e){return classCallCheck(this,t),possibleConstructorReturn(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return inherits(t,Model),createClass(t,[{key:"validate",value:function(e){return SideCatProps$1.checkPropTypes(t.Structure,e,this.constructor.name)}},{key:"serialize",value:function(){return Object.assign({},Model.prototype.serialize.call(this),{categories:this.dataStructure.categories.map(function(e){return e.serialize()})})}}]),t}();SideCatProps$1.defineStructure(CategoriesModel,{categories:SideCatProps$1.arrayOf(CategoryModel),name:SideCatProps$1.string});var CheckBoxModel=function(e){function t(e){return classCallCheck(this,t),possibleConstructorReturn(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return inherits(t,Model),createClass(t,[{key:"validate",value:function(e){return SideCatProps$1.checkPropTypes(t.Structure,e,this.constructor.name)}}]),t}();SideCatProps$1.defineStructure(CheckBoxModel,{label:SideCatProps$1.string,name:SideCatProps$1.string});var SliderModel=function(e){function t(e){return classCallCheck(this,t),possibleConstructorReturn(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return inherits(t,Model),createClass(t,[{key:"validate",value:function(e){return SideCatProps$1.checkPropTypes(t.Structure,e,this.constructor.name)}}]),t}();SideCatProps$1.defineStructure(SliderModel,{label:SideCatProps$1.string,name:SideCatProps$1.string,max:SideCatProps$1.number,min:SideCatProps$1.number});var Models={CategoriesModel:CategoriesModel,CategoryModel:CategoryModel,CheckBoxModel:CheckBoxModel,SliderModel:SliderModel},BaseComponent=function(e){function t(e){return classCallCheck(this,t),possibleConstructorReturn(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return inherits(t,e),createClass(t,[{key:"bindMethods",value:function(){for(var e=this,t=arguments.length,r=Array(t),a=0;a<t;a++)r[a]=arguments[a];r.forEach(function(t){e[t]=e[t].bind(e)})}},{key:"bindParams",value:function(e){for(var t=this,r=arguments.length,a=Array(r>1?r-1:0),n=1;n<r;n++)a[n-1]=arguments[n];return function(){for(var r=arguments.length,n=Array(r),i=0;i<r;i++)n[i]=arguments[i];e&&e.constructor&&e.apply&&e.apply(t,a.concat(n))}}}]),t}(React.Component),SIDE_CAT_CSS="sidecat",Categories=function(e){function t(e){classCallCheck(this,t);var r=possibleConstructorReturn(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e)),a=r.props,n=a.active,i=findActiveChildren(a.categories,n);return r.state={categories:i},r}return inherits(t,BaseComponent),createClass(t,[{key:"componentWillReceiveProps",value:function(e){var t=this.props.active,r=e.active,a=e.categories;t!==r&&this.setState({categories:findActiveChildren(a,t)})}},{key:"handleClick",value:function(e,t){var r=this.props.onChange;r&&r(e,t)}},{key:"renderCategory",value:function(e){var t=this,r=e.children,a=e.label,n=e.value,i=sideCatClassnames("category",{active:e.active});return React.createElement("div",{className:i,key:e.value,onClick:this.bindParams(this.handleClick,n)},a,r&&r.map(function(e){return t.renderCategory(e)}))}},{key:"render",value:function(){var e=this,t=this.state.categories;return React.createElement("div",{className:"sidecat-categories"},t.map(function(t){return e.renderCategory(t)}))}}]),t}();Categories.propTypes={active:PropTypes.any,categories:PropTypes.arrayOf(PropTypes.object)},Categories.defaultProps={active:null,categories:[]};var CheckBox=function(e){function t(e){classCallCheck(this,t);var r=possibleConstructorReturn(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e)),a=r.props.checked;return r.state={checked:a},r.bindMethods("handleChange"),r}return inherits(t,BaseComponent),createClass(t,[{key:"componentWillReceiveProps",value:function(e){var t=this.props.checked,r=e.checked;t!==r&&this.setState({checked:r})}},{key:"handleChange",value:function(e){var t=this.props.onChange,r=!this.state.checked;this.setState({checked:r}),t&&t(r,e)}},{key:"renderLabel",value:function(){var e=this.props.label;if(e)return React.createElement("label",null,e)}},{key:"render",value:function(){var e=this.props.disabled,t=this.state.checked,r=sideCatClassnames("checkbox",{checked:t,disabled:e});return React.createElement("div",{className:r},React.createElement("input",{checked:t,disabled:e,onChange:this.handleChange,type:"checkbox"}),this.renderLabel())}}]),t}();CheckBox.propTypes={checked:PropTypes.bool,disabled:PropTypes.bool,label:PropTypes.string,onChange:PropTypes.func},CheckBox.defaultProps={checked:!1,disabled:!1};var INPUT={ENTER:13},SLIDER={DEFAULT_WIDTH:150,DRAG_CHANGE:"drag_change",DRAG_END:"drag_end",DRAG_START:"drag_start",INPUT_CHANGE:"input_change"},Slider=function(e){function t(e){classCallCheck(this,t);var r=possibleConstructorReturn(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return r.eventsAdded=!1,r.bindMethods("handleDragChange","handleDragStart","handleDragEnd"),r.state={value:null,drag:!1},r}return inherits(t,BaseComponent),createClass(t,[{key:"componentDidMount",value:function(){var e=this.refs.slider,t=this.props,r=t.interval,a=t.max,n=t.min,i=t.value,s=e?translateValueToPosition(void 0===i?0:i,e.clientWidth,{max:a,min:n,interval:r}):0;this.registerEventListeners(),this.setState({value:s})}},{key:"componentDidUpdate",value:function(){this.registerEventListeners()}},{key:"componentWillReceiveProps",value:function(e){var t=this.refs.slider;if(e.value&&e.value!==this.props.value&&t){var r=this.props,a=r.interval,n=r.max,i=r.min;this.setState({value:translateValueToPosition(e.value,t.clientWidth,{max:n,min:i,interval:a})})}}},{key:"getSliderCursorValue",value:function(e){return getRelativeCursorPosition(e,this.refs.slider).x}},{key:"handleChangeEvent",value:function(e,t){var r=this.props,a=r.disabled,n=r.interval,i=r.max,s=r.min,o=r.onDragEnd,l=r.onInputChange,c=Number(e),u=t===SLIDER.INPUT_CHANGE?boundsCheckValue(c,s,i):getIntervalValue(c,n);if(!a)switch(t){case SLIDER.DRAG_END:case SLIDER.INPUT_END:o&&o(c);break;case SLIDER.INPUT_CHANGE:this.setDragValues(u,t);var d=l||o;d&&d(c);break;default:this.setDragValues(u,t)}}},{key:"handleDragChange",value:function(e){if(this.state.drag){var t=this.getSliderCursorValue(e);this.handleChangeEvent(t,SLIDER.DRAG_CHANGE)}}},{key:"handleDragStart",value:function(e){var t=this.state.drag,r=this.getSliderCursorValue(e);t||(this.setState({drag:!0}),this.handleChangeEvent(r,SLIDER.DRAG_START))}},{key:"handleDragEnd",value:function(){var e=this.state,t=e.value;e.drag&&(this.setState({drag:!1}),this.handleChangeEvent(t,SLIDER.DRAG_END))}},{key:"handleInputEvent",value:function(e,t){var r=t.keyCode,a=t.which,n=t.target,i=r||a,s=n.value;i===INPUT.ENTER&&e===SLIDER.INPUT_KEYPRESS?n.blur():e===SLIDER.INPUT_CHANGE&&this.handleChangeEvent(s,e)}},{key:"registerEventListeners",value:function(){var e=this.props.disabled;e||this.eventsAdded?e&&this.eventsAdded&&(this.eventsAdded=!1,document.removeEventListener("mouseup",this.handleDragEnd),document.removeEventListener("mousemove",this.handleDragChange)):(this.eventsAdded=!0,document.addEventListener("mouseup",this.handleDragEnd),document.addEventListener("mousemove",this.handleDragChange))}},{key:"setDragValues",value:function(e,t){var r=this.props,a=r.onDragChange,n=r.onDragEnd,i=t===SLIDER.DRAG_CHANGE||t===SLIDER.INPUT_CHANGE,s=t===SLIDER.DRAG_END||t===SLIDER.INPUT_END;this.setState({value:e}),i&&a(e),s&&n(e)}},{key:"renderLabel",value:function(){var e=this.props,t=e.label,r=e.value;return React.createElement("div",{className:"slider-data"},React.createElement("label",null,t),React.createElement("div",{className:"value"},r))}},{key:"render",value:function(){var e=this.props,t=e.disabled,r=e.onInputChange,a=this.state.value,n=generateSliderInline(a),i=n.knobPosition,s=n.trackCoverWidth,o=sideCatClassnames("slider",{"pre-render":null===a,disabled:t});return React.createElement("div",{className:o},React.createElement("div",{className:"slider",ref:"slider",onMouseDown:!t&&this.handleDragStart},React.createElement("div",{className:"track"},React.createElement("div",{className:"cover",style:s})),React.createElement("div",{className:"knob",style:i})),r&&React.createElement("input",{onChange:this.handleInputEvent.bind(this,SLIDER.INPUT_CHANGE)}))}}]),t}();Slider.propTypes={defaultValue:PropTypes.number,disabled:PropTypes.bool,interval:PropTypes.number,max:PropTypes.number,min:PropTypes.number,onDragChange:PropTypes.func,onDragEnd:PropTypes.func,onInputChange:PropTypes.func,value:PropTypes.oneOfType([PropTypes.number,PropTypes.string])},Slider.defaultProps={defaultValue:0,interval:1};var Sidebar=function(e){function t(e){return classCallCheck(this,t),possibleConstructorReturn(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return inherits(t,BaseComponent),createClass(t,[{key:"renderCategories",value:function(e){var t=this.props.handleCategoryChange,r=e.serialize(),a=r.active,n=r.name,i=r.categories;return React.createElement(Categories,{key:n,active:a,categories:i,onChange:this.bindParams(t,n)})}},{key:"renderCheckBox",value:function(e){var t=this.props.handleCheckBoxChange,r=e.serialize(),a=r.label,n=r.name;return React.createElement(CheckBox,{key:n,label:a,onChange:this.bindParams(t,n)})}},{key:"renderSlider",value:function(e){var t=this.props,r=t.handleSliderDragChange,a=t.handleSliderDragEnd,n=t.valueState,i=e.serialize(),s=i.max,o=i.min,l=i.name,c=n[l];return React.createElement(Slider,{key:l,max:s,min:o,onDragChange:this.bindParams(r,l),onDragEnd:this.bindParams(a,l),value:c})}},{key:"renderSidebarComponents",value:function(){var e=this;return this.props.structList.map(function(t){switch(t.constructor.Structure){case Models.CategoriesModel.Structure:return e.renderCategories(t);case Models.CheckBoxModel.Structure:return e.renderCheckBox(t);case Models.SliderModel.Structure:return e.renderSlider(t)}})}},{key:"render",value:function(){var e=sideCatClassnames("sidebar");return React.createElement("div",{className:e},this.renderSidebarComponents())}}]),t}();Sidebar.propTypes={handleCheckBoxChange:PropTypes.func,handleSliderDragChange:PropTypes.func,handleSliderDragEnd:PropTypes.func,structList:PropTypes.array,valueState:PropTypes.object};export{Models,Sidebar};