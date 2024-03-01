//import { createRoot } from 'react-dom';
//import * as RD from "react-dom"
import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

function readFileAsText(file: Blob, reader: FileReader) {
  return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
    //const reader = new FileReader();

    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);

    reader.readAsText(file, "ISO-8859-1");
  });
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Body />
    </QueryClientProvider>
  );
};

const Body = () => {
  const [refreshRate, setRefreshRate] = useState(1000);
  const parser = useRef(new DOMParser());
  const reader = useRef(new FileReader());
  //const input = useRef<HTMLInputElement>(null);

  const { data } = useQuery({
    queryKey: ["table"],
    queryFn: async () => {
      const r = await fetch(
        "https://mobil.handledning.dsv.su.se/servlet/GetPersonalQueueStatusServlet?autorefresh=true"
      );
      const r1 = await r.blob();
      const text = (await readFileAsText(r1, reader.current)) as string;
      const dom = parser.current.parseFromString(text, "text/html");
      const table = dom.querySelector("table")!;
      //console.log("fetched")
      return table.innerHTML;
    },
    refetchInterval: refreshRate,
  });

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: data || "" }}></div>
      Refresh rate:
      <input
        type="number"
        step={10}
        value={refreshRate}
        onChange={(e) => setRefreshRate(e.target.valueAsNumber)}
      ></input>
    </>
  );
};

export function autoRefreshReact() {
  const appDiv = document.createElement("div");
  appDiv.id = "app";
  const body = document.querySelector("body")!;
  body.appendChild(appDiv);
  body.removeChild(document.querySelector("table")!);
  const root = createRoot(document.getElementById("app")!);
  root.render(<App />);
}
