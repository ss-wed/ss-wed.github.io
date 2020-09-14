Vue.component('top-message', {
  template: `
    <div>
      <v-container style="text-align: center;">
        <span v-for="line in text" class="top-message" :style="style_message">{{ line }}<br></span>
      </v-container>
    </div>
  `,
  data: function () {
    return {
      text: [
        '謹啓　新秋の候　皆様にはますますご清祥のこと',
        'お慶び申し上げます',
        '',
        '過日　延期のご案内をしておりましたが',
        '会場での衛生管理を徹底したうえで',
        '令和2年11月15日に　私たちの結婚披露宴を',
        '執り行うこととなりました',
        '',
        '私たちの新しい人生の出発を迎えるにあたり',
        'たいせつな皆様に見守られ',
        '貴重なひとときを過ごせることに　深く感謝いたします',
        '',
        'ご多用中　誠に恐縮ではございますが',
        'ぜひご出席賜りますように　ご案内申し上げます',
        '敬白',
        '',
        '令和2年9月吉日',
        '池田将汰　菱川紗也子',
      ],
      style_message: {
        color: '#444444',
        fontFamily: ['Noto Serif JP'],
      }
    }
  }
})