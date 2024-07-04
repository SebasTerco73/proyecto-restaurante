document.addEventListener('DOMContentLoaded', listarComidas);
async function listarComidas() {
    try {
        const divComidas = document.getElementById("comidasDiv");
        const response = await fetch("/menu/comidas");
        const comidas = await response.json();

        divComidas.innerHTML = "";

        comidas.forEach(comida => {
            const divTarjeta = document.createElement("div");
            divTarjeta.className = "tarjeta";
            divTarjeta.innerHTML = `
                <h3 class="menu-nombre">${comida.comida_nombre}</h3>
                <p class="menu-descripcion">${comida.comida_detalle}</p>
                <div class="action">
                    <h4 class="menu-precio">$${comida.comida_precio}</h4>
                    <button class="eliminarComida" data-id="${comida.comida_id}">x</button>
                </div>
            `;
            divComidas.appendChild(divTarjeta);
        });

        // ELIMINAR COMIDA BOTON
        document.querySelectorAll(".eliminarComida").forEach(btn => {
            btn.addEventListener("click", async (e) => {
                const id = e.target.getAttribute("data-id");
                try {
                    const response = await fetch(`/menu/comida/${id}`, {
                        method: "DELETE"
                    });
                        const result = await response.json();
                        alert(result.mensaje);
                        listarComidas();
                } catch (error) {
                    console.error("No se pudo eliminar:", error);
                }
            });
        });
    } catch (error) {
        console.log("Error al obtener y mostrar las comidas: ", error);
    }
}

document.addEventListener('DOMContentLoaded', listarBebidas)
     async function listarBebidas(){
        try{
            const divBebidas = document.getElementById("bebidasDiv");
            const response = await fetch ("/menu/bebidas");
            const bebidas = await response.json();

            divBebidas.innerHTML = "";

            bebidas.forEach(bebida => {
                const divTarjeta = document.createElement("div");
                divTarjeta.className = "tarjeta";
                let tieneAlcohol = bebida.bebida_conAlcohol?"Contiene alcohol":"No contiene alcohol";
                divTarjeta.innerHTML = `
                <h3 class="menu-nombre">${bebida.bebida_nombre}</h3>
                <p class="menu-descripcion">${tieneAlcohol}</p>
                <div class="action">
                <h4 class="menu-precio">$${bebida.bebida_precio}</h4>
                <button class="eliminarBebida" data-id="${bebida.bebida_id}">x</button>
                </div>
                `;
                divBebidas.appendChild(divTarjeta);
            });
            document.querySelectorAll(".eliminarBebida").forEach(btn => {
                btn.addEventListener("click", async (e) => {
                    const id = e.target.getAttribute("data-id");
                    try {
                        const response = await fetch(`/menu/bebida/${id}`, {
                            method: "DELETE"
                        });
                            const result = await response.json();
                            alert(result.mensaje);
                            listarBebidas();
                    } catch (error) {
                        console.error("No se pudo eliminar:", error);
                    }
                });
            });
        } catch (error) {
            console.log("Error al obtener y mostrar las babidas: ", error);
        }
    };

    document.addEventListener('DOMContentLoaded', () =>
        {
            const crearComidabtn = document.getElementById("nuevaComidabtn");
            const formCrearComida = document.getElementById("nuevaComidaform");
            crearComidabtn.addEventListener('click',()=>
            {
                formCrearComida.classList.toggle('hidden');
            })
        
            //CREAR USUARIO
            formCrearComida.addEventListener('submit', async (e) =>
                {
                    e.preventDefault();
                    const formData = new FormData(formCrearComida);
                    const data = 
                    {
                        //atributo name del form
                        nombre: formData.get("nombreComida"),
                        precio: formData.get("precioComida"),
                        detalle: formData.get("detalleComida"),
                        tipoComida: formData.get("tipoComida")
                    };
        
                    const response = await fetch ("/menu/comida",
                        {
                            method:"POST",
                            headers:{
                                'Content-Type':'application/json'
                            },
                            body: JSON.stringify(data)
                        });
                        const result = await response.json();
                        alert(result.mensaje);
                        formCrearComida.reset();
                        formCrearComida.classList.add('hidden');
                        listarComidas();
                }
                )
        });
        
    
