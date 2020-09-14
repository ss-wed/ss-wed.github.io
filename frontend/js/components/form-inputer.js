Vue.component('form-inputer', {
  template: `
    <span :style=style_overall_font>
      <v-form ref="form" v-model="valid" lazy-validation>

        <v-layout justify-center v-for="(msg, i) in topmessage" :key="i">
          <v-flex xs12>
            <span :style="style_top_message">
              {{ msg }}
            </span>
          </v-flex>
        </v-layout>

        <v-layout justify-center class="mt-3">
          <v-flex xs5>
            <v-btn flat block @click="attend = true" class="title" color="#444444">
              <div v-if="attend == null">
                <span :style="style_font_elegant">ご{{ label_attend }}</span>
              </div>
              <div v-else-if="attend" style="color: teal;">
                <span :style="style_elegant_underline">ご</span><span :style="style_font_elegant">{{ label_attend }}</span>
              </div>
              <div v-else>
                <span :style="style_elegant_underline">ご{{ label_attend }}</span>
              </div>
            </v-btn>
          </v-flex>
          <v-flex xs5>
            <v-btn flat block @click="attend = false" class="title" color="#444444">
              <div v-if="attend == null">
                <span :style="style_font_elegant">ご{{ label_absent }}</span>
              </div>
              <div v-else-if="attend">
                <span :style="style_elegant_underline">ご{{ label_absent }}</span>
              </div>
              <div v-else style="color: teal;">
                <span :style="style_elegant_underline">ご</span><span :style="style_font_elegant">{{ label_absent }}</span>
              </div>
            </v-btn>
          </v-flex>
        </v-layout>

        <v-layout>
          <v-flex xs6>
            <v-text-field label="姓" v-model="name_sei" :rules="[rules.required]"></v-text-field>
          </v-flex>
          <v-flex xs6>
            <v-text-field label="名" v-model="name_mei" :rules="[rules.required]"></v-text-field>
          </v-flex>
        </v-layout>

        <v-layout>
          <v-flex xs6>
            <v-text-field label="せい" v-model="name_kana_sei" :rules="[rules.required]"></v-text-field>
          </v-flex>
          <v-flex xs6>
            <v-text-field label="めい" v-model="name_kana_mei" :rules="[rules.required]"></v-text-field>
          </v-flex>
        </v-layout>

        <v-layout>
          <v-flex xs6>
            <v-text-field v-model="postcode" counter maxlength="7"  label="郵便番号" placeholder="1234567"
              :rules="[rules.postcode]" @change="on_input_postcode" type="number" :rules="[rules.required]">
            </v-text-field>
          </v-flex>
        </v-layout>

        <v-layout>
          <v-flex xs12>
            <v-text-field label="住所" v-model="address" :rules="[rules.required]"></v-text-field>
          </v-flex>
        </v-layout>

        <v-layout>
          <v-flex xs6>
            <v-text-field label="建物名" v-model="building" :rules="[rules.required]"></v-text-field>
          </v-flex>
        </v-layout>

        <v-layout>
          <v-flex xs12>
            <v-text-field label="メールアドレス" v-model="mail" :rules="[rules.required, rules.email]"></v-text-field>
          </v-flex>
        </v-layout>

        <v-layout>
          <v-flex xs6>
            <v-text-field label="電話番号" placeholder="09012345678" v-model="phone_number" type="number"></v-text-field>
          </v-flex>
        </v-layout>

        <v-layout>
          <v-flex xs12>
            <v-text-field label="嫌いな食べもの（アレルギー）" placeholder="卵、えび" v-model="dislike"></v-text-field>
          </v-flex>
        </v-layout>

        <v-layout>
          <v-flex xs12>
            <v-textarea v-model="message" label="メッセージ" rows="2"></v-textarea>
          </v-flex>
        </v-layout>

        <span v-for="n in n_ture">
          <v-card flat>
            <v-container>
              <p style="color: rgb(117,117,117)">お連れ様{{ n }}人目</p>
              <v-layout>
                <v-flex xs6>
                  <v-text-field label="姓" v-model="ture_sei[n-1]" :rules="[rules.required]"></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-text-field label="名" v-model="ture_mei[n-1]" :rules="[rules.required]"></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout>
                <v-flex xs6>
                  <v-text-field label="せい" v-model="ture_kana_sei[n-1]" :rules="[rules.required]"></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-text-field label="めい" v-model="ture_kana_mei[n-1]" :rules="[rules.required]"></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout>
                <v-flex xs12>
                  <v-text-field label="嫌いな食べもの（アレルギー）" placeholder="卵、えび" v-model="ture_dislike[n-1]"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </span>

        <v-layout　align-center justify-center>
          <v-btn outline @click="n_ture++" :disabled="n_ture >= 5">お連れ様追加</v-btn>
          <v-btn outline @click="n_ture--" :disabled="n_ture <= 0">お連れ様削除</v-btn>
        </v-layout>

        <v-layout　align-center justify-center>
          <v-flex xs10>
            <v-btn block outline @click="open_dialog" class="mt-4">登録</v-btn>
          </v-flex>
        </v-layout>

      </v-form>

      <v-dialog v-model="dialog">
        <v-card flat>
          <v-container>
            <v-layout align-center justify-center>
              <span class="mb-3" :style="style_dialog">登録します<br>（登録完了メールが送信されます）</span>
            </v-layout>
            <v-layout　align-center justify-space-around>
              <v-flex xs5><v-btn block outline @click="on_register" :style="style_font_elegant">登録</v-btn></v-flex>
              <v-flex xs5><v-btn block outline @click="dialog = false" :style="style_font_elegant">キャンセル</v-btn></v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialog2" persistent :no-click-animation="true">
        <v-card>
          <v-container>
            <v-layout>
              <v-progress-linear :indeterminate="true" color="teal"></v-progress-linear>
            </v-layout>
          </v-container>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialog3">
        <v-card flat>
          <v-container>
            <v-layout　align-center justify-center>
              <span class="mb-3" :style="style_font_elegant">{{ dilog3_message }}</span>
            </v-layout>
            <v-layout　align-center justify-center>
              <v-btn outline @click="dialog3 = false" :style="style_font_elegant">OK</v-btn>
            </v-layout>
          </v-container>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialog_attend_check">
        <v-card flat>
          <v-container>
            <v-layout　align-center justify-center>
              <div :style="style_font_elegant">「ご出席」・「ご欠席」を選択してください</div>
            </v-layout>
          </v-container>
        </v-card>
      </v-dialog>

    </span>
  `,
  data: function () {
    return {
      valid: true,
      topmessage: ['誠に勝手ながら', '１０月１４日までにご登録くださいますよう', 'お願いいたします。'],
      attend: null,
      label_attend: '出席',
      label_absent: '欠席',
      name_sei: '',
      name_mei: '',
      name_kana_sei: '',
      name_kana_mei: '',
      postcode: '',
      address: '',
      building: '',
      mail: '',
      phone_number: '',
      dislike: '',
      message: '',
      n_ture: 0,
      ture_sei: new Array(5),
      ture_mei: new Array(5),
      ture_kana_sei: new Array(5),
      ture_kana_mei: new Array(5),
      ture_dislike: new Array(5),
      rules: {
        required: value => !!value || '必須',
        postcode: value => {
          const pattern = /^([0-9]{7})?$/
          return pattern.test(value) || '不正な郵便番号'
        },
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || '不正なメールアドレス'
        }
      },
      style_overall_font: {
        fontFamily: ['Noto Serif JP'],
      },
      dialog: false,
      dialog2: false,
      dialog3: false,
      dialog_attend_check: false,
      dilog3_message: '',
      style_font_elegant: {
        fontFamily: ['Noto Serif JP']
      },
      style_elegant_underline: {
        fontFamily: ['Noto Serif JP'],
        textDecoration: 'line-through'
      },
      style_top_message: {
        fontFamily: ['Noto Serif JP'],
        color: "#444444",
        whitespace: 'pre-wrap',
        wordwrap: 'break-word'
      },
      style_dialog: {
        fontFamily: ['Noto Serif JP'],
        textAlign: 'center'
      },
      checkbox: false
    }
  },
  methods: {
    on_input_postcode: function () {
      let vm = this

      axios
        .get('https://api.zipaddress.net', {params: {zipcode: vm.postcode}})
        .then(response => {
          vm.address = response.data.data['fullAddress']
        })
        .catch(error => {
          console.log(error)
        })
    },
    open_dialog: function () {
      // フォームバリデーション
      if (!this.$refs.form.validate()) {
        return
      }

      // 出欠確認
      if (this.attend == null) {
        this.dialog_attend_check = true
        return
      }

      this.dialog = true
    },
    on_register: function () {
      let vm = this

      let companion_list = new Array(vm.n_ture)
      for (let i = 0; i < vm.n_ture; i++) {
        if (vm.ture_dislike[i] == undefined) {
          vm.ture_dislike[i] = ''
        }

        companion_list[i] = {
          name: `${vm.ture_sei[i]} ${vm.ture_mei[i]}`,
          name_kana: `${vm.ture_kana_sei[i]} ${vm.ture_kana_mei[i]}`,
          allergy: `${vm.ture_dislike[i]}`
        }
      }

      vm.dialog = false
      vm.dialog2 = true

      axios
        .post('https://us-central1-wedding-system-244912.cloudfunctions.net/register ', {
          attendance: vm.attend,
          name: `${vm.name_sei} ${vm.name_mei}`,
          name_kana: `${vm.name_kana_sei} ${vm.name_kana_mei}`,
          postcode: vm.postcode,
          address: vm.address,
          building: vm.building,
          mail_address: vm.mail,
          phone_number: vm.phone_number,
          allergy: vm.dislike,
          message: vm.message,
          companion_list: companion_list
        })
        .then(response => {
          if (response.data['result']) {
            vm.dilog3_message = '登録しました'
          }
          else {
            vm.dilog3_message = '登録に失敗しました'
          }

          vm.dialog2 = false
          vm.dialog3 = true
        })
        .catch(error => {
          console.log(error)
        })

      this.dialog = false
    }
  }
})