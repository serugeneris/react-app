import DashboardIcon from '../assets/icons/dashboard.svg';
import ShippingIcon from '../assets/icons/shipping.svg';
import ProductIcon from '../assets/icons/product.svg';
import UserIcon from '../assets/icons/user.svg';

const sidebar_menu = [
    {
        id: 1,
        icon: DashboardIcon,
        path: '/',
        title: 'Index',
    },
    // {
    //     id: 2,
    //     icon: ProductIcon,
    //     path: '/orders',
    //     title: 'Orders',
    // },
    {
        id: 2,
        icon: UserIcon,
        path: '/users',
        title: 'Users',
    },
    // {
    //     id: 3,
    //     icon: UserIcon,
    //     path: '/reporte',
    //     title: 'Reportes',
    // },
    {
        id: 3,
        icon: ShippingIcon,
        path: '/suppliers',
        title: 'Suppliers',
    }
]

export default sidebar_menu;