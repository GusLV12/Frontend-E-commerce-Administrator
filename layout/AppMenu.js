import React from 'react';
import AppMenuitem from './AppMenuitem';
// import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
// import Link from 'next/link';

const AppMenu = () => {
  // const { layoutConfig } = useContext(LayoutContext);

  const model = [
    {
      label: 'Home',
      items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/pages/dashboard' }]
    },
    {
      label: 'Catalogos',
      items: [
        { label: 'Productos', icon: 'pi pi-fw pi-database', to: '/pages/catalogos/flores' },
        // { label: 'Peluches', icon: 'pi pi-fw pi-id-card', to: '/pages/catalogos/peluches' },
        // { label: 'Ofertas', icon: 'pi pi-fw pi-tags', to: '/pages/catalogos/ofertas' },
      ]
    },
    // {
    //   label: 'Usuario',
    //   items: [
    //     { label: 'Personalizar arreglo', icon: 'pi pi-fw pi-gift', to: '/pages/usuario/personalizararreglo' },
    //     { label: 'Mis Compras', icon: 'pi pi-fw pi-shopping-bag', to: '/pages/usuario/miscompras' },
    //     { label: 'Atención al cliente', icon: 'pi pi-fw pi-comments', to: '/pages/usuario/atencionclientes' },
    //   ]
    // }
  ];

  return (
    <MenuProvider>
      <ul className="layout-menu">
        {model.map((item, i) => {
          return !item.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
        })}
      </ul>
    </MenuProvider>
  );
};

export default AppMenu;
