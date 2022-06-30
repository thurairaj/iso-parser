const fieldMetadata = [
  {
    label: 'Primary Account Number',
    padding: 'end',
    index: 2,
    nibbleLength: 19,
    encoding: 'hex',
    lengthMeta: { type: 'var', length: 2 },
  },
  {
    label: 'Processing Code',
    index: 3,
    nibbleLength: 6,
    encoding: 'hex',
    lengthMeta: { type: 'fixed', length: 2 },
  },
  {
    label: 'Transaction Amount',
    index: 4,
    nibbleLength: 12,
    encoding: 'hex',
    lengthMeta: { type: 'fixed', length: 2 },
  },
  {
    label: 'STAN',
    index: 11,
    nibbleLength: 6,
    encoding: 'hex',
    lengthMeta: { type: 'fixed', length: 2 },
  },
  {
    label: 'Local Transaction Time',
    index: 12,
    nibbleLength: 6,
    encoding: 'hex',
    lengthMeta: { type: 'fixed' },
  },
  {
    label: 'Local Transaction Date',
    index: 13,
    nibbleLength: 4,
    encoding: 'hex',
    lengthMeta: { type: 'fixed' },
  },
  {
    label: 'Card Expiration Date',
    index: 14,
    nibbleLength: 4,
    encoding: 'hex',
    lengthMeta: { type: 'fixed' },
  },
  {
    label: 'POS Entry Mode',
    index: 22,
    nibbleLength: 3,
    encoding: 'hex',
    lengthMeta: { type: 'fixed' },
  },
  {
    label: 'Card Sequence Number',
    index: 23,
    nibbleLength: 3,
    encoding: 'hex',
    lengthMeta: { type: 'fixed' },
  },
  {
    label: 'NII',
    index: 24,
    nibbleLength: 3,
    encoding: 'hex',
    lengthMeta: { type: 'fixed' },
  },
  {
    label: 'POS Condition Code',
    index: 25,
    nibbleLength: 2,
    encoding: 'hex',
    lengthMeta: { type: 'fixed' },
  },
  {
    label: 'Track2 Data',
    padding: 'end',
    index: 35,
    nibbleLength: 37,
    encoding: 'hex',
    lengthMeta: { type: 'var', length: 2 },
  },
  {
    label: 'RRN Retrieval Reference Number',
    index: 37,
    nibbleLength: 12,
    encoding: 'ascii',
    lengthMeta: { type: 'fixed' },
  },
  {
    label: 'Authorisation ID Response',
    index: 38,
    nibbleLength: 6,
    encoding: 'ascii',
    lengthMeta: { type: 'fixed' },
  },
  {
    label: 'Response Code',
    index: 39,
    nibbleLength: 2,
    encoding: 'ascii',
    lengthMeta: { type: 'fixed' },
  },
  {
    label: 'Terminal ID',
    index: 41,
    nibbleLength: 8,
    encoding: 'ascii',
    lengthMeta: { type: 'fixed' },
  },
  {
    label: 'Merchant ID',
    index: 42,
    nibbleLength: 15,
    encoding: 'ascii',
    lengthMeta: { type: 'fixed' },
  },
  {
    label: 'Additional Response Data',
    index: 44,
    nibbleLength: 25,
    encoding: 'ascii',
    lengthMeta: { type: 'var', length: 2 },
  },
  {
    label: 'Track1 Data',
    index: 45,
    nibbleLength: 76,
    encoding: 'ascii',
    lengthMeta: { type: 'var', length: 2 },
  },
  {
    label: 'PIN Data',
    index: 52,
    nibbleLength: 16,
    encoding: 'hex',
    lengthMeta: { type: 'fixed' },
  },
  {
    label: 'Additional Amounts',
    index: 54,
    nibbleLength: 120,
    encoding: 'ascii',
    lengthMeta: { type: 'fixed' },
  },
  {
    label: 'Chip Data',
    index: 55,
    nibbleLength: 255,
    encoding: 'binary',
    lengthMeta: { type: 'var', length: 4 },
  },
  {
    label: 'Private Field 1',
    index: 60,
    nibbleLength: 999,
    encoding: 'ascii',
    lengthMeta: { type: 'var', length: 4 },
  },
  {
    label: 'Private Field 2',
    index: 61,
    nibbleLength: 999,
    encoding: 'ascii',
    lengthMeta: { type: 'var', length: 4 },
  },
  {
    label: 'Private Field 3',
    index: 62,
    nibbleLength: 999,
    encoding: 'ascii',
    lengthMeta: { type: 'var', length: 4 },
  },
  {
    label: 'Private Field 4',
    index: 63,
    nibbleLength: 999,
    encoding: 'ascii',
    lengthMeta: { type: 'var', length: 4 },
  },
  {
    label: 'MAC',
    index: 64,
    nibbleLength: 999,
    encoding: 'ascii',
    lengthMeta: { type: 'var', length: 4 },
  },
];

const INDEX = {
  NO_TDPU: {
    TDPU: { start: 0, end: 0 },
    MTI: { start: 4, end: 8 },
    BITMAP: { start: 8, end: 24 },
  },
  WITH_TDPU: {
    TDPU: { start: 4, end: 14 },
    MTI: { start: 14, end: 18 },
    BITMAP: { start: 18, end: 34 },
  },
};

const RADIX = {
  BIN: 2,
  DEC: 10,
  HEX: 16,
};

const ENCODING = {
  HEX: 'hex',
  ASCII: 'ascii',
  BINARY: 'binary',
};

const H5_FIELD_VALUE = '<h5>Field values</h5>';

const hexToAscii = (str) => String.fromCharCode(parseInt(str, 16));
const hexBitToBCD = (bit) => parseInt(bit, RADIX.HEX).toString(RADIX.BIN).padStart(4, '0');
const generateErrorPTag = (err) => `<p style="color: darkred">${err}</p>`;

const getFieldHtml = (label, value, desc) => {
  return `<div class="col-auto">
            <div class="input-group input-group-sm mb-1"
                data-toggle="tooltip" 
                data-placement="left" 
                data-bs-offset="0,-10"
                data-bs-custom-class="custom-tooltip"
                title="${desc}">
              <span class="input-group-text">${label}</span>
              <input type="text" 
                class="form-control" 
                value="${value}" />
            </div>
        </div>`;
};
