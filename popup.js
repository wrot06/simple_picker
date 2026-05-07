const pickBtn = document.getElementById("pickBtn");
const copyBtn = document.getElementById("copyBtn1");
const hexColor = document.getElementById("hexColor");
const preview = document.getElementById("preview");

loadSavedColor();

pickBtn.addEventListener("click", async () => {

  try {

    const eyeDropper = new EyeDropper();

    const result = await eyeDropper.open();

    const color = result.sRGBHex;

    hexColor.value = color;

    preview.style.background = color;

    chrome.storage.local.set({
      pickedColor: color
    });

    // COPIAR AUTOMÁTICAMENTE
    await navigator.clipboard.writeText(color);

    copyBtn.innerText = "copied";

    setTimeout(() => {
      copyBtn.innerText = "copy";
    }, 3000);

  } catch (error) {

    console.log("Selección cancelada");

  }

});

copyBtn.addEventListener("click", async () => {

  const color = hexColor.value;

  if(!color) return;

  await navigator.clipboard.writeText(color);

  copyBtn.innerText = "copied";

  setTimeout(() => {
    copyBtn.innerText = "copy";
  }, 3000);

});

function loadSavedColor(){

  chrome.storage.local.get(["pickedColor"], (result) => {

    if(result.pickedColor){

      hexColor.value = result.pickedColor;

      preview.style.background = result.pickedColor;

    }

  });

}