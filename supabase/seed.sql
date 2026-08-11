-- Seed: Semente — restaurante vegano

insert into public.categories (id, name, slug, sort_order) values
  ('11111111-1111-1111-1111-111111111101', 'Entradas', 'entradas', 1),
  ('11111111-1111-1111-1111-111111111102', 'Pratos Principais', 'pratos-principais', 2),
  ('11111111-1111-1111-1111-111111111103', 'Sobremesas', 'sobremesas', 3),
  ('11111111-1111-1111-1111-111111111104', 'Bebidas', 'bebidas', 4);

insert into public.dishes (
  id, title, description, ingredients, price, image_url, category_id, is_available, tags, customization_options
) values
(
  '22222222-2222-2222-2222-222222222201',
  'Guacamole da Casa',
  'Abacate amassado na hora com limão, coentro fresco e toque de pimenta. Servido com chips de batata-doce.',
  array['abacate','limão','coentro','pimenta','batata-doce'],
  28.90,
  'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&q=80',
  '11111111-1111-1111-1111-111111111101',
  true,
  array['organico','mais-vendidos','sem-gluten'],
  '[{"id":"spice","label":"Nível de pimenta","type":"single","options":[{"id":"mild","label":"Suave","price":0},{"id":"medium","label":"Médio","price":0},{"id":"hot","label":"Apimentado","price":0}]}]'::jsonb
),
(
  '22222222-2222-2222-2222-222222222202',
  'Rolinhos Primavera',
  'Folha de arroz recheada com legumes crocantes, hortelã e molho agridoce de tamarindo.',
  array['folha de arroz','cenoura','pepino','repolho roxo','hortelã','tamarindo'],
  32.00,
  'https://images.unsplash.com/photo-1541529086526-db283c563270?w=800&q=80',
  '11111111-1111-1111-1111-111111111101',
  true,
  array['sem-gluten','organico'],
  '[{"id":"sauce","label":"Molho extra","type":"single","options":[{"id":"none","label":"Sem extra","price":0},{"id":"tamarind","label":"Tamarindo","price":3},{"id":"peanut","label":"Amendoim","price":4}]}]'::jsonb
),
(
  '22222222-2222-2222-2222-222222222203',
  'Bowl Semente',
  'Nosso prato assinatura: quinoa, grão-de-bico assado, abóbora, kale crocante e tahine cítrico.',
  array['quinoa','grão-de-bico','abóbora','kale','tahine','limão'],
  48.90,
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
  '11111111-1111-1111-1111-111111111102',
  true,
  array['mais-vendidos','organico','sem-gluten'],
  '[{"id":"protein","label":"Proteína extra","type":"single","options":[{"id":"none","label":"Sem extra","price":0},{"id":"tofu","label":"Tofu grelhado","price":8},{"id":"tempeh","label":"Tempeh","price":10}]},{"id":"dressing","label":"Molho","type":"single","options":[{"id":"tahini","label":"Tahine cítrico","price":0},{"id":"miso","label":"Miso gengibre","price":0}]}]'::jsonb
),
(
  '22222222-2222-2222-2222-222222222204',
  'Curry Verde de Jackfruit',
  'Jackfruit em curry verde cremoso de leite de coco, com arroz jasmim e coentro.',
  array['jackfruit','leite de coco','curry verde','arroz jasmim','coentro'],
  52.00,
  'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800&q=80',
  '11111111-1111-1111-1111-111111111102',
  true,
  array['apimentado','mais-vendidos','sem-gluten'],
  '[{"id":"heat","label":"Pimenta","type":"single","options":[{"id":"mild","label":"Suave","price":0},{"id":"hot","label":"Apimentado","price":0},{"id":"extra","label":"Extra forte","price":0}]}]'::jsonb
),
(
  '22222222-2222-2222-2222-222222222205',
  'Burger de Cogumelo',
  'Hambúrguer de shitake e feijão preto no pão de fermentação natural, com maionese de aquafaba.',
  array['shitake','feijão preto','pão sourdough','aquafaba','alface','tomate'],
  45.50,
  'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=800&q=80',
  '11111111-1111-1111-1111-111111111102',
  true,
  array['mais-vendidos'],
  '[{"id":"cheese","label":"Queijo vegano","type":"single","options":[{"id":"none","label":"Sem queijo","price":0},{"id":"cashew","label":"Castanha","price":5}]},{"id":"side","label":"Acompanhamento","type":"single","options":[{"id":"fries","label":"Batata rústica","price":0},{"id":"salad","label":"Salada verde","price":0}]}]'::jsonb
),
(
  '22222222-2222-2222-2222-222222222206',
  'Pad Thai de Legumes',
  'Macarrão de arroz saltado com tofu, broto de feijão, amendoim e molho tamarindo.',
  array['macarrão de arroz','tofu','broto de feijão','amendoim','tamarindo'],
  46.00,
  'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800&q=80',
  '11111111-1111-1111-1111-111111111102',
  true,
  array['apimentado','sem-gluten'],
  '[]'::jsonb
),
(
  '22222222-2222-2222-2222-222222222207',
  'Brownie de Feijão Preto',
  'Brownie úmido sem glúten, com cacau 70% e nozes. Servido com sorvete de banana.',
  array['feijão preto','cacau','nozes','banana','açúcar de coco'],
  24.90,
  'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80',
  '11111111-1111-1111-1111-111111111103',
  true,
  array['sem-gluten','mais-vendidos'],
  '[{"id":"ice","label":"Sorvete","type":"single","options":[{"id":"banana","label":"Banana","price":0},{"id":"coconut","label":"Coco","price":0},{"id":"none","label":"Sem sorvete","price":-3}]}]'::jsonb
),
(
  '22222222-2222-2222-2222-222222222208',
  'Mousse de Chocolate e Abacate',
  'Cremosa, intensa e 100% plant-based. Finalizada com nibs de cacau.',
  array['abacate','cacau','leite de amêndoas','nibs de cacau','xarope de maple'],
  22.00,
  'https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?w=800&q=80',
  '11111111-1111-1111-1111-111111111103',
  true,
  array['organico','sem-gluten'],
  '[]'::jsonb
),
(
  '22222222-2222-2222-2222-222222222209',
  'Suco Verde Pressionado',
  'Couve, maçã verde, gengibre e limão. Energia pura em um copo.',
  array['couve','maçã verde','gengibre','limão'],
  16.00,
  'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=800&q=80',
  '11111111-1111-1111-1111-111111111104',
  true,
  array['organico','mais-vendidos'],
  '[{"id":"size","label":"Tamanho","type":"single","options":[{"id":"300","label":"300ml","price":0},{"id":"500","label":"500ml","price":5}]}]'::jsonb
),
(
  '22222222-2222-2222-2222-222222222210',
  'Kombucha de Hibisco',
  'Fermentada na casa, leve e efervescente, com notas florais.',
  array['chá verde','hibisco','açúcar de coco','cultura SCOBY'],
  14.50,
  'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?w=800&q=80',
  '11111111-1111-1111-1111-111111111104',
  true,
  array['organico'],
  '[]'::jsonb
),
(
  '22222222-2222-2222-2222-222222222211',
  'Latte de Matcha',
  'Matcha ceremonial batido com leite de aveia e um toque de baunilha.',
  array['matcha','leite de aveia','baunilha'],
  18.00,
  'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=800&q=80',
  '11111111-1111-1111-1111-111111111104',
  true,
  array['mais-vendidos'],
  '[{"id":"milk","label":"Leite vegetal","type":"single","options":[{"id":"oat","label":"Aveia","price":0},{"id":"almond","label":"Amêndoa","price":0},{"id":"coconut","label":"Coco","price":0}]},{"id":"sweet","label":"Adoçante","type":"single","options":[{"id":"none","label":"Sem açúcar","price":0},{"id":"maple","label":"Maple","price":2}]}]'::jsonb
),
(
  '22222222-2222-2222-2222-222222222212',
  'Bruschetta de Tomate Assado',
  'Pão de fermentação natural, tomates confitados, manjericão e azeite.',
  array['pão sourdough','tomate','manjericão','azeite','alho'],
  26.00,
  'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=800&q=80',
  '11111111-1111-1111-1111-111111111101',
  false,
  array['organico'],
  '[]'::jsonb
);
