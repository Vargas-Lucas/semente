import type { Category, Dish } from "@/lib/types";

export const DEMO_CATEGORIES: Category[] = [
  {
    id: "11111111-1111-1111-1111-111111111101",
    name: "Entradas",
    slug: "entradas",
    sort_order: 1,
  },
  {
    id: "11111111-1111-1111-1111-111111111102",
    name: "Pratos Principais",
    slug: "pratos-principais",
    sort_order: 2,
  },
  {
    id: "11111111-1111-1111-1111-111111111103",
    name: "Sobremesas",
    slug: "sobremesas",
    sort_order: 3,
  },
  {
    id: "11111111-1111-1111-1111-111111111104",
    name: "Bebidas",
    slug: "bebidas",
    sort_order: 4,
  },
];

export const DEMO_DISHES: Dish[] = [
  {
    id: "22222222-2222-2222-2222-222222222201",
    title: "Guacamole da Casa",
    description:
      "Abacate amassado na hora com limão, coentro fresco e toque de pimenta. Servido com chips de batata-doce.",
    ingredients: ["abacate", "limão", "coentro", "pimenta", "batata-doce"],
    price: 28.9,
    image_url:
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&q=80",
    category_id: "11111111-1111-1111-1111-111111111101",
    is_available: true,
    tags: ["organico", "mais-vendidos", "sem-gluten"],
    customization_options: [
      {
        id: "spice",
        label: "Nível de pimenta",
        type: "single",
        options: [
          { id: "mild", label: "Suave", price: 0 },
          { id: "medium", label: "Médio", price: 0 },
          { id: "hot", label: "Apimentado", price: 0 },
        ],
      },
    ],
  },
  {
    id: "22222222-2222-2222-2222-222222222202",
    title: "Rolinhos Primavera",
    description:
      "Folha de arroz recheada com legumes crocantes, hortelã e molho agridoce de tamarindo.",
    ingredients: [
      "folha de arroz",
      "cenoura",
      "pepino",
      "repolho roxo",
      "hortelã",
      "tamarindo",
    ],
    price: 32,
    image_url:
      "https://images.unsplash.com/photo-1541529086526-db283c563270?w=800&q=80",
    category_id: "11111111-1111-1111-1111-111111111101",
    is_available: true,
    tags: ["sem-gluten", "organico"],
    customization_options: [
      {
        id: "sauce",
        label: "Molho extra",
        type: "single",
        options: [
          { id: "none", label: "Sem extra", price: 0 },
          { id: "tamarind", label: "Tamarindo", price: 3 },
          { id: "peanut", label: "Amendoim", price: 4 },
        ],
      },
    ],
  },
  {
    id: "22222222-2222-2222-2222-222222222203",
    title: "Bowl Semente",
    description:
      "Nosso prato assinatura: quinoa, grão-de-bico assado, abóbora, kale crocante e tahine cítrico.",
    ingredients: ["quinoa", "grão-de-bico", "abóbora", "kale", "tahine", "limão"],
    price: 48.9,
    image_url:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
    category_id: "11111111-1111-1111-1111-111111111102",
    is_available: true,
    tags: ["mais-vendidos", "organico", "sem-gluten"],
    customization_options: [
      {
        id: "protein",
        label: "Proteína extra",
        type: "single",
        options: [
          { id: "none", label: "Sem extra", price: 0 },
          { id: "tofu", label: "Tofu grelhado", price: 8 },
          { id: "tempeh", label: "Tempeh", price: 10 },
        ],
      },
      {
        id: "dressing",
        label: "Molho",
        type: "single",
        options: [
          { id: "tahini", label: "Tahine cítrico", price: 0 },
          { id: "miso", label: "Miso gengibre", price: 0 },
        ],
      },
    ],
  },
  {
    id: "22222222-2222-2222-2222-222222222204",
    title: "Curry Verde de Jackfruit",
    description:
      "Jackfruit em curry verde cremoso de leite de coco, com arroz jasmim e coentro.",
    ingredients: [
      "jackfruit",
      "leite de coco",
      "curry verde",
      "arroz jasmim",
      "coentro",
    ],
    price: 52,
    image_url:
      "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800&q=80",
    category_id: "11111111-1111-1111-1111-111111111102",
    is_available: true,
    tags: ["apimentado", "mais-vendidos", "sem-gluten"],
    customization_options: [
      {
        id: "heat",
        label: "Pimenta",
        type: "single",
        options: [
          { id: "mild", label: "Suave", price: 0 },
          { id: "hot", label: "Apimentado", price: 0 },
          { id: "extra", label: "Extra forte", price: 0 },
        ],
      },
    ],
  },
  {
    id: "22222222-2222-2222-2222-222222222205",
    title: "Burger de Cogumelo",
    description:
      "Hambúrguer de shitake e feijão preto no pão de fermentação natural, com maionese de aquafaba.",
    ingredients: [
      "shitake",
      "feijão preto",
      "pão sourdough",
      "aquafaba",
      "alface",
      "tomate",
    ],
    price: 45.5,
    image_url:
      "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=800&q=80",
    category_id: "11111111-1111-1111-1111-111111111102",
    is_available: true,
    tags: ["mais-vendidos"],
    customization_options: [
      {
        id: "cheese",
        label: "Queijo vegano",
        type: "single",
        options: [
          { id: "none", label: "Sem queijo", price: 0 },
          { id: "cashew", label: "Castanha", price: 5 },
        ],
      },
      {
        id: "side",
        label: "Acompanhamento",
        type: "single",
        options: [
          { id: "fries", label: "Batata rústica", price: 0 },
          { id: "salad", label: "Salada verde", price: 0 },
        ],
      },
    ],
  },
  {
    id: "22222222-2222-2222-2222-222222222206",
    title: "Pad Thai de Legumes",
    description:
      "Macarrão de arroz saltado com tofu, broto de feijão, amendoim e molho tamarindo.",
    ingredients: [
      "macarrão de arroz",
      "tofu",
      "broto de feijão",
      "amendoim",
      "tamarindo",
    ],
    price: 46,
    image_url:
      "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800&q=80",
    category_id: "11111111-1111-1111-1111-111111111102",
    is_available: true,
    tags: ["apimentado", "sem-gluten"],
    customization_options: [],
  },
  {
    id: "22222222-2222-2222-2222-222222222207",
    title: "Brownie de Feijão Preto",
    description:
      "Brownie úmido sem glúten, com cacau 70% e nozes. Servido com sorvete de banana.",
    ingredients: ["feijão preto", "cacau", "nozes", "banana", "açúcar de coco"],
    price: 24.9,
    image_url:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80",
    category_id: "11111111-1111-1111-1111-111111111103",
    is_available: true,
    tags: ["sem-gluten", "mais-vendidos"],
    customization_options: [
      {
        id: "ice",
        label: "Sorvete",
        type: "single",
        options: [
          { id: "banana", label: "Banana", price: 0 },
          { id: "coconut", label: "Coco", price: 0 },
          { id: "none", label: "Sem sorvete", price: -3 },
        ],
      },
    ],
  },
  {
    id: "22222222-2222-2222-2222-222222222208",
    title: "Mousse de Chocolate e Abacate",
    description:
      "Cremosa, intensa e 100% plant-based. Finalizada com nibs de cacau.",
    ingredients: [
      "abacate",
      "cacau",
      "leite de amêndoas",
      "nibs de cacau",
      "xarope de maple",
    ],
    price: 22,
    image_url:
      "https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?w=800&q=80",
    category_id: "11111111-1111-1111-1111-111111111103",
    is_available: true,
    tags: ["organico", "sem-gluten"],
    customization_options: [],
  },
  {
    id: "22222222-2222-2222-2222-222222222209",
    title: "Suco Verde Pressionado",
    description:
      "Couve, maçã verde, gengibre e limão. Energia pura em um copo.",
    ingredients: ["couve", "maçã verde", "gengibre", "limão"],
    price: 16,
    image_url:
      "https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=800&q=80",
    category_id: "11111111-1111-1111-1111-111111111104",
    is_available: true,
    tags: ["organico", "mais-vendidos"],
    customization_options: [
      {
        id: "size",
        label: "Tamanho",
        type: "single",
        options: [
          { id: "300", label: "300ml", price: 0 },
          { id: "500", label: "500ml", price: 5 },
        ],
      },
    ],
  },
  {
    id: "22222222-2222-2222-2222-222222222210",
    title: "Kombucha de Hibisco",
    description:
      "Fermentada na casa, leve e efervescente, com notas florais.",
    ingredients: ["chá verde", "hibisco", "açúcar de coco", "cultura SCOBY"],
    price: 14.5,
    image_url:
      "https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?w=800&q=80",
    category_id: "11111111-1111-1111-1111-111111111104",
    is_available: true,
    tags: ["organico"],
    customization_options: [],
  },
  {
    id: "22222222-2222-2222-2222-222222222211",
    title: "Latte de Matcha",
    description:
      "Matcha ceremonial batido com leite de aveia e um toque de baunilha.",
    ingredients: ["matcha", "leite de aveia", "baunilha"],
    price: 18,
    image_url:
      "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=800&q=80",
    category_id: "11111111-1111-1111-1111-111111111104",
    is_available: true,
    tags: ["mais-vendidos"],
    customization_options: [
      {
        id: "milk",
        label: "Leite vegetal",
        type: "single",
        options: [
          { id: "oat", label: "Aveia", price: 0 },
          { id: "almond", label: "Amêndoa", price: 0 },
          { id: "coconut", label: "Coco", price: 0 },
        ],
      },
      {
        id: "sweet",
        label: "Adoçante",
        type: "single",
        options: [
          { id: "none", label: "Sem açúcar", price: 0 },
          { id: "maple", label: "Maple", price: 2 },
        ],
      },
    ],
  },
  {
    id: "22222222-2222-2222-2222-222222222212",
    title: "Bruschetta de Tomate Assado",
    description:
      "Pão de fermentação natural, tomates confitados, manjericão e azeite.",
    ingredients: ["pão sourdough", "tomate", "manjericão", "azeite", "alho"],
    price: 26,
    image_url:
      "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=800&q=80",
    category_id: "11111111-1111-1111-1111-111111111101",
    is_available: false,
    tags: ["organico"],
    customization_options: [],
  },
];
