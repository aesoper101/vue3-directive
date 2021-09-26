import { ResizeTextOption } from "../utils/types";
import { ObjectDirective } from "vue";
import { debounce } from "lodash-es";

let defaultOption: ResizeTextOption = {
  delay: 200,
  ratio: 1,
  minFontSize: "16px",
  maxFontSize: "500px",
};

const __onResize = function (element: HTMLElement, ctx: ResizeTextOption) {
  element.style.fontSize =
    Math.max(
      Math.min(element.clientWidth / (ctx.ratio * 10), parseFloat(ctx.maxFontSize)),
      parseFloat(ctx.minFontSize)
    ) + "px";
};

const ResizeText: ObjectDirective = {
  mounted: (el, binding) => {
    const { value } = binding;
    const opts = Object.assign({}, defaultOption, value) as ResizeTextOption;
    el.__opts = opts;
    el.__debounceHandler = debounce(function () {
      __onResize(el, opts);
    }, opts.delay);
    if (typeof window !== "undefined") {
      window.addEventListener("resize", el.__debounceHandler, {
        passive: true,
      });
    }
    __onResize(el, opts);
  },
  unmounted: (el) => {
    if (typeof window !== "undefined") {
      window.removeEventListener("resize", el.__debounceHandler);
    }
  },
};

const ResizeTextPlugin = {
  install: (app, opts?: ResizeTextOption) => {
    if (opts) {
      defaultOption = opts;
    }
    app.directive("resize-text", ResizeText);
  },
};

export default ResizeTextPlugin;
