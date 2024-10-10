import { PythonShell } from 'python-shell';
import express from 'express';

const router = express.Router();

router.post('/analyze-sentiment', async (req, res) => {
  const { moodDescription } = req.body;

  let options = {
    args: [moodDescription]
  };

  PythonShell.run('sentiment_model.py', options, function (err, results) {
    if (err) return res.status(500).json({ error: 'Error analyzing sentiment' });
    
    const [label, score] = results;
    res.json({ label, score });
  });
});

export default router;
