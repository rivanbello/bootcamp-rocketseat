interface IMailConfig {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: { email: string; name: string };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'etheral',

  defaults: {
    from: {
      email: 'rivan.bello@tahnamao.com.br',
      name: 'Rivan Bello - Tahnamao',
    },
  },
} as IMailConfig;
