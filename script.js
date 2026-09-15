(() => {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const y = $('#year'); if (y) y.textContent = new Date().getFullYear();

  /* ── the catalogue: Oeuvre Bistro's real menu ── */
  const MENU = [
    ['Breakfast', [
      ['Full English Breakfast', 'Toast, sunny side up eggs, baked beans, grilled mushrooms, grilled tomatoes or potato wedges, bacon and sausages', '₦14,000'],
      ['Full American Breakfast', 'Pancake, waffles or toast, scrambled eggs, tomatoes, baked beans, sausages, butter and syrup', '₦14,200'],
      ['Extra Fluffy Pancakes', 'With chocolate or maple syrup and fresh fruits', '₦12,500'],
      ['Waffles', 'Four waffles with fresh fruits and maple or chocolate syrup', '₦10,000'],
      ['Waffles and Chicken', 'Six waffles with deep fried crispy chicken and maple syrup', '₦14,000'],
      ['Breakfast Platter', 'Serves 6 to 7', '₦80,000'],
    ]],
    ['Starters', [
      ['Tiger Prawn Soup', 'Tiger prawn pepper soup with Irish potato and corn', '₦20,500'],
      ['Calamari Fritto Misto', 'Crispy calamari with sweet and spicy mayo or cocktail sauce', '₦12,500'],
      ['Sliders', 'Mini brioche buns with mini beef patties', '₦14,000'],
      ['Sweet and Sour Wings', 'Oven roasted wings tossed in sweet and sour sauce', '₦14,500'],
      ['Yaji Oven Roast Wings', 'Oven roasted chicken wings tossed in yaji dust', '₦14,500'],
      ['Crispy Chicken Wings', 'Deep fried, served with cocktail sauce', '₦14,500'],
      ['Braised Beef Tacos', 'Crispy tortilla, braised beef, vegetables, bbq aioli', '₦16,000'],
      ['Prawn Filo Wraps', 'Filo pastry with prawn mayo, cocktail or chilli sauce', '₦13,000'],
      ['Mayo Beef Prawn Crackers', 'Prawn crackers with spiced mayo beef', '₦12,500'],
      ['Slam Dunk Platter', 'Any four appetisers of your choice', '₦60,000'],
    ]],
    ['Salads', [
      ['Prawn Avocado Citrus Salad', 'Prawns, vegetables and citrus in dill dressing', '₦18,500'],
      ['Chicken Salad', 'Smoked chicken, rocket, romaine, cherry tomatoes, sweet corn, croutons, citrus vinaigrette', '₦16,500'],
      ['Asian Style Beef Salad', 'Mixed greens, carrots, radish, shredded beef, honey vinaigrette', '₦14,500'],
      ['Vegetable Salad', 'Mixed greens, carrots, cucumber, cherry tomatoes, sweet corn, honey vinaigrette', '₦12,000'],
      ['Slaw', 'Cabbage and carrot slaw', '₦6,500'],
    ]],
    ['Mains', [
      ['Rib Eye Steak', 'Grilled rib eye with peppercorn sauce and dirty beef rice or mash', '₦48,500'],
      ['Seafood Boil', 'Prawns, calamari, sweet corn, crab clusters, fish and shrimps in tomato broth', '₦37,500'],
      ['Salmon Fish', 'Pan-seared salmon with potato wedges or mashed potato', '₦36,000'],
      ['Steamed Buttery Tiger Prawns', 'Butterflied tiger prawns, lemon butter sauce, peas, mash, fries or dirty rice', '₦35,500'],
      ['Shrimp Scampi Pasta', 'Spaghetti in creamy scampi sauce with calamari, shrimps and prawns', '₦25,500'],
      ['Seafood Pasta', 'Linguine in tomato sauce with shrimps, calamari and prawns', '₦22,500'],
      ['Pomodoro Pasta', 'Linguine, pomodoro sauce, meatballs, cherry tomatoes, parmesan', '₦20,000'],
      ['Seafood Paella', 'Seafood cooked in Spanish style rice', '₦18,500'],
      ['Stir Fry Pasta', 'Sausage, shredded beef, vegetables, pan seared chicken', '₦18,500'],
      ['Oeuvre Bistro Jollof', 'Our jollof rice with grilled chicken and plantain sticks', '₦18,500'],
      ['Oven Grilled Chicken Leg', 'Chicken quarter leg with fries, yam or plantain', '₦15,000'],
    ]],
    ['Burgers & Pizza', [
      ['Slow Cooked Pulled Beef Burger', '12 hour pulled beef, pickled onions, rocket, tomatoes, toasted bun, fries', '₦18,500'],
      ['Dirty Cheesy Burger', 'Double beef patties, mozzarella, cheddar, chilli mayo, pickled onions, fries', '₦18,000'],
      ['Chicken Burger', 'Pan seared chicken, lettuce, grilled tomatoes, cheese, cocktail dressing, fries', '₦16,500'],
      ['Pepperoni Pizza', 'Marinara, mozzarella, pepperoni. Mini ₦7,500 · Medium ₦15,000 · Big ₦20,000', 'From ₦7,500'],
      ['Chicken Pizza', 'Mini ₦7,500 · Medium ₦15,000 · Big ₦20,000', 'From ₦7,500'],
      ['Beef Pizza', 'Mini ₦7,500 · Medium ₦15,000 · Big ₦20,000', 'From ₦7,500'],
      ['Vegetarian Pizza', 'Mushroom, green pepper, onion, sweet corn, black olives', 'From ₦7,500'],
    ]],
    ['Sides', [
      ['Corn on the Cob', 'Grilled, buttered, with cheese, paprika and herbs', '₦10,500'],
      ['Honey Potato Wedges', 'Skin on, honey roasted', '₦10,500'],
      ['Shrimp Baifan', 'Basmati rice, carrots, sweet corn, peas, egg and shrimps', '₦10,500'],
      ['Riz Specials', 'Aromatic rice, egg, sausages and vegetables', '₦8,000'],
      ['Herby Mash', 'Fresh herbs folded into creamy mash', '₦6,500'],
      ['Steamed Vegetables', 'Broccoli, cauliflower, carrots and zucchini', '₦6,500'],
      ['House Herb Rice', 'Basmati with three herbs and cauliflower', '₦6,000'],
      ['Creamy Mashed Potatoes', 'Finished with cream', '₦5,500'],
      ['Steamed Rice', 'Basmati with chilli sauce', '₦5,500'],
      ['French Fries', '', '₦5,500'],
      ['Plantain Sticks', '', '₦5,000'],
      ['Yam Fries', '', '₦5,000'],
    ]],
    ['Desserts', [
      ['Triple Chocolate Fudgy Brownies', 'With ice cream and salted caramel', '₦12,000'],
      ['No Bake Strawberry Tart', 'Strawberry pastry cream, fresh strawberries and mint', '₦10,000'],
      ['Tri Flavoured Dolcini', 'Chocolate, red velvet and vanilla cakes with mousse and caramel', '₦9,500'],
    ]],
    ['Kiddies', [
      ['Oven Baked BBQ Chicken & Jollof', 'Roasted drumsticks with jollof rice', '₦14,500'],
      ['Kiddies Beef Burger and Fries', 'Single beef patty, mozzarella, chilli mayo, lettuce', '₦12,500'],
      ['French Fries and Chicken', 'Battered chicken strips with fries and dips', '₦10,500'],
      ['Pancakes and Drumsticks', 'Fluffy pancakes and chicken drumsticks', '₦10,000'],
      ['Hotdog and French Fries', 'Grilled hot dog, mustard, ketchup, caramelised onions', '₦10,000'],
    ]],
    ['Classics', [
      ['Old Fashioned', 'Bourbon, angostura, sugar', '₦10,000'],
      ['Negroni', 'Gin, campari, sweet vermouth', '₦11,000'],
      ['Whiskey Sour', 'Bourbon, lemon juice, simple syrup', '₦11,000'],
      ['Moscow Mule', 'Vodka, lime juice, ginger beer', '₦11,000'],
      ['Cosmopolitan', 'Vodka, lime juice, cranberry juice', '₦11,000'],
      ['Margarita', 'Tequila, Cointreau, lime juice', '₦10,000'],
      ['Daiquiri', 'Rum, lime juice, simple syrup', '₦10,000'],
      ['White Russian', 'Vodka, coffee liqueur, cream', '₦10,000'],
      ['Mojito', 'White rum, sugar, lime, mint', '₦10,000'],
      ['Long Island', 'Gin, triple sec, rum, vodka, tequila', '₦10,000'],
      ['Gin & Tonic', 'Gin, lime juice, tonic water', '₦10,000'],
      ['Barman’s Special Request', 'Describe a drink that is not on the list and the bar will make it', '₦12,000'],
    ]],
    ['Cocktails', [
      ['Strawberry Daiquiri', 'Strawberries, rum, lemon juice', '₦15,000'],
      ['Strawberry Margarita', 'Strawberries, tequila, Cointreau', '₦15,000'],
      ['Oeuvre Daiquiri', 'Kiwi, mint, tequila, pineapple', '₦12,000'],
      ['Irish Coconut', 'Baileys, rum, coconut cream', '₦12,000'],
      ['Blue Hawaiian', 'Blue curaçao, rum, coconut cream', '₦12,000'],
      ['Piña Colada', 'Pineapple, coconut cream, rum', '₦12,000'],
      ['Dark & Stormy', 'Dark rum, ginger beer, sweet and sour', '₦11,000'],
      ['Long Cosmo', 'Vodka, triple sec, cranberry juice', '₦11,000'],
      ['Mimosa', 'Champagne, orange juice', '₦10,000'],
      ['Cuba Libre', 'Coke, rum, lime juice', '₦10,000'],
      ['Sex on the Beach', 'Vodka, peach liqueur, orange and cranberry juice', '₦10,000'],
      ['Jäger Bomb', 'Jägermeister, energy drink', '₦10,000'],
    ]],
    ['Shooters', [
      ['Barman Shots', '', '₦6,500'],
      ['1st October', 'Tequila, mint syrup', '₦5,500'],
      ['Gin Daisy', 'Gin, lemon juice, grenadine', '₦5,500'],
      ['Brain Damage', 'Bourbon, Kahlúa, grenadine', '₦5,500'],
      ['B-52', 'Coffee liqueur, Baileys, Grand Marnier', '₦5,000'],
      ['Kamikaze', 'Vodka, triple sec, lime juice', '₦5,000'],
      ['Deep Blue Sea', 'Tequila, blue curaçao', '₦4,500'],
    ]],
    ['Mocktails', [
      ['Virgin Strawberry Daiquiri', 'Strawberries, lemon juice, grenadine', '₦13,000'],
      ['Waffle Milkshake or Doughnut Frenzy', 'One option only', '₦13,500'],
      ['Virgin Oeuvre Daiquiri', 'Kiwi, mint, pineapple', '₦12,000'],
      ['Milkshake', 'Oreo, caramel, vanilla or strawberry', '₦10,000'],
      ['Frappuccino', 'Coffee, milk, chocolate syrup', '₦9,000'],
      ['Mango Basil', 'Mango juice, ginger ale, basil', '₦8,500'],
      ['Strawberry Kiss', 'Strawberry syrup, pineapple juice', '₦8,000'],
      ['Rainbow Kiss', 'Strawberry syrup, grenadine, orange juice', '₦8,000'],
      ['Jamaican Punch', 'Lime, grenadine, orange, mango and pineapple juice', '₦8,000'],
      ['Oeuvre’s Punch', 'Orange and pineapple juice, grenadine, club soda', '₦7,500'],
      ['Virgin Mojito', 'Lime, mint, sugar, soda', '₦7,500'],
      ['Mango Magic', 'Mango puree, mango juice', '₦7,500'],
      ['Blue Wave', 'Blue curaçao syrup, pineapple juice, coconut milk', '₦7,500'],
      ['Chapman', 'Fanta, Sprite, angostura, lemon and orange juice', '₦7,000'],
      ['Zee Special Punch', 'Cranberry, peach, grenadine', '₦6,500'],
      ['Water or Soft Drinks', 'Coke, Fanta, Sprite, soda water, tonic', '₦1,200'],
    ]],
  ];

  const tabsEl = $('#tabs'), lotsEl = $('#lots');
  if (tabsEl && lotsEl) {
    let lot = 0;
    MENU.forEach(([section, items], i) => {
      const id = 'sec-' + i;
      const tab = document.createElement('button');
      tab.className = 'tab'; tab.type = 'button';
      tab.setAttribute('role', 'tab'); tab.setAttribute('aria-controls', id);
      tab.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      tab.textContent = section;
      tabsEl.appendChild(tab);

      const group = document.createElement('ol');
      group.className = 'lots__group' + (i === 0 ? ' is-active' : '');
      group.id = id; group.setAttribute('role', 'tabpanel');
      items.forEach(([name, desc, price]) => {
        lot += 1;
        const li = document.createElement('li');
        li.className = 'lot';
        li.innerHTML =
          `<span class="lot__no">${String(lot).padStart(3, '0')}</span>` +
          `<span class="lot__name"></span><span class="lot__price"></span>` +
          (desc ? '<span class="lot__desc"></span>' : '');
        li.querySelector('.lot__name').textContent = name;
        li.querySelector('.lot__price').textContent = price;
        if (desc) li.querySelector('.lot__desc').textContent = desc;
        group.appendChild(li);
      });
      lotsEl.appendChild(group);

      tab.addEventListener('click', () => {
        $$('.tab', tabsEl).forEach((t) => t.setAttribute('aria-selected', String(t === tab)));
        $$('.lots__group', lotsEl).forEach((g) => g.classList.toggle('is-active', g.id === id));
      });
    });
  }

  /* ── nav ── */
  const nav = $('#nav'), burger = $('#burger');
  const stuck = () => nav.classList.toggle('is-stuck', scrollY > 8);
  addEventListener('scroll', stuck, { passive: true }); stuck();
  if (burger) {
    const set = (open) => {
      nav.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };
    burger.addEventListener('click', () => set(!nav.classList.contains('is-open')));
    $$('.drawer a', nav).forEach((a) => a.addEventListener('click', () => set(false)));
  }

  /* ── open now (Lagos time, 9am to 10pm) ── */
  const pill = $('#openPill');
  if (pill) {
    let h = new Date().getHours();
    try { h = parseInt(new Intl.DateTimeFormat('en-GB', { timeZone: 'Africa/Lagos', hour: 'numeric', hour12: false }).format(new Date()), 10); } catch (e) {}
    const open = h >= 9 && h < 22;
    pill.textContent = open ? 'Open now' : 'Closed now';
    pill.classList.toggle('is-open', open);
  }

  /* ── reveals: text, hanging frames, brush strokes ── */
  const targets = new Set($$('.reveal, .hang, .quote blockquote'));
  const show = (el) => { el.classList.add('in'); targets.delete(el); };
  if (reduced) {
    targets.forEach(show);
  } else {
    const check = () => {
      const vh = innerHeight;
      targets.forEach((el) => { if (el.getBoundingClientRect().top < vh * 0.9) show(el); });
    };
    addEventListener('scroll', check, { passive: true });
    addEventListener('resize', check);
    requestAnimationFrame(check);
    setTimeout(check, 300);
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((es) => es.forEach((e) => {
        if (e.isIntersecting) { show(e.target); io.unobserve(e.target); }
      }), { threshold: 0.12 });
      targets.forEach((el) => io.observe(el));
    }
  }

  /* ── video plays only while on screen ── */
  const vids = $$('video');
  vids.forEach((v) => { v.muted = true; });
  const manage = () => {
    vids.forEach((v) => {
      const r = v.getBoundingClientRect();
      const on = r.top < innerHeight + 80 && r.bottom > -80;
      if (on && v.paused) v.play().catch(() => {});
      else if (!on && !v.paused) v.pause();
    });
  };
  if (!reduced) {
    addEventListener('scroll', manage, { passive: true });
    document.addEventListener('visibilitychange', () => { if (!document.hidden) manage(); });
    manage();
  }
})();
