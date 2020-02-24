Vue.component('profile-basic', {
  template: `
    <span>
      <v-flex :style="style_prop_title">
        <p>{{ profile_title }}</p>
      </v-flex>

      <v-layout wrap justify-space-between>

        <v-flex xs12 sm5>
          <v-img class="white--text" src="../resources/profile_shota.jpg" aspect-ratio="1"
            :style="style_prof_img" gradient="to top right, rgba(0,0,0,0.5), rgba(0,0,0,0.5)">
            <table :style="style_prof_table">
              <caption :style=style_prof_name>{{ name_ike }}</caption>
              <tr></tr>
              <tr>
                <td :style=style_prof_label>{{ label_birth }}</td>
                <td :style=style_prof_data>{{ birth_ike }}</td>
              </tr>
              <tr>
                <td :style=style_prof_label>{{ label_from }}</td>
                <td :style=style_prof_data>{{ from_ike }}</td>
              </tr>
              <tr>
                <td :style=style_prof_label>{{ label_blood }}</td>
                <td :style=style_prof_data>{{ blood_ike }}</td>
              </tr>
              <tr>
                <td :style=style_prof_label>{{ label_job }}</td>
                <td :style=style_prof_data>{{ job_ike }}</td>
              </tr>
              <tr>
                <td :style=style_prof_label>{{ label_hobby }}</td>
                <td :style=style_prof_data>{{ hobby_ike }}</td>
              </tr>
              <tr>
                <td :style=style_prof_label>{{ label_hobby }}</td>
                <td :style=style_prof_data>{{ hobby2_ike }}</td>
              </tr>
              <tr>
                <td :style=style_prof_label>{{ label_color }}</td>
                <td :style=style_prof_data>{{ color_ike }}<span style="color: teal;">■</span></td>
              </tr>
            </table>
          </v-img>
        </v-flex>

        <v-flex xs12 sm2 :style="style_prop_and">
          <p :style="style_prop_andp">and</p>
        </v-flex>

        <v-flex xs12 sm5>
          <v-img class="white--text" src="../resources/profile_saya.jpg" aspect-ratio="1"
          :style="style_prof_img" gradient="to top right, rgba(0,0,0,0.5), rgba(0,0,0,0.5)">
            <table :style="style_prof_table">
              <caption :style=style_prof_name>{{ name_saya }}</caption>
              <tr></tr>
              <tr>
                <td :style=style_prof_label>{{ label_birth }}</td>
                <td :style=style_prof_data>{{ birth_saya }}</td>
              </tr>
              <tr>
                <td :style=style_prof_label>{{ label_from }}</td>
                <td :style=style_prof_data>{{ from_saya }}</td>
              </tr>
              <tr>
                <td :style=style_prof_label>{{ label_blood }}</td>
                <td :style=style_prof_data>{{ blood_saya }}</td>
              </tr>
              <tr>
                <td :style=style_prof_label>{{ label_job }}</td>
                <td :style=style_prof_data>{{ job_saya }}</td>
              </tr>
              <tr>
                <td :style=style_prof_label>{{ label_hobby }}</td>
                <td :style=style_prof_data>{{ hobby_saya }}</td>
              </tr>
              <tr>
                <td :style=style_prof_label>{{ label_hobby }}</td>
                <td :style=style_prof_data>{{ hobby2_saya }}</td>
              </tr>
              <tr>
                <td :style=style_prof_label>{{ label_color }}</td>
                <td :style=style_prof_data>{{ color_saya }}<span style="color: lightpink;">■</span></td>
              </tr>
            </table>
          </v-img>
        </v-flex>

      </v-layout>

    </span>
  `,
  data: function () {
    return {
      table_height: 0,
      profile_title: '― Profile ―',
      label_name: 'Name',
      name_ike: '池田 将汰',
      name_saya: '菱川 紗也子',
      label_birth: 'Birth',
      birth_ike: '1991.6.21',
      birth_saya: '1991.9.17',
      label_from: 'From',
      from_ike: '大阪府四條畷市',
      from_saya: '愛知県名古屋市',
      label_blood: 'Blood Type',
      blood_ike: 'O型',
      blood_saya: 'A型',
      label_job: 'Job',
      job_ike: 'データサイエンティスト',
      job_saya: '　　システムエンジニア',
      label_hobby: 'Hobby',
      hobby_ike: 'プログラミング',
      hobby2_ike: 'ゲーム',
      hobby_saya: 'ショッピング',
      hobby2_saya: 'ハムスターをめでる',
      label_color: 'Favorite Color',
      color_ike: 'グリーン',
      color_saya: 'ピンク',
      style_prop_title: {
        fontSize: '1.5em',
        color: '#444444',
        fontFamily: ['Cinzel'],
      },
      style_prof_name: {
        fontSize: '1.5em',
        textAlign: 'center',
        fontFamily: ['Noto Serif JP'],
      },
      style_prof_label: {
        fontSize: '14px',
        textAlign: 'left',
        color: '#bbbbbb',
        fontFamily: ['Cinzel'],
      },
      style_prof_data: {
        fontSize: '14px',
        textAlign: 'right',
        fontFamily: ['Noto Serif JP'],
      },
      style_prof_table: {
        margin: [0, 'auto'],
      },
      style_prof_img: {
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
      },
      style_prop_and: {
        display: 'flex',
        alignItems: 'center',
        maxWidth: '100px',
        margin: [0, 'auto'],
        height: '5em'
      },
      style_prop_andp: {
        fontSize: '1.25em',
        fontFamily: ['Cinzel'],
        width: '100%',
        textAlign: 'center',
        margin: [0, 'auto'],
      },
    }
  }
})