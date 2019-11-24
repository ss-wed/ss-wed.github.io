Vue.component('profile-interview', {
  template: `
    <span>

      <v-flex :style="style_prop_title" class="pt-5">
        <p>{{ interview }}</p>
      </v-flex>

      <v-layout justify-center>

        <v-flex xs12>
          <v-img class="white--text" src="../resources/profile_interview.jpg" height="600">

          <v-card flat style="opacity: 0.7" class="mt-1">
            <v-card-title :style="style_q">
              {{ label_q1 }}
            </v-card-title>
            <v-card-text>
              <span :style="style_a_ike">{{ q1_ike }}</span>
              <br>
              <span :style="style_a_saya">{{ q1_saya }}</span>
            </v-card-text>
          </v-card>

          <v-card flat style="opacity: 0.7" class="mt-1">
            <v-card-title :style="style_q">
              {{ label_q2 }}
            </v-card-title>
            <v-card-text>
              <span :style="style_a_ike">{{ q2_ike }}</span>
              <br>
              <span :style="style_a_saya">{{ q2_saya }}</span>
            </v-card-text>
          </v-card>

          <v-card flat style="opacity: 0.7" class="mt-1">
            <v-card-title :style="style_q">
              {{ label_q3 }}
            </v-card-title>
            <v-card-text>
              <span :style="style_a_ike">{{ q3_ike }}</span>
              <br>
              <span :style="style_a_saya">{{ q3_saya }}</span>
            </v-card-text>
          </v-card>

          <v-card flat style="opacity: 0.7" class="mt-1">
            <v-card-title :style="style_q">
              {{ label_q4 }}
            </v-card-title>
            <v-card-text>
              <span :style="style_a_ike">{{ q4_ike }}</span>
              <br>
              <span :style="style_a_saya">{{ q4_saya }}</span>
            </v-card-text>
          </v-card>

          <v-card flat style="opacity: 0.7" class="mt-1">
            <v-card-title :style="style_q">
              {{ label_q5 }}
            </v-card-title>
            <v-card-text>
              <span :style="style_a_ike">{{ q5_ike }}</span>
              <br>
              <span :style="style_a_saya">{{ q5_saya }}</span>
            </v-card-text>
          </v-card>

          </v-img>
        </v-flex>

      </v-layout>

    </span>
  `,
  data: function () {
    return {
      interview: '― Interview ―',
      label_q1: 'お互いの第一印象は？',
      q1_ike: 'ちっこい',
      q1_saya: '優しそう',
      label_q2: '相手の好きなところは？',
      q2_ike: '一緒にいて楽しいところ',
      q2_saya: '一緒にいて楽しいところ',
      label_q3: '相手に直してほしいところは？',
      q3_ike: '休日12時間の惰眠をむさぼるところ',
      q3_saya: '引きこもり',
      label_q4: '一番思い出に残っているデートは？',
      q4_ike: '12月の極寒キャンプ',
      q4_saya: '誕生日のクルージングデート',
      label_q5: 'どんな家庭を築きたい？',
      q5_ike: '笑顔のたえない家庭',
      q5_saya: '普通の家庭',
      style_prop_title: {
        fontSize: '1.5em',
        color: '#444444',
        fontFamily: ['Cinzel'],
      },
      style_q: {
        paddingBottom: 0
      },
      style_a_ike: {
        color: 'teal'
      },
      style_a_saya: {
        color: 'deeppink'
      }
    }
  }
})