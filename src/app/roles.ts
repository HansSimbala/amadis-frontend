export const roles = [
  {
    name: "Clientes",
    description: "Gestionar los clientes.",
    permissions: [
      {
        icon: "group",
        name: "Listar Clientes",
        slug: "/customers/list"
      },
      {
        icon: "contacts",
        name: "Crear Clientes",
        slug: "/customer-account-requests/request"
      }
    ]
  },
  {
    name: "Pedidos",
    description: "Gestionar los pedidos.",
    permissions: [
      {
        icon: "article",
        name: "Listar Pedidos",
        slug: "/orders/list"
      },
      {
        icon: "alt_route",
        name: "Mis Rutas",
        slug: "/orders/routes"
      }
    ]
  }
];
