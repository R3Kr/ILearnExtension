import { autoRefreshReact } from "autoRefreshReact";
import { setStorage } from "utils";
import browser from "webextension-polyfill";

const main = async () => {
  await setStorage();
  const app = document.getElementById("app")!;

  const new_tab_button = document.createElement("button");
  new_tab_button.innerHTML = (
    await browser.storage.local.get("new_tab")
  ).new_tab;
  new_tab_button.addEventListener("click", async (e) => {
    const state = (await browser.storage.local.get("new_tab"))
      .new_tab as boolean;
    await browser.storage.local.set({ new_tab: !state });
    new_tab_button.innerHTML = (
      await browser.storage.local.get("new_tab")
    ).new_tab;
  });

  const force_download_button = document.createElement("button");
  force_download_button.innerHTML = (
    await browser.storage.local.get("force_download")
  ).force_download;
  force_download_button.addEventListener("click", async (e) => {
    const state = (await browser.storage.local.get("force_download"))
      .force_download as boolean;
    await browser.storage.local.set({ force_download: !state });
    force_download_button.innerHTML = (
      await browser.storage.local.get("force_download")
    ).force_download;
  });

  const p1 = document.createElement("p");
  p1.innerHTML = "Resources opens a new tab:";
  const p2 = document.createElement("p");
  p2.innerHTML = "Force download:";

  app.appendChild(p1);
  app.appendChild(new_tab_button);
  app.appendChild(p2);
  app.appendChild(force_download_button);
};
main();

//autoRefreshReact()
