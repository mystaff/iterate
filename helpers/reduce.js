/**
  @class
  Functional helpers for data **mapping**.
  @hideconstructor
*/
const Helpers__reduction = {
  sum: (a, b) => (a + b),

  safeSum: (a, b) => (+a || 0) + (+b || 0),

  product: (a, b) => (a * b),

  safeProduct: (a, b) => (+a || 1) * (+b || 1),

  max: (a, b) => (a > b ? a : b),

  safeMax: (a, b) => (a == null ? b : (b == null ? a : (a > b ? a : b))),

  min: (a, b) => (a < b ? a : b),

  safeMin: (a, b) => (a == null ? b : (b == null ? a : (a < b ? a : b))),

  bitOr: (a, b) => (a | b),

  bitAnd: (a, b) => (a & b),

  bitClr: (a, b) => (a & ~b),

  bitXor: (a, b) => (a ^ b),

  or: (a, b) => (a || b),

  reverseOr: (a, b) => (b || a),

  and: (a, b) => (a && b),

  reverseAnd: (a, b) => (b && a),

  andNot: (a, b) => (a ? (b ? null : a) : a),

  xor: (a, b) => (a ? (b ? null : a) : (b ? b : null)),
};
