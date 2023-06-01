import React, { useState } from "react";
import Layout from "@/layout/layout"
import { Carousel } from 'primereact/carousel';


const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const responsiveOptions = [
    { breakpoint: '1199px', numVisible: 1, numScroll: 1 },
    { breakpoint: '991px', numVisible: 2, numScroll: 1 },
    { breakpoint: '767px', numVisible: 1, numScroll: 1 }
  ];

  const temporadas = [
    { temporada: "Invierno", duracion: "10 dias" },
    { temporada: "Primavera", duracion: "12 dias" },
    { temporada: "Otoño", duracion: "1 dias" },
    { temporada: "Año nuevo", duracion: "3 dias" },
    { temporada: "San valentin", duracion: "5 dias" },
  ]

  const plantillaTemporada = (temporada) => {
    return (
      <div className="border-1 surface-border border-round m-2 text-center py-5 px-3">
        <div className="mb-3">
          {/* <img src={`https://primefaces.org/cdn/primereact/images/product/${temporada.image}`}
            alt={temporada.name} className="w-6 shadow-2" /> */}
        </div>
        <div>
          <h4 className="mb-1">{temporada.temporada}</h4>
          <h6 className="mt-0 mb-3">{temporada.duracion}</h6>
          {/* <Tag value={temporada.inventoryStatus} severity={getSeverity(temporada)}></Tag> */}
          {/* <div className="mt-5 flex flex-wrap gap-2 justify-content-center">
            <Button icon="pi pi-search" className="p-button p-button-rounded" />
            <Button icon="pi pi-star-fill" className="p-button-success p-button-rounded" />
          </div> */}
        </div>
      </div>
    );
  };


  return (
    <Layout
      title="Inicio"
      description="Pagina principal de jardin del eden"
    >
      <div className="grid">
        <div className="col-12">
          <div className="card">
            <h5>Pagina principal</h5>
            <Carousel value={temporadas} numVisible={3} numScroll={3}
              responsiveOptions={responsiveOptions} className="custom-carousel" circular
              autoplayInterval={3000} itemTemplate={plantillaTemporada} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard
