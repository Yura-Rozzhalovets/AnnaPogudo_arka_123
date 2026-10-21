export const mapUrl = 'https://maps.google.com/?q=%D0%9C%D1%81%D1%82%D0%B8%D1%81%D0%BB%D0%B0%D0%B2%D1%86%D0%B0+10+%D0%9C%D0%B8%D0%BD%D1%81%D0%BA'

export const media = {
  exterior: 'images/arka-entrance.png',
  hall: 'images/hall-ceiling.png',
  room: 'images/arched-windows.png',
  communication: 'images/space-gathering.png',
  gathering: 'images/space-gathering.png',
}

export const roomLayouts = [
  {
    id: 'empty',
    label: 'Пустой зал',
    text: 'Свободная площадь: так зал выглядит до расстановки.',
    image: 'images/room-layout-empty.jpg',
    video: 'videos/room-layout-empty.mp4',
    alt: 'Пустой зал АРКА 123 с арочными окнами',
  },
  {
    id: 'masterclass',
    label: 'Мастер-класс или семинар',
    text: 'Экран и ряды стульев для групповых обсуждений: так зал выглядит после расстановки',
    image: 'images/room-layout-masterclass.jpg',
    video: 'videos/room-layout-masterclass-seminar.mp4',
    alt: 'Зал АРКА 123 в расстановке для мастер-класса и семинара',
  },
]

export const mainNav = [
  { href: '#about', label: 'О пространстве', footer: true },
  { href: '#space', label: 'Помещение', footer: true },
  { href: '#services', label: 'Форматы' },
  { href: '#prices', label: 'Тарифы', footer: true },
]

export const heroStats = [
  { value: '123 м²', label: 'пространства' },
  { value: '4 × 3,5 м', label: 'арочные окна' },
  { value: 'Минск', label: 'ул. Мстиславца, 10' },
]

export const services = [
  { number: '01', title: 'Мастер-класс', text: 'Пространство для обучения, творчества и практики в небольшой группе.' },
  { number: '02', title: 'Семинар', text: 'Встреча с экспертами, презентация или обсуждение за общим столом.' },
  { number: '03', title: 'Встреча команды', text: 'Отдельное место, чтобы собраться вместе, спланировать и обменяться идеями.' },
  { number: '04', title: 'Сценарий под вас', text: 'Предложите свой формат — обсудим рассадку и требования к мероприятию.', dark: true },
]

export const gallery = [
  { src: media.exterior, alt: 'Вход в АРКА 123 на Мстиславца, 10', index: '01 / ЛОКАЦИЯ', title: 'Вход в АРКА 123', wide: true },
  { src: media.hall, alt: 'Основной зал АРКА 123 с высокими потолками', index: '02 / ИНТЕРЬЕР', title: '123 м² для идей' },
  { src: media.room, alt: 'Арочные окна и естественный свет в АРКА 123', index: '03 / СВЕТ', title: 'Окна 4 × 3,5 м' },
]

export const reviews = [
  {
    name: 'Марина',
    role: 'Мастер-класс',
    photo: 'images/review-marina.png',
    text: 'Свет из арочных окон и свободная рассадка помогли спокойно провести занятие для небольшой группы.',
  },
  {
    name: 'Алина',
    role: 'Встреча команды',
    photo: 'images/review-alina.png',
    text: 'Отдельный зал напротив Библиотеки оказался удобным местом, чтобы собраться и спокойно обсудить планы.',
  },
  {
    name: 'Павел',
    role: 'Семинар',
    photo: 'images/review-pavel.jpg',
    text: 'Общий стол и экран легко настроили под разговор: гости быстро ориентировались и не терялись в пространстве.',
  },
  {
    name: 'Игорь',
    role: 'Мастер-класс',
    photo: 'images/review-igor.png',
    text: 'Зал легко найти, а пустая площадь до рассадки дала свободу собрать сценарий под свою группу.',
  },
]

export const prices = [
  { label: 'КОРОТКАЯ ВСТРЕЧА', title: 'Почасовая', amount: 'от 70', unit: 'BYN / час', text: 'Для консультации, репетиции или небольшой встречи.' },
  { label: 'ПОПУЛЯРНЫЙ ФОРМАТ', title: 'Полдня', amount: 'от 280', unit: 'BYN / 4 часа', text: 'Для мастер-класса, обучения или семинара.', featured: true },
  { label: 'ДЕНЬ СОБЫТИЯ', title: 'Полный день', amount: 'от 520', unit: 'BYN / день', text: 'Для насыщенной программы и нескольких сессий.' },
]

export const storyPlaybackRate = 1.5

export const storyScenes = [
  { out: 0.34, eyebrow: 'Ваш хост', title: 'Здравствуйте. Я Анна.', body: 'Помогу представить пространство, где встречаются люди и рождаются идеи.' },
  { out: 0.67, eyebrow: 'Пространство', title: 'Выберите свой формат.', body: 'Мастер-класс, семинар или встреча за общим столом — пространство можно адаптировать под задачу.' },
  { out: 1, eyebrow: 'Фирменный герой', title: 'Встречаемся напротив Библиотеки.', body: 'АРКА 123 — место, которое легко найти и приятно запомнить.' },
]
