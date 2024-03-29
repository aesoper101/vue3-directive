# vue3-normal-directive

## Installation

```
yarn add vue3-normal-directive
```

OR

```
npm install vue3-normal-directive
```

## Use

```
import Vue3Directive, {
  Permission,
  WaterMarker,
  LongClick,
  ResizeText,
  CheckPermissionFn
} from "vue3-normal-directive";

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
