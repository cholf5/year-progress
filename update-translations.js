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
    // 隐私政策内容
    privacyPolicyTitle: 'Privacy Policy',
    privacyPolicyContent: \`Last updated: {date}

At Year Progress, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data.

Information We Collect:
• Settings Preferences: Theme settings, language preferences, and display options are stored locally in your browser using cookies and local storage
• Usage Analytics: We may collect anonymous usage statistics to improve our service
• No Personal Data: We do not collect, store, or process any personally identifiable information

How We Use Information:
• To remember your preferences and settings
• To improve our service and user experience  
• To generate anonymous usage statistics

Data Storage:
• All preference data is stored locally on your device
• No personal information is transmitted to our servers
• Settings are stored using browser cookies with a 365-day expiration

Third-Party Services:
• Social sharing features are provided by respective social media platforms
• These services have their own privacy policies and terms

Your Rights:
• You can clear all stored preferences by clearing your browser's cookies
• You can opt out of analytics by using browser privacy settings
• You have full control over your local data

Contact:
If you have questions about this Privacy Policy, please contact us through our official channels.\`,
    // 使用条款内容
    termsOfServiceTitle: 'Terms of Service',
    termsOfServiceContent: \`Last updated: {date}

Welcome to Year Progress. By using our service, you agree to these terms.

Acceptance of Terms:
By accessing and using Year Progress, you accept and agree to be bound by the terms and provision of this agreement.

Use License:
• Permission is granted to use this service for personal, non-commercial purposes
• This license shall automatically terminate if you violate any of these restrictions
• The service is provided "as is" without any warranties

Restrictions:
You may not:
• Use the service for any unlawful purpose
• Attempt to interfere with the service's functionality
• Copy, modify, or distribute the service without permission
• Use the service to harm others or spread misinformation

Service Availability:
• We strive to keep the service available 24/7 but cannot guarantee 100% uptime
• We reserve the right to modify or discontinue the service at any time
• Scheduled maintenance may cause temporary interruptions

User Content:
• You retain ownership of any content you share using our service
• You are responsible for the content you share on social media platforms
• We are not liable for content shared through third-party platforms

Limitation of Liability:
Year Progress shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service.

Changes to Terms:
We reserve the right to modify these terms at any time. Continued use of the service constitutes acceptance of any changes.

Governing Law:
These terms shall be governed by and construed in accordance with applicable laws.

If you have questions about these Terms of Service, please contact us through our official channels.\`,`;

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
