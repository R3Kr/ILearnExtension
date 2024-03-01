import { $ } from "bun";

export  async function postscript() {
  await $`mkdir dist`;
  await $`cp ./ilearn.png ./dist `;
  await $`cp ./manifest.json ./dist `;
  await $`cp ./hello.html ./dist`;
}
await postscript();
