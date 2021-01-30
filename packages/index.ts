import { App } from "vue";
import { default as ClickOutside } from "./click-outside";
import { default as Clipboard } from "./clipboard";
import { default as Permission } from "./permission";
import { default as WaterMarker } from "./watermarker";
import { default as ScrollLock } from "./scroll-lock";
import { default as LongClick } from "./long-click";
import { default as ResizeText } from "./resize-text";

const components = [ClickOutside, Clipboard];

const install = (app: App) => {
  components.forEach(comp => {
    app.use(comp);
  });
};

export {
  ClickOutside,
  Clipboard,
  Permission,
  WaterMarker,
  ScrollLock,
  LongClick,
  ResizeText
};

export default { install };
