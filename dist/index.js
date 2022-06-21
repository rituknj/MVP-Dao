var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// src/index.js
__export(exports, {
  default: () => MultiStep
});
var import_react = __toModule(require("react"));

// node_modules/goober/dist/goober.modern.js
var e = { data: "" };
var t = (t2) => typeof window == "object" ? ((t2 ? t2.querySelector("#_goober") : window._goober) || Object.assign((t2 || document.head).appendChild(document.createElement("style")), { innerHTML: " ", id: "_goober" })).firstChild : t2 || e;
var l = /(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g;
var a = /\/\*[^]*?\*\/|\s\s+|\n/g;
var n = (e2, t2) => {
  let r, l2 = "", a2 = "", o2 = "";
  for (let s2 in e2) {
    let c2 = e2[s2];
    typeof c2 == "object" ? (r = t2 ? t2.replace(/([^,])+/g, (e3) => s2.replace(/(^:.*)|([^,])+/g, (t3) => /&/.test(t3) ? t3.replace(/&/g, e3) : e3 ? e3 + " " + t3 : t3)) : s2, a2 += s2[0] == "@" ? s2[1] == "f" ? n(c2, s2) : s2 + "{" + n(c2, s2[1] == "k" ? "" : t2) + "}" : n(c2, r)) : s2[0] == "@" && s2[1] == "i" ? l2 = s2 + " " + c2 + ";" : (s2 = s2.replace(/[A-Z]/g, "-$&").toLowerCase(), o2 += n.p ? n.p(s2, c2) : s2 + ":" + c2 + ";");
  }
  return l2 + (t2 && o2 ? t2 + "{" + o2 + "}" : o2) + a2;
};
var o = {};
var s = (e2) => {
  if (typeof e2 == "object") {
    let t2 = "";
    for (let r in e2)
      t2 += r + s(e2[r]);
    return t2;
  }
  return e2;
};
var c = (e2, t2, r, c2, i2) => {
  let p2 = s(e2), u2 = o[p2] || (o[p2] = ((e3) => {
    let t3 = 0, r2 = 11;
    for (; t3 < e3.length; )
      r2 = 101 * r2 + e3.charCodeAt(t3++) >>> 0;
    return "go" + r2;
  })(p2));
  if (!o[u2]) {
    let t3 = p2 !== e2 ? e2 : ((e3) => {
      let t4, r2 = [{}];
      for (; t4 = l.exec(e3.replace(a, "")); )
        t4[4] ? r2.shift() : t4[3] ? r2.unshift(r2[0][t4[3]] = r2[0][t4[3]] || {}) : r2[0][t4[1]] = t4[2];
      return r2[0];
    })(e2);
    o[u2] = n(i2 ? { ["@keyframes " + u2]: t3 } : t3, r ? "" : "." + u2);
  }
  return ((e3, t3, r2) => {
    t3.data.indexOf(e3) == -1 && (t3.data = r2 ? e3 + t3.data : t3.data + e3);
  })(o[u2], t2, c2), u2;
};
var i = (e2, t2, r) => e2.reduce((e3, l2, a2) => {
  let o2 = t2[a2];
  if (o2 && o2.call) {
    let e4 = o2(r), t3 = e4 && e4.props && e4.props.className || /^go/.test(e4) && e4;
    o2 = t3 ? "." + t3 : e4 && typeof e4 == "object" ? e4.props ? "" : n(e4, "") : e4 === false ? "" : e4;
  }
  return e3 + l2 + (o2 == null ? "" : o2);
}, "");
function p(e2) {
  let r = this || {}, l2 = e2.call ? e2(r.p) : e2;
  return c(l2.unshift ? l2.raw ? i(l2, [].slice.call(arguments, 1), r.p) : l2.reduce((e3, t2) => Object.assign(e3, t2 && t2.call ? t2(r.p) : t2), {}) : l2, t(r.target), r.g, r.o, r.k);
}
var u;
var d;
var f;
var g = p.bind({ g: 1 });
var b = p.bind({ k: 1 });
function h(e2, t2, r, l2) {
  n.p = t2, u = e2, d = r, f = l2;
}
function m(e2, t2) {
  let r = this || {};
  return function() {
    let l2 = arguments;
    function a2(n2, o2) {
      let s2 = Object.assign({}, n2), c2 = s2.className || a2.className;
      r.p = Object.assign({ theme: d && d() }, s2), r.o = / *go\d+/.test(c2), s2.className = p.apply(r, l2) + (c2 ? " " + c2 : ""), t2 && (s2.ref = o2);
      let i2 = e2;
      return e2[0] && (i2 = s2.as || e2, delete s2.as), f && i2[0] && f(s2), u(i2, s2);
    }
    return t2 ? t2(a2) : a2;
  };
}

// src/index.js
h(import_react.default.createElement);
var Ol = m("ol")`
  margin: 0;
  padding: 15px 0px;
  list-style-type: none;
  display: flex;
  justify-content: space-between;
`;
var Li = m("li")`
  display: inline-block;
  text-align: center;
  line-height: 4.8rem;
  padding: 0 0.7rem;

  color: silver;
 

  &:hover,
  &:before {
    color: #0FA0CE;
  }
  &:after {
   
  }   
  span {
    padding: 0 1.5rem;
  }
  &:before {
    position: relative;
    float: left;
    left: 50%;
    width: 1.2em;
    line-height: 1.4em;
    border-radius: 0;
    bottom: -3.99rem;
  }
`;
var Todo = p`
  &:before {
    
    color: silver;
    background-color: white;
  }
`;
var Doing = p`
  &:before {
    
    color: white;
    background-color: #33C3F0;  
  }
`;
var Done = p`
  &:before {
    
    color: white;
    background-color: #33C3F0;
  }
`;
var New = p`
  border: 1px solid #fff;
  padding: 10px 15px !important;
  border-radius: 50%;
`;
var NewActive = p`
  border: 1px solid #d92c2c;
  padding: 10px 15px !important;
  border-radius: 50%;
  color: red;
`;
var getStep = (defaultIndex, newIndex, length) => {
  if (newIndex <= length) {
    return newIndex;
  }
  return defaultIndex;
};
var getTopNavStyles = (indx, length) => {
  const styles = [];
  for (let i2 = 0; i2 < length; i2++) {
    if (i2 < indx) {
      styles.push("done");
    } else if (i2 === indx) {
      styles.push("doing");
    } else {
      styles.push("todo");
    }
  }
  return styles;
};
var getButtonsState = (indx, length) => {
  if (indx > 0 && indx < length - 1) {
    return {
      showPreviousBtn: true,
      showNextBtn: true
    };
  } else if (indx === 0) {
    return {
      showPreviousBtn: false,
      showNextBtn: true
    };
  } else {
    return {
      showPreviousBtn: true,
      showNextBtn: false
    };
  }
};
function MultiStep(props) {
  const { activeComponentClassName, inactiveComponentClassName } = props;
  const showNav = typeof props.showNavigation === "undefined" ? true : props.showNavigation;
  const [activeStep] = (0, import_react.useState)(getStep(0, props.activeStep, props.steps.length));
  const [stylesState, setStyles] = (0, import_react.useState)(getTopNavStyles(activeStep, props.steps.length));
  const [compState, setComp] = (0, import_react.useState)(activeStep);
  const [buttonsState, setButtons] = (0, import_react.useState)(getButtonsState(activeStep, props.steps.length));
  (0, import_react.useEffect)(() => {
    console.log("Index changed: ", props.activeStep);
    setStepState(props.activeStep);
  }, [props.activeStep]);
  const setStepState = (indx) => {
    setStyles(getTopNavStyles(indx, props.steps.length));
    setComp(indx < props.steps.length ? indx : compState);
    setButtons(getButtonsState(indx, props.steps.length));
  };
  const next = () => {
    setStepState(compState + 1);
    window.FILL = false;
  };
  const previous = () => setStepState(compState > 0 ? compState - 1 : compState);
  const handleOnClick = (evt) => {
    if (evt.currentTarget.value === props.steps.length - 1 && compState === props.steps.length - 1) {
      setStepState(props.steps.length);
    } else {
      setStepState(evt.currentTarget.value);
    }
  };
  const renderSteps = () => props.steps.map((s2, i2) => {
    if (stylesState[i2] === "todo") {
      return /* @__PURE__ */ import_react.default.createElement(Li, {
        className: Todo,
        key: i2,
        value: i2
      }, /* @__PURE__ */ import_react.default.createElement("span", {
        className: New
      }, i2 + 1));
    } else if (stylesState[i2] === "doing") {
      return /* @__PURE__ */ import_react.default.createElement(Li, {
        className: Doing,
        key: i2,
        value: i2
      }, /* @__PURE__ */ import_react.default.createElement("span", {
        className: New
      }, i2 + 1));
    } else {
      return /* @__PURE__ */ import_react.default.createElement(Li, {
        className: Done,
        key: i2,
        value: i2
      }, /* @__PURE__ */ import_react.default.createElement("span", {
        className: NewActive
      }, i2 + 1));
    }
  });
  const renderNav = (show) => show && /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("button", {
    style: buttonsState.showPreviousBtn ? props.prevStyle : { display: "none" },
    onClick: previous
  }, "Prev"), /* @__PURE__ */ import_react.default.createElement("button", {
    style: buttonsState.showNextBtn && props.fill ? props.nextStyle : { display: "none" },
    onClick: next
  }, "Next"));
  return /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement(Ol, null, renderSteps()), inactiveComponentClassName ? props.steps.map((step, index) => {
    const className = index === compState ? activeComponentClassName : inactiveComponentClassName;
    return /* @__PURE__ */ import_react.default.createElement("div", {
      className,
      key: index
    }, step.component);
  }) : /* @__PURE__ */ import_react.default.createElement("div", null, props.steps[compState].component), /* @__PURE__ */ import_react.default.createElement("div", null, renderNav(showNav)));
}
