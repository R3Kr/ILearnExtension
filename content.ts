import { henkeb } from "henkeb";
import { daisyScript } from "./daisy";
import { Prefs } from "./types";
import { setStorage, unbind_event_listeners } from "./utils";
import { autoRefreshReact } from "autoRefreshReact";
import browser from "webextension-polyfill";

const func = async (root: Document | HTMLElement) => {
  //console.log("Firefox test :)!!!");
  await setStorage();
  const prefs = (await browser.storage.local.get([
    "new_tab",
    "force_download",
  ])) as Prefs;
  root.querySelectorAll("a").forEach((value, key, parent) => {
    if (value.href.match("resource|mod_folder|url")) {
      if (value.href.match("mod_folder")) {
        // const [url, query] = value.href.split("?");
        const url = new URL(value.href);
        const params = new URLSearchParams(url.search);
        params.set("forcedownload", prefs.force_download ? "1" : "0");
        url.search = params.toString();
        value.href = url.toString();

        // value.href = url + `?forcedownload=${prefs.force_download ? 1 : 0}`;
      }

      value.removeAttribute("onclick");
      //value.href = value.href + "&redirect=1";
      const url = new URL(value.href);
      const params = new URLSearchParams(url.search);
      params.set("redirect", "1");
      url.search = params.toString();
      value.href = url.toString();

      value.target = prefs.new_tab ? "_blank" : "";
      value.rel = prefs.new_tab ? "noopener noreferrer" : "";

      unbind_event_listeners(value);
      //console.log(value);
    }
  });
  console.log();
};
func(document);

browser.storage.local.onChanged.addListener(() => func(document));
//console.log("Set event listener");

const targetNode = document.querySelector("body")!;
const observer = new MutationObserver((mutationList, observer) => {
  mutationList.forEach((m) => {
    m.addedNodes.forEach((n) => {
      if (n.nodeType === Node.ELEMENT_NODE) {
        func(n as HTMLElement);
      }
    });
  });
});

observer.observe(targetNode, {
  attributes: false,
  childList: true,
  subtree: true,
});
//console.log("Started observing");

if (window.location.hostname.match("daisy")) {
  daisyScript();
}
if (window.location.hostname.match("nextilearn")) {
  henkeb();
}

if (window.location.href.match("GetPersonalQueueStatusServlet")) {
  autoRefreshReact();
}