import { ObjectDirective } from "vue";
import { App } from "vue";
import { WatermarkPluginOptions } from "../utils/types";
import { WatermarkOption } from "../utils/types";

const _defaultColor = "rgba(180, 180, 180, 0.3)";
const _defaultFont = "16px Microsoft JhengHei";

let _option: WatermarkPluginOptions = {
  defaultWatermark: "Test Text",
  font: _defaultFont,
  fontColor: _defaultColor,
  width: 200,
  height: 200,
  angle: (-20 * Math.PI) / 180,
};

export const useWaterMarker = (parentNode: HTMLElement, opt: WatermarkOption) => {
  // 水印文字，父元素，字体，文字颜色
  const can = document.createElement("canvas");
  parentNode.appendChild(can);
  can.width = (!opt || typeof opt == "string" ? _option.width : opt.width) || _option.width;
  can.height = (!opt || typeof opt === "string" ? _option.height : opt.height) || _option.height;
  can.style.display = "none";
  const cans = can.getContext("2d");
  if (cans) {
    cans.rotate(!opt || typeof opt === "string" ? _option.angle : opt.angle || _option.angle);
    cans.font = (!opt || typeof opt === "string" ? _option.font : opt.font) || "";
    cans.fillStyle =
      (!opt || typeof opt === "string" ? _option.fontColor : opt.fontColor) || _defaultColor;
    cans.textAlign = "left";
    cans.textBaseline = "middle";
    const text = !opt || typeof opt === "string" ? opt : opt.text || _option.defaultWatermark;

    cans.fillText(text, can.width / 10, can.height / 2);
  }

  parentNode.style.backgroundImage = "url(" + can.toDataURL("image/png") + ")";
};

const waterMarker: ObjectDirective = {
  created: (el, binding) => {
    useWaterMarker(el, binding.value);
  },
};

const waterMarkerPlugin = {
  install: (app: App, options: WatermarkPluginOptions) => {
    _option = Object.assign({}, _option, options);
    app.directive("water-marker", waterMarker);
  },
};

export default waterMarkerPlugin;
