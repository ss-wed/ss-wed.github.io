Vue.component('profile-history', {
  template: `
    <span>

      <v-flex :style="style_prop_title" class="pt-5">
        <p>{{ history }}</p>
      </v-flex>

      <v-layout>
        <v-flex>
          <v-timeline>

            <v-timeline-item>
              <template v-slot:icon>
                <v-avatar>
                  <img src="../resources/timeline_shota.jpg">
                </v-avatar>
              </template>
              <v-card flat>
                <v-card-text style="text-align: right;">
                  <span class="grey--text">{{ birth_ike }}</span><br>
                  {{ birth_ike_text }}
                </v-card-text>
              </v-card>
            </v-timeline-item>

            <v-timeline-item>
              <template v-slot:icon>
                <v-avatar>
                  <img src="../resources/timeline_saya.jpg">
                </v-avatar>
              </template>
              <v-card flat>
                <v-card-text>
                  <span class="grey--text">{{ birth_saya }}</span><br>
                  {{ birth_saya_text }}
                </v-card-text>
              </v-card>
            </v-timeline-item>

            <v-timeline-item>
              <template v-slot:icon>
                <v-avatar>
                  <img src="../resources/timeline_ikesaya.jpg">
                </v-avatar>
              </template>
              <template v-slot:opposite>
                <v-card flat>
                  <v-card-text>
                    <span class="grey--text">{{ pci_saya }}</span><br>
                    {{ pci_saya_text }}
                  </v-card-text>
                </v-card>
              </template>
              <v-card flat>
                <v-card-text style="text-align: right;">
                  <span class="grey--text">{{ pci_ike }}</span><br>
                  {{ pci_ike_text }}
                </v-card-text>
              </v-card>
            </v-timeline-item>

            <v-timeline-item>
              <template v-slot:icon>
                <v-avatar>
                  <img src="../resources/timeline_ikesaya.jpg">
                </v-avatar>
              </template>
              <template v-slot:opposite>
                <v-card flat>
                  <v-card-text style="text-align: right;">
                    <span class="grey--text">{{ dated_ike }}</span><br>
                    {{ dated_ike_text }}
                  </v-card-text>
                </v-card>
              </template>
              <v-card flat>
                <v-card-text>
                  <span class="grey--text">{{ dated_saya }}</span><br>
                  {{ dated_saya_text }}
                </v-card-text>
              </v-card>
            </v-timeline-item>

            <v-timeline-item>
              <template v-slot:icon>
                <v-avatar>
                  <img src="../resources/timeline_shota.jpg">
                </v-avatar>
              </template>
              <v-card flat>
                <v-card-text style="text-align: right;">
                  <span class="grey--text">{{ propose_ike }}</span><br>
                  {{ propose_ike_text }}
                </v-card-text>
              </v-card>
            </v-timeline-item>

            <v-timeline-item>
              <template v-slot:icon>
                <v-avatar>
                  <img src="../resources/timeline_ikesaya.jpg">
                </v-avatar>
              </template>
              <template v-slot:opposite>
                <v-card flat>
                  <v-card-text style="text-align: right;">
                    <span class="grey--text">{{ married_ike }}</span><br>
                    {{ married_ike_text }}
                  </v-card-text>
                </v-card>
              </template>
              <v-card flat>
                <v-card-text>
                  <span class="grey--text">{{ married_saya }}</span><br>
                  {{ married_saya_text }}
                </v-card-text>
              </v-card>
            </v-timeline-item>

            <v-timeline-item>
              <template v-slot:icon>
                <v-avatar>
                  <img src="../resources/timeline_ikesaya.jpg">
                </v-avatar>
              </template>
              <template v-slot:opposite>
                <v-card flat>
                  <v-card-text>
                    <span class="grey--text">{{ wedding_saya }}</span><br>
                    {{ wedding_saya_text }}
                  </v-card-text>
                </v-card>
              </template>
              <v-card flat>
                <v-card-text style="text-align: right;">
                  <span class="grey--text">{{ wedding_ike }}</span><br>
                  {{ wedding_ike_text }}
                </v-card-text>
              </v-card>
            </v-timeline-item>

          </v-timeline>
        </v-flex>
      </v-layout>
    </span>
  `,
  data: function () {
    return {
      history: '― History ―',
      birth_ike: '1991.6.21',
      birth_ike_text: '大阪府大東市で生まれる',
      birth_saya: '1991.9.17',
      birth_saya_text: '愛知県名古屋市で生まれる',
      pci_ike: '2016.4.1',
      pci_ike_text: '菱川紗也子と出会う',
      pci_saya: '2016.4.1',
      pci_saya_text: '池田将汰と出会う',
      dated_ike: '2016.6.25',
      dated_ike_text: '付き合う',
      dated_saya: '2016.6.25',
      dated_saya_text: '付き合う',
      propose_ike: '2019.9.13',
      propose_ike_text: 'プロポーズ',
      married_ike: '2019.11.22',
      married_ike_text: '入籍！',
      married_saya: '2019.11.22',
      married_saya_text: '入籍！',
      wedding_ike: '2020.5.10',
      wedding_ike_text: '結婚式！',
      wedding_saya: '2020.5.10',
      wedding_saya_text: '結婚式！',
      style_prop_title: {
        fontSize: '1.5em',
        color: '#444444',
        fontFamily: ['Cinzel'],
      },
    }
  }
})