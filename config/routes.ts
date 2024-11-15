const URL_MAIN = 'http://localhost:4000';

export const API_ROUTES = {
    LOGIN:      `${URL_MAIN}/api/auth/login`,
    AUTH:       `${URL_MAIN}/protected-route`,
    DATA:       `${URL_MAIN}/api/usuarios/`,
    INVENTORY:  `${URL_MAIN}/api/inventario/`,
    BORROW:     `${URL_MAIN}/api/prestamos/`
};