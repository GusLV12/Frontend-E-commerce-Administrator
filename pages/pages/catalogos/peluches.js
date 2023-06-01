import React, { useEffect, useState } from "react";
import Layout from "@/layout/layout"
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Paginator } from 'primereact/paginator';
// import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';



const CatalogoFlores = () => {
  //----------------| Lista de variables |----------------
  const [peluches, setPeluches] = useState([])
  const [layout, setLayout] = useState('grid');
  //-->Detalles de flor
  const [detallesPeluche, setDetallesPeluche] = useState({})
  const [mostrarDialog, setMostrarDialog] = useState(false)
  //--> Buscador
  const [buscador, setBuscador] = useState('')

  //--> Ejecucion en segundo plano
  const datosPeluches = [
    {
      nombre: "Tiburon Gato", precio: 14.90, categoria: "san valentin", estatus: "disponible",
      imagen: "https://http2.mlstatic.com/D_NQ_NP_2X_778361-MLM69281757162_052023-F.webp", descripcion: "Descripcion de tiburon"
    },
    {
      nombre: "Jirafa", precio: 30.29, categoria: "cumpleaños", estatus: "agotado",
      imagen: "https://s.cornershopapp.com/product-images/2343555.jpg?versionId=xPvvkAxaVapD_aHU1QfX81cIZDBccvis",
      descripcion: "Descripcion de jirafa"
    },
    {
      nombre: "Oso Panda", precio: 8.40, categoria: "san valentin", estatus: "pocos",
      imagen: "https://m.media-amazon.com/images/I/41dFyXgb9sL._SL500_.jpg",
      descripcion: "Descripcion de oso panda"
    },
    {
      nombre: "Stich", precio: 12.67, categoria: "cumpleaños", estatus: "pocos",
      imagen: "https://http2.mlstatic.com/D_NQ_NP_929622-MLM51003735224_082022-O.jpg", descripcion: "Descripcion de stich"
    },
    {
      nombre: "Unicornio", precio: 50.01, categoria: "cumpleaños", estatus: "disponible",
      imagen: "https://minisomx.vtexassets.com/arquivos/ids/218097/Peluche-Miniso-Unicornio-Felpa-Rosa-16x28-cm-1-12948.jpg?v=637952098028100000", descripcion: "Descripcion de unicornio"
    },
    {
      nombre: "Delfin", precio: 84.69, categoria: "san valentin", estatus: "agotado",
      imagen: "https://puuf.mx/wp-content/uploads/2023/02/delfin-de-peluche-azul-30-cm.jpg", descripcion: "Descripcion de delfin"
    },
  ]
  useEffect(() => { setPeluches(datosPeluches) }, [])

  //--> Indicar estado de la flor
  const getSeverity = (peluche) => {
    switch (peluche.estatus) {
      case 'disponible':
        return 'success';

      case 'pocos':
        return 'warning';

      case 'agotado':
        return 'danger';

      default:
        return null;
    }
  };

  //--> Modo de vista: lista
  const listItem = (peluche) => {
    return (
      <div className="col-12">
        <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">

          <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`${peluche.imagen}`} alt={`${peluche.nombre}`} style={{ width: '200px', height: '200px' }} />
          <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
            <div className="flex flex-column align-items-center sm:align-items-start gap-3">
              <div className="text-2xl font-bold text-900">{peluche.nombre}</div>
              {/* <Rating value={peluche.rating} readOnly cancel={false}></Rating> */}
              <div className="flex align-items-center gap-3">
                <Tag value={peluche.estatus} severity={getSeverity(peluche)}></Tag>
                <span className="flex align-items-center gap-2">
                  <i className="pi pi-tag"></i>
                  <span className="font-semibold">{peluche.categoria}</span>
                </span>
              </div>
              <span className="text-2xl font-semibold mt-8">${peluche.precio}</span>
            </div>

            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2 mt-6">
              <Button label="Favoritos" icon="pi pi-heart" rounded severity="help"
                aria-label="Favorite" className="p-button-rounded" />
              <Button label="Agregar" icon="pi pi-shopping-cart" className="p-button-rounded"
                disabled={peluche.estatus === 'agotado'} />
              <Button label="Detalles" icon="pi pi-external-link" className="p-button-rounded"
                onClick={() => dialogoFlor(flor)} />
            </div>

          </div>
        </div>
      </div>
    );
  };

  //--> Modo de vista: grid
  const gridItem = (peluche) => {
    return (
      <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
        <div className="p-4 border-1 surface-border surface-card border-round">

          <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <div className="flex align-items-center gap-2">
              <i className="pi pi-tag"></i>
              <span className="font-semibold">{peluche.categoria}</span>
            </div>
            <Tag value={peluche.estatus} severity={getSeverity(peluche)}></Tag>
          </div>

          <div className="flex flex-column align-items-center gap-3 py-5">
            <img className="shadow-2 border-round" src={`${peluche.imagen}`} alt={`${peluche.nombre}`} style={{ width: '200px', height: '200px' }} />
            <div className="text-2xl font-bold">{peluche.nombre}</div>
            <span className="text-2xl font-bold">${peluche.precio}</span>
            {/* <Rating value={peluche.rating} readOnly cancel={false}></Rating> */}
          </div>

          <div className="flex align-items-center justify-content-between">
            <Button icon="pi pi-heart" rounded severity="help" aria-label="Favorite" className="" />
            <Button label="Detalles" icon="pi pi-search" className=" font-light ml-2" onClick={() => dialogoPeluche(peluche)} />
            <Button label="Agregar" icon="pi pi-shopping-cart" className="font-light ml-2 " disabled={peluche.estatus === 'agotado'}></Button>
          </div>

        </div>
      </div>
    );
  };

  //--> Cambiar modo de vista
  const itemTemplate = (peluche, layout) => {
    if (!peluche) { return }

    if (layout === 'list') return listItem(peluche);
    else if (layout === 'grid') return gridItem(peluche);
  };

  const iniciarBusqueda = () => {
    let peluchesFiltrados
    peluchesFiltrados = datosPeluches.filter(peluche => buscador == peluche.nombre)
    if (peluchesFiltrados.length === 0) { peluchesFiltrados = datosPeluches.filter(peluche => buscador === peluche.categoria) }
    if (peluchesFiltrados.length === 0) { peluchesFiltrados = datosPeluches.filter(peluche => buscador === peluche.estatus) }
    if (peluchesFiltrados.length === 0) { peluchesFiltrados = datosPeluches.filter(peluche => buscador == peluche.precio) }
    setPeluches(peluchesFiltrados)
  }

  const limpiarBusqueda = () => {
    setBuscador("")
    setPeluches(datosPeluches)
  }

  //--> Barra para cambiar modo de vista
  const header = () => {
    return (
      <div className="flex justify-content-between">
        <div className="p-inputgroup w-4">
          <Button icon="pi pi-search" onClick={iniciarBusqueda} />
          <InputText placeholder="Buscar por categoria" value={buscador} onChange={e => setBuscador(e.target.value)} />
          <Button icon="pi pi-times" onClick={limpiarBusqueda} disabled={buscador ? false : true} />
        </div>

        <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
      </div>
    );
  };

  //----------------| Funciones para dialogo |----------------
  const dialogoPeluche = (peluche) => {
    setMostrarDialog(true)
    setDetallesPeluche(peluche)
  }

  const cerrarDialogo = () => {
    setMostrarDialog(false)
    setDetallesPeluche({})
  }

  const botonesDialogo = (
    <><Button label="Cerrar" icon="pi pi-times" onClick={cerrarDialogo} className="p-button-text" /></>
  )

  //----------------| Valor que regresara |----------------
  return (
    <Layout
      title="Flores"
      description="Acceso al catalogo de flores"
    >
      <div className="grid">
        <div className="col-12">
          <div className="card">

            <h5>Flores</h5>
            <DataView value={peluches} itemTemplate={itemTemplate} layout={layout} header={header()} />

            <Dialog
              header={`Detalles de ${detallesPeluche.nombre}`}
              visible={mostrarDialog} onHide={cerrarDialogo}
              footer={botonesDialogo} style={{ width: '35vw' }}
            >
              <div className="flex justify-content-center">
                <img src={detallesPeluche.imagen} style={{ width: '200px', height: '200px' }} />
              </div>
              <div className="mt-5">
                <p className="my-2"><span className="font-semibold text-lg">Nombre: </span>{detallesPeluche.nombre}</p>
                <p className="my-2"><span className="font-semibold text-lg">Precio: </span>${detallesPeluche.precio}</p>
                <p className="my-2"><span className="font-semibold text-lg">Categoria: </span>{detallesPeluche.categoria}</p>
                <p className="my-2"><span className="font-semibold text-lg">Estatus: </span>{detallesPeluche.estatus}</p>
                <p className="my-2"><span className="font-semibold text-lg">Descripcion: </span>{detallesPeluche.descripcion}</p>
              </div>
            </Dialog>

          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CatalogoFlores
