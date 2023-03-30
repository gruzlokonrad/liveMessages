import express from 'express'
import cors from 'cors'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Serve static files from the React app
// app.use(express.static(path.join(__dirname, '/client/build')));
app.use(express.static(path.join(__dirname, '/client/public')))

// app.use('/api', testimonialsRoute)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/index.html'));
});
// app.use((req, res) => {
//   res.status(404).send({ message: "Not found ..." })
// })

app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});