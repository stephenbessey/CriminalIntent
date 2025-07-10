export const createNewCrime = () => ({
  id: null,
  title: '',
  details: '',
  date: new Date().toISOString(),
  solved: false,
  photo: null,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

export const isValidCrime = (obj) => {
  return (
    obj &&
    typeof obj === 'object' &&
    typeof obj.id === 'string' &&
    typeof obj.title === 'string' &&
    typeof obj.date === 'string' &&
    typeof obj.solved === 'boolean' &&
    typeof obj.createdAt === 'string' &&
    typeof obj.updatedAt === 'string'
  );
};