document.addEventListener('DOMContentLoaded', async() => {
    const crearUsuario = document.getElementById("crear");
    const eliminarUsuario = document.getElementById("eliminar");
    const actualizarUsuario = document.getElementById("actualizar");
    const datosUsuarios = document.getElementById("datos-body");

    await usuarios();

    crearUsuario.addEventListener('click', () =>{
        document.getElementById("contentForm").classList.toggle("hidden");
    });

    async function usuarios(){

        jsonUsers = [
            {
                "nombre" : "Mateo",
                "password" : "kioasld",
                "email" : "mateososa@hotmail.com"
            },
            {
                "nombre" : "ana",
                "password" : "contraseña",
                "email" : "ana@hotmail.com"
            }
        ];
        console.log(jsonUsers);
        for (user of jsonUsers){
            console.log(user);

            const fila = document.createElement('tr');
            const cellNombre = document.createElement('td');
            cell.textContent = user.nombre;
            fila.appendChild(cellNombre);
            const cellCorreo = document.createElement('td');
            cell.textContent = user.email;
            fila.appendChild(cellCorreo);

            datosUsuarios.appendChild(fila);

        };
        // jsonUsers.forEach((user) => {
        //     

        //     user.forEach((dato) => {
        //         
        //         cell.textContent = dato;
        //         fila.appendChild(cell);
        //     });
            
        //     datosUsuarios.appendChild(fila);            
    
        // });


        // try {
        //     //const response = await fetch("/usuarios");
        //     jsonUsers = [
        //         {
        //             "nombre" : "Mateo",
        //             "password" : "kioasld",
        //             "email" : "mateososa@hotmail.com"
        //         },
        //         {
        //             "nombre" : "ana",
        //             "password" : "contraseña",
        //             "email" : "ana@hotmail.com"
        //         }
        //     ];
        //     // if (!response.ok){
        //     //     throw new Error('Error al obtener los usuarios.');
        //     // }

        //     const jsonUsers = await response.json();
        //     datosUsuarios.innerHTML = ""; //Dejo vacía la tabla

        //     console.log(jsonUsers);
        //     // jsonUsers.forEach((user) => {
        //     //     const fila = document.createElement('tr');
                
        //     //     // tdNombre.textContent(${user.nombre});
        //     //     // tr.appendChild(tdNombre);
        //     //     // tr.appendChild(tdCorreo);
                

        //     // });
            
        // } catch (error) {
        //    console.log('Error al intentar mostrar todos los usuarios.'); 
        // }
    }
});