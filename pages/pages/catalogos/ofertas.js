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
  //--> Variables
  const [flores, setFlores] = useState([])
  const [layout, setLayout] = useState('grid');

  //--> Ejecucion en segundo plano
  useEffect(() => {
    const datosFlores = [
      { nombre: "Rosa", precio: 100000, categoria: "primavera", estatus: "disponible" },
      { nombre: "Tulipan", precio: 6.20, categoria: "otoño", estatus: "agotado" },
      { nombre: "Girasol", precio: 3.50, categoria: "invierno", estatus: "pocos" },
      { nombre: "Setosa", precio: 25.23, categoria: "primavera", estatus: "pocos" },
      { nombre: "Gardenia", precio: 78.60, categoria: "verano", estatus: "disponible" },
      { nombre: "Versicolor", precio: 84.69, categoria: "verano", estatus: "agotado" },
    ]
    setFlores(datosFlores)
  }, [])


  const [displayBasic, setDisplayBasic] = useState(false);

  const onClick = () => {
    setDisplayBasic(true);
  };

  const onHide = () => {
    setDisplayBasic(false);
  };

  const [filteredFlores, setFilteredFlores] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    const filterFlores = flores.filter(flor => flor.nombre.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredFlores(filterFlores);
  }, [flores, searchTerm]);

  const renderFooter = () => {
    return (
      <div className="dialog-footer">
        <Button label="Cerrar" onClick={ onHide} />
      </div>
    );
  };
  const onSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  

  



  //--> Indicar estado de la flor
  const getSeverity = (flor) => {
    switch (flor.estatus) {
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
  const listItem = (flor) => {
    return (

      
      <div className="col-12">

        <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4 ">
          <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round shadow-5 border-round" src={`https://media.admagazine.com/photos/61eb22cb9b19d943aa117b30/master/w_1600%2Cc_limit/Girasol.jpg`} alt="girasol" />
          
          <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
            <div className="flex flex-column align-items-center sm:align-items-start ">
              <div className="text-2xl font-bold text-900">{flor.nombre}</div>
              <span className="text-2xl font-semibold sh">${flor.precio}</span>
              {/* <Rating value={flor.rating} readOnly cancel={false}></Rating> */}
              <div className="flex align-items-center gap-3">
                <Tag value={flor.estatus} severity={getSeverity(flor)}></Tag>
                <span className="flex align-items-center gap-2">
                  <i className="pi pi-tag"></i>
                  <span className="font-semibold">{flor.categoria}</span>
                </span>
              </div>
             
                
            </div>
            
            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
              {/* <span className="text-2xl font-semibold">${flor.precio}</span> */}
              
              <div>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                 Ut enim ad minim veniam, quis nostrud exercitation </p> 
              </div> 
              <Button   label="Favoritos" icon="pi pi-heart" rounded severity="help" aria-label="Favorite" className="p-button-rounded"  />
              <Button label="Agregar" icon="pi pi-shopping-cart" className="p-button-rounded" disabled={flor.estatus === 'agotado'}></Button>
              <Button label="Detalles" icon="pi pi-external-link"className="p-button-rounded" onClick={() => onClick('displayBasic')} />
                
            <Dialog header="Rosa" visible={displayBasic} style={{ width: '20vw' }} footer={renderFooter('displayBasic')} onHide={() => onHide('displayBasic')}>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation </p>    
            </Dialog>
              
            </div>
          </div>
        </div>
      </div>
    );
  };
  

  //--> Modo de vista: grid
  const gridItem = (flor) => {
    return (
      <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2 border-round">
        <div className="p-4 border-1 surface-border surface-card border-round shadow-2 ">
          <div className="flex flex-wrap align-items-center justify-content-between gap-2 border-round ">
            <div className="flex align-items-center gap-2 border-round">
              <i className="pi pi-tag"></i>
              <span className="font-semibold">{flor.categoria}</span>
              
            </div>
            <Tag value={flor.estatus} severity={getSeverity(flor)}></Tag>
          </div>
          
          <div className="flex flex-column align-items-center gap-3 py-2">
          <div className="text-3xl font-bold">{flor.nombre}
            <img className="w-12 shadow-2 border-round" src={`https://media.admagazine.com/photos/61eb22cb9b19d943aa117b30/master/w_1600%2Cc_limit/Girasol.jpg`} alt="girasol" />
            </div>
            <span className="text-2xl font-bold">${flor.precio}</span>
            {/* <Rating value={flor.rating} readOnly cancel={false}></Rating> */}
          </div>
          
          <div className="flex align-items-center justify-content-between  ">
            <Button  icon="pi pi-heart" rounded severity="help" aria-label="Favorite" className="" />
            <Button label="Detalles" icon="pi pi-search" className=" font-light ml-2" onClick={() => onClick('displayBasic')} />
            <Button label="Agregar" icon="pi pi-shopping-cart" className="font-light ml-2 "disabled={flor.estatus === 'agotado'}></Button>
           
            <Dialog header={<h2><i className="pi pi-search"></i> Rosa</h2>}  draggable={false}  className="custom-dialog-header" visible={displayBasic} style={{ width: '25vw' }} footer={renderFooter('displayBasic')} onHide={() => onHide('displayBasic')}>
            <img className="w-8 shadow-3 border-round " src={`https://media.admagazine.com/photos/61eb22cb9b19d943aa117b30/master/w_1600%2Cc_limit/Girasol.jpg`} width={'20%'} alt="girasol" />
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation </p>    
            </Dialog>
            
          </div>
        </div>
       
      </div>
      
    );
  };

  //--> Cambiar modo de vista
  const itemTemplate = (flor, layout) => {
    if (!flor) { return }

    if (layout === 'list') return listItem(flor);
    else if (layout === 'grid') return gridItem(flor);
  };

  //--> Barra para cambiar modo de vista
  const header = () => {
    return (
      <div className="flex justify-content-end">

        <span className="p-input-icon-left pr-2">
        <i className="pi pi-search" />
        <InputText placeholder="Buscar" value={searchTerm} onChange={onSearch} />
        <Button icon="pi pi-search" className="p-button-warning"/>
                                
        </span>
        <DataViewLayoutOptions value={filteredFlores} layout={layout} onChange={(e) => setLayout(e.value)} />
        
   
      </div>
   
       
    );
  };

  return (
    <Layout
      title="Flores"
      description="Acceso a ofertas"
    >
      <div className="grid">
        <div className="col-12">
          <div className="card">
            <h3>Ofertas</h3>
            <DataView value={filteredFlores} itemTemplate={itemTemplate} layout={layout} header={header()} />
          </div>
        </div>
      </div>
      <Paginator first={0} rows={12} totalRecords={120} rowsPerPageOptions={[10, 20, 30]} /*onPageChange={onPageChange}*/ />
    </Layout>
  )
}

export default CatalogoFlores
