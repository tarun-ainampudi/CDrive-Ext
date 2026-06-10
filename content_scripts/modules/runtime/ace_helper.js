function getCodesFromAceEditors(indexArray) {
  const editorDivs = document.querySelectorAll(".ace_editor");
  const codes = indexArray.map((index) => {
    if (index !== -1) return ace.edit(editorDivs[index]).getValue();
    return "";
  });
  console.log(`[Ace Helper] [Debug] codes: ${codes}`);
  return codes;
}

window.addEventListener(
  "message",
  (event) => {
    const data = event.data;
    if (data.action !== undefined && data.action === "get_ace_codes") {
      console.log(`[Ace Helper] [Debug] data: ${JSON.stringify(data)}`);
      window.postMessage({
        action: "ace_codes",
        codes: getCodesFromAceEditors(data.indexArray),
      });
    }
  },
  true,
);
