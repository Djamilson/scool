import { format, isValid, parse, parseISO } from 'date-fns';
import { createPipe, MaskedRange, PIPE_TYPE } from 'imask';

const masker = ({
  masked,
  transform,
  maskDefault,
}: {
  masked: any;
  transform?: any;
  maskDefault?: any;
}) => {
  const mask = createPipe(masked, PIPE_TYPE.UNMASKED, PIPE_TYPE.MASKED);

  const unmask = createPipe(masked, PIPE_TYPE.MASKED, PIPE_TYPE.UNMASKED);

  const onChange = (e: any) => {
    const unmasked = unmask(e.target.value);
    const newValue = mask(unmasked);
    e.target.value = newValue;
  };

  return {
    mask,
    onChange,
    transform: transform || unmask,
    unmask,
    maskDefault: maskDefault || mask,
  };
};

const dateFormatClient = 'dd/MM/yyyy';
const dateFormatApi = 'yyyy-MM-dd';

export const dateMask = masker({
  masked: {
    mask: Date,
    pattern: dateFormatClient,
    blocks: {
      dd: {
        mask: MaskedRange,
        from: 1,
        to: 31,
        maxLength: 2,
      },
      MM: {
        mask: MaskedRange,
        from: 1,
        to: 12,
        maxLength: 2,
      },
      yyyy: {
        mask: MaskedRange,
        from: 1900,
        to: 9999,
      },
    },
    format: (date: any) => {
      return format(new Date(date), dateFormatClient);
    },
    parse: (dateStr: any) => {
      if (!isValid(parse(dateStr, dateFormatClient, new Date()))) return false;

      return parse(dateStr, dateFormatClient, new Date());
    },
  },
  transform: (value: any) => {
    if (!value) {
      return value;
    }
    const date = parse(value, dateFormatClient, new Date());
    return format(date, dateFormatApi);
  },
  maskDefault: (value: any) => {
    return format(parseISO(value), dateFormatClient);
  },
});

export const cpfByMask = masker({
  masked: {
    mask: [
      {
        mask: '000.000.000-00',
        type: 'CPF',
      },
    ],
    dispatch: (_: any, dynamicMasked: any) => {
      const cpfMask = dynamicMasked.compiledMasks.find(
        (item: any) => item.type === 'CPF',
      );

      return cpfMask;
    },
  },
});

export const cnpjByMask = masker({
  masked: {
    mask: [
      {
        mask: '00.000.000/0000-00',
        type: 'CNPJ',
      },
    ],
    dispatch: (appended: any, dynamicMasked: any) => {
      const cnpjMask = dynamicMasked.compiledMasks.find(
        (item: any) => item.type === 'CNPJ',
      );

      if (`${dynamicMasked.value}${appended}`.length > cpfByMask.mask.length) {
        return cnpjMask;
      }
    },
  },
});

export const cepByMask = masker({
  masked: {
    mask: [
      {
        mask: '00.000-000',
        type: 'CEP',
      },
    ],
    dispatch: (_: any, dynamicMasked: any) => {
      const cepMask = dynamicMasked.compiledMasks.find(
        (item: any) => item.type === 'CEP',
      );

      return cepMask;
    },
  },
});

export const phoneMask = masker({
  masked: {
    mask: [
      {
        mask: '+55 (00) 0000-0000',
        phone: 'landline',
      },

      {
        mask: '+55 (00) 0 0000-0000',
        phone: 'mobile',
      },
    ],

    dispatch: (appended: any, dynamicMasked: any) => {
      const landlineMask = dynamicMasked.compiledMasks.find(
        (phone: any) => phone.phone === 'landline',
      );

      const mobileMask = dynamicMasked.compiledMasks.find(
        (phone: any) => phone.phone === 'mobile',
      );

      if (
        `${dynamicMasked.value}${appended}`.length > landlineMask.mask.length
      ) {
        return mobileMask;
      }

      return landlineMask;
    },
  },
});

export const numberByMask = masker({
  masked: {
    mask: /^[0-9]/,
  },
});

export const lettlerByMask = masker({
  masked: {
    mask: /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\s]+$/,
  },
});

export const currencyMask = masker({
  masked: {
    mask: 'R$ num{,}cents',
    blocks: {
      num: {
        mask: Number,
        signed: true,
        thousandsSeparator: '.',
        mapToRadix: [''],
        scale: 0,
      },
      cents: {
        mask: '00',
        normalizeZeros: true,
        padFractionalZeros: true,
      },
    },
  },
  transform: (value: any) =>
    Number(currencyMask.unmask(value).replace(',', '.')),
  maskDefault: (value: number) =>
    currencyMask.mask(value.toFixed(2).replace('.', ',')),
});

export const cardNumberByMask = masker({
  masked: {
    mask: [
      {
        mask: '0000 0000 0000 0000',
        type: 'CARDNUMBER',
      },
    ],
    dispatch: (_: any, dynamicMasked: any) => {
      const cardMask = dynamicMasked.compiledMasks.find(
        (item: any) => item.type === 'CARDNUMBER',
      );

      return cardMask;
    },
  },
  transform: (value: any) => {
    if (!value) {
      return value;
    }

    return value.replace(/([^0-9])/g, '');
  },
});

export const cardCVVByMask = masker({
  masked: {
    mask: [
      {
        mask: '000',
        type: 'CARDCVV',
      },
    ],
    dispatch: (_: any, dynamicMasked: any) => {
      const cardMask = dynamicMasked.compiledMasks.find(
        (item: any) => item.type === 'CARDCVV',
      );

      return cardMask;
    },
  },
});
const cardDateFormatClient = 'MM/yyyy';
const cardDateFormatApi = 'MM-yyyy';

export const cardDateMask = masker({
  masked: {
    mask: Date,
    pattern: cardDateFormatClient,
    blocks: {
      MM: {
        mask: MaskedRange,
        from: 1,
        to: 12,
        maxLength: 2,
      },
      yyyy: {
        mask: MaskedRange,
        from: 2021,
        to: 9999,
      },
    },
    format: (date: any) => {
      return format(new Date(date), cardDateFormatClient);
    },
    parse: (dateStr: any) => {
      if (!isValid(parse(dateStr, cardDateFormatClient, new Date())))
        return false;

      return parse(dateStr, cardDateFormatClient, new Date());
    },
  },
  transform: (value: any) => {
    if (!value) {
      return value;
    }
    const date = parse(value, cardDateFormatClient, new Date());

    return format(date, cardDateFormatApi);
  },
  maskDefault: (value: any) => {
    return format(parseISO(value), cardDateFormatClient);
  },
});
