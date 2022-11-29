const inputbuscar = document.getElementById("inputBuscar");
const btnbuscar = document.getElementById("btnBuscar");
const contenedor = document.getElementById("contenedor");


async function jsonData(url) {
    const result = {};
    try {
        const response = await fetch(url);
        if (response.ok) {
            result.data = await response.json();
            result.status = "ok";
        } else {
            throw Error(response.statusText);    
        }
    } 
    catch (error) {
        result.status = 'error';
        result.data = error;
    }
    return result;
  }

function showData(title, date_created, description, href) {
    contenedor.innerHTML += `
    <div class="card">
    <img src="${href}" class="card-img-top img-fluid" >
    <div class="card-body">
      <h5 class="card-title">${title}</h5>
      <p class="card-text">${description}</p>
      <p class="card-text"><small class="text-muted">${date_created}</small></p>
    </div>
    </div>`

}

btnbuscar.addEventListener("click", async function() {

    contenedor.innerHTML = "";
    const nasaUrl = "https://images-api.nasa.gov/search?q=" + inputbuscar.value;
    const response = await jsonData(nasaUrl);
    inputbuscar.value = "";
    if (response.status === "ok" && response.data.collection.items.length != 0) {

        const {
            collection: { items },
        } = response.data;
    
        for (const item of items) {
            if (item.data != undefined && item.links != undefined ) {
                const {
                    data: [data],
                    links: [link],
                } = item;
                const { title, date_created, description } = data;
                const { href } = link;
                showData(title, date_created, description, href);
            } 
        } 
    console.log(response.data);
    console.log(response.status);
    } 
    else {
        alert("Busqueda no valida, ingrese otra cosa");
        console.log("asd");
    }

})
