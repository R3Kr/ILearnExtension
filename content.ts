import { Prefs } from "./types";

var unbind_event_listeners = function (node: HTMLAnchorElement) {
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

const func = async (root: Document | HTMLElement) => {
  //console.log("Script started!!!");
  const prefs = (await chrome.storage.sync.get([
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

chrome.storage.sync.onChanged.addListener(() => func(document));
//console.log("din mamma");

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
