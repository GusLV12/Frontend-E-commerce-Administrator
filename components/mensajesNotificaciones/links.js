//--> Crear usuario
export const nuevoUsuario = "http://localhost:27017/api/administrador"
export const validarToken = "http://localhost:27017/api/administrador/confirmar/"

//--> Iniciar sesion
export const iniciarSesion = "http://localhost:27017/api/administrador/iniSes"

//--> Resetear password
export const resetearPassword = "http://localhost:27017/api/administrador/olvide-password"
export const tokenResetearPassword = "http://localhost:27017/api/administrador/olvide-password/"
export const cambiarPassword = "http://localhost:27017/api/administrador/olvide-password/"

//--> Funciones crud de catalogo 'producto'
export const consultarProductos = "http://localhost:27017/api/productos/mostrarProductos"
export const editarProducto = "http://localhost:27017/api/productos/modificarProducto"
export const crearProducto = "http://localhost:27017/api/productos"
export const eliminarProducto = "http://localhost:27017/api/productos/eliminarProducto"
