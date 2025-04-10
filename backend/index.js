const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

app.post('/evaluate', (req, res) => {
  const data = req.body;
  const total = Object.values(data).reduce((sum, val) => sum + Number(val || 0), 0);
  const health = total > 100 ? '高风险' : '低风险';
  res.json({ total, health });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
