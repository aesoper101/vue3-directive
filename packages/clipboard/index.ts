import Clipboard from "clipboard";
import { ObjectDirective } from "vue";
import { Plugin } from "vue";

const clipboardDirective: ObjectDirective = {
  mounted: (el, binding) => {
    const { arg, value } = binding;

    const handler = () => value && typeof value === "function" && value();

    switch (arg) {
      case "success":
        el.clipboardSuccessHandler = handler;
        break;
      case "error":
        el.clipboardErrorHandler = handler;
        break;
      default: {
        el.clipboardHandler = handler;
        const clipboard = new Clipboard(el, {
          text: () => {
            return value;
          },
          action: () => (arg === "cut" ? "cut" : "copy"),
        });

        clipboard.on("success", (e: Clipboard.Event) => {
          const callback = el.clipboardSuccessHandler;
          callback && callback(e);
        });

        clipboard.on("error", (e: Clipboard.Event) => {
          const callback = el.clipboardErrorHandler;
          callback && callback(e);
        });

        el.clipboardInstance = clipboard;
      }
    }
  },
  updated: (el, binding) => {
    const { arg, value } = binding;
    switch (arg) {
      case "success":
        el.clipboardSuccessHandler = value;
        break;
      case "error":
        el.clipboardErrorHandler = value;
        break;
      default:
        el.clipboardInstance.text = function () {
          return binding.value;
        };
        el.clipboardInstance.action = function () {
          return binding.arg === "cut" ? "cut" : "copy";
        };
        break;
    }
  },
  unmounted: (el, binding) => {
    const { arg } = binding;
    switch (arg) {
      case "success":
        delete el.clipboardSuccessHandler;
        break;
      case "error":
        delete el.clipboardErrorHandler;
        break;
      default:
        el.clipboardInstance.destroy();
        delete el.clipboardInstance;
        break;
    }
  },
};

const clipboardPlugin: Plugin = {
  install: (app) => {
    app.directive("clipboard", clipboardDirective);
  },
};

export default clipboardPlugin;
