const AVAILABLE_OBJECT_TYPES = {
  contact: 'contacts',
  company: 'companies',
  ticket: 'tickets',
  deal: 'deals',
  product: 'products',
};

const API_KEY_REGEX = /^([a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12})$/i;

module.exports = {
  AVAILABLE_OBJECT_TYPES,
  API_KEY_REGEX,
};
