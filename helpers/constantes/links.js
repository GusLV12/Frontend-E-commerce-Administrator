//--> Crear usuario
export const nuevoUsuario = "http://localhost:4000/api/administrador"
export const validarToken = "http://localhost:4000/api/administrador/confirmar/"

//--> Iniciar sesion
export const iniciarSesion = "http://localhost:4000/api/administrador/iniSes"

//--> Resetear password
export const resetearPassword = "http://localhost:4000/api/administrador/olvide-password"
export const tokenResetearPassword = "http://localhost:4000/api/administrador/olvide-password/"
export const cambiarPassword = "http://localhost:4000/api/administrador/olvide-password/"

//--> Funciones crud de catalogo 'producto'
export const consultarProductos = "http://localhost:4000/api/productos/mostrarProductos"
export const editarProducto = "http://localhost:4000/api/productos/modificarProducto"
export const nuevoProducto = "http://localhost:4000/api/productos"
export const eliminarProducto = "http://localhost:4000/api/productos/eliminarProducto"
