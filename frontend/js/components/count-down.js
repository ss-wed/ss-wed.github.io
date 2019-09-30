Vue.component('count-down', {
  template: `
    <div>
      <v-container text-xs-center>
        <v-parallax src="./frontend/resources/image3.jpg" :height="get_height">
          <v-layout align-center justify-center column fill-height>
            <span class="countdown">Countdown</span>
            <span class="countdown-theday">{{ the_date_string }}</span>
            <br>
            <table class="countdown-table">
              <tr>
                <td class="countdown-digit">{{ data.diff_day }}</td>
                <td class="countdown-digit">{{ data.diff_hour }}</td>
                <td class="countdown-digit">{{ data.diff_minute }}</td>
                <td class="countdown-digit">{{ data.diff_second }}</td>
              </tr>
              <tr>
                <td class="countdown-label">Days</td>
                <td class="countdown-label">Hours</td>
                <td class="countdown-label">Minutes</td>
                <td class="countdown-label">Seconds</td>
              </tr>
            </table>
          </v-layout>
        </v-parallax>
      </v-container>
    </div>
  `,
  data: function () {
    return {
      data: {
        the_date: new Date('2020/5/10'),
        diff_day: null,
        diff_hour: null,
        diff_minute: null,
        diff_second: null,
      }
    }
  },
  computed: {
    the_date_string: function () {
      return this.data.the_date.getFullYear() + '.' + (this.data.the_date.getMonth()+1) + '.' + this.data.the_date.getDate()
    },
    get_height: function () {
      let height = 0
      if (window.innerWidth <= 760) {
        height = 300
      }
      else {
        height = 500
      }
      return height
    }
  },
  created: function () {
    var vm = this
    window.setInterval(function () {
      var now = new Date()
      var diff = vm.data.the_date - now
      var tmp = 0

      tmp = diff / 86400000
      vm.data.diff_day = Math.floor(tmp)

      tmp = (diff / 3600000) - (vm.data.diff_day * 24)
      vm.data.diff_hour = Math.floor(tmp)

      tmp = (diff / 60000) - (vm.data.diff_day * 24 * 60) - (vm.data.diff_hour * 60)
      vm.data.diff_minute = Math.floor(tmp)

      tmp = (diff / 1000) - (vm.data.diff_day * 24 * 60 * 60) - (vm.data.diff_hour * 60 * 60) - (vm.data.diff_minute * 60)
      vm.data.diff_second = Math.floor(tmp)

      if (diff <= 0) {
        vm.data.diff_day = 0
        vm.data.diff_hour = 0
        vm.data.diff_minute = 0
        vm.data.diff_second = 0
      }
    }, 1000)
  }
})
