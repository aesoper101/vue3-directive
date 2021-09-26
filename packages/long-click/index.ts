import { App, ObjectDirective } from "vue";
import { LongClickOption } from "../utils/types";

const _option: LongClickOption = {
  delay: 50,
  interval: 400,
};

export const LongClick: ObjectDirective = {
  created: (el, binding) => {
    if (typeof binding.value === "function") {
      let pressTimer: number | null;
      let pressInterval: number | null;

      const cancel = () => {
        if (pressTimer !== null) {
          clearTimeout(pressTimer);
          pressTimer = null;
        }
        if (pressInterval) {
          clearInterval(pressInterval);
          pressInterval = null;
        }
      };

      const handler = (e) => {
        binding.value(e);
      };

      const start = (e) => {
        if (e.type === "click" && e.button !== 0) {
          return;
        }

        if (pressTimer === null) {
          pressTimer = setTimeout(() => {
            if (_option.interval && _option.interval > 0) {
              pressInterval = setInterval(() => {
                handler(e);
              }, _option.interval);
            }
            handler(e);
          }, _option.delay);
        }
      };

      ["mousedown", "touchstart"].forEach((e) => el.addEventListener(e, start));
      ["click", "mouseout", "touchend", "touchcancel"].forEach((e) =>
        el.addEventListener(e, cancel)
      );
    }
  },
};

const LongClickPlugin = {
  install: (app: App, options?: LongClickOption) => {
    if (options?.interval) {
      _option.interval = options.interval;
    }
    if (options?.delay) {
      _option.delay = options.delay;
    }
    app.directive("long-click", LongClick);
  },
};

export default LongClickPlugin;
