import { $ } from "bun";

export default async function postscript() {
  await $`mkdir dist && cp ./ilearn.png ./dist && cp ./manifest.json ./dist && cp ./hello.html ./dist`;
}
await postscript();
