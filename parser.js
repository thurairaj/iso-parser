/*function analyze() {
  const completeBuffer = document.getElementById('completeBuffer').value.toLowerCase();
  const plainIso = document.getElementById('plainIso').value.toLowerCase();
  const encryptedPortion = document.getElementById('encryptedBuffer');
  const plainBuffer = document.getElementById('plainBuffer');

  const startEncrypt = completeBuffer.substring(34, 38);
  const length = completeBuffer.substring(38, 42);

  const start = 42 + parseInt(startEncrypt, 16) * 2;
  const end = start + parseInt(length, 16) * 2;

  const plain = plainIso
    .replace(completeBuffer.substring(42, start), '*')
    .replace(completeBuffer.substring(end), '^');
  const clearText = plain.substring(plain.indexOf('*') + 1, plain.indexOf('^'));
  console.log(plain);

  encryptedPortion.value = completeBuffer.substring(start, end);
  plainBuffer.value = clearText;
  parse();
}*/

/**
 * Determines which side of nibble padding need to be trimmed.
 */
function removePadding(fieldInHex, fieldLength, valueLength, padding) {
  if (fieldLength < valueLength) throw 'Invalid Length';
  if (fieldLength === valueLength) return fieldInHex;

  return padding === 'end'
    ? fieldInHex.substring(0, valueLength)
    : fieldInHex.substring(fieldInHex.length - valueLength);
}

function getFormattedData(data, encoding) {
  return encoding === ENCODING.ASCII ? data.match(/(..?)/g).map(hexToAscii).join('') : data;
}

function getField(iso, metadata) {
  const { lengthMeta, encoding, padding, nibbleLength, index, label } = metadata;
  const isVariableLength = lengthMeta.type === 'var';
  const isHex = encoding === ENCODING.HEX;

  const rawLength = isVariableLength ? parseInt(iso.substring(0, lengthMeta.length)) : nibbleLength;
  const lengthOfLength = isVariableLength ? lengthMeta.length : 0;
  const paddedLength = isHex ? rawLength + (rawLength % 2) : rawLength * 2; // consider nibble padding

  const fieldLength = lengthOfLength + paddedLength;
  const valueLength = isHex ? rawLength : rawLength * 2;

  const fieldInHex = iso.substring(lengthOfLength, fieldLength);
  const valueInHex = removePadding(fieldInHex, fieldLength, valueLength, padding);

  const value = getFormattedData(valueInHex, encoding);
  return { fieldLength, value, index, label };
}

function getBitmapProps(iso, isTDPU) {
  const { start, end } = isTDPU ? INDEX.WITH_TDPU.BITMAP : INDEX.NO_TDPU.BITMAP;

  const hex = iso.substring(start, end);
  const bcd = hex.split('').reduce((bcd, hex) => bcd + hexBitToBCD(hex), '');
  return { hex, bcd, start, endOfBitmap: end, bitmap: bcd.split('') };
}

function updateBitmapDOM(bitmapProps) {
  const checkBitDOM = (v, idx) => (document.getElementById(`bit-${idx + 1}`).checked = '1' === v);
  bitmapProps.bitmap.forEach(checkBitDOM);
  document.getElementById('hex-bitmap').value = bitmapProps.hex;
  document.getElementById('binary-bitmap').value = bitmapProps.bcd.match(/(....?)/g).join(' ');
}

function triggerToolTip() {
  $(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });
}

function parse() {
  const plainIso = document.getElementById('plainIso').value.toLowerCase();
  const isTDPU = document.getElementById('tdpu-check').checked;
  const tdpuIdx = isTDPU ? INDEX.WITH_TDPU.TDPU : INDEX.NO_TDPU.TDPU;
  const mtiIdx = isTDPU ? INDEX.WITH_TDPU.MTI : INDEX.NO_TDPU.MTI;

  const bitmapProps = getBitmapProps(plainIso, isTDPU);
  updateBitmapDOM(bitmapProps);

  try {
    const isoFields = fieldMetadata
      .filter((metadata) => bitmapProps.bitmap[metadata.index - 1] === '1')
      .reduce(
        ({ isoString, fields }, metadata) => {
          const field = getField(isoString, metadata);
          fields.push(field);
          return { isoString: isoString.substring(field.fieldLength), fields };
        },
        { isoString: plainIso.substring(bitmapProps.endOfBitmap), fields: [] },
      );

    const values = isoFields.fields
      .sort((f1, f2) => f1.index - f2.index)
      .map(({ index, value, label }) => getFieldHtml(index.toString(), value, label))
      .join('');

    const resultDOM = document.getElementById('result');
    const header = getFieldHtml('TDPU', plainIso.substring(tdpuIdx.start, tdpuIdx.end), 'TDPU');
    const mti = getFieldHtml('MTI', plainIso.substring(mtiIdx.start, mtiIdx.end), 'MTI');

    resultDOM.innerHTML = H5_FIELD_VALUE + header + mti + values;
    triggerToolTip();

    // if (isoFields.isoString) resultDOM.innerHTML = generateErrorPTag('ISO cannot be fully parsed.');
    // else resultDOM.innerHTML = H5_FIELD_VALUE + header + mti + values;
  } catch (e) {
    document.getElementById('result').innerHTML =
      H5_FIELD_VALUE + generateErrorPTag('Error' + e.toString());
  }
}
