const puppeteer = require('puppeteer');
const now = new Date()

async function visitBaidu() {
	let count = 0
  // 启动浏览器：无头模式（headless: true）是默认设置，不显示GUI，效率最高。
  const browser = await puppeteer.launch({
    headless: true // 设置为 false 如果你想要看到浏览器窗口（不推荐用于你的需求）
  });

  // 每次循环都打开新页面，访问，然后关闭页面
  while (true) {
    const page = await browser.newPage();
    
    // 设置视口大小（可选）
    await page.setViewport({width: 1280, height: 800});
    
    // 打开百度首页
    await page.goto('https://www.baidu.com', {
      waitUntil: 'networkidle2' // 等待网络基本空闲
    });
    
    console.log(`[${new Date().toLocaleTimeString()}] 已访问百度首页，标题: ${await page.title()} ${count+=1}`);
    
    // 等待1秒钟，模拟“停留”
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // 关闭当前标签页，而不是浏览器
    await page.close();
  }

  // 注意：这个while循环是无限的，你需要用Ctrl+C来终止脚本。
  // 在实际部署中，你可能需要添加一个退出条件。
}


// 捕获Ctrl+C信号，优雅地关闭浏览器
process.on('SIGINT', async () => {
  console.log('\n正在关闭浏览器...');
  if (browser) {
    await browser.close();
  }
  process.exit();
});

visitBaidu().catch(console.error);
