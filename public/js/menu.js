document.addEventListener('DOMContentLoaded', async () => {
    const listaComidasDIV = document.getElementById("comidasDiv");
    const crearComidaBTN = document.getElementById("nuevaComidabtn");
    const crearComidaForm = document.getElementById("nuevaComidaform");
    const editarComidaForm = document.getElementById("actualizarComidaform");
    const cerrarAgregarComidaBTN = document.getElementById("cerrarBtnAgregarComida");
    const cerrarEditarComidaBTN = document.getElementById("cerrarBtnEditarComida");
    const currentImage = document.getElementById("currentImage");

  

    await listarComidas(); // Llamar a listarComidas al cargar la página

  
    function cerrarFormularioSiClickFuera(event)
    {
        const editarComidaBTN = document.getElementsByClassName("actualizarComida");
        if (!crearComidaForm.contains(event.target) && !crearComidaBTN.contains(event.target)) {
            crearComidaForm.classList.add('hidden');
        }
        let clickOutsideEditBtns = true;
        for (let btn of editarComidaBTN) {
            if (btn.contains(event.target)) {
                clickOutsideEditBtns = false;
                break;
            }
        }

        if (!editarComidaForm.contains(event.target) && clickOutsideEditBtns) {
            editarComidaForm.classList.add('hidden');
        }
    }
    
    document.addEventListener('click', cerrarFormularioSiClickFuera);

    // Mostrar/ocultar formulario de crear comida
    crearComidaBTN.addEventListener('click', () => {
        crearComidaForm.classList.toggle('hidden');
        editarComidaForm.classList.add('hidden');
        document.getElementById('nombreComida').focus();

    });

    cerrarAgregarComidaBTN.addEventListener('click', ()=>
    {
        crearComidaForm.classList.add('hidden');
    });

    cerrarEditarComidaBTN.addEventListener('click', ()=>
    {
        editarComidaForm.classList.add('hidden');
    });

    // Enviar formulario de crear comida
    crearComidaForm.addEventListener('submit', async (e) =>
    {
        e.preventDefault();
        const formData = new FormData(crearComidaForm);
        const nombreComida = formData.get("nombreComida");
        const precioComida = formData.get("precioComida");
        const tipoComida = formData.get("tipoComida");
        
        const data = {
            //name
            nombre: nombreComida,
            precio: precioComida,
            tipoComida: tipoComida
        };
        try
        {
            // const response = await fetch("/menu/comida",
            const response = await fetchWithTimeout('/menu/comida', { timeout: 10000 }),
            {
                method: "POST",
                body: formData
            });
            const result = await response.json();
            alert(result.mensaje);
            console.log(result);
            crearComidaForm.reset();
            crearComidaForm.classList.add('hidden');
            await listarComidas(); // Actualizar lista de comidas después de crear una nueva
            const lastChild = listaComidasDIV.lastElementChild;
            lastChild.scrollIntoView({ behavior: 'smooth', block: 'end' });
        } catch (error) {
            console.error("Error al crear la comida:", error);
        }
    });

    // Escuchar eventos para editar comida
    listaComidasDIV.addEventListener('click', (e) =>
    {
        if (e.target.classList.contains('actualizarComida')) {
            const id = e.target.getAttribute('data-id');
            const nombre = e.target.getAttribute('data-nombre');
            const precio = e.target.getAttribute('data-precio');
            const imagen = e.target.getAttribute('data-archivo');
            const tipo = Number(e.target.getAttribute('data-tipo'));
            document.getElementById('editId').value = id;
            document.getElementById('editNombre').value = nombre;
            document.getElementById('editPrecio').value = precio;
            currentImage.src = imagen;
            const radios = document.getElementsByName('editTipo');
            radios.forEach(radio => {
                if (Number(radio.value) === tipo) {
                    radio.checked = true;
                }
            });
            crearComidaForm.classList.add('hidden'); // Ocultar formulario de crear al abrir el de editar
            editarComidaForm.classList.remove('hidden');
            document.getElementById('editNombre').focus();
        }
    });

    // Enviar formulario de editar comida
    editarComidaForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(editarComidaForm);
        const id = formData.get("editId");
        const data = {
            nombre: formData.get("editNombre") || document.querySelector(`.actualizarComida[data-id="${id}"]`).getAttribute('data-nombre'),
            precio: formData.get("editPrecio") || document.querySelector(`.actualizarComida[data-id="${id}"]`).getAttribute('data-precio'),
            tipoComida: parseInt(formData.get("editTipo"))
        };
        try {
            const response = await fetch(`/menu/comida/${id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            alert(result.mensaje);
            editarComidaForm.reset();
            editarComidaForm.classList.add('hidden');
            await listarComidas(); // Actualizar lista de comidas después de editar
        } catch (error) {
            console.error("Error al actualizar la comida:", error);
        }
    });

    // Función para listar comidas desde el servidor
    async function listarComidas() {
        try {
            const response = await fetch("/menu/comidas");
            if (!response.ok) {
                throw new Error('Error al obtener las comidas');
            }
            const comidas = await response.json();
            listaComidasDIV.innerHTML = "";

            comidas.forEach(comida => {
                const divTarjeta = document.createElement("div");
                const tipoComidaMap = {
                    1: 'Pastas',
                    2: 'Carnes',
                    3: 'Mariscos',
                    4: 'Opción Vegana',
                    5: 'Guarnición'
                };
                const imageSrc = comida.ruta_archivo ? `/uploads/${comida.ruta_archivo}` :'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUBbNf8tPjjMylsbREVGlN1Dj30k5_JVDZOg&s';
                const tipoComida = tipoComidaMap[comida.tipocomida_id] || 'Desconocido';
                divTarjeta.className = "tarjeta";
                divTarjeta.innerHTML = `
                    <h3 class="menu-nombre">${comida.comida_nombre}</h3>
                    <img src="${imageSrc}" class="imagenMenu" alt="Img de comida">
                    <p>${tipoComida}
                    <h4 class="menu-precio">$${comida.comida_precio}</h4>
                    <div class="action">
                        <button class="actualizarComida" data-archivo="${imageSrc}" data-id="${comida.comida_id}" data-nombre="${comida.comida_nombre}" data-descripcion="${comida.comida_detalle}" data-precio="${comida.comida_precio}" data-tipo="${comida.tipocomida_id}">Editar</button>
                        <button class="eliminarComida" data-id="${comida.comida_id}">x</button>
                    </div>
                `;
                listaComidasDIV.appendChild(divTarjeta);
            });

            // Asignar eventos para eliminar comidas
            listaComidasDIV.querySelectorAll(".eliminarComida").forEach(btn => {
                btn.addEventListener("click", async (e) => {
                    const id = e.target.getAttribute("data-id");
                    try {
                        const response = await fetch(`/menu/comida/${id}`, {
                            method: "DELETE"
                        });
                        const result = await response.json();
                        alert(result.mensaje);
                        await listarComidas(); // Actualizar lista de comidas después de eliminar
                    } catch (error) {
                        console.error("No se pudo eliminar:", error);
                    }
                });
            });
        } catch (error) {
            console.error("Error al listar las comidas:", error);
        }
    }
});

        
//************************************ L I S T A R    B E B I D A S ************************************
document.addEventListener('DOMContentLoaded', async () =>
{
    const listaBebidasDIV = document.getElementById("bebidasDiv");
    const crearBebidaBTN = document.getElementById("nuevaBebidabtn");
    const crearBebidaForm = document.getElementById("nuevaBebidaform");
    const editarBebidaForm = document.getElementById("actualizarBebidaform");
    const cerrarAgregarBebidaBTN = document.getElementById("cerrarBtnAgregarBebida");
    const cerrarEditarBebidaBTN = document.getElementById("cerrarBtnEditarBebida");
    const currentImageBebida = document.getElementById('currentImageBebida');
    

    cerrarAgregarBebidaBTN.addEventListener('click', ()=>
    {
        crearBebidaForm.classList.add('hidden');
    });

    cerrarEditarBebidaBTN.addEventListener('click', ()=>
        {
            editarBebidaForm.classList.add('hidden');
        });

    await listarBebidas() 

    function cerrarFormularioBebidaSiClickFuera(event)
    {
        const editarBebidaBTNS = document.getElementsByClassName("actualizarBebida");
        if (!crearBebidaForm.contains(event.target) && !crearBebidaBTN.contains(event.target)) {
            crearBebidaForm.classList.add('hidden');
        }
        let clickOutsideEditBtns = true;
        for (let btn of editarBebidaBTNS) {
            if (btn.contains(event.target)) {
                clickOutsideEditBtns = false;
                break;
            }
        }

        if (!editarBebidaForm.contains(event.target) && clickOutsideEditBtns) {
            editarBebidaForm.classList.add('hidden');
        }
    }
    
    document.addEventListener('click', cerrarFormularioBebidaSiClickFuera);

  // Mostrar/ocultar formulario de crear bebida
    crearBebidaBTN.addEventListener('click', () => {
        crearBebidaForm.classList.toggle('hidden');
        editarBebidaForm.classList.add('hidden');
        document.getElementById('nombreBebida').focus();
    });

    // Enviar formulario de crear bebida
    crearBebidaForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(crearBebidaForm);
        const data = {
            nombre: formData.get("nombreBebida"),
            precio: formData.get("precioBebida"),
            conAlcohol: formData.get("contieneAlcohol"),
        };
        try {
            const response = await fetch("/menu/bebida", {
                method: "POST",
                body: formData
            });
            const result = await response.json();
            alert(result.mensaje);
            crearBebidaForm.reset();
            crearBebidaForm.classList.add('hidden');
            await listarBebidas(); // Actualizar lista de comidas después de crear una nueva
            const lastChild = listaBebidasDIV.lastElementChild;
            lastChild.scrollIntoView({ behavior: 'smooth', block: 'end' });

        } catch (error) {
            console.error("Error al crear la bebida:", error);
        }
    });

    // Escuchar eventos para E D I T A R   B E B I D A
    listaBebidasDIV.addEventListener('click', (e) =>
    {
        if (e.target.classList.contains('actualizarBebida'))
        {
            const id = e.target.getAttribute('data-id');
            const nombre = e.target.getAttribute('data-nombre');
            const precio = e.target.getAttribute('data-precio');
            const tipo = Number(e.target.getAttribute('data-tipo'));
            const imagen = e.target.getAttribute('data-archivoBebida');
            document.getElementById('editIdBebida').value = id;
            document.getElementById('editNombreBebida').value = nombre;
            document.getElementById('editPrecioBebida').value = precio;
            currentImageBebida.src = imagen;
            const radios = document.getElementsByName('contieneAlcohol');
            radios.forEach(radio => {
                if (Number(radio.value) === tipo) {
                    radio.checked = true;
                }
            });
            crearBebidaForm.classList.add('hidden'); // Ocultar formulario de crear al abrir el de editar
            editarBebidaForm.classList.remove('hidden');
            document.getElementById('editNombreBebida').focus();
            
        }
    });

    // Enviar formulario de editar bebida
    editarBebidaForm.addEventListener('submit', async (e) =>
    {
        e.preventDefault();
        const formData = new FormData(editarBebidaForm);
        const id = formData.get("editId");
        const data = {
            nombre: formData.get("editNombre") || document.querySelector(`.actualizarBebida[data-id="${id}"]`).getAttribute('data-nombre'),
            precio: formData.get("editPrecio") || document.querySelector(`.actualizarBebida[data-id="${id}"]`).getAttribute('data-precio'),
            conAlcohol: parseInt(formData.get("contieneAlcohol"))
        };
        try {
            const response = await fetch(`/menu/bebida/${id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            alert(result.mensaje);
            editarBebidaForm.reset();
            editarBebidaForm.classList.add('hidden');
            await listarBebidas(); // Actualizar lista de comidas después de editar
        } catch (error) {
            console.error("Error al actualizar la comida:", error);
        }
    });

    //LISTAR BEBIDAS
    async function listarBebidas() 
    {
        try
        {
            const divBebidas = document.getElementById("bebidasDiv");
            const response = await fetch ("/menu/bebidas");
            const bebidas = await response.json();
            divBebidas.innerHTML = "";
            bebidas.forEach(bebida =>
            {
                const imageSrcBebida = bebida.ruta_archivo ? `/uploads/${bebida.ruta_archivo}` :'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUBbNf8tPjjMylsbREVGlN1Dj30k5_JVDZOg&s';
                const divTarjeta = document.createElement("div");
                divTarjeta.className = "tarjeta";
                let tieneAlcohol = bebida.bebida_conAlcohol?"Contiene alcohol":"No contiene alcohol";
                divTarjeta.innerHTML = `
                <h3 class="menu-nombre">${bebida.bebida_nombre}</h3>
                <img src="${imageSrcBebida}" class="imagenMenu" alt="Img de bebida">
                <p class="menu-descripcion">${tieneAlcohol}</p>
                <h4 class="menu-precio">$${bebida.bebida_precio}</h4>
                <div class="action">
                <button class="actualizarBebida" data-archivoBebida="${imageSrcBebida}" data-id="${bebida.bebida_id}" data-nombre="${bebida.bebida_nombre}" data-precio="${bebida.bebida_precio}" data-tipo="${bebida.bebida_conAlcohol}">Editar</button>
                <button class="eliminarBebida" data-id="${bebida.bebida_id}">x</button>
                </div>
                `;
                divBebidas.appendChild(divTarjeta);
            });

            //E L I M I N A R   B E B I D A
            document.querySelectorAll(".eliminarBebida").forEach(btn =>
            {
                btn.addEventListener("click", async (e) =>
                {
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
});
