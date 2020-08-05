Vue.component('top-message', {
  template: `
    <div>
      <v-container style="text-align: center;">
        <span v-for="line in text" class="top-message" :style="style_message">{{ line }}<br></span>
        <v-layout justify-center :style="style_info">
          <a href="/frontend/templates/form.html" :style="style_message">ご出欠の登録はこちらから</a>
        </v-layout>
        <br>
        <span class="top-message" :style="style_message">詳しい感染症対策やご案内につきましては<br>
        <a href="/frontend/templates/announce.html" :style="style_message">こちら</a>をご参照ください。</span>

      </v-container>
    </div>
  `,
  data: function () {
    return {
      text: [
        '皆様いかがお過ごしでしょうか',
        '',
        '過日　延期のご案内をしておりましたが',
        '会場での衛生管理を徹底したうえで',
        '令和2年11月15日に私たちの結婚披露宴を',
        '執り行うこととなりました',
        '',
        '私たちの新しい人生の出発を迎えるにあたり',
        'たいせつな皆様に見守られ',
        '貴重なひとときを過ごせることに　深く感謝いたします',
        '',
        'ご多用中　誠に恐縮ではございますが',
        'ぜひご出席賜りますように　ご案内申し上げます',
      ],
      style_message: {
        color: '#444444',
        fontFamily: ['Noto Serif JP'],
      }
    }
  }
})