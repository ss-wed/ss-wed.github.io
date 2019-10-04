Vue.use(VueLazyload, {
  attempt: 1 // ロード失敗した時のリトライの上限指定
});

Vue.component('viewer-picture', {
  template: `
    <v-layout wrap>
      <v-flex xs4 md2 v-for="i in iamge_length" :key="i" style="height: 100px;">
        <a>
          <img v-lazy="images[i-1]" style="width:100%; height:100%; object-fit:cover; padding:1px;" @click="on_img_select"></img>
        </a>
      </v-flex>

    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-img :src=showing_img></v-img>
      </v-card>
    </v-dialog>

    </v-layout>
  `,
  data: function () {
    return {
      images: [],
      iamge_length: 0,
      loaded_index: 0,
      dialog: false,
      showing_img: '',
    }
  },
  mounted() {
    let vm = this

    // 画像名一覧を取得後、一枚ずつ画像取得
    axios
      .post('https://asia-east2-wedding-system-244912.cloudfunctions.net/get_all_picture_names')
      .then(response => {
        vm.iamge_length = response.data['result_list'].length
        vm.images = Array(vm.iamge_length)
        vm.images.fill('')

        response.data['result_list'].forEach(imgname => {
          axios
            .post('https://asia-east2-wedding-system-244912.cloudfunctions.net/get_picture', {img_name: imgname})
            .then(response => {
              vm.images[vm.loaded_index] = "data:image/jpg;base64," + response.data['image']
              vm.images.splice()
              vm.loaded_index++
            })
            .catch(error => {
              console.log(error)
            })
        })

      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    get_image_src: function (idx) {
      let src = "data:image/jpg;base64," + this.images[idx]
      return src
    },
    on_img_select: function (e) {
      this.dialog = true
      this.showing_img = e.target.currentSrc
    }
  }
})