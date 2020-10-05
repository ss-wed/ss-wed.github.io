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
                  <img src="../resources/timeline_ikesaya.jpg">
                </v-avatar>
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
              <v-card flat>
                <v-card-text>
                  <span class="grey--text">{{ dated_ike }}</span><br>
                  {{ dated_ike_text }}
                </v-card-text>
              </v-card>
            </v-timeline-item>

            <v-timeline-item>
              <template v-slot:icon>
                <v-avatar>
                  <img src="../resources/timeline_ikesaya.jpg">
                </v-avatar>
              </template>
              <v-card flat>
                <v-card-text style="text-align: right;">
                  <span class="grey--text">{{ decide_ike }}</span><br>
                  {{ decide_ike_text }}
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
                    <span class="grey--text">{{ propose_ike }}</span><br>
                    {{ propose_ike_text }}
                  </v-card-text>
                </v-card>
              </template>
              <v-card flat>
                <v-card-text>
                  <span class="grey--text">{{ propose_saya }}</span><br>
                  {{ propose_saya_text }}
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
                    <span class="grey--text">{{ married_ike }}</span><br>
                    {{ married_ike_text }}
                  </v-card-text>
                </v-card>
              </template>
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
                    <span class="grey--text">{{ wedding_ike }}</span><br>
                    {{ wedding_ike_text }}
                  </v-card-text>
                </v-card>
              </template>
              <v-card flat>
                <v-card-text>
                  <span class="grey--text">{{ wedding_saya }}</span><br>
                  {{ wedding_saya_text }}
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
      pci_ike: '2016.3.7',
      pci_ike_text: 'We first met',
      dated_ike: '2016.6.25',
      dated_ike_text: 'We fall in love',
      decide_ike: '2019.2.12',
      decide_ike_text: 'We decide to get married',
      propose_ike: '2019.9.13',
      propose_ike_text: 'He said again \'Will you marry me?\'',
      propose_saya: '2019.9.13',
      propose_saya_text: 'She said \'Yes\'',
      married_ike: '2019.11.22',
      married_ike_text: 'We became the same name',
      wedding_ike: '2020.11.15',
      wedding_ike_text: 'We said \'I do!!\'',
      wedding_saya: '2020.11.15',
      wedding_saya_text: 'We said \'I do!!\'',
      style_prop_title: {
        fontSize: '1.5em',
        color: '#444444',
        fontFamily: ['Cinzel'],
      },
    }
  }
})