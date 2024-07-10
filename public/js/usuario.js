document.addEventListener('DOMContentLoaded', async() => {
    const crearUsuario = document.getElementById("crear");
    const eliminarUsuario = document.getElementById("eliminar");
    const actualizarUsuario = document.getElementById("actualizar");
    const datosUsuarios = document.getElementById("datos-body");

    await MostrarUsuarios();

    crearUsuario.addEventListener('click', () =>{
        document.getElementById("contentForm").classList.toggle("hidden");
    });

    async function MostrarUsuarios(){

        try {
            const response = await fetch("/usuarios/lista");
            
            if (!response.ok){
                throw new Error('Error al obtener los usuarios.');
            }

            const jsonUsers = await response.json();
            //datosUsuarios.innerHTML = ""; //Dejo vacía la tabla

            console.log(jsonUsers);
            
            let number = 1;
            for (user of jsonUsers){

                const fila = document.createElement('tr');
                const cellNumber = document.createElement('td');
                cellNumber.textContent = number;
                fila.appendChild(cellNumber);

                const cellNombre = document.createElement('td');
                cellNombre.colSpan ="3"
                cellNombre.textContent = user.usuario_nombre;
                fila.appendChild(cellNombre);

                const cellCorreo = document.createElement('td');
                cellCorreo.textContent = user.usuario_email;
                fila.appendChild(cellCorreo);

                //Agrego los botones
                const botones = document.createElement('td');
                botones.innerHTML = `
                                    <button id="actualizar" type="button" class="btn btn-primary">Actualizar</button>
                                    <button id="eliminar" type="button" class="btn btn-danger">Eliminar</button>
                `;                  
                fila.appendChild(botones);

                datosUsuarios.appendChild(fila);
                number = number + 1; 
            };
            
        } catch (error) {
           console.log('Error al intentar mostrar todos los usuarios.'); 
        }


        
    }
});