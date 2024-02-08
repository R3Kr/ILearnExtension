import postscript from "./post-script";

//await prescript();
const result = await Bun.build({
  entrypoints: ["content.ts", "background.ts", "popup.ts"],
  outdir: "./dist",
  minify: true,
  //splitting: true,
});
await postscript();

console.log(result.success ? "Success" : "Failure");
