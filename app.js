document.getElementById("frmGestion").addEventListener("submit", async function (e) {
  e.preventDefault();

  await enviarFormulario();
});

async function enviarFormulario() {
  //obtener el archivo de ficha de comprobante para cobnvertirloa base64
  const archivo = document.getElementById("comprobante").files[0];
  let archivoBase64 = "";
  let archivoNombre = "";
  let archivoMime = "";

  if (archivo) {
    archivoBase64 = await convertirBase64(archivo);

    archivoNombre = archivo.name;

    archivoMime = archivo.type;
  }

  //generar array datos
  const datos = {
    fechaHora: document.getElementById("fechaHora").value,
    tipoPago: document.getElementById("tipoPago").value,
    telEjecutivo: document.getElementById("telEjecutivo").value,
    nombreCliente: document.getElementById("nombreCliente").value,
    fechaPago: document.getElementById("fechaPago").value,
    referencia: document.getElementById("referenciaPago").value,
    credito: document.getElementById("credito").value,
    importe: document.getElementById("importe").value,
    correoEjecutivo: document.getElementById("correoEjecutivo").value,
    nombreEjecutivo: document.getElementById("nombreEjecutivo").value,
    comentario: document.getElementById("comentario").value,
    archivoNombre: archivoNombre,
    archivoMime: archivoMime,
    archivoBase64: archivoBase64,
  };

  const API_URL = "";

  const formData = new FormData();

  formData.append("datos", JSON.stringify(datos));

  const response = await fetch(API_URL, {
    method: "POST",
    mode: "no-cors",
    body: formData,
  });
}

function establecerFechaActual() {
  const ahora = new Date();

  const anio = ahora.getFullYear();

  const mes = String(ahora.getMonth() + 1).padStart(2, "0");

  const dia = String(ahora.getDate()).padStart(2, "0");

  const hora = String(ahora.getHours()).padStart(2, "0");

  const minutos = String(ahora.getMinutes()).padStart(2, "0");

  const segundos = String(ahora.getSeconds()).padStart(2, "0");

  const fechaCompleta = `${anio}-${mes}-${dia} ${hora}:${minutos}:${segundos}`;

  document.getElementById("fechaHora").value = fechaCompleta;
}

window.onload = establecerFechaActual;

function convertirBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = reject;
  });
}

document.getElementById("tipoPago").addEventListener("change", mostrarCamposPago);

function mostrarCamposPago() {
  const tipoPago = document.getElementById("tipoPago").value;

  const divReferencia = document.getElementById("divReferenciaPago");
  const txtReferencia = document.getElementById("referenciaPago");

  const divOficinaPago = document.getElementById("divOficinaPago");
  const txtoficinaPago = document.getElementById("oficinaPago");

  const divFolioPago = document.getElementById("divFolioPago");
  const txtFolioPago = document.getElementById("folioPago");

  const divChPago = document.getElementById("divChPago");
  const txtchPago = document.getElementById("chPago");

  // Ocultar todos los grupos
  divReferencia.style.display = "none";
  divOficinaPago.style.display = "none";
  divFolioPago.style.display = "none";
  divChPago.style.display = "none";
  // Quitar required
  txtReferencia.removeAttribute("required");
  txtoficinaPago.removeAttribute("required");
  txtFolioPago.removeAttribute("required");
  txtchPago.removeAttribute("required");
  // Limpiar valores opcionalmente
  txtReferencia.value = "";
  txtoficinaPago.value = "";
  txtFolioPago.value = "";
  txtchPago.value = "";

  // OXXO y TELECOMM
  if (tipoPago === "OXXO" || tipoPago === "TELECOMM") {
    divReferencia.style.display = "block";
    txtReferencia.setAttribute("required", "required");
  }
  // BANSEFI
  if (tipoPago === "BANSEFI") {
    divOficinaPago.style.display = "block";
    divFolioPago.style.display = "block";
    divChPago.style.display = "block";
    txtoficinaPago.setAttribute("required", "required");
    txtFolioPago.setAttribute("required", "required");
    txtchPago.setAttribute("required", "required");
  }
}
