# Vue SFC in JS 🔰

```bash
npm install vite-plugin-vue-sfc-in-js
```

---

The objective of this plugin is to allow developers to write SFCs inside JS files, similar to JSX... in some way.

For example:

```js
export const ClearCartIcon = (
  <vue>
    <template>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        strokeWidth="1"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
        <path d="M17 17a2 2 0 1 0 2 2" />
        <path d="M17 17h-11v-11" />
        <path d="M9.239 5.231l10.761 .769l-1 7h-2m-4 0h-7" />
        <path d="M3 3l18 18" />
      </svg>
    </template>
  </vue>
);

export const CartIcon = (
  <vue>
    <script setup>
      import {ref} from "vue"; console.log("Hello!"); const refVar = ref("");
    </script>

    <template>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        strokeWidth="1"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
        <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
        <path d="M17 17h-11v-14h-2" />
        <path d="M6 5l14 1l-1 7h-13" />
      </svg>
    </template>
  </vue>
);
```

As you can see, the main advantage here is that we can export multiple components from the same `.js` file and use it like a normal component inside other Vue components.

```vue
<script setup>
import { ClearCartIcon, CartIcon } from "./Icons";
</script>
```

## Usage

Add this plugin to `vite.config.js`

```js
import { defineConfig } from "vite";
import vueSFCinJS from "vite-plugin-vue-sfc-in-js";
export default defineConfig({
  plugins: [vueSFCinJS()],
});
```

And start writing SFC in your JS files, by using a similar syntax as JSX, just make sure to wrap your SFCs in a `<vue></vue>` Tag.

You can use either a `.js` or a `.vjs` file if you feel it more convenient.

```js
export const CartIcon = (
  <vue>
    <script setup>// Can use Script</script>

    <template>
      <p>Can use Template</p>
    </template>

    <style>/* not implemented */</style>
  </vue>
);
```

## 🤔 Why?

For now, this is just a very naive and simplistic POC to see if actually more Devs would like and use this kind of solution.

So if you actually like it, please remember to <a href="https://github.com/iosamuel/vite-plugin-vue-sfc-in-js">⭐️ the repo</a> and <a href="https://www.npmjs.com/package/vite-plugin-vue-sfc-in-js">📦 `npm install`</a> the heck out of it.

### Problem to solve

In Vue world, for example if you want to have multiple Icons and use them, you would need to create an `Icons` folder and create multiple `.vue` files, one per icon.

### Solution

With VJS you only need an `Icons.[v]js` file and export all the components you want using JS + SFC syntax!

## Author

Samuel Burbano - <a href="https://twitter.com/iosamuel">@iosamuel</a>

## License

ISC
