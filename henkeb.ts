export function henkeb() {
  const gold =
    "https://ilearn.dsv.su.se/pluginfile.php/35/user/icon/dsv_classic/f1?rev=137" as const;

  document.querySelectorAll("img").forEach((v) => {
    if (
      v.getAttribute("alt") === "Henrik Bergström" ||
      v.getAttribute("title") === "Henrik Bergström"
    ) {
      v.src = gold;
    }
  });
}
