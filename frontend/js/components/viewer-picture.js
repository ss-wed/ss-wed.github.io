Vue.use(VueLazyload, {
  attempt: 1 // ロード失敗した時のリトライの上限指定
});

Vue.component('viewer-picture', {
  template: `
    <span>

      <transition name="fade">
        <v-dialog v-model="loading" hide-overlay persistent width="300">
          <v-card color="teal" dark>
            <v-card-text style="font-family: Cinzel">
              loading...
              <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
            </v-card-text>
          </v-card>
        </v-dialog>
      </transition>

      <v-container>
        <v-layout wrap>

          <v-flex xs4 md2 v-for="i in iamge_length" :key="i" style="height: 100px;">
            <a>
              <img v-lazy="images[i-1]" style="width:100%; height:100%; object-fit:cover; padding:1px;" @click="on_img_select"></img>
            </a>
          </v-flex>

        </v-layout>
      </v-container>

      <transition name="fade">
        <div :style="style_overlay" v-if="showing" @click="on_img_unselect">
          <img :src="showing_img" :style="style_image" ref="img" id="img"></img>
          <v-btn icon @click="on_img_unselect" :style="style_xbtn">
            <v-icon :style="style_icon">close</v-icon>
          </v-btn>
        </div>
      </transition>

    </span>
  `,
  data: function () {
    return {
      loading: true,
      images: [],
      iamge_length: 0,
      showing: false,
      showing_img: '',
      current_y: '',
      style_overlay: {
        position: 'fixed',
        top: 0,
        zIndex: 100,
        width: '100%',
        height:'100%',
        verticalAlign:'middle',
        background: 'rgba(0,0,0,0.6)',
      },
      style_image: {
        all: 'inherit',
        objectFit: 'contain',
        padding: "5%",
      },
      style_xbtn: {
        zIndex: 110,
        color: 'white',
        top: (window.innerHeight - 50) + "px",
        left: (window.innerWidth - 50) + "px",
      },
      style_icon: {
        background: 'lightgray',
        color: 'black',
        borderRadius: '15px',
      }
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

        response.data['result_list'].reverse().forEach((imgname, i) => {
          axios
            .post('https://asia-east2-wedding-system-244912.cloudfunctions.net/get_picture', {img_name: imgname})
            .then(response => {
              vm.images[i] = "data:image/jpg;base64," + response.data['image']
              vm.images.splice()

              this.loading = false
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
      this.current_y = document.documentElement.scrollTop
      document.body.style.position = 'fixed'
      document.body.style.top = (-1 * this.current_y) + 'px'

      this.showing_img = e.target.currentSrc
      this.showing = true
    },
    on_img_unselect: function (e) {
      this.showing = false
      document.body.style.position = ''
      document.documentElement.scrollTop = this.current_y
    }
  }
})