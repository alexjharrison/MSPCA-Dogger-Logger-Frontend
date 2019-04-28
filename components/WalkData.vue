<template>
  <div>
    <h2 class="mb-3">Walks Info</h2>
    <div class="d-flex justify-content-center flex-wrap">
      <div @mouseleave="clear">
        <h3>Jumps</h3>
        <apexchart :width="width" type="area" :options="jumps.options" :series="jumps.series"/>
        <div class="p-box">
          <p>{{jumpsComment}}</p>
        </div>
      </div>
      <div @mouseleave="clear">
        <h3 class="text-center">Waste</h3>
        <apexchart :width="width" type="bubble" :options="waste.options" :series="waste.series"/>
        <div class="p-box">
          <p>{{wasteComment}}</p>
        </div>
      </div>
      <div @mouseleave="clear">
        <h3>Mouthings</h3>
        <apexchart
          :width="width"
          type="area"
          :options="mouthings.options"
          :series="mouthings.series"
        />
        <div class="p-box">
          <p>{{mouthingsComment}}</p>
        </div>
      </div>
      <div @mouseleave="clear">
        <h3>Other Dog Reactions</h3>
        <apexchart
          :width="width"
          type="line"
          :options="reactions.options"
          :series="reactions.series"
        />
        <div class="p-box">
          <p>{{reactionsComment}}</p>
        </div>
      </div>
    </div>
    <div>
      <h3>Medical Concerns</h3>
      <b-table small striped :items="medicalConcerns"/>
    </div>
    <div class="mt-4">
      <h3>Walk Comments</h3>
      <b-table small striped :items="otherConcerns"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: ['dog'],
  data() {
    return {
      wasteComment: '',
      jumpsComment: '',
      mouthingsComment: '',
      reactionsComment: ''
    }
  },
  methods: {
    convertDate(date) {
      const convertedDate = new Date(date)
      return (
        convertedDate.toLocaleDateString() +
        ' ' +
        convertedDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        })
      )
    },
    walkerName(walkerId) {
      return this.$store.state.users.filter(user => user.id === walkerId)[0]
        .name
    },
    getConcerns(concern) {
      return this.dog.walks
        .map(walk => ({
          walk: this.convertDate(walk.created_at),
          walker: this.walkerName(walk.user_id),
          concerns: walk[concern]
        }))
        .filter(walk => walk.concerns !== '')
    },
    clear() {
      this.wasteComment = ''
      this.jumpsComment = ''
      this.mouthingsComment = ''
      this.reactionsComment = ''
    },
    generateWaste(excrement) {
      if (!excrement) {
        return this.dog.walks
          .filter(walk => !walk.pooped && !walk.peed)
          .map(walk => [new Date(walk.created_at), 1, 0.3])
      }
      return this.dog.walks
        .filter(walk => walk[excrement])
        .map(walk => [
          new Date(walk.created_at),
          1,
          excrement === 'peed' ? 0.3 : 0.5
        ])
    }
  },
  computed: {
    medicalConcerns() {
      return this.getConcerns('medical_concern')
    },
    otherConcerns() {
      return this.getConcerns('other_concerns')
    },
    waste() {
      return {
        options: {
          dataLabels: {
            enabled: false
          },
          xaxis: {
            // tickAmount: 12,
            type: 'datetime'
          },
          yaxis: {
            min: 0,
            max: 2
          },
          tooltip: {
            x: {
              format: 'MM/dd/yy hh:mm TT'
            },
            y: {
              formatter: function(
                value,
                { series, seriesIndex, dataPointIndex, w }
              ) {
                return value
              }
            }
          },
          colors: ['#e1e114', '#7b5804', '#bbbbbb'],
          fill: {
            colors: ['#e1e114', '#7b5804', '#bbbbbb']
          }
        },
        series: [
          {
            name: 'Pee',
            data: this.generateWaste('peed')
          },
          {
            name: 'Poop',
            data: this.generateWaste('pooped')
          },
          {
            name: 'Neither',
            data: this.generateWaste()
          }
        ]
      }
    },
    mouthings() {
      return {
        options: {
          chart: {
            id: 'mouthings-chart'
          },
          markers: {
            size: 4,
            hover: {
              size: 7
            }
          },
          xaxis: {
            type: 'datetime',
            categories: this.dog.walks.map(walk => walk.created_at)
          },
          yaxis: {
            min: 0
          },
          stroke: {
            width: 4,
            curve: 'smooth'
          },
          tooltip: {
            x: {
              format: 'MM/dd/yy hh:mm TT'
            },
            y: {
              formatter: (value, { dataPointIndex, w }) => {
                const index = this.dog.walks.length - dataPointIndex - 1
                const comment = this.dog.walks[index].mouthings_handlage
                this.mouthingsComment = comment ? 'Comment: ' + comment : ''
                return value
              }
            }
          }
        },
        series: [
          {
            name: 'Mouthings',
            data: this.dog.walks.map(walk => walk.mouthings)
          }
        ]
      }
    },
    jumps() {
      return {
        options: {
          chart: {
            id: 'jumps-chart'
          },
          xaxis: {
            type: 'datetime',
            categories: this.dog.walks.map(walk => walk.created_at)
          },
          yaxis: {
            min: 0
          },
          markers: {
            size: 4,
            hover: {
              size: 7
            }
          },
          stroke: {
            width: 4,
            curve: 'smooth'
          },
          tooltip: {
            x: {
              format: 'MM/dd/yy hh:mm TT'
            },
            y: {
              formatter: (value, { dataPointIndex, w }) => {
                const index = this.dog.walks.length - dataPointIndex - 1
                const comment = this.dog.walks[index].jump_handlage
                this.jumpsComment = comment ? 'Comment: ' + comment : ''
                return value
              }
            }
          }
        },
        series: [
          {
            name: 'Jumps',
            data: this.dog.walks.map(walk => walk.jumps)
          }
        ]
      }
    },
    reactions() {
      return {
        options: {
          chart: {
            id: 'reactions-chart'
          },
          xaxis: {
            type: 'datetime',
            categories: this.dog.walks.map(walk => walk.created_at)
          },
          yaxis: {
            min: 0
          },
          markers: {
            size: 4,
            hover: {
              size: 7
            }
          },
          stroke: {
            width: 6,
            curve: 'smooth'
          },
          tooltip: {
            x: {
              format: 'MM/dd/yy hh:mm TT'
            },
            y: {
              formatter: (value, { dataPointIndex, w }) => {
                const index = this.dog.walks.length - dataPointIndex - 1
                const comment = this.dog.walks[index].seen_dog_reaction
                this.reactionsComment = comment ? 'Comment: ' + comment : ''
                return value
              }
            }
          }
        },
        series: [
          {
            name: 'Dogs Seen',
            data: this.dog.walks.map(walk => walk.dogs_seen)
          },
          {
            name: 'Dogs Reacted To',
            data: this.dog.walks.map(walk => walk.dogs_seen_reacted)
          }
        ]
      }
    },
    width() {
      const mq = this.$mq
      return mq === 'xs'
        ? window.innerWidth - 100
        : mq === 'sm'
          ? 419
          : mq === 'md'
            ? 600
            : mq === 'lg'
              ? 440
              : 570
    }
  }
}
</script>

<style scoped>
h2,
h3 {
  text-align: center;
}
table {
  max-width: 1000px;
  margin: 0 auto;
}
.p-box {
  text-align: center;
  max-width: 350px;
  margin: 0 auto;
}
</style>
<style>
.apexcharts-tooltip-text-value {
  font-weight: normal;
}
</style>

