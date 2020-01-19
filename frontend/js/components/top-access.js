Vue.component('top-access', {
  template: `
  <v-container>

    <p :style="style_access">
      ― Party Info ―
    </p>

    <v-layout>
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3262.2583675266214!2d136.92217831524425!3d35.15017668032148!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60037098d2e37de3%3A0x9386b101768dd69f!2zV2VkZGluZyBvZiBMZWdlbmQgR0xBU1RPTklB77yI44Kw44Op44K544OI44OL44Ki77yJ!5e0!3m2!1sja!2sjp!4v1566017388364!5m2!1sja!2sjp" :width="get_width" :height="get_height" frameborder="0" style="border:0" allowfullscreen></iframe>
    </v-layout>

    <v-layout justify-center :style="style_info" class="mt-5">
      <v-flex xs2 md4 style="text-align: end">
        日時
      </v-flex>
      <v-flex xs1></v-flex>
      <v-flex xs10 md6>
        <p>5月10日（日曜日）</p>
        <p>挙式 午後2時30分</p>
        <p>披露宴 午後3時30分</p>
      </v-flex>
    </v-layout>

    <v-layout justify-center :style="style_info">
      <v-flex xs2 md4 style="text-align: end">
        場所
      </v-flex>
      <v-flex xs1></v-flex>
      <v-flex xs10 md6>
        <p>Wedding of Legend GLASTONIA</p>
        <p>〒466-0064</p>
        <p>愛知県名古屋市昭和区鶴舞4丁目16-1606</p>
        <p>TEL 052-732-3777</p>
      </v-flex>
    </v-layout>

    <v-layout justify-center class="mt-4" v-if="is_pc" style="text-align: center">
      <p :style="style_info">
        追伸　ご多用中恐縮に存じますが挙式にもご列席賜りたく<br>
        当日午後2時15分までにお越しくださいますようお願い申し上げます
      </p>
    </v-layout>

    <v-layout justify-center class="mt-4" v-else style="text-align: center">
      <p :style="style_info">
        追伸　ご多用中恐縮に存じますが<br>
        挙式にもご列席賜りたく<br>
        当日午後2時15分までにお越しくださいますよう<br>
        お願い申し上げます
      </p>
    </v-layout>

    <v-layout justify-center :style="style_info">
      <a href="/frontend/templates/form.html">登録フォーム</a>
    </v-layout>

  </v-container>
  `,
  data: function () {
    return {
      style_access: {
        fontSize: '1.5em',
        color: '#444444',
        fontFamily: ['Cinzel'],
      },
      style_info: {
        color: '#444444',
        fontFamily: ['Noto Serif JP'],
      }
    }
  },
  computed: {
    get_height: function () {
      return window.innerWidth * (5/8)
    },
    get_width: function () {
      return window.innerWidth
    },
    is_pc: function () {
      let result = false
      if (window.innerWidth > 760) {
        result = true
      }

      return result
    }
  }
})