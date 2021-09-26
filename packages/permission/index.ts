import { ObjectDirective } from "vue";
import { PermissionOptions } from "../utils/types";
import { App } from "vue";

const _options: PermissionOptions = {
  checkFunc: () => true,
};

const permissionDirective: ObjectDirective = {
  mounted: (el, binding) => {
    const permission = binding.value; // 获取到 v-permission的值
    if (permission && _options.checkFunc) {
      const hasPermission = _options.checkFunc(permission);
      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    }
  },
};

const permissionPlugin = {
  install: (app: App, options?: PermissionOptions) => {
    console.log(options);
    if (options?.checkFunc) {
      _options.checkFunc = options.checkFunc;
    }
    app.directive("permission", permissionDirective);
  },
};

export default permissionPlugin;
