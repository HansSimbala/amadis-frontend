import { permissions } from './permissions';

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
            slug: "/customers/create"
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
              icon: "list_alt",
              name: "Crear Pedidos",
              slug: "/orders/create"
            }
        ]
      }
];
  