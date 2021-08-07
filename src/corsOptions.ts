const corsOptions = {
  origin: process.env.ORIGIN_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
};

export default corsOptions;
