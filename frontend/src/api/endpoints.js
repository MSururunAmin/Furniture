const ENDPOINTS = {
    auth: {
        login: "/login",
        logout: "/logout",
        me: "/me",
    },

    categories: {
        base: "/categories",
    },

    furnitures: {
        base: "/furnitures",
        images: (id) => `/furnitures/${id}/images`,
    },

    portfolios: {
        base: "/portfolios",
        images: (id) => `/portfolios/${id}/images`,
    },

    blogs: {
        base: "/blogs",
    },

    testimonials: {
        base: "/testimonials",
    },

    contacts: {
        base: "/contacts",
        read: (id) => `/contacts/${id}/read`,
    },
};

export { ENDPOINTS };