chrome.runtime.onInstalled.addListener(async function(details) {
    await chrome.storage.sync.set({new_tab: true})
    await chrome.storage.sync.set({force_download: false})
    console.log("Items added");
  });
  