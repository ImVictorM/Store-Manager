const map = {
  NOT_FOUND: 404,
};

const INTERNAL_SERVER_ERROR = 500;

function mapError(type) {
  return map[type] || INTERNAL_SERVER_ERROR;
}

module.exports = {
  mapError,
};
