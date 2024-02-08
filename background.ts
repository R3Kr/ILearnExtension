import browser from "webextension-polyfill";

browser.runtime.onInstalled.addListener(async function() {
    await browser.storage.sync.set({new_tab: true})
    await browser.storage.sync.set({force_download: false})
    console.log("Items added");
  });
  