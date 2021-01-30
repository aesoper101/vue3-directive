import { ObjectDirective, Plugin } from "vue";
import {
  enableBodyScroll,
  disableBodyScroll,
  BodyScrollOptions
} from "body-scroll-lock";

let _options: BodyScrollOptions = {};

export const VScrollLockDirective: ObjectDirective = {
  mounted: (el, binding) => {
    if (binding.value) {
      disableBodyScroll(el, _options);
    }
  },
  updated: (el, binding) => {
    if (binding.value) {
      disableBodyScroll(el, _options);
    } else {
      enableBodyScroll(el);
    }
  },
  unmounted: el => {
    enableBodyScroll(el);
  }
};

const ScrollLockPlugin = {
  install: (app, opts?: BodyScrollOptions) => {
    if (opts) {
      _options = opts;
    }
    app.directive("scroll-lock", VScrollLockDirective);
  }
};

export default ScrollLockPlugin;
