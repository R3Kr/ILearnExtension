import browser from "webextension-polyfill";

export const unbind_event_listeners = function (node: HTMLElement) {
  var parent = node.parentNode;
  if (parent) {
    parent.replaceChild(node.cloneNode(true), node);
  } else {
    var ex = new Error(
      "Cannot remove event listeners from detached or document nodes"
    ) as any;
    ex.code = DOMException[(ex.name = "HIERARCHY_REQUEST_ERR")];
    throw ex;
  }
};

export async function setStorage() {
  const settings = await browser.storage.local.get();
  if (Object.keys(settings).length === 0) {
    await browser.storage.local.set({ new_tab: true });
    await browser.storage.local.set({ force_download: false });
    console.log("Items added");
  } 
}
