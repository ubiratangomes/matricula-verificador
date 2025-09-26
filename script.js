let matriculaFinal = "";

function calcularDV() {
  const parteFixa = document.getElementById("parteFixa").value;
  const digitoVariavel = document.getElementById("digitoVariavel").value;
  const matricula = document.getElementById("matricula").value;

  if (!/^\d$/.test(digitoVariavel) || !/^\d{1,7}$/.test(matricula)) {
    document.getElementById("resultado").innerText = "Preencha corretamente os campos.";
    document.getElementById("qrcode").innerHTML = "";
    return;
  }

  const matriculaFormatada = matricula.padStart(7, '0');
  const serieCompleta = parteFixa + digitoVariavel + matriculaFormatada + "00";

  const resto = BigInt(serieCompleta) % 97n;
  const dv = 98n - resto;
  const dvFormatado = dv < 10n ? "0" + dv : dv.toString();

  matriculaFinal = `${parteFixa}.${digitoVariavel}.${matriculaFormatada}-${dvFormatado}`;
  document.getElementById("resultado").innerText = `Matrícula completa: ${matriculaFinal}`;

  // Gera QR Code
  document.getElementById("qrcode").innerHTML = "";
  new QRCode(document.getElementById("qrcode"), {
    text: matriculaFinal,
    width: 180,
    height: 180
  });
}

function copiarTexto() {
  if (!matriculaFinal) return;
  navigator.clipboard.writeText(matriculaFinal).then(() => {
    alert("Matrícula copiada para a área de transferência!");
  });
}
