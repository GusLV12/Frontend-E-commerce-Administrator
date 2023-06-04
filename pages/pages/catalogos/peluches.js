import React, { useEffect, useState, useRef } from "react";
import Layout from "@/layout/layout"
//--> Componentes primeReact
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { Dropdown } from 'primereact/dropdown';
import { RadioButton } from 'primereact/radiobutton';
import { Message } from 'primereact/message';
//--> Funciones propias
import { objetoVacio } from "@/components/catalogos/objetovacio";
import { formatoPrecio } from "@/helpers/funciones";
import { listaCategorias } from "@/components/catalogos/listacategorias";
import { camposVacios } from "@/components/mensajesNotificaciones/mensajes";

const CatalogoFlores = () => {
  //--> Estructura de objeto vacio
  let pelucheVacio = objetoVacio

  //----------------| Lista de variables |----------------
  //--> Registros
  const [product, setProduct] = useState(pelucheVacio);
  const [products, setProducts] = useState(null);
  //--> Dialogos
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  //--> Otros
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  //--> Mensajes
  const [mensajeRespuesta, setMensajeRespuesta] = useState('')
  //--> Especiales
  const toast = useRef(null);
  const dt = useRef(null);

  //--> Cargar cuando se renderiza
  useEffect(() => {
    const datos = [
      { id: 1, nombre: 'Oso', precio: 71, categoria: 'Fiestas', imagenes: null, estatus: 'DISPONIBLE' },
      { id: 2, nombre: 'Jirafa', precio: 37, categoria: 'San valentin', imagenes: null, estatus: 'POCOS' },
      { id: 3, nombre: 'Tiburon', precio: 89, categoria: 'Año nuevo', imagenes: null, estatus: 'AGOTADO' },
      { id: 4, nombre: 'Panda', precio: 34, categoria: 'Cumpleaños', imagenes: null, estatus: 'DISPONIBLE' },
    ]
    setProducts(datos)
  }, []);


  //----------------| Interaccion con dialogos |----------------
  const abrirDialogoCM = () => {
    setProduct(pelucheVacio);
    setSubmitted(false);
    setProductDialog(true);
  };

  const cerrarDialogoCM = () => {
    setSubmitted(false);
    setProductDialog(false);
  };

  const cerrarDialogoEliminarRegistro = () => { setDeleteProductDialog(false) };

  const cerrarDialogoEliminarRegistros = () => { setDeleteProductsDialog(false) }

  //----------------| Funciones Back-end |----------------
  const guardarRegistro = () => {
    //--> Validacion antes de envio
    if (Object.values(product).includes('')) {
      setMensajeRespuesta(camposVacios)
      setTimeout(() => { setMensajeRespuesta('') }, 3000)
      return
    }

    setSubmitted(true);
    //--> Editar registro
    if (product.id) {
      const arregloModificado = products.map((regis) => regis.id === product.id ? product : regis)
      setProducts(arregloModificado)
      toast.current.show({
        severity: 'success', summary: 'Peluche actualizado', detail: 'Se ha actualizado el peluche', life: 3000
      });
    }
    //--> Crear registro
    else {
      const arregloNuevo = [...products, product]
      setProducts(arregloNuevo)
      toast.current.show({ severity: 'success', summary: 'Peluche creado', detail: 'El peluche ha sido creada', life: 3000 });
    }
    setProduct(pelucheVacio);
    setProductDialog(false);
  };

  const editarRegistro = (product) => {
    setProduct({ ...product });
    setProductDialog(true);
  };

  const confirmarEliminarRegistro = (product) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };

  const eliminarRegistro = () => {
    //--> Registros que no sean los seleccionados
    let _products = products.filter((val) => val.id !== product.id);

    setProducts(_products);
    setDeleteProductDialog(false);
    setProduct(pelucheVacio);
    toast.current.show({
      severity: 'success', summary: 'Peluche eliminado', detail: 'Se ha eliminado correctamente el peluche', life: 3000
    });
  };

  const exportCSV = () => { dt.current.exportCSV() }

  const confirmDeleteSelected = () => { setDeleteProductsDialog(true) }

  const deleteSelectedProducts = () => {
    //--> Registros que no son seleccionados
    let _products = products.filter((val) => !selectedProducts.includes(val));

    setProducts(_products);
    setDeleteProductsDialog(false);
    setSelectedProducts(null);
    toast.current.show({
      severity: 'success', summary: 'Peluches eliminados', detail: 'Los peluches fueron eliminados', life: 3000
    });
  };

  //----------------| Funciones para editar |----------------
  const cambiarEstatus = (e) => {
    let _product = { ...product };

    _product['estatus'] = e.value;
    setProduct(_product);
  };

  const cambiarString = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let _product = { ...product };
    _product[`${name}`] = val;
    setProduct(_product);
  };

  const cambiarNumero = (e, name) => {
    const val = e.value || 0;
    let _product = { ...product };
    _product[`${name}`] = val;
    setProduct(_product);
  };

  //----------------| Plantillas |----------------
  const plantillaImagen = (rowData) => {
    return <img
      // src={`https://primefaces.org/cdn/primereact/images/product/${rowData.image}`}
      alt={rowData.image} className="shadow-2 border-round" style={{ width: '64px' }} />;
  };

  const plantillaPrecio = (rowData) => { return formatoPrecio(rowData.precio) }

  const ratingBodyTemplate = (rowData) => {
    return <Rating value={rowData.rating} readOnly cancel={false} />;
  };

  const plantillaEstatus = (rowData) => {
    return <Tag value={rowData.estatus} severity={getSeverity(rowData)}></Tag>;
  };

  const getSeverity = (product) => {
    switch (product.estatus) {
      case 'DISPONIBLE': return 'success';
      case 'POCOS': return 'warning';
      case 'AGOTADO': return 'danger';
      default: return null;
    }
  };

  //----------------| Botones de dialogos |----------------
  const cabezal = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Control de peluches</h4>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
      </span>
    </div>
  );

  const botonIzquierda = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button label="New" icon="pi pi-plus" severity="success" onClick={abrirDialogoCM} />
        <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} />
      </div>
    );
  };

  const botonDerecha = () => {
    return <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
  };

  const botonesAccion = (rowData) => {
    return (
      <>
        <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editarRegistro(rowData)} />
        <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmarEliminarRegistro(rowData)} />
      </>
    );
  };

  const botonesCrearModificar = (
    <>
      <Button label="Cancelar" icon="pi pi-times" outlined onClick={cerrarDialogoCM} />
      <Button label="Guardar" icon="pi pi-check" onClick={guardarRegistro} />
    </>
  );

  const botonesEliminarRegistro = (
    <>
      <Button label="No" icon="pi pi-times" outlined onClick={cerrarDialogoEliminarRegistro} />
      <Button label="Si" icon="pi pi-check" severity="danger" onClick={eliminarRegistro} />
    </>
  );

  const botonesEliminarRegistros = (
    <>
      <Button label="No" icon="pi pi-times" outlined onClick={cerrarDialogoEliminarRegistros} />
      <Button label="Si" icon="pi pi-check" severity="danger" onClick={deleteSelectedProducts} />
    </>
  );

  //----------------| Valor que regresara |----------------
  return (
    <Layout
      title="Peluches"
      description="Acceso al catalogo de peluches"
    >
      <div className="grid">
        <Toast ref={toast} />
        <div className="col-12">
          <div className="card">
            <Toolbar className="mb-4" left={botonIzquierda} right={botonDerecha} />

            <DataTable
              ref={dt} value={products} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
              paginator rows={10} rowsPerPageOptions={[5, 10, 25]} showGridlines
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              currentPageReportTemplate="Mostrando {first} - {last} de {totalRecords} registros"
              globalFilter={globalFilter} header={cabezal}
            >
              <Column selectionMode="multiple" exportable={false} />
              <Column field="id" header="ID" sortable style={{ minWidth: '12rem', textAlign: "center" }} />
              <Column field="nombre" header="Nombre" sortable style={{ minWidth: '16rem', textAlign: "center" }} />
              <Column field="precio" header="Precio" body={plantillaPrecio} sortable
                style={{ minWidth: '8rem', textAlign: "center" }} />
              <Column field="categoria" header="Categoria" sortable style={{ minWidth: '10rem', textAlign: "center" }} />
              {/* <Column field="rating" header="Reviews" body={ratingBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column> */}
              <Column field="image" header="Imagenes" body={plantillaImagen} />
              <Column field="estatus" header="Estatus" body={plantillaEstatus} sortable
                style={{ minWidth: '12rem', textAlign: "center" }} />
              <Column header="Editar" body={botonesAccion} exportable={false} style={{ minWidth: '12rem' }} />
            </DataTable>

            <Dialog
              visible={productDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Detalles del peluche" modal className="p-fluid" footer={botonesCrearModificar} onHide={cerrarDialogoCM}
            >
              {product.image && (
                <img
                  // src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`}
                  alt={product.image} className="product-image block m-auto pb-3" />
              )}
              <div className="field">
                <label htmlFor="nombre" className="font-bold">Nombre</label>
                <InputText
                  id="nombre" value={product.nombre} onChange={(e) => cambiarString(e, 'nombre')}
                  required autoFocus className={classNames({ 'p-invalid': submitted && !product.name })}
                />
                {submitted && !product.nombre && <small className="p-error">El nombre es obligatorio.</small>}
              </div>
              <div className="formgrid grid">
                <div className="field col">
                  <label htmlFor="precio" className="font-bold">Precio</label>
                  <InputNumber
                    id="precio" value={product.precio} onValueChange={(e) => cambiarNumero(e, 'precio')}
                    mode="currency" currency="USD" locale="en-US"
                  />
                </div>
                <div className="field col">
                  <label htmlFor="categoria" className="font-bold">Categoria/Evento</label>
                  <Dropdown
                    value={product.categoria} onChange={(e) => cambiarString(e, 'categoria')}
                    options={listaCategorias} optionLabel="nombre" optionValue="valor"
                    placeholder="Escoge una categoria" className="w-full md:w-14rem" />
                </div>
              </div>

              <div className="field">
                <label className="mb-3 font-bold">Estatus</label>
                <div className="formgrid grid">
                  <div className="field-radiobutton col-4">
                    <RadioButton
                      inputId="estatus1" name="estatus" value="DISPONIBLE" onChange={cambiarEstatus}
                      checked={product.estatus === 'DISPONIBLE'} />
                    <label htmlFor="estatus1">Disponible</label>
                  </div>
                  <div className="field-radiobutton col-4">
                    <RadioButton
                      inputId="estatus2" name="estatus" value="POCOS" onChange={cambiarEstatus}
                      checked={product.estatus === 'POCOS'} />
                    <label htmlFor="estatus2">Pocos</label>
                  </div>
                  <div className="field-radiobutton col-4">
                    <RadioButton
                      inputId="estatus3" name="estatus" value="AGOTADO" onChange={cambiarEstatus}
                      checked={product.estatus === 'AGOTADO'} />
                    <label htmlFor="estatus3">Agotado</label>
                  </div>
                </div>
              </div>
              <FileUpload mode="basic" name="demo[]" url="/api/upload" accept="image/*" maxFileSize={1000000} />
              {/* <FileUpload mode="basic" accept="image/*" maxFileSize={1000000}
                auto chooseLabel="Browse" /> */}
              {mensajeRespuesta && (
                <div className="mt-4">
                  <Message severity="error" text={mensajeRespuesta} />
                </div>
              )}

            </Dialog>

            <Dialog
              visible={deleteProductDialog} style={{ width: '32rem' }}
              breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={botonesEliminarRegistro}
              onHide={cerrarDialogoEliminarRegistro}
            >
              <div className="confirmation-content">
                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                {product && (
                  <span>
                    Estas seguro de eliminar <b>{product.nombre}</b>?
                  </span>
                )}
              </div>
            </Dialog>

            <Dialog visible={deleteProductsDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={botonesEliminarRegistros} onHide={cerrarDialogoEliminarRegistros}>
              <div className="confirmation-content">
                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                {product && <span>Estas seguro de eliminar los registros?</span>}
              </div>
            </Dialog>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CatalogoFlores
