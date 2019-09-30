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
        '皆様いかがお過ごしでしょうか',
        '',
        'このたび　結婚式を執り行うこととなりました',
        '',
        '日頃お世話になっております皆様に',
        '私どもの門出をお見守りいただきたく',
        'ささやかながら小宴を催したく存じます',
        '',
        'ご多用中　誠に恐縮ではございますが',
        'ぜひご出席いただきたく　ご案内申し上げます'
      ],
      style_message: {
        color: '#444444',
        fontFamily: ['Noto Serif JP'],
      }
    }
  }
})