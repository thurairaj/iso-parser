const metadata = [
  {
    padding: 'end',
    index: 2,
    nibbleLength: 19,
    encoding: 'hex',
    lengthMeta: { type: 'var', length: 2 },
  },
  {
    index: 3,
    nibbleLength: 6,
    encoding: 'hex',
    lengthMeta: { type: 'fixed', length: 2 },
  },
  {
    index: 4,
    nibbleLength: 12,
    encoding: 'hex',
    lengthMeta: { type: 'fixed', length: 2 },
  },
  {
    index: 11,
    nibbleLength: 6,
    encoding: 'hex',
    lengthMeta: { type: 'fixed', length: 2 },
  },
  {
    index: 12,
    nibbleLength: 6,
    encoding: 'hex',
    lengthMeta: { type: 'fixed' },
  },
  {
    index: 13,
    nibbleLength: 4,
    encoding: 'hex',
    lengthMeta: { type: 'fixed' },
  },
  {
    index: 14,
    nibbleLength: 4,
    encoding: 'hex',
    lengthMeta: { type: 'fixed' },
  },
  {
    index: 22,
    nibbleLength: 3,
    encoding: 'hex',
    lengthMeta: { type: 'fixed' },
  },
  {
    index: 23,
    nibbleLength: 3,
    encoding: 'hex',
    lengthMeta: { type: 'fixed' },
  },
  {
    index: 24,
    nibbleLength: 3,
    encoding: 'hex',
    lengthMeta: { type: 'fixed' },
  },
  {
    index: 25,
    nibbleLength: 2,
    encoding: 'hex',
    lengthMeta: { type: 'fixed' },
  },
  {
    padding: 'end',
    index: 35,
    nibbleLength: 37,
    encoding: 'hex',
    lengthMeta: { type: 'var', length: 2 },
  },
  {
    index: 37,
    nibbleLength: 12,
    encoding: 'ascii',
    lengthMeta: { type: 'fixed' },
  },
  {
    index: 38,
    nibbleLength: 6,
    encoding: 'ascii',
    lengthMeta: { type: 'fixed' },
  },
  {
    index: 39,
    nibbleLength: 2,
    encoding: 'ascii',
    lengthMeta: { type: 'fixed' },
  },
  {
    index: 41,
    nibbleLength: 8,
    encoding: 'ascii',
    lengthMeta: { type: 'fixed' },
  },
  {
    index: 42,
    nibbleLength: 15,
    encoding: 'ascii',
    lengthMeta: { type: 'fixed' },
  },
  {
    index: 44,
    nibbleLength: 25,
    encoding: 'ascii',
    lengthMeta: { type: 'var', length: 2 },
  },
  {
    index: 45,
    nibbleLength: 76,
    encoding: 'ascii',
    lengthMeta: { type: 'var', length: 2 },
  },
  {
    index: 52,
    nibbleLength: 8,
    encoding: 'hex',
    lengthMeta: { type: 'fixed' },
  },
  {
    index: 54,
    nibbleLength: 120,
    encoding: 'ascii',
    lengthMeta: { type: 'fixed' },
  },
  {
    index: 55,
    nibbleLength: 255,
    encoding: 'binary',
    lengthMeta: { type: 'var', length: 4 },
  },
  {
    index: 60,
    nibbleLength: 999,
    encoding: 'ascii',
    lengthMeta: { type: 'var', length: 4 },
  },
  {
    index: 61,
    nibbleLength: 999,
    encoding: 'ascii',
    lengthMeta: { type: 'var', length: 4 },
  },
  {
    index: 62,
    nibbleLength: 999,
    encoding: 'ascii',
    lengthMeta: { type: 'var', length: 4 },
  },
  {
    index: 63,
    nibbleLength: 999,
    encoding: 'ascii',
    lengthMeta: { type: 'var', length: 4 },
  },
  {
    index: 64,
    nibbleLength: 999,
    encoding: 'ascii',
    lengthMeta: { type: 'var', length: 4 },
  },
];

const INDEX = {
  TDPU: { start: 4, end: 14 },
  MTI: { start: 14, end: 18 },
  BITMAP: { start: 18, end: 34 },
};

const RADIX = {
  BIN: 2,
  DEC: 10,
  HEX: 16,
};

const ENCODING = {
  HEX: 'hex',
  ASCII: 'ascii',
};

const H5_FIELD_VALUE = '<h5>Field values</h5>';

const getFieldHtml = (label, value) => {
  return `<div class="col-auto">
            <div class="input-group input-group-sm mb-1">
              <div class="input-group-prepend"><div class="input-group-text">${label}</div></div>
              <input type="text" class="form-control" value="${value}"/>
            </div>
        </div>`;
};
