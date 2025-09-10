// 支持的语言数量常量
// 每次添加新语言时，只需要更新这个常量即可
export const SUPPORTED_LANGUAGES_COUNT = "27";

export const translations = {
  en: {
    title: 'YearProgress.org',
    siteName: 'YearProgress.org',
    description: 'Real-time yearly progress visualization. See how much of the year has passed and how much time remains.',
    yearProgress: 'Year Progress',
    subtitle: 'Real-time Yearly Progress Visualization',
    complete: 'complete',
    progressTitle: '{year} is {percentage}% complete',
    week: 'week',
    day: 'day',
    of: 'of',
    daysCompleted: 'days completed',
    daysRemaining: 'days remaining',
    shareInstructions: 'Share this link on X (Twitter) to generate a beautiful progress card!',
    currentDate: 'Current Date',
    timeWaits: 'Time waits for no one, cherish every day!',
    shareUrl: 'Share URL',
    copyLink: 'Copy Link',
    linkCopied: 'Link copied to clipboard!',
    past: 'Past',
    current: 'Current',
    future: 'Future',
    shareToSocialMedia: 'Share to Social Media',
    clickToShare: 'Click below to share on social media and generate beautiful progress cards!',
    orCopyLink: 'Or copy link to share',
    copy: 'Copy',
    copied: 'Copied!',
    settings: 'Settings',
    monthDayFormat: '{month} {day}',
    dayWeekInfoFormat: 'Day {dayNumber} • Week {weekNumber}',
    bottomStatsFormat: '{daysPassed} {daysCompleted} • {daysRemaining} {daysRemainingUnit}',
    theme: 'Theme',
    language: 'Language',
    twitterIcon: 'Twitter Icon',
    close: 'Close',
    weekDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    weekDayStatus: "Today is week {weekNumber}, day {dayNumber} of {year}.",
    socialHashtags: [],
    // 版权和法律信息
    copyright: '© {year} YearProgress.org',
    aboutSite: 'About',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    // 关于本站内容
    aboutSiteTitle: 'About YearProgress.org',
    aboutSiteContent: `This site is a simple yet elegant visualization tool that shows how much of the current year has already passed. Our goal is to help people gain a more intuitive sense of time's passage and make the most of every single day.

Key Features:
• Real-time calculation of yearly progress
• Beautiful grid visualization of days gone by
• Support for {supportedLanguagesCount} languages and multiple themes
• One-click sharing with automatically generated progress cards
• Clean, distraction-free interface

Whether you're reflecting on past achievements, planning for the future, or simply curious about how far into the year we are, this tool offers a clear and unique perspective on time.

Data Policy:
We do not collect any personal information. All preferences (such as theme and language) are stored locally on your device.
`,
  },
  'zh-cn': {
    title: 'YearProgress.org',
    siteName: 'YearProgress.org',
    description: '实时展示年度进度，看看今年过去了多少，还剩多少时间。',
    yearProgress: '年度进度',
    subtitle: '实时年度进度可视化',
    complete: '已完成',
    progressTitle: '{year}年已过去了{percentage}%',
    week: '第',
    day: '第',
    of: '',
    daysCompleted: '天已过去',
    daysRemaining: '天剩余',
    shareInstructions: '在 X (Twitter) 上分享此链接，即可生成漂亮的进度卡片！',
    currentDate: '当前日期',
    timeWaits: '时间不等人，珍惜每一天！',
    shareUrl: '分享链接',
    copyLink: '复制链接',
    linkCopied: '链接已复制到剪贴板！',
    past: '过去',
    current: '现在',
    future: '未来',
    shareToSocialMedia: '分享到社交媒体',
    clickToShare: '点击下方按钮分享到社交媒体，生成漂亮的进度卡片！',
    orCopyLink: '或复制链接分享',
    copy: '复制',
    copied: '已复制!',
    settings: '设置',
    monthDayFormat: '{month}月{day}日',
    dayWeekInfoFormat: '全年第{dayNumber}天 • 第{weekNumber}周',
    bottomStatsFormat: '已过去{daysPassed}天 • 剩余{daysRemaining}天',
    theme: '主题',
    language: '语言',
    twitterIcon: 'Twitter 图标',
    close: '关闭',
    weekDays: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    weekDayStatus: "今天是{year}年第{weekNumber}周，第{dayNumber}天",
    socialHashtags: ['年度进度'],
    // 版权和法律信息
    copyright: '© {year} YearProgress.org',
    aboutSite: '关于',
    privacyPolicy: '隐私政策',
    termsOfService: '使用条款',
    // 关于本站内容
    aboutSiteTitle: '关于 YearProgress.org',
    aboutSiteContent: `本站是一个简洁而优雅的可视化工具，用来展示当前年度已经过去的时间。我们的目标是帮助人们更直观地感受时间的流逝，并更好地珍惜和利用每一天。

主要功能：
• 实时计算年度进度
• 以美观网格直观呈现已过去的天数
• 支持 {supportedLanguagesCount} 种语言与多种主题
• 一键分享，自动生成精美进度卡片
• 简洁、无干扰的界面设计

无论是反思过往成就、规划未来目标，还是单纯好奇一年已走过多少，这个工具都能为您提供清晰而独特的时间视角。

数据说明：
本站不收集任何个人信息，所有设置（主题、语言等）仅存储在您的设备上。`,
  },
  'zh-tw': {
    title: 'YearProgress.org',
    siteName: 'YearProgress.org',
    description: '即時展示年度進度，看看今年過去了多少，還剩多少時間。',
    yearProgress: '年度進度',
    subtitle: '即時年度進度可視化',
    complete: '已完成',
    progressTitle: '{year}年已過去了{percentage}%',
    week: '第',
    day: '第',
    of: '',
    daysCompleted: '天已過去',
    daysRemaining: '天剩餘',
    shareInstructions: '在 X (Twitter) 上分享此連結，即可生成漂亮的進度卡片！',
    currentDate: '當前日期',
    timeWaits: '時間不等人，珍惜每一天！',
    shareUrl: '分享連結',
    copyLink: '複製連結',
    linkCopied: '連結已複製到剪貼簿！',
    past: '過去',
    current: '現在',
    future: '未來',
    shareToSocialMedia: '分享到社交媒體',
    clickToShare: '點擊下方按鈕分享到社交媒體，生成漂亮的進度卡片！',
    orCopyLink: '或複製連結分享',
    copy: '複製',
    copied: '已複製!',
    settings: '設定',
    monthDayFormat: '{month}月{day}日',
    dayWeekInfoFormat: '全年第{dayNumber}天 • 第{weekNumber}週',
    bottomStatsFormat: '已過去{daysPassed}天 • 剩餘{daysRemaining}天',
    theme: '主題',
    language: '語言',
    twitterIcon: 'Twitter 圖示',
    close: '關閉',
    weekDays: ['週日', '週一', '週二', '週三', '週四', '週五', '週六'],
    weekDayStatus: "今天是{year}年第{weekNumber}週，第{dayNumber}天",
    socialHashtags: ['年度進度'],
    // 版權和法律資訊
    copyright: '© {year} YearProgress.org',
    aboutSite: '關於',
    privacyPolicy: '隱私政策',
    termsOfService: '使用條款',
    // 關於本站內容
    aboutSiteTitle: '關於 YearProgress.org',
    aboutSiteContent: `本站是一個簡潔而優雅的視覺化工具，用來展示當前年度已經過去的時間。我們的目標是幫助人們更直觀地感受時間的流逝，並更好地珍惜和利用每一天。

主要功能：
• 即時計算年度進度
• 以美觀網格直觀呈現已過去的天數
• 支援 {supportedLanguagesCount} 種語言與多種主題
• 一鍵分享，自動生成精美進度卡片
• 簡潔、無干擾的介面設計

無論是反思過往成就、規劃未來目標，還是單純好奇一年已走過多少，這個工具都能為您提供清晰而獨特的時間視角。

資料說明：
本站不收集任何個人資訊，所有設定（主題、語言等）僅儲存在您的裝置上。`,
  },
  es: {
    title: 'YearProgress.org',
    siteName: 'YearProgress.org',
    description: 'Visualización del progreso anual en tiempo real. Ve cuánto del año ha pasado y cuánto tiempo queda.',
    yearProgress: 'Progreso del Año',
    subtitle: 'Visualización del progreso anual en tiempo real',
    complete: 'completo',
    progressTitle: '{year} está {percentage}% completo',
    week: 'semana',
    day: 'día',
    of: 'de',
    daysCompleted: 'días completados',
    daysRemaining: 'días restantes',
    shareInstructions: '¡Comparte este enlace en X (Twitter) para generar una hermosa tarjeta de progreso!',
    currentDate: 'Fecha Actual',
    timeWaits: '¡El tiempo no espera a nadie, aprecia cada día!',
    shareUrl: 'Compartir URL',
    copyLink: 'Copiar Enlace',
    linkCopied: '¡Enlace copiado al portapapeles!',
    past: 'Pasado',
    current: 'Actual',
    future: 'Futuro',
    shareToSocialMedia: 'Compartir en Redes Sociales',
    clickToShare: '¡Haz clic abajo para compartir en redes sociales y generar hermosas tarjetas de progreso!',
    orCopyLink: 'O copiar enlace para compartir',
    copy: 'Copiar',
    copied: '¡Copiado!',
    settings: 'Configuración',
    monthDayFormat: '{month} {day}',
    dayWeekInfoFormat: 'Día {dayNumber} • Semana {weekNumber}',
    bottomStatsFormat: '{daysPassed} {daysCompleted} • {daysRemaining} {daysRemainingUnit}',
    theme: 'Tema',
    language: 'Idioma',
    twitterIcon: 'Icono de Twitter',
    close: 'Cerrar',
    weekDays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    weekDayStatus: "Hoy es la semana {weekNumber}, día {dayNumber} de {year}.",
    socialHashtags: ['ProgresoAnual'],
    // 版权和法律信息
    copyright: '© {year} YearProgress.org',
    aboutSite: 'Acerca',
    privacyPolicy: 'Política de Privacidad',
    termsOfService: 'Términos de Servicio',
    // 关于本站内容
    aboutSiteTitle: 'Acerca de Progreso del Año',
    aboutSiteContent: `Progreso del Año es una herramienta de visualización simple y elegante que muestra cuánto del año actual ha pasado. Nuestro objetivo es ayudar a las personas a obtener perspectiva sobre el paso del tiempo y aprovechar al máximo cada día.

Características principales:
• Seguimiento de progreso en tiempo real con actualizaciones cada hora
• Hermosa visualización en cuadrícula que muestra los días completados
• Soporte para {supportedLanguagesCount} idiomas y múltiples temas
• Compartir en redes sociales con tarjetas de progreso dinámicas
• Interfaz limpia y sin distracciones

Este proyecto es de código abierto y está diseñado para ser un recordatorio útil de que el tiempo es precioso. Ya sea que estés reflexionando sobre logros, planificando el futuro, o simplemente curioso sobre el progreso del año, esta herramienta proporciona una perspectiva clara y visual de dónde nos encontramos en el tiempo.`,
  },
  fr: {
    title: 'YearProgress.org',
    siteName: 'YearProgress.org',
    description: 'Visualisation du progrès annuel en temps réel. Voyez combien de l\'année s\'est écoulée et combien de temps il reste.',
    yearProgress: 'Progrès de l\'Année',
    subtitle: 'Visualisation du progrès annuel en temps réel',
    complete: 'terminé',
    progressTitle: '{year} est {percentage}% terminé',
    week: 'semaine',
    day: 'jour',
    of: 'de',
    daysCompleted: 'jours terminés',
    daysRemaining: 'jours restants',
    shareInstructions: 'Partagez ce lien sur X (Twitter) pour générer une belle carte de progrès!',
    currentDate: 'Date Actuelle',
    timeWaits: 'Le temps n\'attend personne, chérissez chaque jour!',
    shareUrl: 'Partager URL',
    copyLink: 'Copier le Lien',
    linkCopied: 'Lien copié dans le presse-papiers!',
    past: 'Passé',
    current: 'Actuel',
    future: 'Futur',
    shareToSocialMedia: 'Partager sur les Réseaux Sociaux',
    clickToShare: 'Cliquez ci-dessous pour partager sur les réseaux sociaux et générer de belles cartes de progrès!',
    orCopyLink: 'Ou copier le lien pour partager',
    copy: 'Copier',
    copied: 'Copié!',
    settings: 'Paramètres',
    monthDayFormat: '{month} {day}',
    dayWeekInfoFormat: 'Jour {dayNumber} • Semaine {weekNumber}',
    bottomStatsFormat: '{daysPassed} {daysCompleted} • {daysRemaining} {daysRemainingUnit}',
    theme: 'Thème',
    language: 'Langue',
    twitterIcon: 'Icône Twitter',
    close: 'Fermer',
    weekDays: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
    weekDayStatus: "Aujourd'hui, c'est la semaine {weekNumber}, jour {dayNumber} de {year}.",
    socialHashtags: ['ProgrèsAnnuel'],
    // 版权和法律信息
    copyright: '© {year} YearProgress.org',
    aboutSite: 'À propos',
    privacyPolicy: 'Politique de confidentialité',
    termsOfService: 'Conditions d\'utilisation',
    // 关于本站内容
    aboutSiteTitle: 'À propos de YearProgress.org',
    aboutSiteContent: `YearProgress est un outil de visualisation simple et élégant qui montre combien de l'année actuelle s'est écoulée. Notre objectif est d'aider les gens à mieux percevoir le passage du temps et à tirer le meilleur parti de chaque jour.

Fonctionnalités principales :
• Suivi du progrès en temps réel avec mises à jour horaires
• Visualisation en grille élégante montrant les jours écoulés
• Support pour {supportedLanguagesCount} langues et plusieurs thèmes
• Partage sur les réseaux sociaux avec cartes de progrès dynamiques
• Interface propre et sans distraction

Ce projet est open-source et conçu comme un rappel utile que le temps est précieux. Que vous réfléchissiez sur vos réalisations, planifiez l'avenir, ou soyez simplement curieux du progrès de l'année, cet outil offre une perspective claire et visuelle de où nous en sommes dans le temps.

Note sur les données :
Ce site ne collecte aucune information personnelle. Tous les paramètres (thème, langue, etc.) sont stockés uniquement sur votre appareil.`,
  },
  de: {
    title: 'YearProgress.org',
    siteName: 'YearProgress.org',
    description: 'Echtzeit-Visualisierung des Jahresfortschritts. Sehen Sie, wie viel vom Jahr vergangen ist und wie viel Zeit noch bleibt.',
    yearProgress: 'Jahresfortschritt',
    subtitle: 'Echtzeit-Visualisierung des Jahresfortschritts',
    complete: 'abgeschlossen',
    progressTitle: '{year} ist {percentage}% abgeschlossen',
    week: 'Woche',
    day: 'Tag',
    of: 'von',
    daysCompleted: 'Tage abgeschlossen',
    daysRemaining: 'Tage verbleibend',
    shareInstructions: 'Teilen Sie diesen Link auf X (Twitter), um eine schöne Fortschrittskarte zu generieren!',
    currentDate: 'Aktuelles Datum',
    timeWaits: 'Die Zeit wartet auf niemanden, schätze jeden Tag!',
    shareUrl: 'URL teilen',
    copyLink: 'Link kopieren',
    linkCopied: 'Link in die Zwischenablage kopiert!',
    past: 'Vergangenheit',
    current: 'Aktuell',
    future: 'Zukunft',
    shareToSocialMedia: 'Auf Social Media teilen',
    clickToShare: 'Klicken Sie unten, um in sozialen Medien zu teilen und schöne Fortschrittskarten zu erstellen!',
    orCopyLink: 'Oder Link zum Teilen kopieren',
    copy: 'Kopieren',
    copied: 'Kopiert!',
    settings: 'Einstellungen',
    monthDayFormat: '{month} {day}',
    dayWeekInfoFormat: 'Tag {dayNumber} • Woche {weekNumber}',
    bottomStatsFormat: '{daysPassed} {daysCompleted} • {daysRemaining} {daysRemainingUnit}',
    theme: 'Design',
    language: 'Sprache',
    twitterIcon: 'Twitter-Symbol',
    close: 'Schließen',
    weekDays: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
    weekDayStatus: "Es ist Woche {weekNumber}, Tag {dayNumber} von {year}.",
    socialHashtags: ['Jahresfortschritt'],
    // 版权和法律信息
    copyright: '© {year} YearProgress.org',
    aboutSite: 'Über',
    privacyPolicy: 'Datenschutzerklärung',
    termsOfService: 'Nutzungsbedingungen',
    // 关于本站内容
    aboutSiteTitle: 'Über YearProgress.org',
    aboutSiteContent: `YearProgress ist ein einfaches und elegantes Visualisierungstool, das zeigt, wie viel vom aktuellen Jahr bereits vergangen ist. Unser Ziel ist es, Menschen dabei zu helfen, eine Perspektive für den Zeitverlauf zu gewinnen und das Beste aus jedem Tag zu machen.

Hauptfunktionen:
• Echtzeit-Fortschrittserfassung mit stündlichen Updates
• Schöne Rastervisualisierung der abgeschlossenen Tage
• Unterstützung für {supportedLanguagesCount} Sprachen und mehrere Themes
• Social Media Sharing mit dynamischen Fortschrittskarten
• Saubere, ablenkungsfreie Benutzeroberfläche

Dieses Projekt ist Open-Source und als hilfreiche Erinnerung konzipiert, dass Zeit kostbar ist. Ob Sie über Erfolge reflektieren, vorausplanen oder einfach neugierig auf den Jahresfortschritt sind - dieses Tool bietet eine klare, visuelle Perspektive darauf, wo wir zeitlich stehen.

Datenschutz:
Diese Website sammelt keine persönlichen Informationen. Alle Einstellungen (Theme, Sprache usw.) werden nur auf Ihrem Gerät gespeichert.`,
  },
  ja: {
    title: 'YearProgress.org',
    siteName: 'YearProgress.org',
    description: 'リアルタイムの年間進捗の可視化。今年がどのくらい過ぎ、どのくらい時間が残っているかを確認してください。',
    yearProgress: '年間進捗',
    subtitle: 'リアルタイム年間進捗の可視化',
    complete: '完了',
    progressTitle: '{year}年は{percentage}%完了しました',
    week: '週',
    day: '日',
    of: 'の',
    daysCompleted: '日経過',
    daysRemaining: '日残り',
    shareInstructions: 'このリンクをX（Twitter）でシェアして、美しい進捗カードを生成してください！',
    currentDate: '現在の日付',
    timeWaits: '時間は誰も待ってくれません、毎日を大切に！',
    shareUrl: 'URLを共有',
    copyLink: 'リンクをコピー',
    linkCopied: 'リンクがクリップボードにコピーされました！',
    past: '過去',
    current: '現在',
    future: '未来',
    shareToSocialMedia: 'ソーシャルメディアで共有',
    clickToShare: '下のボタンをクリックしてソーシャルメディアで共有し、美しい進捗カードを生成してください！',
    orCopyLink: 'またはリンクをコピーして共有',
    copy: 'コピー',
    copied: 'コピー完了！',
    settings: '設定',
    monthDayFormat: '{month}月{day}日',
    dayWeekInfoFormat: '第{dayNumber}日 • 第{weekNumber}週',
    bottomStatsFormat: '{daysPassed}日経過 • {daysRemaining}日残り',
    theme: 'テーマ',
    language: '言語',
    twitterIcon: 'Twitter アイコン',
    close: '閉じる',
    weekDays: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
    weekDayStatus: "今日は{year}年の第{weekNumber}週、第{dayNumber}日です。",
    socialHashtags: ['年間進捗'],
    // 版权和法律信息
    copyright: '© {year} YearProgress.org',
    aboutSite: 'について',
    privacyPolicy: 'プライバシーポリシー',
    termsOfService: '利用規約',
    // 关于本站内容
    aboutSiteTitle: 'YearProgress.org について',
    aboutSiteContent: `年間進捗は、現在の年がどのくらい経過したかを示すシンプルで洗練された視覚化ツールです。時間の経過を実感し、毎日を最大限に活用できるよう支援することが私たちの目標です。

主な機能：
• 1時間ごとの更新によるリアルタイム進捗追跡
• 経過した日数を美しいグリッドで視覚化
• {supportedLanguagesCount}言語と複数テーマのサポート
• 動的な進捗カードでのソーシャルメディア共有
• 清潔で気が散らないインターフェース

このプロジェクトはオープンソースで、時間の貴重さを思い出させる有用なツールとして設計されています。達成を振り返る時も、将来を計画する時も、単に年の進捗に興味がある時も、このツールは私たちが時間の中でどこにいるかについて明確で視覚的な視点を提供します。

データについて：
このサイトは個人情報を一切収集しません。すべての設定（テーマ、言語など）はあなたのデバイスにのみ保存されます。`,
  },
  ko: {
    title: 'YearProgress.org',
    siteName: 'YearProgress.org',
    description: '실시간 연간 진행률 시각화. 올해가 얼마나 지났고 얼마나 남았는지 확인하세요.',
    yearProgress: '연간 진행률',
    subtitle: '실시간 연간 진행률 시각화',
    complete: '완료',
    progressTitle: '{year}년이 {percentage}% 완료되었습니다',
    week: '주',
    day: '일',
    of: '의',
    daysCompleted: '일 완료',
    daysRemaining: '일 남음',
    shareInstructions: 'X(Twitter)에서 이 링크를 공유하여 아름다운 진행률 카드를 생성하세요!',
    currentDate: '현재 날짜',
    timeWaits: '시간은 아무도 기다리지 않습니다. 매일을 소중히 여기세요!',
    shareUrl: 'URL 공유',
    copyLink: '링크 복사',
    linkCopied: '링크가 클립보드에 복사되었습니다!',
    past: '과거',
    current: '현재',
    future: '미래',
    shareToSocialMedia: '소셜 미디어에 공유',
    clickToShare: '아래를 클릭하여 소셜 미디어에 공유하고 아름다운 진행률 카드를 생성하세요!',
    orCopyLink: '또는 링크를 복사하여 공유',
    copy: '복사',
    copied: '복사됨!',
    settings: '설정',
    monthDayFormat: '{month}월{day}일',
    dayWeekInfoFormat: '{dayNumber}일 • {weekNumber}주',
    bottomStatsFormat: '{daysPassed}일 완료 • {daysRemaining}일 남음',
    theme: '테마',
    language: '언어',
    twitterIcon: 'Twitter 아이콘',
    close: '닫기',
    weekDays: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
    weekDayStatus: "{year}년 {weekNumber}주차, {dayNumber}일차입니다.",
    socialHashtags: ['연간진행률'],
    // 版权和法律信息
    copyright: '© {year} YearProgress.org',
    aboutSite: '소개',
    privacyPolicy: '개인정보 처리방침',
    termsOfService: '이용약관',
    // 关于本站内容
    aboutSiteTitle: 'YearProgress.org 소개',
    aboutSiteContent: `연간 진행률은 현재 연도가 얼마나 지났는지를 보여주는 간단하고 우아한 시각화 도구입니다. 우리의 목표는 사람들이 시간의 흐름에 대한 관점을 얻고 매일을 최대한 활용할 수 있도록 돕는 것입니다.

주요 기능:
• 매시간 업데이트되는 실시간 진행률 추적
• 지난 날들을 보여주는 아름다운 격자 시각화
• {supportedLanguagesCount}개 언어와 여러 테마 지원
• 동적 진행률 카드를 통한 소셜 미디어 공유
• 깔끔하고 방해 요소 없는 인터페이스

이 프로젝트는 오픈 소스이며 시간이 소중하다는 유용한 알림으로 설계되었습니다. 성취를 돌아볼 때든, 미래를 계획할 때든, 단순히 연도의 진행률이 궁금할 때든, 이 도구는 우리가 시간 속에서 어디에 있는지에 대한 명확하고 시각적인 관점을 제공합니다.

데이터 정보:
이 사이트는 개인 정보를 수집하지 않습니다. 모든 설정(테마, 언어 등)은 사용자의 기기에만 저장됩니다.`,
  },
  pt: {
    title: 'YearProgress.org',
    siteName: 'YearProgress.org',
    description: 'Visualização do progresso anual em tempo real. Veja quanto do ano passou e quanto tempo resta.',
    yearProgress: 'Progresso do Ano',
    subtitle: 'Visualização do progresso anual em tempo real',
    complete: 'completo',
    progressTitle: '{year} está {percentage}% completo',
    week: 'semana',
    day: 'dia',
    of: 'de',
    daysCompleted: 'dias completados',
    daysRemaining: 'dias restantes',
    shareInstructions: 'Compartilhe este link no X (Twitter) para gerar um belo cartão de progresso!',
    currentDate: 'Data Atual',
    timeWaits: 'O tempo não espera por ninguém, aproveite cada dia!',
    shareUrl: 'Compartilhar URL',
    copyLink: 'Copiar Link',
    linkCopied: 'Link copiado para a área de transferência!',
    past: 'Passado',
    current: 'Atual',
    future: 'Futuro',
    shareToSocialMedia: 'Compartilhar nas Redes Sociais',
    clickToShare: 'Clique abaixo para compartilhar nas redes sociais e gerar cartões de progresso bonitos!',
    orCopyLink: 'Ou copiar link para compartilhar',
    copy: 'Copiar',
    copied: 'Copiado!',
    settings: 'Configurações',
    monthDayFormat: '{month} {day}',
    dayWeekInfoFormat: 'Dia {dayNumber} • Semana {weekNumber}',
    bottomStatsFormat: '{daysPassed} {daysCompleted} • {daysRemaining} {daysRemainingUnit}',
    theme: 'Tema',
    language: 'Idioma',
    twitterIcon: 'Ícone do Twitter',
    close: 'Fechar',
    weekDays: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
    weekDayStatus: "Hoje é a semana {weekNumber}, dia {dayNumber} de {year}.",
    socialHashtags: ['ProgressoAnual'],
    // 版权和法律信息
    copyright: '© {year} YearProgress.org',
    aboutSite: 'Sobre',
    privacyPolicy: 'Política de Privacidade',
    termsOfService: 'Termos de Serviço',
    // 关于本站内容
    aboutSiteTitle: 'Sobre YearProgress.org',
    aboutSiteContent: `Progresso do Ano é uma ferramenta de visualização simples e elegante que mostra quanto do ano atual passou. Nosso objetivo é ajudar as pessoas a obter perspectiva sobre a passagem do tempo e aproveitar ao máximo cada dia.

Recursos principais:
• Rastreamento de progresso em tempo real com atualizações de hora em hora
• Bela visualização em grade mostrando dias completados
• Suporte para {supportedLanguagesCount} idiomas e múltiplos temas
• Compartilhamento em redes sociais com cartões de progresso dinâmicos
• Interface limpa e sem distrações

Este projeto é código aberto e projetado para ser um lembrete útil de que o tempo é precioso. Seja refletindo sobre conquistas, planejando o futuro, ou simplesmente curioso sobre o progresso do ano, esta ferramenta fornece uma perspectiva clara e visual de onde estamos no tempo.

Informações sobre dados:
Este site não coleta nenhuma informação pessoal. Todas as configurações (tema, idioma, etc.) são armazenadas apenas em seu dispositivo.`,
  },
  ru: {
    title: 'YearProgress.org',
    siteName: 'YearProgress.org',
    description: 'Визуализация прогресса года в реальном времени. Посмотрите, сколько года прошло и сколько времени осталось.',
    yearProgress: 'Прогресс года',
    subtitle: 'Визуализация прогресса года в реальном времени',
    complete: 'завершено',
    progressTitle: '{year} год на {percentage}% завершен',
    week: 'неделя',
    day: 'день',
    of: 'из',
    daysCompleted: 'дней завершено',
    daysRemaining: 'дней осталось',
    shareInstructions: 'Поделитесь этой ссылкой в X (Twitter), чтобы создать красивую карточку прогресса!',
    currentDate: 'Текущая дата',
    timeWaits: 'Время не ждет никого, цените каждый день!',
    shareUrl: 'Поделиться URL',
    copyLink: 'Копировать ссылку',
    linkCopied: 'Ссылка скопирована в буфер обмена!',
    past: 'Прошлое',
    current: 'Настоящее',
    future: 'Будущее',
    shareToSocialMedia: 'Поделиться в соцсетях',
    clickToShare: 'Нажмите ниже, чтобы поделиться в социальных сетях и создать красивые карточки прогресса!',
    orCopyLink: 'Или скопировать ссылку для отправки',
    copy: 'Копировать',
    copied: 'Скопировано!',
    settings: 'Настройки',
    monthDayFormat: '{month} {day}',
    dayWeekInfoFormat: 'День {dayNumber} • Неделя {weekNumber}',
    bottomStatsFormat: '{daysPassed} {daysCompleted} • {daysRemaining} {daysRemainingUnit}',
    theme: 'Тема',
    language: 'Язык',
    twitterIcon: 'Иконка Twitter',
    close: 'Закрыть',
    weekDays: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
    weekDayStatus: "Сегодня {weekNumber} неделя, {dayNumber} день {year} года.",
    socialHashtags: ['ГодовойПрогресс'],
    // 版权和法律信息
    copyright: '© {year} YearProgress.org',
    aboutSite: 'О сайте',
    privacyPolicy: 'Политика конфиденциальности',
    termsOfService: 'Условия использования',
    // 关于本站内容
    aboutSiteTitle: 'О YearProgress.org',
    aboutSiteContent: `Прогресс года - это простой и элегантный инструмент визуализации, который показывает, сколько текущего года прошло. Наша цель - помочь людям получить представление о ходе времени и максимально использовать каждый день.

Основные функции:
• Отслеживание прогресса в реальном времени с обновлением каждый час
• Красивая сетчатая визуализация завершенных дней
• Поддержка {supportedLanguagesCount} языков и множества тем
• Обмен в социальных сетях с динамическими карточками прогресса
• Чистый интерфейс без отвлекающих элементов

Этот проект с открытым исходным кодом создан как полезное напоминание о том, что время драгоценно. Размышляете ли вы о достижениях, планируете будущее или просто интересуетесь прогрессом года - этот инструмент предоставляет четкое визуальное представление о том, где мы находимся во времени.

Информация о данных:
Этот сайт не собирает никакой личной информации. Все настройки (тема, язык и т.д.) хранятся только на вашем устройстве.`,
  },
  ar: {
    title: 'YearProgress.org',
    siteName: 'YearProgress.org',
    description: 'عرض مرئي لتقدم العام في الوقت الفعلي. شاهد كم من العام مر وكم من الوقت متبقي.',
    yearProgress: 'تقدم العام',
    subtitle: 'عرض مرئي لتقدم العام في الوقت الفعلي',
    complete: 'مكتمل',
    progressTitle: '{year} مكتمل بنسبة {percentage}%',
    week: 'أسبوع',
    day: 'يوم',
    of: 'من',
    daysCompleted: 'يوم مكتمل',
    daysRemaining: 'يوم متبقي',
    shareInstructions: 'شارك هذا الرابط على X (تويتر) لإنشاء بطاقة تقدم جميلة!',
    currentDate: 'التاريخ الحالي',
    timeWaits: 'الوقت لا ينتظر أحداً، اعتز بكل يوم!',
    shareUrl: 'مشاركة الرابط',
    copyLink: 'نسخ الرابط',
    linkCopied: 'تم نسخ الرابط إلى الحافظة!',
    past: 'الماضي',
    current: 'الحالي',
    future: 'المستقبل',
    shareToSocialMedia: 'مشاركة على وسائل التواصل الاجتماعي',
    clickToShare: 'انقر أدناه للمشاركة على وسائل التواصل الاجتماعي وإنشاء بطاقات تقدم جميلة!',
    orCopyLink: 'أو نسخ الرابط للمشاركة',
    copy: 'نسخ',
    copied: 'تم النسخ!',
    settings: 'الإعدادات',
    monthDayFormat: '{day} {month}',
    dayWeekInfoFormat: 'يوم {dayNumber} • أسبوع {weekNumber}',
    bottomStatsFormat: '{daysPassed} {daysCompleted} • {daysRemaining} {daysRemainingUnit}',
    theme: 'المظهر',
    language: 'اللغة',
    twitterIcon: 'أيقونة تويتر',
    close: 'إغلاق',
    weekDays: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
    weekDayStatus: "اليوم هو الأسبوع {weekNumber}، اليوم {dayNumber} من عام {year}.",
    socialHashtags: ['تقدمالسنة'],
    // 版权和法律信息
    copyright: '© {year} YearProgress.org',
    aboutSite: 'حول',
    privacyPolicy: 'سياسة الخصوصية',
    termsOfService: 'شروط الخدمة',
    // 关于本站内容
    aboutSiteTitle: 'حول YearProgress.org',
    aboutSiteContent: `تقدم العام هو أداة تصور بسيطة وأنيقة تُظهر كم من العام الحالي قد مضى. هدفنا هو مساعدة الناس على اكتساب منظور حول مرور الوقت والاستفادة القصوى من كل يوم.

الميزات الرئيسية:
• تتبع التقدم في الوقت الفعلي مع التحديثات كل ساعة
• تصور شبكي جميل يُظهر الأيام المكتملة
• دعم لـ {supportedLanguagesCount} لغة ومظاهر متعددة
• مشاركة وسائل التواصل الاجتماعي مع بطاقات تقدم ديناميكية
• واجهة نظيفة وخالية من المشتتات

هذا المشروع مفتوح المصدر ومصمم ليكون تذكيرًا مفيدًا بأن الوقت ثمين. سواء كنت تتأمل في الإنجازات، أو تخطط للمستقبل، أو مجرد فضول حول تقدم العام، فإن هذه الأداة توفر منظورًا واضحًا ومرئيًا لموقعنا في الزمن.

معلومات البيانات:
هذا الموقع لا يجمع أي معلومات شخصية. جميع الإعدادات (المظهر، اللغة، إلخ) مُخزنة فقط على جهازك.`,
  },
  hi: {
    title: 'YearProgress.org',
    siteName: 'YearProgress.org',
    description: 'वास्तविक समय में वर्षीय प्रगति का दृश्य। देखें कि वर्ष का कितना हिस्सा बीत गया है और कितना समय बचा है।',
    yearProgress: 'वर्ष प्रगति',
    subtitle: 'वास्तविक समय में वर्षीय प्रगति का दृश्य',
    complete: 'पूर्ण',
    progressTitle: '{year} {percentage}% पूर्ण हो गया है',
    week: 'सप्ताह',
    day: 'दिन',
    of: 'का',
    daysCompleted: 'दिन पूर्ण',
    daysRemaining: 'दिन शेष',
    shareInstructions: 'एक सुंदर प्रगति कार्ड बनाने के लिए X (Twitter) पर इस लिंक को साझा करें!',
    currentDate: 'वर्तमान दिनांक',
    timeWaits: 'समय किसी का इंतज़ार नहीं करता, हर दिन को संजोकर रखें!',
    shareUrl: 'URL साझा करें',
    copyLink: 'लिंक कॉपी करें',
    linkCopied: 'लिंक क्लिपबोर्ड पर कॉपी हो गया!',
    past: 'अतीत',
    current: 'वर्तमान',
    future: 'भविष्य',
    shareToSocialMedia: 'सोशल मीडिया पर साझा करें',
    clickToShare: 'सुंदर प्रगति कार्ड बनाने और सोशल मीडिया पर साझा करने के लिए नीचे क्लिक करें!',
    orCopyLink: 'या साझा करने के लिए लिंक कॉपी करें',
    copy: 'कॉपी',
    copied: 'कॉपी हो गया!',
    settings: 'सेटिंग्स',
    monthDayFormat: '{day} {month}',
    dayWeekInfoFormat: 'दिन {dayNumber} • सप्ताह {weekNumber}',
    bottomStatsFormat: '{daysPassed} {daysCompleted} • {daysRemaining} {daysRemainingUnit}',
    theme: 'थीम',
    language: 'भाषा',
    twitterIcon: 'ट्विटर आइकन',
    close: 'बंद करें',
    weekDays: ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'],
    weekDayStatus: "आज {year} का {weekNumber}वाँ सप्ताह, {dayNumber}वाँ दिन है।",
    socialHashtags: ['वार्षिकप्रगति'],
    // 版权和法律信息
    copyright: '© {year} YearProgress.org',
    aboutSite: 'के बारे में',
    privacyPolicy: 'गोपनीयता नीति',
    termsOfService: 'सेवा की शर्तें',
    // 关于本站内容
    aboutSiteTitle: 'YearProgress.org के बारे में',
    aboutSiteContent: `वर्ष प्रगति एक सरल और सुरुचिपूर्ण विज़ुअलाइज़ेशन टूल है जो दिखाता है कि वर्तमान वर्ष का कितना हिस्सा बीत गया है। हमारा लक्ष्य लोगों को समय के बीतने के बारे में दृष्टिकोण प्राप्त करने और हर दिन का अधिकतम लाभ उठाने में मदद करना है।

मुख्य विशेषताएं:
• घंटे के अपडेट के साथ रियल-टाइम प्रगति ट्रैकिंग
• पूर्ण दिनों को दिखाने वाला सुंदर ग्रिड विज़ुअलाइज़ेशन
• {supportedLanguagesCount} भाषाओं और कई थीम का समर्थन
• डायनामिक प्रगति कार्ड के साथ सोशल मीडिया शेयरिंग
• स्वच्छ, विकर्षण-मुक्त इंटरफेस

यह प्रोजेक्ट ओपन-सोर्स है और एक उपयोगी अनुस्मारक के रूप में डिज़ाइन किया गया है कि समय अमूल्य है। चाहे आप उपलब्धियों पर विचार कर रहे हों, भविष्य की योजना बना रहे हों, या बस वर्ष की प्रगति के बारे में उत्सुक हों, यह उपकरण समय में हमारी स्थिति का स्पष्ट, दृश्य दृष्टिकोण प्रदान करता है।

डेटा जानकारी:
यह साइट कोई व्यक्तिगत जानकारी एकत्रित नहीं करती। सभी सेटिंग्स (थीम, भाषा आदि) केवल आपके डिवाइस पर संग्रहीत होती हैं।`,
  },
  it: {
    title: 'YearProgress.org',
    siteName: 'YearProgress.org',
    description: 'Visualizzazione del progresso annuale in tempo reale. Vedi quanto dell\'anno è passato e quanto tempo rimane.',
    yearProgress: 'Progresso dell\'Anno',
    subtitle: 'Visualizzazione del progresso annuale in tempo reale',
    complete: 'completato',
    progressTitle: '{year} è {percentage}% completato',
    week: 'settimana',
    day: 'giorno',
    of: 'di',
    daysCompleted: 'giorni completati',
    daysRemaining: 'giorni rimanenti',
    shareInstructions: 'Condividi questo link su X (Twitter) per generare una bella scheda di progresso!',
    currentDate: 'Data Corrente',
    timeWaits: 'Il tempo non aspetta nessuno, apprezza ogni giorno!',
    shareUrl: 'Condividi URL',
    copyLink: 'Copia Link',
    linkCopied: 'Link copiato negli appunti!',
    past: 'Passato',
    current: 'Corrente',
    future: 'Futuro',
    shareToSocialMedia: 'Condividi sui Social Media',
    clickToShare: 'Clicca qui sotto per condividere sui social media e generare belle carte di progresso!',
    orCopyLink: 'O copia il link per condividere',
    copy: 'Copia',
    copied: 'Copiato!',
    settings: 'Impostazioni',
    monthDayFormat: '{month} {day}',
    dayWeekInfoFormat: 'Giorno {dayNumber} • Settimana {weekNumber}',
    bottomStatsFormat: '{daysPassed} {daysCompleted} • {daysRemaining} {daysRemainingUnit}',
    theme: 'Tema',
    language: 'Lingua',
    twitterIcon: 'Icona Twitter',
    close: 'Chiudi',
    weekDays: ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'],
    weekDayStatus: "Oggi è la settimana {weekNumber}, giorno {dayNumber} di {year}.",
    socialHashtags: ['ProgressoAnnuale'],
    // 版权和法律信息
    copyright: '© {year} YearProgress.org',
    aboutSite: 'Informazioni',
    privacyPolicy: 'Informativa sulla privacy',
    termsOfService: 'Termini di servizio',
    // 关于本站内容
    aboutSiteTitle: 'Informazioni su YearProgress.org',
    aboutSiteContent: `Progresso dell'Anno è uno strumento di visualizzazione semplice ed elegante che mostra quanto dell'anno corrente è trascorso. Il nostro obiettivo è aiutare le persone a ottenere una prospettiva sul passare del tempo e sfruttare al meglio ogni giorno.

Caratteristiche principali:
• Monitoraggio del progresso in tempo reale con aggiornamenti orari
• Bella visualizzazione a griglia che mostra i giorni completati
• Supporto per {supportedLanguagesCount} lingue e temi multipli
• Condivisione sui social media con carte di progresso dinamiche
• Interfaccia pulita e senza distrazioni

Questo progetto è open-source e progettato per essere un promemoria utile che il tempo è prezioso. Che tu stia riflettendo sui successi, pianificando il futuro, o semplicemente curioso del progresso dell'anno, questo strumento offre una prospettiva chiara e visiva di dove ci troviamo nel tempo.

Informazioni sui dati:
Questo sito non raccoglie alcuna informazione personale. Tutte le impostazioni (tema, lingua, ecc.) sono memorizzate solo sul tuo dispositivo.`,
  },
  nl: {
    title: 'YearProgress.org',
    siteName: 'YearProgress.org',
    description: 'Realtime visualisatie van de jaarlijkse voortgang. Zie hoeveel van het jaar is verstreken en hoeveel tijd er nog overblijft.',
    yearProgress: 'Voortgang van het Jaar',
    subtitle: 'Realtime visualisatie van de jaarlijkse voortgang',
    complete: 'voltooid',
    progressTitle: '{year} is {percentage}% voltooid',
    week: 'week',
    day: 'dag',
    of: 'van',
    daysCompleted: 'dagen voltooid',
    daysRemaining: 'dagen resterend',
    shareInstructions: 'Deel deze link op X (Twitter) om een mooie voortgangskaart te genereren!',
    currentDate: 'Huidige Datum',
    timeWaits: 'Tijd wacht op niemand, koester elke dag!',
    shareUrl: 'URL delen',
    copyLink: 'Link kopiëren',
    linkCopied: 'Link gekopieerd naar klembord!',
    past: 'Verleden',
    current: 'Huidig',
    future: 'Toekomst',
    shareToSocialMedia: 'Delen op Social Media',
    clickToShare: 'Klik hieronder om te delen op sociale media en mooie voortgangskaarten te genereren!',
    orCopyLink: 'Of kopieer link om te delen',
    copy: 'Kopieer',
    copied: 'Gekopieerd!',
    settings: 'Instellingen',
    monthDayFormat: '{month} {day}',
    dayWeekInfoFormat: 'Dag {dayNumber} • Week {weekNumber}',
    bottomStatsFormat: '{daysPassed} {daysCompleted} • {daysRemaining} {daysRemainingUnit}',
    theme: 'Thema',
    language: 'Taal',
    twitterIcon: 'Twitter Icoon',
    close: 'Sluiten',
    weekDays: ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'],
    weekDayStatus: "Vandaag is het week {weekNumber}, dag {dayNumber} van {year}.",
    socialHashtags: ['Jaarvoortgang'],
    // 版权和法律信息
    copyright: '© {year} YearProgress.org',
    aboutSite: 'Over',
    privacyPolicy: 'Privacybeleid',
    termsOfService: 'Gebruiksvoorwaarden',
    // 关于本站内容
    aboutSiteTitle: 'Over YearProgress.org',
    aboutSiteContent: `Voortgang van het Jaar is een eenvoudige, elegante visualisatietool die toont hoeveel van het huidige jaar is verstreken. Ons doel is om mensen te helpen perspectief te krijgen op de voortgang van de tijd en het meeste uit elke dag te halen.

Belangrijkste functies:
• Real-time voortgangsvolging met uur-updates
• Mooie rastervisualisatie die voltooide dagen toont
• Ondersteuning voor {supportedLanguagesCount} talen en meerdere thema's
• Sociale media delen met dynamische voortgangskaarten
• Schone, afleidingsvrije interface

Dit project is open-source en ontworpen als een nuttige herinnering dat tijd kostbaar is. Of je nu reflecteert op prestaties, de toekomst plant, of gewoon nieuwsgierig bent naar de voortgang van het jaar, deze tool biedt een duidelijk, visueel perspectief op waar we staan in de tijd.

Data-informatie:
Deze site verzamelt geen persoonlijke informatie. Alle instellingen (thema, taal, enz.) worden alleen op je apparaat opgeslagen.`,
  },
  tr: {
    title: 'YearProgress.org',
    siteName: 'YearProgress.org',
    description: 'Gerçek zamanlı yıllık ilerleme görselleştirmesi. Yılın ne kadarının geçtiğini ve ne kadar zamanın kaldığını görün.',
    yearProgress: 'Yıl İlerlemesi',
    subtitle: 'Gerçek zamanlı yıllık ilerleme görselleştirmesi',
    complete: 'tamamlandı',
    progressTitle: '{year} {percentage}% tamamlandı',
    week: 'hafta',
    day: 'gün',
    of: 'nin',
    daysCompleted: 'gün tamamlandı',
    daysRemaining: 'gün kaldı',
    shareInstructions: 'Güzel bir ilerleme kartı oluşturmak için bu bağlantıyı X (Twitter)\'da paylaşın!',
    currentDate: 'Geçerli Tarih',
    timeWaits: 'Zaman kimseyi beklemez, her güne değer verin!',
    shareUrl: 'URL Paylaş',
    copyLink: 'Bağlantıyı Kopyala',
    linkCopied: 'Bağlantı panoya kopyalandı!',
    past: 'Geçmiş',
    current: 'Şu An',
    future: 'Gelecek',
    shareToSocialMedia: 'Sosyal Medyada Paylaş',
    clickToShare: 'Sosyal medyada paylaşmak ve güzel ilerleme kartları oluşturmak için aşağıya tıklayın!',
    orCopyLink: 'Veya paylaşmak için bağlantıyı kopyala',
    copy: 'Kopyala',
    copied: 'Kopyalandı!',
    settings: 'Ayarlar',
    monthDayFormat: '{month} {day}',
    dayWeekInfoFormat: 'Gün {dayNumber} • Hafta {weekNumber}',
    bottomStatsFormat: '{daysPassed} {daysCompleted} • {daysRemaining} {daysRemainingUnit}',
    theme: 'Tema',
    language: 'Dil',
    twitterIcon: 'Twitter Simgesi',
    close: 'Kapat',
    weekDays: ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'],
    weekDayStatus: "Bugün {year} yılının {weekNumber}. haftası, {dayNumber}. günü.",
    socialHashtags: ['Yıllıkİlerleme'],
    // 版权和法律信息
    copyright: '© {year} YearProgress.org',
    aboutSite: 'Hakkında',
    privacyPolicy: 'Gizlilik Politikası',
    termsOfService: 'Hizmet Koşulları',
    // 关于本站内容
    aboutSiteTitle: 'YearProgress.org Hakkında',
    aboutSiteContent: `Yıl İlerlemesi, mevcut yılın ne kadarının geçtiğini gösteren basit ve zarif bir görselleştirme aracıdır. Amacımız, insanların zamanın geçişi hakkında perspektif kazanmalarına ve her günü en iyi şekilde değerlendirmelerine yardımcı olmaktır.

Ana Özellikler:
• Saatlik güncellemelerle gerçek zamanlı ilerleme takibi
• Tamamlanan günleri gösteren güzel ızgara görselleştirmesi
• {supportedLanguagesCount} dil ve çoklu tema desteği
• Dinamik ilerleme kartlarıyla sosyal medya paylaşımı
• Temiz, dikkat dağıtmayan arayüz

Bu proje açık kaynaklıdır ve zamanın değerli olduğunu hatırlatan yararlı bir araç olarak tasarlanmıştır. İster başarıları değerlendirin, ister geleceği planlayın, ister sadece yılın ilerlemesini merak edin, bu araç zamanda nerede durduğumuz konusunda net ve görsel bir perspektif sağlar.

Veri Bilgisi:
Bu site hiçbir kişisel bilgi toplamaz. Tüm ayarlar (tema, dil vb.) yalnızca cihazınızda saklanır.`,
  },
  sv: {
    title: 'YearProgress.org',
    siteName: 'YearProgress.org',
    description: 'Realtidsvisualisering av årens framsteg. Se hur mycket av året som har gått och hur mycket tid som återstår.',
    yearProgress: 'Årets Framsteg',
    subtitle: 'Realtidsvisualisering av årens framsteg',
    complete: 'klart',
    progressTitle: '{year} är {percentage}% klart',
    week: 'vecka',
    day: 'dag',
    of: 'av',
    daysCompleted: 'dagar klara',
    daysRemaining: 'dagar kvar',
    shareInstructions: 'Dela denna länk på X (Twitter) för att generera ett vackert framstegskort!',
    currentDate: 'Aktuellt Datum',
    timeWaits: 'Tiden väntar på ingen, uppskatta varje dag!',
    shareUrl: 'Dela URL',
    copyLink: 'Kopiera länk',
    linkCopied: 'Länk kopierad till urklipp!',
    past: 'Förflutet',
    current: 'Nuvarande',
    future: 'Framtid',
    shareToSocialMedia: 'Dela på sociala medier',
    clickToShare: 'Klicka nedan för att dela på sociala medier och skapa vackra framstegskort!',
    orCopyLink: 'Eller kopiera länk för att dela',
    copy: 'Kopiera',
    copied: 'Kopierat!',
    settings: 'Inställningar',
    monthDayFormat: '{month} {day}',
    dayWeekInfoFormat: 'Dag {dayNumber} • Vecka {weekNumber}',
    bottomStatsFormat: '{daysPassed} {daysCompleted} • {daysRemaining} {daysRemainingUnit}',
    theme: 'Tema',
    language: 'Språk',
    twitterIcon: 'Twitter Ikon',
    close: 'Stäng',
    weekDays: ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag'],
    weekDayStatus: "Idag är det vecka {weekNumber}, dag {dayNumber} av {year}.",
    socialHashtags: ['Årsframsteg'],
    // 版权和法律信息
    copyright: '© {year} YearProgress.org',
    aboutSite: 'Om',
    privacyPolicy: 'Integritetspolicy',
    termsOfService: 'Användarvillkor',
    // 关于本站内容
    aboutSiteTitle: 'Om YearProgress.org',
    aboutSiteContent: `Årets Framsteg är ett enkelt, elegant visualiseringsverktyg som visar hur mycket av det aktuella året som har gått. Vårt mål är att hjälpa människor att få perspektiv på tidens gång och få ut det mesta av varje dag.

Huvudfunktioner:
• Realtids framstegsföljning med uppdateringar varje timme
• Vacker rutnätsvisualisering som visar slutförda dagar
• Stöd för {supportedLanguagesCount} språk och flera teman
• Delning på sociala medier med dynamiska framstegskort
• Rent, distraktionsfritt gränssnitt

Detta projekt är öppen källkod och utformat för att vara en användbar påminnelse om att tid är dyrbar. Oavsett om du reflekterar över prestationer, planerar framtiden eller bara är nyfiken på årets framsteg, ger detta verktyg ett tydligt, visuellt perspektiv på var vi står i tiden.

Datainformation:
Denna webbplats samlar inte in någon personlig information. Alla inställningar (tema, språk, etc.) lagras endast på din enhet.`,
  },
  pl: {
    title: 'YearProgress.org',
    siteName: 'YearProgress.org',
    description: 'Wizualizacja postępu roku w czasie rzeczywistym. Zobacz, ile z roku minęło i ile czasu zostało.',
    yearProgress: 'Postęp Roku',
    subtitle: 'Wizualizacja postępu roku w czasie rzeczywistym',
    complete: 'ukończone',
    progressTitle: '{year} jest {percentage}% ukończony',
    week: 'tydzień',
    day: 'dzień',
    of: 'z',
    daysCompleted: 'dni ukończonych',
    daysRemaining: 'dni pozostało',
    shareInstructions: 'Udostępnij ten link na X (Twitter), aby wygenerować piękną kartę postępu!',
    currentDate: 'Obecna Data',
    timeWaits: 'Czas na nikogo nie czeka, ciesz się każdym dniem!',
    shareUrl: 'Udostępnij URL',
    copyLink: 'Skopiuj link',
    linkCopied: 'Link skopiowany do schowka!',
    past: 'Przeszłość',
    current: 'Obecny',
    future: 'Przyszłość',
    shareToSocialMedia: 'Udostępnij w mediach społecznościowych',
    clickToShare: 'Kliknij poniżej, aby udostępnić w mediach społecznościowych i wygenerować piękne karty postępu!',
    orCopyLink: 'Lub skopiuj link do udostępnienia',
    copy: 'Kopiuj',
    copied: 'Skopiowano!',
    settings: 'Ustawienia',
    monthDayFormat: '{month} {day}',
    dayWeekInfoFormat: 'Dzień {dayNumber} • Tydzień {weekNumber}',
    bottomStatsFormat: '{daysPassed} {daysCompleted} • {daysRemaining} {daysRemainingUnit}',
    theme: 'Motyw',
    language: 'Język',
    twitterIcon: 'Ikona Twitter',
    close: 'Zamknij',
    weekDays: ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'],
    weekDayStatus: "Dziś jest tydzień {weekNumber}, dzień {dayNumber} roku {year}.",
    socialHashtags: ['PostępRoczny'],
    // 版权和法律信息
    copyright: '© {year} YearProgress.org',
    aboutSite: 'O stronie',
    privacyPolicy: 'Polityka prywatności',
    termsOfService: 'Warunki korzystania',
    // 关于本站内容
    aboutSiteTitle: 'O YearProgress.org',
    aboutSiteContent: `Postęp Roku to proste, eleganckie narzędzie wizualizacji, które pokazuje, ile z bieżącego roku minęło. Naszym celem jest pomoc ludziom w uzyskaniu perspektywy na upływ czasu i maksymalnym wykorzystaniu każdego dnia.

Główne funkcje:
• Śledzenie postępów w czasie rzeczywistym z aktualizacjami co godzinę
• Piękna wizualizacja siatki pokazująca ukończone dni
• Obsługa {supportedLanguagesCount} języków i wielu motywów
• Udostępnianie w mediach społecznościowych z dynamicznymi kartami postępu
• Czysty interfejs bez rozpraszaczy

Ten projekt jest open-source i zaprojektowany jako pomocne przypomnienie, że czas jest cenny. Czy zastanawiasz się nad osiągnięciami, planujesz przyszłość, czy po prostu jesteś ciekaw postępu roku, to narzędzie zapewnia jasną, wizualną perspektywę na to, gdzie jesteśmy w czasie.

Informacje o danych:
Ta strona nie zbiera żadnych informacji osobistych. Wszystkie ustawienia (motyw, język itp.) są przechowywane tylko na Twoim urządzeniu.`,
  },
  da: {
    title: 'YearProgress.org',
    siteName: 'YearProgress.org',
    description: 'Realtidsvisualisering af årets fremskridt. Se hvor meget af året der er gået, og hvor meget tid der er tilbage.',
    yearProgress: 'Årets Fremskridt',
    subtitle: 'Realtidsvisualisering af årets fremskridt',
    complete: 'færdig',
    progressTitle: '{year} er {percentage}% færdig',
    week: 'uge',
    day: 'dag',
    of: 'af',
    daysCompleted: 'dage færdige',
    daysRemaining: 'dage tilbage',
    shareInstructions: 'Del dette link på X (Twitter) for at generere et smukt fremskridtskort!',
    currentDate: 'Aktuel Dato',
    timeWaits: 'Tiden venter ikke på nogen, sæt pris på hver dag!',
    shareUrl: 'Del URL',
    copyLink: 'Kopier link',
    linkCopied: 'Link kopieret til udklipsholder!',
    past: 'Fortid',
    current: 'Nuværende',
    future: 'Fremtid',
    shareToSocialMedia: 'Del på sociale medier',
    clickToShare: 'Klik nedenfor for at dele på sociale medier og generere smukke fremskridtskort!',
    orCopyLink: 'Eller kopier link for at dele',
    copy: 'Kopier',
    copied: 'Kopieret!',
    settings: 'Indstillinger',
    monthDayFormat: '{month} {day}',
    dayWeekInfoFormat: 'Dag {dayNumber} • Uge {weekNumber}',
    bottomStatsFormat: '{daysPassed} {daysCompleted} • {daysRemaining} {daysRemainingUnit}',
    theme: 'Tema',
    language: 'Sprog',
    twitterIcon: 'Twitter Ikon',
    close: 'Luk',
    weekDays: ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag'],
    weekDayStatus: "I dag er det uge {weekNumber}, dag {dayNumber} af {year}.",
    socialHashtags: ['Årsfremdrift'],
    // 版权和法律信息
    copyright: '© {year} YearProgress.org',
    aboutSite: 'Om',
    privacyPolicy: 'Privatlivspolitik',
    termsOfService: 'Servicevilkår',
    // 关于本站内容
    aboutSiteTitle: 'Om YearProgress.org',
    aboutSiteContent: `Årets Fremskridt er et enkelt, elegant visualiseringsværktøj, der viser, hvor meget af det nuværende år der er gået. Vores mål er at hjælpe folk med at få perspektiv på tidens gang og få mest muligt ud af hver dag.

Hovedfunktioner:
• Realtidsfremskridtssporing med timeopdateringer
• Smuk gittervisualisering der viser gennemførte dage
• Support til {supportedLanguagesCount} sprog og flere temaer
• Sociale medier deling med dynamiske fremskridtskort
• Rent, distraktionsfrit interface

Dette projekt er open-source og designet til at være en nyttig påmindelse om, at tid er dyrebart. Uanset om du reflekterer over præstationer, planlægger fremtiden eller bare er nysgerrig på årets fremskridt, giver dette værktøj et klart, visuelt perspektiv på, hvor vi står i tiden.

Dataoplysninger:
Denne side indsamler ingen personlige oplysninger. Alle indstillinger (tema, sprog osv.) gemmes kun på din enhed.`,
  },
  no: {
    title: 'YearProgress.org',
    siteName: 'YearProgress.org',
    description: 'Sanntidsvisualisering av årets fremgang. Se hvor mye av året som har gått og hvor mye tid som er igjen.',
    yearProgress: 'Årets Fremgang',
    subtitle: 'Sanntidsvisualisering av årets fremgang',
    complete: 'ferdig',
    progressTitle: '{year} er {percentage}% ferdig',
    week: 'uke',
    day: 'dag',
    of: 'av',
    daysCompleted: 'dager ferdig',
    daysRemaining: 'dager igjen',
    shareInstructions: 'Del denne lenken på X (Twitter) for å generere et vakkert fremgangskort!',
    currentDate: 'Gjeldende Dato',
    timeWaits: 'Tiden venter ikke på noen, sett pris på hver dag!',
    shareUrl: 'Del URL',
    copyLink: 'Kopier lenke',
    linkCopied: 'Lenke kopiert til utklippstavlen!',
    past: 'Fortid',
    current: 'Nåværende',
    future: 'Fremtid',
    shareToSocialMedia: 'Del på sosiale medier',
    clickToShare: 'Klikk nedenfor for å dele på sosiale medier og generere vakre fremgangskort!',
    orCopyLink: 'Eller kopier lenke for å dele',
    copy: 'Kopier',
    copied: 'Kopiert!',
    settings: 'Innstillinger',
    monthDayFormat: '{month} {day}',
    dayWeekInfoFormat: 'Dag {dayNumber} • Uke {weekNumber}',
    bottomStatsFormat: '{daysPassed} {daysCompleted} • {daysRemaining} {daysRemainingUnit}',
    theme: 'Tema',
    language: 'Språk',
    twitterIcon: 'Twitter Ikon',
    close: 'Lukk',
    weekDays: ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag'],
    weekDayStatus: "I dag er det uke {weekNumber}, dag {dayNumber} av {year}.",
    socialHashtags: ['Årsframgang'],
    // 版权和法律信息
    copyright: '© {year} YearProgress.org',
    aboutSite: 'Om',
    privacyPolicy: 'Personvernpolicy',
    termsOfService: 'Servicevilkår',
    // 关于本站内容
    aboutSiteTitle: 'Om YearProgress.org',
    aboutSiteContent: `Årets Fremgang er et enkelt, elegant visualiseringsverktøy som viser hvor mye av inneværende år som har gått. Vårt mål er å hjelpe folk med å få perspektiv på tidens gang og få mest mulig ut av hver dag.

Hovedfunksjoner:
• Sanntids fremgangsoppdatering med timelige oppdateringer
• Vakker rutenettvisualisering som viser fullførte dager
• Støtte for {supportedLanguagesCount} språk og flere temaer
• Sosiale medier deling med dynamiske fremgangskort
• Rent, distraksjonfritt grensesnitt

Dette prosjektet er open-source og designet for å være en nyttig påminnelse om at tid er kostbart. Enten du reflekterer over prestasjoner, planlegger fremtiden eller bare er nysgjerrig på årets fremgang, gir dette verktøyet et klart, visuelt perspektiv på hvor vi står i tid.

Datainformasjon:
Denne siden samler ikke inn noen personlig informasjon. Alle innstillinger (tema, språk osv.) lagres bare på enheten din.`,
  },
  fi: {
    title: 'YearProgress.org',
    siteName: 'YearProgress.org',
    description: 'Reaaliaikainen vuoden edistymisen visualisointi. Näe kuinka paljon vuodesta on kulunut ja kuinka paljon aikaa on jäljellä.',
    yearProgress: 'Vuoden Edistyminen',
    subtitle: 'Reaaliaikainen vuoden edistymisen visualisointi',
    complete: 'valmis',
    progressTitle: '{year} on {percentage}% valmis',
    week: 'viikko',
    day: 'päivä',
    of: 'vuodesta',
    daysCompleted: 'päivää valmis',
    daysRemaining: 'päivää jäljellä',
    shareInstructions: 'Jaa tämä linkki X:ssä (Twitter) luodaksesi kauniin edistymiskortin!',
    currentDate: 'Nykyinen Päivämäärä',
    timeWaits: 'Aika ei odota ketään, arvosta jokaista päivää!',
    shareUrl: 'Jaa URL',
    copyLink: 'Kopioi linkki',
    linkCopied: 'Linkki kopioitu leikepöydälle!',
    past: 'Menneisyys',
    current: 'Nykyinen',
    future: 'Tulevaisuus',
    shareToSocialMedia: 'Jaa sosiaalisessa mediassa',
    clickToShare: 'Napsauta alla jakaaksesi sosiaalisessa mediassa ja luodaksesi kauniita edistymiskortteja!',
    orCopyLink: 'Tai kopioi linkki jakaaksesi',
    copy: 'Kopioi',
    copied: 'Kopioitu!',
    settings: 'Asetukset',
    monthDayFormat: '{month} {day}',
    dayWeekInfoFormat: 'Päivä {dayNumber} • Viikko {weekNumber}',
    bottomStatsFormat: '{daysPassed} {daysCompleted} • {daysRemaining} {daysRemainingUnit}',
    theme: 'Teema',
    language: 'Kieli',
    twitterIcon: 'Twitter Ikoni',
    close: 'Sulje',
    weekDays: ['Sunnuntai', 'Maanantai', 'Tiistai', 'Keskiviikko', 'Torstai', 'Perjantai', 'Lauantai'],
    weekDayStatus: "Tänään on viikko {weekNumber}, päivä {dayNumber} vuodesta {year}.",
    socialHashtags: ['Vuosiedistyminen'],
    // 版权和法律信息
    copyright: '© {year} YearProgress.org',
    aboutSite: 'Tietoja',
    privacyPolicy: 'Tietosuojaseloste',
    termsOfService: 'Käyttöehdot',
    // 关于本站内容
    aboutSiteTitle: 'Tietoja YearProgress.org:sta',
    aboutSiteContent: `Vuoden Edistyminen on yksinkertainen, tyylikäs visualisointityökalu, joka näyttää kuinka paljon kuluvasta vuodesta on kulunut. Tavoitteemme on auttaa ihmisiä saamaan näkökulmaa ajan kulumiseen ja hyödyntämään jokaista päivää parhaalla mahdollisella tavalla.

Pääominaisuudet:
• Reaaliaikainen edistymisen seuranta tunneittain päivitettynä
• Kaunis ruudukkovisualisointi, joka näyttää suoritetut päivät
• Tuki {supportedLanguagesCount} kielelle ja useille teemoille
• Sosiaalisen median jakaminen dynaamisilla edistymiskorteilla
• Puhdas, häiriötön käyttöliittymä

Tämä projekti on avointa lähdekoodia ja suunniteltu hyödylliseksi muistutukseksi siitä, että aika on arvokasta. Olitpa pohtimassa saavutuksia, suunnittelemassa tulevaisuutta tai vain utelias vuoden edistymisestä, tämä työkalu tarjoaa selkeän, visuaalisen näkökulman siihen, missä olemme ajassa.

Tietojen tiedot:
Tämä sivusto ei kerää mitään henkilökohtaisia tietoja. Kaikki asetukset (teema, kieli jne.) tallennetaan vain laitteellesi.`,
  },
  vi: {
    title: 'YearProgress.org',
    siteName: 'YearProgress.org',
    description: 'Trực quan hóa tiến độ năm theo thời gian thực. Xem bao nhiêu phần trăm của năm đã trôi qua và bao nhiêu thời gian còn lại.',
    yearProgress: 'Tiến Độ Năm',
    subtitle: 'Trực quan hóa tiến độ năm theo thời gian thực',
    complete: 'hoàn thành',
    progressTitle: '{year} đã hoàn thành {percentage}%',
    week: 'tuần',
    day: 'ngày',
    of: 'của',
    daysCompleted: 'ngày đã hoàn thành',
    daysRemaining: 'ngày còn lại',
    shareInstructions: 'Chia sẻ liên kết này trên X (Twitter) để tạo thẻ tiến độ đẹp!',
    currentDate: 'Ngày Hiện Tại',
    timeWaits: 'Thời gian không chờ đợi ai, hãy trân trọng mỗi ngày!',
    shareUrl: 'Chia sẻ URL',
    copyLink: 'Sao chép Liên kết',
    linkCopied: 'Đã sao chép liên kết vào bộ nhớ tạm!',
    past: 'Quá khứ',
    current: 'Hiện tại',
    future: 'Tương lai',
    shareToSocialMedia: 'Chia sẻ lên Mạng xã hội',
    clickToShare: 'Nhấp bên dưới để chia sẻ lên mạng xã hội và tạo thẻ tiến độ đẹp!',
    orCopyLink: 'Hoặc sao chép liên kết để chia sẻ',
    copy: 'Sao chép',
    copied: 'Đã sao chép!',
    settings: 'Cài đặt',
    monthDayFormat: '{day} {month}',
    dayWeekInfoFormat: 'Ngày {dayNumber} • Tuần {weekNumber}',
    bottomStatsFormat: '{daysPassed} {daysCompleted} • {daysRemaining} {daysRemainingUnit}',
    theme: 'Chủ đề',
    language: 'Ngôn ngữ',
    twitterIcon: 'Biểu tượng Twitter',
    close: 'Đóng',
    weekDays: ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'],
    weekDayStatus: "Hôm nay là tuần {weekNumber}, ngày {dayNumber} của năm {year}.",
    socialHashtags: ['TienDoNam'],
    // 版权和法律信息
    copyright: '© {year} YearProgress.org',
    aboutSite: 'Về',
    privacyPolicy: 'Chính sách Riêng tư',
    termsOfService: 'Điều khoản Dịch vụ',
    // 关于本站内容
    aboutSiteTitle: 'Về YearProgress.org',
    aboutSiteContent: `YearProgress.org là một công cụ trực quan hóa đơn giản và thanh lịch, cho thấy bao nhiêu phần trăm của năm hiện tại đã trôi qua. Mục tiêu của chúng tôi là giúp mọi người có cái nhìn rõ hơn về sự trôi đi của thời gian và tận dụng tối đa mỗi ngày.

Tính năng chính:
• Theo dõi tiến độ theo thời gian thực với cập nhật mỗi giờ
• Trực quan hóa lưới đẹp mắt hiển thị các ngày đã hoàn thành
• Hỗ trợ {supportedLanguagesCount} ngôn ngữ và nhiều chủ đề
• Chia sẻ mạng xã hội với thẻ tiến độ động
• Giao diện sạch, không gây xao nhãng

Dự án này là mã nguồn mở và được thiết kế như một lời nhắc nhở hữu ích rằng thời gian là quý giá. Dù bạn đang suy ngẫm về những thành tựu, lên kế hoạch cho tương lai, hay đơn giản là tò mò về tiến độ của năm, công cụ này cung cấp một góc nhìn rõ ràng và trực quan về vị trí của chúng ta trong dòng thời gian.

Thông tin dữ liệu:
Trang web này không thu thập bất kỳ thông tin cá nhân nào. Tất cả cài đặt (chủ đề, ngôn ngữ, v.v.) chỉ được lưu trữ trên thiết bị của bạn.`,
  },
  th: {
    title: 'YearProgress.org',
    siteName: 'YearProgress.org',
    description: 'การแสดงผลความคืบหน้าปีแบบเรียลไทม์ ดูว่าปีนี้ผ่านไปแล้วเท่าไรและเหลือเวลาอีกเท่าไหร่',
    yearProgress: 'ความคืบหน้าปี',
    subtitle: 'การแสดงผลความคืบหน้าปีแบบเรียลไทม์',
    complete: 'สมบูรณ์',
    progressTitle: '{year} ผ่านไปแล้ว {percentage}%',
    week: 'สัปดาห์',
    day: 'วัน',
    of: 'ของ',
    daysCompleted: 'วันที่ผ่านไป',
    daysRemaining: 'วันที่เหลือ',
    shareInstructions: 'แชร์ลิงก์นี้บน X (Twitter) เพื่อสร้างการ์ดความคืบหน้าที่สวยงาม!',
    currentDate: 'วันที่ปัจจุบัน',
    timeWaits: 'เวลาไม่รอใคร ให้คุณให้คุณค่ากับทุกวัน!',
    shareUrl: 'แชร์ URL',
    copyLink: 'คัดลอกลิงก์',
    linkCopied: 'คัดลอกลิงก์ไปยังคลิปบอร์ดแล้ว!',
    past: 'อดีต',
    current: 'ปัจจุบัน',
    future: 'อนาคต',
    shareToSocialMedia: 'แชร์บนโซเชียลมีเดีย',
    clickToShare: 'คลิกด้านล่างเพื่อแชร์บนโซเชียลมีเดียและสร้างการ์ดความคืบหน้าที่สวยงาม!',
    orCopyLink: 'หรือคัดลอกลิงก์เพื่อแชร์',
    copy: 'คัดลอก',
    copied: 'คัดลอกแล้ว!',
    settings: 'การตั้งค่า',
    monthDayFormat: '{day} {month}',
    dayWeekInfoFormat: 'วันที่ {dayNumber} • สัปดาห์ {weekNumber}',
    bottomStatsFormat: '{daysPassed} {daysCompleted} • {daysRemaining} {daysRemainingUnit}',
    theme: 'ธีม',
    language: 'ภาษา',
    twitterIcon: 'ไอคอน Twitter',
    close: 'ปิด',
    weekDays: ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์'],
    weekDayStatus: "วันนี้คือสัปดาห์ที่ {weekNumber} วันที่ {dayNumber} ของปี {year}",
    socialHashtags: ['ความคืบหน้าปี'],
    // 版权和法律信息
    copyright: '© {year} YearProgress.org',
    aboutSite: 'เกี่ยวกับ',
    privacyPolicy: 'นโยบายความเป็นส่วนตัว',
    termsOfService: 'ข้อกำหนดการให้บริการ',
    // 关于本站内容
    aboutSiteTitle: 'เกี่ยวกับ YearProgress.org',
    aboutSiteContent: `YearProgress.org เป็นเครื่องมือการแสดงผลภาพที่เรียบง่ายและสวยงาม แสดงให้เห็นว่าปีปัจจุบันผ่านไปแล้วเท่าไหร่ เป้าหมายของเราคือช่วยให้ผู้คนมองเห็นมุมมองเกี่ยวกับการผ่านไปของเวลาและใช้ประโยชน์จากทุกวันให้เต็มที่

คุณสมบัติหลัก:
• การติดตามความคืบหน้าแบบเรียลไทม์พร้อมอัปเดตทุกชั่วโมง
• การแสดงผลภาพกริดที่สวยงามแสดงวันที่ผ่านไปแล้ว
• รองรับ {supportedLanguagesCount} ภาษาและหลายธีม
• การแชร์โซเชียลมีเดียด้วยการ์ดความคืบหน้าแบบไดนามิก
• อินเตอร์เฟซที่สะอาดและไม่รบกวน

โปรเจกต์นี้เป็นโอเพ่นซอร์สและออกแบบมาเพื่อเป็นการเตือนใจที่มีประโยชน์ว่าเวลามีค่า ไม่ว่าคุณจะกำลังพิจารณาถึงความสำเร็จ วางแผนอนาคต หรือเพียงแค่อยากรู้ว่าปีนี้ผ่านไปเท่าไหร่ เครื่องมือนี้จะมอบมุมมองที่ชัดเจนและเป็นภาพเกี่ยวกับตำแหน่งของเราในเวลา

ข้อมูลข้อมูล:
เว็บไซต์นี้ไม่รวบรวมข้อมูลส่วนตัวใดๆ ทั้งสิ้น การตั้งค่าทั้งหมด (ธีม ภาษา ฯลฯ) จะถูกจัดเก็บไว้บนอุปกรณ์ของคุณเท่านั้น`,
  },
  id: {
    title: 'YearProgress.org',
    siteName: 'YearProgress.org',
    description: 'Visualisasi kemajuan tahun secara real-time. Lihat berapa banyak tahun yang telah berlalu dan berapa banyak waktu yang tersisa.',
    yearProgress: 'Kemajuan Tahun',
    subtitle: 'Visualisasi kemajuan tahun secara real-time',
    complete: 'selesai',
    progressTitle: '{year} telah selesai {percentage}%',
    week: 'minggu',
    day: 'hari',
    of: 'dari',
    daysCompleted: 'hari selesai',
    daysRemaining: 'hari tersisa',
    shareInstructions: 'Bagikan tautan ini di X (Twitter) untuk menghasilkan kartu kemajuan yang indah!',
    currentDate: 'Tanggal Saat Ini',
    timeWaits: 'Waktu tidak menunggu siapa pun, hargai setiap hari!',
    shareUrl: 'Bagikan URL',
    copyLink: 'Salin Tautan',
    linkCopied: 'Tautan disalin ke clipboard!',
    past: 'Masa Lalu',
    current: 'Saat Ini',
    future: 'Masa Depan',
    shareToSocialMedia: 'Bagikan ke Media Sosial',
    clickToShare: 'Klik di bawah untuk berbagi ke media sosial dan menghasilkan kartu kemajuan yang indah!',
    orCopyLink: 'Atau salin tautan untuk dibagikan',
    copy: 'Salin',
    copied: 'Disalin!',
    settings: 'Pengaturan',
    monthDayFormat: '{day} {month}',
    dayWeekInfoFormat: 'Hari {dayNumber} • Minggu {weekNumber}',
    bottomStatsFormat: '{daysPassed} {daysCompleted} • {daysRemaining} {daysRemainingUnit}',
    theme: 'Tema',
    language: 'Bahasa',
    twitterIcon: 'Ikon Twitter',
    close: 'Tutup',
    weekDays: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
    weekDayStatus: "Hari ini adalah minggu {weekNumber}, hari {dayNumber} dari tahun {year}.",
    socialHashtags: ['KemajuanTahunan'],
    // 版权和法律信息
    copyright: '© {year} YearProgress.org',
    aboutSite: 'Tentang',
    privacyPolicy: 'Kebijakan Privasi',
    termsOfService: 'Syarat dan Ketentuan',
    // 关于本站内容
    aboutSiteTitle: 'Tentang YearProgress.org',
    aboutSiteContent: `YearProgress.org adalah alat visualisasi yang sederhana dan elegan yang menunjukkan berapa banyak dari tahun saat ini telah berlalu. Tujuan kami adalah membantu orang mendapatkan perspektif tentang berlalunya waktu dan memanfaatkan setiap hari sebaik mungkin.

Fitur utama:
• Pelacakan kemajuan real-time dengan pembaruan setiap jam
• Visualisasi grid yang indah menunjukkan hari-hari yang telah selesai
• Dukungan untuk {supportedLanguagesCount} bahasa dan beberapa tema
• Berbagi media sosial dengan kartu kemajuan dinamis
• Antarmuka yang bersih dan bebas gangguan

Proyek ini bersumber terbuka dan dirancang sebagai pengingat yang berguna bahwa waktu itu berharga. Baik Anda sedang merenungkan pencapaian, merencanakan masa depan, atau hanya sekadar penasaran tentang kemajuan tahun, alat ini memberikan perspektif yang jelas dan visual tentang di mana kita berada dalam waktu.

Informasi data:
Situs ini tidak mengumpulkan informasi pribadi apa pun. Semua pengaturan (tema, bahasa, dll.) hanya disimpan di perangkat Anda.`,
  },
  sw: {
    title: 'YearProgress.org',
    siteName: 'YearProgress.org',
    description: 'Uwakilishaji wa maendeleo ya mwaka wakati halisi. Angalia kiasi gani cha mwaka umepita na kiasi gani cha wakati kinachobaki.',
    yearProgress: 'Maendeleo ya Mwaka',
    subtitle: 'Uwakilishaji wa maendeleo ya mwaka wakati halisi',
    complete: 'kamili',
    progressTitle: '{year} imekamilika {percentage}%',
    week: 'wiki',
    day: 'siku',
    of: 'ya',
    daysCompleted: 'siku zimekamilika',
    daysRemaining: 'siku zimebaki',
    shareInstructions: 'Shiriki kiungo hiki kwenye X (Twitter) kuzalisha kadi nzuri ya maendeleo!',
    currentDate: 'Tarehe ya Sasa',
    timeWaits: 'Muda hauangalii mtu, thamani kila siku!',
    shareUrl: 'Shiriki URL',
    copyLink: 'Nakili Kiungo',
    linkCopied: 'Kiungo kimenuzuliwa kwenye ubao!',
    past: 'Uliopita',
    current: 'Sasa',
    future: 'Ujao',
    shareToSocialMedia: 'Shiriki kwenye Mitandao ya Kijamii',
    clickToShare: 'Bofya chini kushiriki kwenye mitandao ya kijamii na kuzalisha kadi nzuri za maendeleo!',
    orCopyLink: 'Au nakili kiungo kushiriki',
    copy: 'Nakili',
    copied: 'Imenakiliwa!',
    settings: 'Mipangilio',
    monthDayFormat: '{day} {month}',
    dayWeekInfoFormat: 'Siku {dayNumber} • Wiki {weekNumber}',
    bottomStatsFormat: '{daysPassed} {daysCompleted} • {daysRemaining} {daysRemainingUnit}',
    theme: 'Mandhari',
    language: 'Lugha',
    twitterIcon: 'Alama ya Twitter',
    close: 'Funga',
    weekDays: ['Jumapili', 'Jumatatu', 'Jumanne', 'Jumatano', 'Alhamisi', 'Ijumaa', 'Jumamosi'],
    weekDayStatus: "Leo ni wiki {weekNumber}, siku {dayNumber} ya mwaka {year}.",
    socialHashtags: ['MaendeleoYaMwaka'],
    // 版权和法律信息
    copyright: '© {year} YearProgress.org',
    aboutSite: 'Kuhusu',
    privacyPolicy: 'Sera ya Faragha',
    termsOfService: 'Masharti ya Huduma',
    // 关于本站内容
    aboutSiteTitle: 'Kuhusu YearProgress.org',
    aboutSiteContent: `YearProgress.org ni zana rahisi na maridadi ya kuonyesha kiasi gani cha mwaka wa sasa kinapita. Lengo letu ni kusaidia watu kupata mtazamo kuhusu kupita kwa muda na kufaidi kila siku kikamilifu.

Vipengele vikuu:
• Ufuatiliaji wa maendeleo halisi kwa masasisho ya kila saa
• Uwakilishaji mzuri wa gridi unaonyesha siku zilizokamilika
• Msaada kwa lugha {supportedLanguagesCount} na mandhari mbalimbali
• Kushiriki katika mitandao ya kijamii kwa kadi za maendeleo zenye nguvu
• Kiolesura safi isiyo na kero

Mradi huu ni chanzo wazi na uliundwa kama kumbukumbu muhimu kuwa muda ni thamani. Iwe unafikiria mafanikio, unapanga siku zijazo, au tu una shauku kuhusu maendeleo ya mwaka, zana hii inatoa mtazamo wazi na wa kuona kuhusu wapi tulipo katika muda.

Maelezo ya data:
Tovuti hii hakusanyi habari yoyote binafsi. Mipangilio yote (mandhari, lugha, nk.) imerahisishwa kwenye kifaa chako pekee.`,
  },
  bn: {
    title: 'YearProgress.org',
    siteName: 'YearProgress.org',
    description: 'বাস্তব সময়ের বার্ষিক অগ্রগতি ভিজ্যুয়ালাইজেশন। দেখুন বছরের কতটুকু সময় অতিবাহিত হয়েছে এবং কতটুকু সময় বাকি আছে।',
    yearProgress: 'বার্ষিক অগ্রগতি',
    subtitle: 'বাস্তব সময়ের বার্ষিক অগ্রগতি ভিজ্যুয়ালাইজেশন',
    complete: 'সম্পন্ন',
    progressTitle: '{year} সালের {percentage}% সম্পন্ন হয়েছে',
    week: 'সপ্তাহ',
    day: 'দিন',
    of: 'এর',
    daysCompleted: 'দিন সম্পন্ন হয়েছে',
    daysRemaining: 'দিন বাকি আছে',
    shareInstructions: 'সুন্দর অগ্রগতি কার্ড তৈরি করতে X (Twitter) এ এই লিঙ্কটি শেয়ার করুন!',
    currentDate: 'বর্তমান তারিখ',
    timeWaits: 'সময় কারো জন্য অপেক্ষা করে না, প্রতিটি দিনকে মূল্য দিন!',
    shareUrl: 'শেয়ার ইউআরএল',
    copyLink: 'লিঙ্ক কপি করুন',
    linkCopied: 'লিঙ্ক ক্লিপবোর্ডে কপি করা হয়েছে!',
    past: 'অতীত',
    current: 'বর্তমান',
    future: 'ভবিষ্যত',
    shareToSocialMedia: 'সোশ্যাল মিডিয়ায় শেয়ার করুন',
    clickToShare: 'সোশ্যাল মিডিয়ায় শেয়ার করতে এবং সুন্দর অগ্রগতি কার্ড তৈরি করতে নীচে ক্লিক করুন!',
    orCopyLink: 'অথবা শেয়ার করার জন্য লিঙ্ক কপি করুন',
    copy: 'কপি',
    copied: 'কপি করা হয়েছে!',
    settings: 'সেটিংস',
    monthDayFormat: '{day} {month}',
    dayWeekInfoFormat: 'দিন {dayNumber} • সপ্তাহ {weekNumber}',
    bottomStatsFormat: '{daysPassed} {daysCompleted} • {daysRemaining} {daysRemainingUnit}',
    theme: 'থিম',
    language: 'ভাষা',
    twitterIcon: 'টুইটার আইকন',
    close: 'বন্ধ',
    weekDays: ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'],
    weekDayStatus: "আজ {year} সালের {weekNumber} সপ্তাহ, {dayNumber} তম দিন।",
    socialHashtags: [],
    // কপিরাইট এবং আইনি তথ্য
    copyright: '© {year} YearProgress.org',
    aboutSite: 'সম্পর্কে',
    privacyPolicy: 'গোপনীয়তা নীতি',
    termsOfService: 'পরিষেবার শর্তাবলী',
    // সাইট সম্পর্কে বিষয়বস্তু
    aboutSiteTitle: 'YearProgress.org সম্পর্কে',
    aboutSiteContent: `এই সাইটটি একটি সরল কিন্তু মার্জিত ভিজ্যুয়ালাইজেশন টুল যা দেখায় বর্তমান বছরের কতটুকু সময় ইতিমধ্যেই অতিবাহিত হয়েছে। আমাদের লক্ষ্য হলো মানুষকে সময়ের অতিবাহিত সম্পর্কে আরও স্বজ্ঞাত ধারণা দেওয়া এবং প্রতিটি দিনকে সর্বাধিক ব্যবহার করতে সাহায্য করা।

মূল বৈশিষ্ট্য:
• বার্ষিক অগ্রগতির বাস্তব সময়ের গণনা
• অতীত দিনগুলির সুন্দর গ্রিড ভিজ্যুয়ালাইজেশন
• {supportedLanguagesCount}টি ভাষা এবং একাধিক থিম সমর্থন
• স্বয়ংক্রিয়ভাবে তৈরি অগ্রগতি কার্ড সহ এক-ক্লিক শেয়ারিং
• পরিষ্কার, বিভ্রান্তিমুক্ত ইন্টারফেস

আপনি যেমন অতীতের অর্জনগুলির প্রতিফলন করছেন, ভবিষ্যতের পরিকল্পনা করছেন, বা কেবল বছরের কতটুকু অংশ অতিক্রান্ত হয়েছে সে সম্পর্কে কৌতূহলী, এই টুলটি সময়ের উপর একটি স্পষ্ট এবং অনন্য দৃষ্টিকোণ প্রদান করে।

ডেটা নীতি:
আমরা কোনো ব্যক্তিগত তথ্য সংগ্রহ করি না। সমস্ত পছন্দ (যেমন থিম এবং ভাষা) আপনার ডিভাইসে স্থানীয়ভাবে সংরক্ষিত হয়।`,
  },
  ne: {
    title: 'YearProgress.org',
    siteName: 'YearProgress.org',
    description: 'वास्तविक समयको वार्षिक प्रगति दृश्य। वर्षको कति भाग बितिसकेको छ र कति समय बाँकी छ हेर्नुहोस्।',
    yearProgress: 'वार्षिक प्रगति',
    subtitle: 'वास्तविक समयको वार्षिक प्रगति दृश्य',
    complete: 'पूरा',
    progressTitle: '{year} {percentage}% पूरा भयो',
    week: 'हप्ता',
    day: 'दिन',
    of: 'को',
    daysCompleted: 'दिन सम्पन्न',
    daysRemaining: 'दिन बाँकी',
    shareInstructions: 'सुन्दर प्रगति कार्ड बनाउन X (Twitter) मा यो लिङ्क साझा गर्नुहोस्!',
    currentDate: 'वर्तमान मिति',
    timeWaits: 'समयले कसैको पर्खाइ गर्दैन, हरेक दिनलाई महत्त्व दिनुहोस्!',
    shareUrl: 'URL साझा गर्नुहोस्',
    copyLink: 'लिङ्क प्रतिलिपि गर्नुहोस्',
    linkCopied: 'लिङ्क क्लिपबोर्डमा प्रतिलिपि गरियो!',
    past: 'भूत',
    current: 'वर्तमान',
    future: 'भविष्य',
    shareToSocialMedia: 'सामाजिक सञ्जालमा साझा गर्नुहोस्',
    clickToShare: 'सामाजिक सञ्जालमा साझा गर्न र सुन्दर प्रगति कार्ड बनाउन तल क्लिक गर्नुहोस्!',
    orCopyLink: 'वा साझा गर्न लिङ्क प्रतिलिपि गर्नुहोस्',
    copy: 'प्रतिलिपि',
    copied: 'प्रतिलिपि गरियो!',
    settings: 'सेटिङ्गहरू',
    monthDayFormat: '{month} {day}',
    dayWeekInfoFormat: 'दिन {dayNumber} • हप्ता {weekNumber}',
    bottomStatsFormat: '{daysPassed} {daysCompleted} • {daysRemaining} {daysRemainingUnit}',
    theme: 'विषयवस्तु',
    language: 'भाषा',
    twitterIcon: 'ट्विटर आइकन',
    close: 'बन्द गर्नुहोस्',
    weekDays: ['आइतबार', 'सोमबार', 'मङ्गलबार', 'बुधबार', 'बिहिबार', 'शुक्रबार', 'शनिबार'],
    weekDayStatus: "आज {year} को {weekNumber} हप्ता, {dayNumber} औं दिन हो।",
    socialHashtags: ['वार्षिकप्रगति'],
    // कपीराइट र कानुनी जानकारी
    copyright: '© {year} YearProgress.org',
    aboutSite: 'बारेमा',
    privacyPolicy: 'गोपनीयता नीति',
    termsOfService: 'सेवा शर्तहरू',
    // साइट बारेमा सामग्री
    aboutSiteTitle: 'YearProgress.org बारेमा',
    aboutSiteContent: `YearProgress.org एक सरल तर उत्कृष्ट दृश्यात्मक उपकरण हो जसले हालको वर्षको कति भाग बितिसकेको छ भनेर देखाउँछ। हाम्रो लक्ष्य मानिसहरूलाई समयको बगावनको बारेमा दृष्टिकोण प्राप्त गर्न मद्दत गर्नु र हरेक दिनलाई अधिकतम उपयोग गर्नु हो।

मुख्य विशेषताहरू:
• वास्तविक समय प्रगति ट्र्याकिङ प्रत्येक घण्टा अपडेट सहित
• सम्पन्न दिनहरू देखाउने सुन्दर ग्रिड दृश्यात्मकता
• {supportedLanguagesCount} भाषा र बहुविध विषयवस्तु समर्थन
• गतिशील प्रगति कार्डहरू सहित सामाजिक सञ्जाल साझेदारी
• सफा, ध्यान विचलन रहित इन्टरफेस

यो परियोजना खुला स्रोत हो र समय अमूल्य छ भन्ने उपयोगी अनुस्मरणको रूपमा डिजाइन गरिएको छ। तपाईंले उपलब्धिहरूमा सोच्नुहुन्छ, भविष्यको योजना बनाउनुहुन्छ, वा वर्षको प्रगतिमा जिज्ञासु हुनुहुन्छ, यो उपकरणले समयमा हामी कहाँ छौं भन्ने स्पष्ट र दृश्य दृष्टिकोण प्रदान गर्दछ।

डाटा जानकारी:
यो साइटले कुनै पनि व्यक्तिगत जानकारी संकलन गर्दैन। सबै सेटिङ्हरू (विषयवस्तु, भाषा, आदि) तपाईंको यन्त्रमा मात्र संग्रहित हुन्छन्।`,
  },
  ur: {
    title: 'YearProgress.org',
    siteName: 'YearProgress.org',
    description: 'حقیقی وقت سالانہ پیش رفت کی تصویری تشکیل۔ دیکھیں کہ سال کا کتنا حصہ گزر چکا ہے اور کتنا وقت باقی ہے۔',
    yearProgress: 'سالانہ پیشرفت',
    subtitle: 'حقیقی وقت سالانہ پیش رفت کی تصویری تشکیل',
    complete: 'مکمل',
    progressTitle: '{year} کا {percentage}% مکمل ہو گیا ہے',
    week: 'ہفتہ',
    day: 'دن',
    of: 'کا',
    daysCompleted: 'دن مکمل',
    daysRemaining: 'دن باقی',
    shareInstructions: 'ایک خوبصورت پیشرفت کارڈ بنانے کے لیے اس لنک کو X (ٹویٹر) پر شیئر کریں!',
    currentDate: 'موجودہ تاریخ',
    timeWaits: 'وقت کسی کا انتظار نہیں کرتا، ہر دن کی قدر کریں!',
    shareUrl: 'URL شیئر کریں',
    copyLink: 'لنک کاپی کریں',
    linkCopied: 'لنک کلپ بورڈ میں کاپی ہو گیا!',
    past: 'ماضی',
    current: 'موجودہ',
    future: 'مستقبل',
    shareToSocialMedia: 'سوشل میڈیا پر شیئر کریں',
    clickToShare: 'سوشل میڈیا پر شیئر کرنے اور خوبصورت پیشرفت کارڈ بنانے کے لیے نیچے کلک کریں!',
    orCopyLink: 'یا شیئر کرنے کے لیے لنک کاپی کریں',
    copy: 'کاپی',
    copied: 'کاپی ہو گیا!',
    settings: 'ترتیبات',
    monthDayFormat: '{day} {month}',
    dayWeekInfoFormat: 'دن {dayNumber} • ہفتہ {weekNumber}',
    bottomStatsFormat: '{daysPassed} {daysCompleted} • {daysRemaining} {daysRemainingUnit}',
    theme: 'تھیم',
    language: 'زبان',
    twitterIcon: 'ٹویٹر آئیکن',
    close: 'بند کریں',
    weekDays: ['اتوار', 'پیر', 'منگل', 'بدھ', 'جمعرات', 'جمعہ', 'ہفتہ'],
    weekDayStatus: "آج {year} کا {weekNumber} واں ہفتہ، {dayNumber} واں دن ہے۔",
    socialHashtags: ['سالانہپیشرفت'],
    // کاپی رائٹ اور قانونی معلومات
    copyright: '© {year} YearProgress.org',
    aboutSite: 'کے بارے میں',
    privacyPolicy: 'رازداری کی پالیسی',
    termsOfService: 'سروس کی شرائط',
    // سائٹ کے بارے میں مواد
    aboutSiteTitle: 'YearProgress.org کے بارے میں',
    aboutSiteContent: `YearProgress.org ایک سادہ لیق ایک خوبصورت تصویری سازی کا آلہ ہے جو دکھاتا ہے کہ موجودہ سال کا کتنا حصہ پہلے ہی گزر چکا ہے۔ ہمارا مقصد لوگوں کو وقت کے گزرنے پر ایک بصیرت حاصل کرنے میں مدد کرنا ہے اور ہر دن سے بہترین استعمال کرنا ہے۔

اہم خصوصیات:
• ہر گھنٹے اپ ڈیٹ کے ساتھ حقیقی وقت پیشرفت کی نگرانی
• مکمل ہوئے دنوں کو دکھانے والی خوبصورت گرڈ تصویری سازی
• {supportedLanguagesCount} زبانوں اور متعدد تھیمز کی حمایت
• حراک پیشرفت کارڈز کے ساتھ سوشل میڈیا شیئرنگ
• صاف، توجہ کے بغیر انٹرفیس

یہ پروجیکٹ اوپن سورس ہے اور اسے ایک مفید یاد دہانی کے طور پر ڈیزائن کیا گیا ہے کہ وقت قیمتی ہے۔ چاہے آپ کامیابیوں پر غور کر رہے ہوں، مستقبل کی منصوبہ بندی کر رہے ہوں، یا صرف سال کی پیشرفت میں دلچسپی رکھتے ہوں، یہ آلہ وقت میں ہمارے کہاں کی واضح اور بصری نظریہ فراہم کرتا ہے۔

ڈیٹا معلومات:
یہ سائٹ کوئی ذاتی معلومات جمع نہیں کرتی۔ تمام ترتیبات (تھیم، زبان، وغیرہ) صرف آپ کے آلے پر محفوظ ہیں۔`,
  },
  my: {
    title: 'YearProgress.org',
    siteName: 'YearProgress.org',
    description: 'အချိန်တိုင်း နှစ်စဉ် အောင်မြင်မှု ပုံဖော်ခြင်း။ နှစ်မည်မျှ ကုန်ဆုံးပြီး မည်သည့်အချိန်ကျန်သည်ကို ကြည့်ပါ။',
    yearProgress: 'နှစ်စဉ် အောင်မြင်မှု',
    subtitle: 'အချိန်တိုင်း နှစ်စဉ် အောင်မြင်မှု ပုံဖော်ခြင်း',
    complete: 'ပြီးစီး',
    progressTitle: '{year} ခုနှစ် {percentage}% ပြီးစီးပါပြီ',
    week: 'အပတ်',
    day: 'ရက်',
    of: '၏',
    daysCompleted: 'ရက်ပြီးစီး',
    daysRemaining: 'ကျန်ရက်',
    shareInstructions: 'အလှတရား အောင်မြင်မှုကဒ်ထုတ်ရန် X (Twitter) တွင် ဤလင့်ခ်ကို မျှဝေပါ!',
    currentDate: 'လက်ရှိရက်စွဲ',
    timeWaits: 'အချိန်သည် မည်သူ့ကိုမျှစောင့်မနေဘဲ ရက်တိုင်းစွဲများကို တန်ဖိုးထားပါ!',
    shareUrl: 'URL မျှဝေပါ',
    copyLink: 'လင့်ခ်ကူးယူပါ',
    linkCopied: 'လင့်ခ်ကို clipboard တွင် ကူးယူပြီးပါပြီ!',
    past: 'အတိတ်',
    current: 'လက်ရှိ',
    future: 'အနာဂတ်',
    shareToSocialMedia: 'လူမှုမီဒီယာတွင် မျှဝေပါ',
    clickToShare: 'လူမှုမီဒီယာတွင် မျှဝေပြီး အလှတရား အောင်မြင်မှုကဒ်များကို ထုတ်ရန် အောက်ကနှိပ်ပါ!',
    orCopyLink: 'သို့မဟုတ် မျှဝေရန် လင့်ခ်ကို ကူးယူပါ',
    copy: 'ကူးယူ',
    copied: 'ကူးယူပြီးပါပြီ!',
    settings: 'ဆက်တင်များ',
    monthDayFormat: '{day} {month}',
    dayWeekInfoFormat: 'ရက် {dayNumber} • အပတ် {weekNumber}',
    bottomStatsFormat: '{daysPassed} {daysCompleted} • {daysRemaining} {daysRemainingUnit}',
    theme: 'အပြင်အဆင်',
    language: 'ဘာသာစကား',
    twitterIcon: 'တွစ်တာအိုင်ကွန်',
    close: 'ပိတ်ပါ',
    weekDays: ['တနင်္ဂနွေ', 'တနင်္လုပ်', 'အင်္ဂါ', 'ဗုဒ္ဓဟူး', 'ကြာသပတေး', 'သောကြာ', 'စနေ'],
    weekDayStatus: "ယနေ့သည် {year} ခုနှစ်၏ {weekNumber} ပတ်မြောက်၊ {dayNumber} ရက်မြောက်ဖြစ်သည်။",
    socialHashtags: ['နှစ်စဉ်အောင်မြင်မှု'],
    //မူပိုင်ခွင့်နှင့် ဥပဒေဆိုင်ရာအချက်အလက်များ
    copyright: '© {year} YearProgress.org',
    aboutSite: 'အကြောင်း',
    privacyPolicy: 'ကိုယ်ရေးကာကွယ်မှုမူဝါဒ',
    termsOfService: 'ဝန်ဆောင်မှုစည်းမျဉ်းများ',
    //ဆိုက်အကြောင်းအရာအကြောင်းအရာ
    aboutSiteTitle: 'YearProgress.org အကြောင်း',
    aboutSiteContent: `YearProgress.org သည် လက်ရှိနှစ်၏ ဘယ်မျှလောက်ကုန်ဆုံးပြီးပြီဖြစ်သည်ကို ပြသည့် ရိုးရှင်းသော်လည်း အလှတရားဖြစ်သော ပုံဖော်ခြင်းကိရိယာတစ်ခုဖြစ်သည်။ ကျွန်ုပ်တို့၏ရည်ရွယ်ချက်မှာ လူများအား အချိန်ကုန်ဆုံးမှုအပေါ် ရှု့မြင်နိုင်စေရန်နှင့် ရက်တိုင်းစွဲများကို အမြင့်ဆုံးအသုံးပြုနိုင်စေရန် ကူညီပေးရန်ဖြစ်သည်။

အဓိကလုပ်ဆောင်ချက်များ-
• နာရီတိုင်းအပ်ဒိတ်များဖြင့် အချိန်တိုင်း အောင်မြင်မှုခြေရာခံ
• ပြီးစီးသွားသောရက်များကို ပြသည့်အလှတရားဂရစ်ပုံဖော်ခြင်း
• {supportedLanguagesCount} ဘာသာစကားနှင့် အမျိုးမျိုးသောအပြင်အဆင်များကိုပံ့ပိုးခြင်း
• လှုပ်ရှားနေသောအောင်မြင်မှုကဒ်များဖြင့် လူမှုမီဒီယာမျှဝေခြင်း
• သန့်ရှင်း၊ အာရုံပြတ်စေသောအင်တာဖေ့စ်

ဤစီးပွားရေးလုပ်ငန်းသည် အိုးပင်ဆို့စ်ဖြစ်ပြီး အချိန်သည်တန်ဖိုးရှိသည်ဟု အသိပေးသည့်အသုံးဝင်တစ်ခုအဖြစ် ဒီဇိုင်းထားသည်။ သင်သည် အောင်မြင်မှုများအပေါ်တွေးနေစေကာမူ၊ အနာဂတ်အတွက်စီစဉ်နေစေကာမူ၊ သို့မဟုတ် နှစ်စဉ်အောင်မြင်မှုအပေါ်စိတ်ဝင်စားနေစေကာမူ၊ ဤကိရိယာသည် ကျွန်ုပ်တို့အချိန်တွင် မည်သည့်နေရာတွင်ရှိသည်ကို ရှင်းလင်းနှင့်မြင်ကွင်းသောအမြင်ကို ပေးသည်။

ဒေတာအချက်အလက်-
ဤဆိုက်သည် မည်သည့်ကိုယ်ရေးအချက်အလက်ကိုမျှ စုဆောင်းမည်မဟုတ်ပါ။ အားလုံးသောဆက်တင်များ (အပြင်အဆင်၊ ဘာသာစကား စသည်တို့) သည် သင့်စက်ပစ္စည်းတွင်သာ သိမ်းဆည်းထားသည်။`,
  },
  fil: {
    title: 'YearProgress.org',
    siteName: 'YearProgress.org',
    description: 'Real-time na visualisasyon ng taunang progreso. Tingnan kung gaano na ng taon ang lumipas at kung gaano pa ang oras na natitira.',
    yearProgress: 'Taunang Progreso',
    subtitle: 'Real-time na Visualisasyon ng Taunang Progreso',
    complete: 'kumpleto',
    progressTitle: '{year} ay {percentage}% kumpleto na',
    week: 'linggo',
    day: 'araw',
    of: 'ng',
    daysCompleted: 'araw nakumpleto',
    daysRemaining: 'araw na natitira',
    shareInstructions: 'Ibahagi ang link na ito sa X (Twitter) upang makabuo ng isang magandang progress card!',
    currentDate: 'Kasalukuyang Petsa',
    timeWaits: 'Ang oras ay hindi naghihintay sa sinuman, pagyamanin ang bawat araw!',
    shareUrl: 'Ibahagi ang URL',
    copyLink: 'Kopyahin ang Link',
    linkCopied: 'Na-copy na ang link sa clipboard!',
    past: 'Nakaraan',
    current: 'Kasalukuyan',
    future: 'Hinaharap',
    shareToSocialMedia: 'Ibahagi sa Social Media',
    clickToShare: 'Mag-click sa ibaba upang ibahagi sa social media at makabuo ng magagandang progress cards!',
    orCopyLink: 'O kopyahin ang link para ibahagi',
    copy: 'Kopyahin',
    copied: 'Nakopya na!',
    settings: 'Mga Setting',
    monthDayFormat: '{month} {day}',
    dayWeekInfoFormat: 'Araw {dayNumber} • Linggo {weekNumber}',
    bottomStatsFormat: '{daysPassed} {daysCompleted} • {daysRemaining} {daysRemainingUnit}',
    theme: 'Tema',
    language: 'Wika',
    twitterIcon: 'Twitter Icon',
    close: 'Isara',
    weekDays: ['Linggo', 'Lunes', 'Martes', 'Miyerkules', 'Huwebes', 'Biyernes', 'Sabado'],
    weekDayStatus: "Ngayon ay linggo {weekNumber}, araw {dayNumber} ng taong {year}.",
    socialHashtags: ['TaunangProgreso'],
    // Karapatan sa pag-aari at impormasyong legal
    copyright: '© {year} YearProgress.org',
    aboutSite: 'Tungkol',
    privacyPolicy: 'Patakaran sa Privacy',
    termsOfService: 'Mga Tuntunin ng Serbisyo',
    // Impormasyon tungkol sa site
    aboutSiteTitle: 'Tungkol sa YearProgress.org',
    aboutSiteContent: `Ang YearProgress.org ay isang simple ngunit eleganteng visualization tool na nagpapakita kung gaano na ng kasalukuyang taon ang lumipas. Ang aming layunin ay tumulong sa mga tao na makakuha ng perspective sa pagdaan ng oras at pagyamanin ang bawat araw.

Mga Pangunahing Tampok:
• Real-time progress tracking na may mga update bawat oras
• Magandang grid visualization na nagpapakita ng mga araw na nakumpleto
• Suporta para sa {supportedLanguagesCount} na wika at maraming tema
• Social media sharing na may dynamic na progress cards
• Malinis, distraction-free na interface

Ang proyektong ito ay open-source at idinisenyo bilang isang kapaki-pakinabang paalala na ang oras ay mahalaga. Maging tumitingin ka sa mga nakamit na tagumpay, nagpaplano para sa hinaharap, o simpleng namamangha sa progreso ng taon, ang tool na ito ay nagbibigay ng malinaw at visual na perspective sa ating kalagayan sa oras.

Impormasyon sa Data:
Ang site na ito ay hindi nangongolekta ng anumang personal na impormasyon. Lahat ng mga setting (tema, wika, etc.) ay naka-imbak lamang sa iyong device.`,
  },
} as const;

export type Language = keyof typeof translations;

export function getTranslation(lang: Language, key: keyof typeof translations.en): string | readonly string[] {
  // 处理旧版本的 'zh' 语言代码，自动迁移为 'zh-cn'
  let actualLang = lang;
  if (lang === ('zh' as Language)) {
    actualLang = 'zh-cn';
    // 如果在浏览器环境，更新localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', 'zh-cn');
    }
  }
  
  // 确保语言存在于translations中，否则使用英语
  if (!translations[actualLang]) {
    actualLang = 'en';
  }
  
  const result = translations[actualLang][key] || translations.en[key];
  
  // 如果是字符串，进行占位符替换
  if (typeof result === 'string') {
    return result
      .replace('{supportedLanguagesCount}', SUPPORTED_LANGUAGES_COUNT)
      .replace('{year}', new Date().getFullYear().toString());
  }
  
  return result;
}

export function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'en';
  
  // 首先检查本地存储
  const saved = localStorage.getItem('language');
  
  // 处理旧版本的 'zh' 设置，迁移为 'zh-cn'
  if (saved === 'zh') {
    const migratedLang = 'zh-cn';
    localStorage.setItem('language', migratedLang);
    return migratedLang;
  }
  
  if (saved && (Object.keys(translations) as Language[]).includes(saved as Language)) {
    return saved as Language;
  }
  
  // 如果没有保存的语言，检查浏览器语言
  const browserLang = navigator.language;
  return detectLanguage(browserLang);
}

export function saveLanguage(language: Language) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('language', language);
  }
}

export function detectLanguage(browserLang: string): Language {
  const langCode = browserLang.split('-')[0].toLowerCase();
  const fullLangCode = browserLang.toLowerCase();
  
  // 支持的语言映射
  const languageMap: Record<string, Language> = {
    'zh': 'zh-cn', // 浏览器语言代码 zh 映射到 zh-cn
    'zh-cn': 'zh-cn',
    'zh-tw': 'zh-tw',
    'zh-hk': 'zh-tw', // 香港使用繁体中文
    'zh-sg': 'zh-cn', // 新加坡使用简体中文
    'es': 'es', // 西班牙语
    'fr': 'fr', // 法语
    'de': 'de', // 德语
    'ja': 'ja', // 日语
    'ko': 'ko', // 韩语
    'pt': 'pt', // 葡萄牙语
    'ru': 'ru', // 俄语
    'ar': 'ar', // 阿拉伯语
    'hi': 'hi', // 印地语
    'it': 'it', // 意大利语
    'nl': 'nl', // 荷兰语
    'tr': 'tr', // 土耳其语
    'sv': 'sv', // 瑞典语
    'pl': 'pl', // 波兰语
    'da': 'da', // 丹麦语
    'no': 'no', // 挪威语
    'fi': 'fi', // 芬兰语
    'vi': 'vi', // 越南语
    'th': 'th', // 泰语
    'id': 'id', // 印度尼西亚语
    'sw': 'sw', // 斯瓦希里语
    'bn': 'bn', // 孟加拉语
    'ne': 'ne', // 尼泊尔语
    'ur': 'ur', // 乌尔都语
    'my': 'my', // 缅甸语
    'fil': 'fil', // 菲律宾语
  };

  // 先检查完整的语言代码（如 zh-tw, zh-cn）
  if (languageMap[fullLangCode]) {
    return languageMap[fullLangCode];
  }

  // 再检查基本语言代码（如 zh）
  return languageMap[langCode] || 'en';
}

export function getLanguageDisplayName(lang: Language): string {
  const displayNames: Record<Language, string> = {
    en: 'English',
    'zh-cn': '简体中文',
    'zh-tw': '繁體中文',
    es: 'Español',
    fr: 'Français',
    de: 'Deutsch',
    ja: '日本語',
    ko: '한국어',
    pt: 'Português',
    ru: 'Русский',
    ar: 'العربية',
    hi: 'हिंदी',
    it: 'Italiano',
    nl: 'Nederlands',
    tr: 'Türkçe',
    sv: 'Svenska',
    pl: 'Polski',
    da: 'Dansk',
    no: 'Norsk',
    fi: 'Suomi',
    vi: 'Tiếng Việt',
    th: 'ไทย',
    id: 'Bahasa Indonesia',
    sw: 'Kiswahili',
    bn: 'বাংলা',
    ne: 'नेपाली',
    ur: 'اردو',
    my: 'မြန်မာ',
    fil: 'Filipino',
  };

  return displayNames[lang];
}

// 辅助函数：格式化进度标题 (可复用于主页、OG图像和社交分享)
export const formatProgressTitle = (language: Language, year: number, percentage: number): string => {
  const template = getTranslation(language, 'progressTitle') as string;
  return template
    .replace('{year}', year.toString())
    .replace('{percentage}', percentage.toString());
};

// 辅助函数：格式化周日信息 (可复用于主页和OG图像)
export const formatWeekDayText = (language: Language, weekNumber: number, dayNumber: number, year: number): string => {
  const template = getTranslation(language, 'weekDayStatus') as string;
  return template
    .replace('{weekNumber}', weekNumber.toString())
    .replace('{dayNumber}', dayNumber.toString())
    .replace('{year}', year.toString());
};

// 辅助函数：格式化完整的页面标题
export const formatPageTitle = (language: Language): string => {
  const siteName = getTranslation(language, 'siteName') as string;
  const subtitle = getTranslation(language, 'subtitle') as string;
  return `${siteName} - ${subtitle}`;
};

// 辅助函数：格式化月日信息 (用于工具提示)
export const formatMonthDay = (language: Language, date: Date): string => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  // 使用翻译模板
  const template = getTranslation(language, 'monthDayFormat') as string;
  return template
    .replace('{month}', month.toString())
    .replace('{day}', day.toString());
};

// 辅助函数：格式化天数和周数信息 (用于工具提示)
export const formatDayWeekInfo = (language: Language, dayNumber: number, weekNumber: number): string => {
  // 使用翻译模板
  const template = getTranslation(language, 'dayWeekInfoFormat') as string;
  return template
    .replace('{dayNumber}', dayNumber.toString())
    .replace('{weekNumber}', weekNumber.toString());
};

// 辅助函数：格式化底部统计信息
export const formatBottomStats = (language: Language, daysPassed: number, totalDays: number): string => {
  const daysCompleted = getTranslation(language, 'daysCompleted') as string;
  const daysRemaining = getTranslation(language, 'daysRemaining') as string;
  
  // 使用翻译模板
  const template = getTranslation(language, 'bottomStatsFormat') as string;
  return template
    .replace('{daysPassed}', daysPassed.toString())
    .replace('{daysCompleted}', daysCompleted)
    .replace('{daysRemaining}', (totalDays - daysPassed).toString())
    .replace('{daysRemainingUnit}', daysRemaining);
};

// 辅助函数：获取 OpenGraph locale 映射
export const getOgLocale = (language: Language): string => {
  const localeMap: Record<Language, string> = {
    'en': 'en_US',
    'zh-cn': 'zh_CN',
    'zh-tw': 'zh_TW',
    'es': 'es_ES',
    'fr': 'fr_FR',
    'de': 'de_DE',
    'ja': 'ja_JP',
    'ko': 'ko_KR',
    'pt': 'pt_PT',
    'ru': 'ru_RU',
    'ar': 'ar_SA',
    'hi': 'hi_IN',
    'it': 'it_IT',
    'nl': 'nl_NL',
    'tr': 'tr_TR',
    'sv': 'sv_SE',
    'pl': 'pl_PL',
    'da': 'da_DK',
    'no': 'no_NO',
    'fi': 'fi_FI',
    'vi': 'vi_VN',
    'th': 'th_TH',
    'id': 'id_ID',
    'sw': 'sw_TZ',
    'bn': 'bn_BD',
    'ne': 'ne_NP',
    'ur': 'ur_PK',
    'my': 'my_MM',
    'fil': 'fil_PH'
  };
  
  return localeMap[language] || 'en_US';
};
