const fs = require('fs');

const newTranslations = `
    // 版权和法律信息
    copyright: '© {year} YearProgress.org',
    aboutSite: 'About This Site',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    // 关于本站内容
    aboutSiteTitle: 'About Year Progress',
    aboutSiteContent: \`Year Progress is a simple, elegant visualization tool that shows how much of the current year has passed. Our goal is to help people gain perspective on time's passage and make the most of each day.

Key Features:
• Real-time progress tracking with hourly updates
• Beautiful grid visualization showing completed days
• Support for 18 languages and multiple themes
• Social media sharing with dynamic progress cards
• Clean, distraction-free interface

This project is open-source and designed to be a helpful reminder that time is precious. Whether you're reflecting on achievements, planning ahead, or simply curious about the year's progress, this tool provides a clear, visual perspective on where we stand in time.\`,


const languages = ['fr', 'de', 'ja', 'ko', 'pt', 'ru', 'ar', 'hi', 'it', 'nl', 'tr', 'sv', 'pl', 'da', 'no', 'fi'];

let content = fs.readFileSync('src/lib/i18n.ts', 'utf8');

languages.forEach(lang => {
  const regex = new RegExp(\`(\\s+weekDays: \\[[^\\]]+\\],)\\s*\\n(\\s+}.*?\\\n\\s+\${lang === 'fi' ? '};' : \`\${lang === languages[languages.length-1] ? '' : '[a-z]{2,3}'}: \{\`})\`, 'g');
  content = content.replace(regex, (match, weekDays, closing) => {
    return weekDays + newTranslations + \`\n\${closing}\`;
  });
});

fs.writeFileSync('src/lib/i18n.ts', content);
console.log('已为所有语言添加新的翻译条目');
