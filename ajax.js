const $async = document.getElementById("async"),
  $fragment2 = document.createDocumentFragment();

async function getData() {
  try {
    let respuesta = await fetch(
        "https://www.dolarsi.com/api/api.php?type=valoresprincipales"
      ),
      respuestaConvertida = await respuesta.json();

    if (!respuesta.ok)
      throw { status: respuesta.status, statusText: respuesta.statusText };

    respuestaConvertida.splice(7, 2);
    respuestaConvertida.splice(5, 1);
    respuestaConvertida.splice(2, 1);

    respuestaConvertida.forEach((el) => {
      const $div = document.createElement("div");
     
      const $li = document.createElement("li");
      const $li1 = document.createElement("li");
      const $li2 = document.createElement("li");

      $li.setAttribute('id', 'li')

      $li.innerHTML = `${el.casa.nombre}`;
      $li2.innerHTML = `Venta: $${el.casa.venta}`;
      

      if (el.casa.compra === 'No Cotiza'){
       $li1.innerHTML = `Compra: No Cotiza`
      } else {
        $li1.innerHTML = `Compra: $${el.casa.compra}`;
      }
      if (el.casa.nombre === 'Dolar turista'){
        $li.innerHTML = `Dolar Turista/Tarjeta`
       }
      $div.className += 'card'
      $li.className += 'nombre'
      $li1.className += 'compra'
      $li2.className += 'compra'
      $div.appendChild($li);
      $div.appendChild($li1);
      $div.appendChild($li2);
      $fragment2.appendChild($div);
    });
    $async.appendChild($fragment2);
  } catch (error) {
    console.log(error);
  }
}

getData();
