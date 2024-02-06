import { unbind_event_listeners } from "./utils";

function tdOnClick(isOpen:boolean) {

}

export function daisyScript() {
  console.log("test");

  let open = false;

  const body = document.querySelector("body")!;
  const tds = document.querySelectorAll("td");
  tds.forEach((td, i) => {
    if (td.getAttribute("bgcolor") === "#ffffff") {
      td.addEventListener("click", () => {
        //td.setAttribute("bgcolor", "#000000")
        if (!open) {
          const iframe = document.createElement("iframe");
          iframe.src = "https://daisy.dsv.su.se/common/schema/bokning.jspa";
          iframe.style.width = "640px";
          iframe.style.height = "480px";
          body.appendChild(iframe);
          open = true;
        }
      });
    }
  });

  const input = document.querySelectorAll("input").item(3);
  
  input.removeAttribute("onclick");
  unbind_event_listeners(input);
  const newinput = document.querySelectorAll("input").item(3);
  newinput.addEventListener("click", () => {
    if (!open) {
      const iframe = document.createElement("iframe");
      iframe.src = "https://daisy.dsv.su.se/common/schema/bokning.jspa";
      iframe.style.width = "640px";
      iframe.style.height = "480px";
      body.appendChild(iframe);
      open = true;
    }
  });

  // const app = document.createElement("div")
  // app.id = "app"
  // body.appendChild(app)
  // console.log(app)

  //   const trs = document.querySelectorAll("tr");

  //   trs.forEach((tr, i) => {
  //     console.log(i);
  //     const tds = tr.querySelectorAll("td");
  //   });
}
