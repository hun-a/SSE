const app = require('../src');
const db = require('../src/models');

const PORT = 4000;

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
