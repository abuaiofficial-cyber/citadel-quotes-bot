export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    if (url.pathname === '/webhook') {
      const update = await request.json();
      
      if (update.message) {
        const chatId = update.message.chat.id;
        const text = update.message.text;
        
        if (text === '/start') {
          await send(env.TELEGRAM_TOKEN, chatId, 
            '🏰 Добро пожаловать в Цитадель цитатника!\n\n' +
            'Жми /quote — получишь мудрость веков!'
          );
        }
        else if (text === '/quote') {
          const quotes = [
            "«Путь в тысячу ли начинается с первого шага.» — Лао-цзы",
            "«Успех — это движение от неудачи к неудаче без потери энтузиазма.» — Черчилль",
            "«Лучшее время посадить дерево было 20 лет назад. Следующее лучшее время — сегодня.»",
            "«Ваше время ограничено, не тратьте его, живя чужой жизнью.» — Стив Джобс",
            "«Не бойтесь отказаться от хорошего ради великого.» — Рокфеллер"
            "«Единственный способ делать великую работу — любить то, что вы делаете.» — Стив Джобс"
          ];
          const quote = quotes[Math.floor(Math.random() * quotes.length)];
          await send(env.TELEGRAM_TOKEN, chatId, quote);
        }
      }
      return new Response('OK');
    }
    
    return new Response('🏰 Citadel Quotes Bot is running!');
  }
};

async function send(token, chatId, text) {
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: text })
  });
}
