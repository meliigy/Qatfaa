// كل نصوص الموقع وبياناته في هذا الملف. غيّر الاسم أو المنتجات من هنا فقط.
import cup from './assets/stills/cup.webp';
import swirl from './assets/stills/swirl.webp';
import cherries from './assets/stills/cherries.webp';
import hand from './assets/stills/hand.webp';
import wash from './assets/stills/wash.webp';
import belt from './assets/stills/belt.webp';
import taster from './assets/stills/taster.webp';
import roast from './assets/stills/roast.webp';
import bag from './assets/stills/bag.webp';

export const brand = {
  name: 'قَطفة',
  tagline: 'بن من الشجرة إلى الفنجان',
  intro: 'نختار المحصول، نحمّصه كل أسبوع، ونرسله إليك طازجًا.',
};

// الفيلم: ٥٩٨ إطارًا. كل فصل يحدد الإطارات التي يظهر فيها نصه.
export const FRAME_COUNT = 598;
export const HERO_FROM = 556; // من هنا يظهر الكيس ويبدأ الموقع

export const chapters = [
  { from: 1, to: 36, title: 'كل فنجان وراءه رحلة', text: 'مرّر للأسفل وعُد معنا إلى أول الحكاية.', stop: false },
  { from: 40, to: 72, title: 'الشجرة', text: 'تحتاج شجرة البن من ثلاث إلى أربع سنوات قبل أن تحمل أول ثمارها.', stop: true },
  { from: 73, to: 138, title: 'القطف', text: 'تُقطف الكرزات الناضجة باليد، واحدة واحدة.', stop: true },
  { from: 139, to: 205, title: 'الجمع', text: 'تُجمع الكرزات الحمراء في أجولة وتنتقل سريعًا إلى محطة المعالجة.', stop: true },
  { from: 206, to: 276, title: 'الغسيل', text: 'في الماء تُفرز الثمار: الناضج يغوص والمعيب يطفو.', stop: true },
  { from: 277, to: 316, title: 'التجفيف', text: 'تُفرد الحبوب وتُقلَّب حتى تنخفض رطوبتها إلى نحو ١١٪.', stop: true },
  { from: 317, to: 408, title: 'التقشير', text: 'تُنزع القشرة الجافة فتظهر الحبة الخضراء.', stop: true },
  { from: 409, to: 494, title: 'التذوق', text: 'تُحمَّص عينة من كل محصول وتُقيَّم قبل اعتماده.', stop: true },
  { from: 495, to: 550, title: 'التحميص', text: 'في المحمصة تتحول الحبة الخضراء إلى بنية وتظهر نكهتها.', stop: true },
];

export const mosaic = [
  { src: cherries, alt: 'كرزات بن حمراء على الغصن' },
  { src: hand, alt: 'يد تقطف كرزة بن' },
  { src: wash, alt: 'كرزات البن تسقط في حوض الغسيل' },
  { src: taster, alt: 'مختصة تذوق تسجل درجات المحصول' },
  { src: swirl, alt: 'فنجان قهوة من أعلى' },
];

export const products = [
  { id: 'medium', name: 'حبوب تحميص وسط', note: 'شوكولاتة بالحليب وفواكه مجففة', weight: '٢٥٠ جم', price: 320, img: bag },
  { id: 'turkish', name: 'بن تركي مطحون', note: 'طحن ناعم للكنكة، سادة أو محوّج', weight: '٢٠٠ جم', price: 240, img: cup },
  { id: 'dark', name: 'تحميص غامق للإسبريسو', note: 'قوام ثقيل وكريما كثيفة', weight: '٢٥٠ جم', price: 340, img: roast },
  { id: 'green', name: 'حبوب خضراء', note: 'للتحميص في البيت', weight: '٥٠٠ جم', price: 280, img: belt },
];

export const timeline = [
  { when: 'القرن ٩', where: 'إثيوبيا', text: 'تقول الرواية إن راعيًا اسمه كالدي لاحظ نشاط ماعزه بعد أن أكلت ثمارًا حمراء من شجيرة برية.' },
  { when: 'القرن ١٥', where: 'اليمن', text: 'المتصوفة يشربون القهوة ليسهروا في الذكر، وميناء المخا يصير بوابة تجارتها إلى العالم.' },
  { when: 'القرن ١٦', where: 'القاهرة وإسطنبول', text: 'تصل القهوة إلى القاهرة مع طلاب اليمن في الأزهر، ثم تُفتح مقاهي إسطنبول في خمسينيات القرن.' },
  { when: '١٦٥٠', where: 'أوروبا', text: 'يُفتح أول مقهى في إنجلترا بمدينة أكسفورد، وبعده بعامين في لندن.' },
  { when: '١٧٢٧', where: 'البرازيل', text: 'تبدأ زراعة البن في البرازيل، التي تصير لاحقًا أكبر منتج له في العالم.' },
  { when: '١٩٠١', where: 'ميلانو', text: 'لويجي بيتزيرا يسجل براءة آلة تحضّر القهوة بالضغط في ثوانٍ: الإسبريسو.' },
  { when: 'السبعينيات', where: 'القهوة المختصة', text: 'يظهر مصطلح القهوة المختصة، ويبدأ السؤال عن المزرعة والمحصول وطريقة المعالجة.' },
];

export const methods = [
  { name: 'التركي', grind: 'ناعم جدًا', time: '٣ دقائق', how: 'يُسخَّن في الكنكة على نار هادئة ولا يُصفّى.' },
  { name: 'الإسبريسو', grind: 'ناعم', time: '٢٥–٣٠ ثانية', how: 'ماء ساخن يمر في البن بضغط ٩ بار.' },
  { name: 'التقطير', grind: 'متوسط', time: '٣ دقائق', how: 'صبّ يدوي بطيء على فلتر ورقي.' },
  { name: 'المكبس الفرنسي', grind: 'خشن', time: '٤ دقائق', how: 'نقع كامل ثم كبس المصفاة.' },
];
