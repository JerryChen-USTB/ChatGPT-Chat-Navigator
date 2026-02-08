const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3000;
const DASHSCOPE_API_KEY = process.env.DASHSCOPE_API_KEY;
const DASHSCOPE_API_URL = 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions';

if (!DASHSCOPE_API_KEY) {
    console.error('错误：请设置环境变量 DASHSCOPE_API_KEY');
    process.exit(1);
}

// CORS：允许 Chrome 扩展来源
app.use(cors({ origin: /^chrome-extension:\/\// }));
app.use(express.json());

// 限流：每 IP 每分钟 30 次
app.use('/api/', rateLimit({
    windowMs: 60 * 1000,
    max: 30,
    message: { error: '请求过于频繁，请稍后再试' },
}));

const SYSTEM_PROMPT = `你是一个对话标题生成助手。根据用户和 ChatGPT 的对话内容，生成一个简洁的中文标题。
要求：
- 不超过 15 个字
- 输出语言与 ChatGPT 的回复一致
- 概括对话的核心主题
- 不要加引号或标点
- 直接输出标题，不要任何解释`;

app.post('/api/summarize', async (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ error: '缺少 text 参数' });
    }

    try {
        const response = await fetch(DASHSCOPE_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${DASHSCOPE_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'qwen-flash',
                messages: [
                    { role: 'system', content: SYSTEM_PROMPT },
                    { role: 'user', content: text },
                ],
                max_tokens: 50,
                temperature: 0.3,
            }),
        });

        if (!response.ok) {
            const err = await response.text();
            console.error('百炼 API 错误:', response.status, err);
            return res.status(502).json({ error: 'AI 服务请求失败' });
        }

        const data = await response.json();
        const summary = data.choices?.[0]?.message?.content?.trim() || '';
        res.json({ summary });
    } catch (e) {
        console.error('代理请求异常:', e);
        res.status(500).json({ error: '服务器内部错误' });
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`ChatGPT Chat Navigator 代理服务已启动: http://0.0.0.0:${PORT}`);
});
