Vue.component('announce-message', {
  template: `
    <div>
      <v-container style="text-align: center;">
        <v-layout justify-center v-for="(msg, i) in topmessage" :key="i">
          <v-flex xs12>
            <span :style="style_font_elegant">
              {{ msg }}
            </span>
          </v-flex>
        </v-layout>
      </v-container>
      <v-container style="text-align: left;">
        <v-layout justify-center v-for="(msg, i) in text" :key="i">
          <v-flex xs12>
            <span :style="style_message">
              {{ msg }}<br>
            </span>
          </v-flex>
        </v-layout>
        <span :style="style_message">式場での対策については別途ご案内させて頂いております<br>
        お手数ですが<a href="https://glastonia.net/wordpress/wp-content/uploads/2020/07/Press-Release-20200716.pdf" :style="style_message">こちら</a>をダウンロードしてご覧ください</span><br>
        <span :style="style_message">(※<a href="https://www.youtube.com/watch?v=9QqizmCLsJQ" :style="style_message" target=_blank”>こちら</a>から実際の様子を動画でもご覧いただけます)</span>
        <br>
        <br>
        <v-layout justify-center v-for="(msg, i) in text2" :key="i">
          <v-flex xs12>
            <span :style="style_message">
              {{ msg }}<br>
            </span>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  `,
  data: function () {
    return {
      topmessage: [
        'ご招待させていただいている皆様へ',
      ],
      text: [
        '新型コロナウイルスの感染拡大が懸念されるなか',
        '結婚式のご参加に関しましても　ご心配をおかけしていることと存じます',
        '',
        '両家で話し合い　会場での衛生管理を出来る限り徹底したうえで',
        '予定通り結婚式を行うことにいたしました',
        '会場での感染防止対策といたしましては',
        '',
        '１. 消毒液の設置（受付・披露宴会場・化粧室など）',
        '２. 会場内の定期的な消毒・換気',
        '３. 会場スタッフのマスク着用',
        '４. 会場入り口での参加者全員への検温',
        '５. ソーシャルディスタンスを保った座席の配置や演出',
        '',
        'など行ってまいります',
      ],
      text2: [
        '私たちは皆様の安心安全が第一と考えておりますので',
        '無理のない範囲でご出席いただけると幸いです',
        '',
        '今後の感染状況次第では やむを得ず',
        '規模縮小・延期・中止させていただく可能性もございますが',
        'その際は　新郎新婦より速やかにご連絡いたします',
        '',
        'ご心配な点やご不安がありましたらお気軽にご連絡ください',
        '皆様におかれましても　体調を崩されませんようにご自愛くださいませ',
        '',
        '将汰　紗也子',
      ],
      style_message: {
        color: '#444444',
        fontFamily: ['Noto Serif JP'],
        textAlign: "left"
      },
      style_font_elegant: {
        borderBottom: "solid 1px black",
        fontFamily: ['Noto Serif JP'],
        fontSize: '15px'
      },
    }
  }
})