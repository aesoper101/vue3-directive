# vue3-directive

## Installation
```
yarn add vue3-directive
```

OR

```
npm install vue3-directive
```

## Use
```
import Vue3Directive, {
  Permission,
  WaterMarker,
  LongClick,
  ResizeText
} from "vue3-directive";
import { CheckPermissionFn } from "vue3-directive/packages/utils/types";

const checkFunc: CheckPermissionFn = (v: string) => {
  return v === "has";
};

createApp(App)
  .use(router)
  .use(Vue3Directive)
  .use(Permission, { checkFunc: checkFunc })
  .use(WaterMarker)
  .use(LongClick)
  .use(ResizeText)
  .mount("#app");
```



## ⚖️ License

MIT

