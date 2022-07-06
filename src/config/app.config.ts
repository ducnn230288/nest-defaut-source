export default () => ({
  environment: process.env.NODE_ENV || 'development',
  database: {
    host: process.env.DATABASE_HOST,
    post: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  },
  exampleToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImZheWU4NCIsInN1YiI6ImM5YjE5MDFkLTI0YTctNDU3Ny04ZWZlLTA3NDQwOWRiZmI5ZSIsImlhdCI6MTY1NzA2NjU4OSwiZXhwIjoxNjU3MDcwMTg5fQ.EVP1e-CJdEK4BVDOcfgOPDvNqzaqSjWrCYD3zhRdxUM'
});
