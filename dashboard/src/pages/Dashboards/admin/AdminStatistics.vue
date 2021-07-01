<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-size-100 md-small-size-100">
        <md-card>
          <md-card-content>
            <slot name="content">
              <div class="md-layout"><!--
                <md-field class="md-layout-item md-small-size-20 md-size-20">
                  <label>Период</label>
                  <md-select v-model="statisticSettings.timeStampSelected" disabled>
                    <md-option v-for="timeStamp in statisticSettings.timeStamps" :key="timeStamp.id" :value="timeStamp.id">{{timeStamp.userInfo}}</md-option>
                  </md-select>
                </md-field>-->
                <md-field class="md-layout-item md-small-size-50 md-size-25">
                  <label>Тип статистики</label>
                  <md-select v-model="statisticSettings.typeSet">
                    <md-option v-for="type in statisticSettings.types" :key="type.variant" :value="type.variant">{{type.variant}}</md-option>
                  </md-select>
                </md-field>
                
                <md-field class="md-layout-item md-small-size-50 md-size-25">
                  <label>Филиал</label>
                  <md-select v-model="statisticSettings.filialSet">
                    <md-option v-for="filial in statisticSettings.filials" :key="filial.id" :value="filial.id">{{filial.name}}</md-option>
                  </md-select>
                </md-field>
                <div class="md-layout-item md-small-size-50 md-size-25 ">
                  <md-button class="md-success" @click="getDataStatistics()">
                    Рассчитать
                  </md-button>
                </div>
                <a  class="md-layout-item md-size-25 "
                    href="https://docs.google.com/document/d/1lGQaKkPrFQvtPukxsa6erYitBf5CimkcmrU0OMYUPEU/edit?usp=sharing" target="_blank" >
                  Инструкция по статистике
                </a>
                <!--<div class="md-layout-item md-small-size-10 md-size-10 ">
                  <md-button class="md-danger" @click="miningOpen(item)">
                    Отчёт
                  </md-button>
                </div>-->
              </div>
              <ve-histogram v-if="statisticsData != null" :data="statisticsData" :settings="chartSettings"></ve-histogram>
            </slot>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name: "admin-statistics",
  components: {
  },
  data () {
    return {
      chartSettings:{
      },
      statisticsData: null,
      statisticSettings: {
        filialSet: null,
        filials: [],
        timeStamps: [],
        timeStampSelected: null,
        typeSet: 'Пробные занятия',
        variantStatusSet: 'Не пройдено',
        types: [
          {
            variant: 'Пробные занятия',
            variantStatus: [
              'Не пройдено',
              'Думают',
              'Записались',
              'Не записались'
            ]
          },
          {
            variant: 'Посещаемость',
            variantStatus: [
              'Не пройдено',
              'Пройдено',
              'Пропущено'
            ]
          },
          {
            variant: 'Ученики',
            variantStatus: [
              'Не пройдено',
              'Пройдено',
              'Пропущено'
            ]
          }
        ]
      },
      showTrialTypes: [
        {
          name: 'Показать все',
          data: 'All'
        },
        {
          name: 'Удачные',
          data: 'Success'
        },
        {
          name: 'Неудачные',
          data: 'Failure'
        }
      ],
      showTrials: 'All'
    }
  },
  computed: {
    ...mapGetters(['allFilials', 'allCourses', 'allTimeTables', 'allTeachers', 'allParents'/*, 'mathTeacher'*/, 'allAdmins'])
  },
  methods: {
    ...mapActions(['getStatisticsChilds', 'getStatisticsSchedules', 'getStatisticsTrials']),
    // 
    mathDate(date) {
      let month = [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь'
      ]
      let localDate = new Date(date)
      localDate.setMonth(localDate.getMonth() - 6)
      for(let i = 0; i < 7; i++){
        let timeStamp = {
          id: 0,
          userInfo: null,
          timeStart: null,
          timeFinish: null
        }
        timeStamp.id = i
        timeStamp.userInfo = `${month[localDate.getMonth()]} ${localDate.getFullYear()}`
        let timeStartMonth = localDate.toLocaleString('RU', {month: 'numeric'}) < 10 ? `0${localDate.toLocaleString('RU', {month: 'numeric'})}` : `${localDate.toLocaleString('RU', {month: 'numeric'})}` 
        timeStamp.timeStart = `${localDate.getFullYear()}-${timeStartMonth}-01`
        
        let finishDayDate = new Date(localDate.getFullYear(), localDate.getMonth() + 1, 0)
        let timeFinishMonth = finishDayDate.toLocaleString('RU', {month: 'numeric'}) < 10 ? `0${finishDayDate.toLocaleString('RU', {month: 'numeric'})}` : `${finishDayDate.toLocaleString('RU', {month: 'numeric'})}` 
        let timeFinishDay = finishDayDate.toLocaleString('RU', {day: 'numeric'}) < 10 ? `0${finishDayDate.toLocaleString('RU', {day: 'numeric'})}` : `${finishDayDate.toLocaleString('RU', {day: 'numeric'})}`
        timeStamp.timeFinish = `${finishDayDate.toLocaleString('RU', {year: 'numeric'})}-${timeFinishMonth}-${timeFinishDay}`

        this.statisticSettings.timeStamps.push(timeStamp)
        localDate.setMonth(localDate.getMonth() + 1)
        this.statisticSettings.timeStampSelected = i
      }
    },
    async getDataStatistics() {
      this.statisticsData = {
        columns: ['date'],
        rows: []
      }
      let timeStampsCount = 0
      await this.statisticSettings.timeStamps.forEach(async (timeStamp, index) => {
        let statistic = {
          FilialId: this.statisticSettings.filialSet,
          timestart: timeStamp.timeStart,
          timefinish: timeStamp.timeFinish,
          status: this.statisticSettings.variantStatusSet
        }
        //console.log(statistic)
        if(this.statisticSettings.typeSet == 'Пробные занятия') {
          await this.getStatisticsTrials(statistic)
          .then(res => {
            timeStampsCount++
            //console.log(res.data)
            let row = {
              'date': `${timeStamp.userInfo}`,
              'id': index
            }
            this.statisticsData.rows.push(row)
            res.data.forEach(teacher => {
              if(this.statisticsData.columns.filter(key => key == `${teacher.name} ${teacher.middlename}`).length == 0)
              {
                this.statisticsData.columns.push(`${teacher.name} ${teacher.middlename}`)
              }
              this.statisticsData.rows[this.statisticsData.rows.length-1][`${teacher.name} ${teacher.middlename}`] = teacher.Trials.length
            })
            if (timeStampsCount == this.statisticSettings.timeStamps.length)
            {
              this.statisticsData.rows = this.statisticsData.rows.sort((a,b) => a.id-b.id)
              //console.log('sort!')
              //console.log(this.statisticsData.rows)
            }
          })
          .catch(err => {
            //console.log(err)
          })
        } else if (this.statisticSettings.typeSet == 'Посещаемость') {
          await this.getStatisticsSchedules(statistic)
          .then(res => {
            timeStampsCount++
            let row = {
              'date': `${timeStamp.userInfo}`,
              'id': index
            }
            this.statisticsData.rows.push(row)
            //console.log(res.data)
            res.data.forEach(teacher => {
              if(this.statisticsData.columns.filter(key => key == `${teacher.name} ${teacher.middlename}`).length == 0)
              {
                this.statisticsData.columns.push(`${teacher.name} ${teacher.middlename}`)
              }
              this.statisticsData.rows[this.statisticsData.rows.length-1][`${teacher.name} ${teacher.middlename}`] = teacher.Schedules.length
            })
            if (timeStampsCount == this.statisticSettings.timeStamps.length)
            {
              this.statisticsData.rows = this.statisticsData.rows.sort((a,b) => a.id-b.id)
              //console.log('sort!')
              //console.log(this.statisticsData.rows)
            }
          })
          .catch(err => {
            //console.log(err)
          })
        } else if (this.statisticSettings.typeSet == 'Ученики') {
          await this.getStatisticsChilds(statistic)
          .then(res => {
            timeStampsCount++
            let row = {
              'date': `${timeStamp.userInfo}`,
              'id': index
            }
            if(this.statisticsData.columns.filter(key => key == `Учеников`).length == 0)
            {
              this.statisticsData.columns.push(`Учеников`)
            }
            this.statisticsData.rows.push(row)
            //console.log(res.data)
            this.statisticsData.rows[this.statisticsData.rows.length-1][`Учеников`] = 0
            res.data.forEach(child => {
              if (child.Childschedules.length > 0 && child.ChildTables.filter(table => table.TimeTable != null).length > 0)
              {
                this.statisticsData.rows[this.statisticsData.rows.length-1][`Учеников`]++
              }
            })
            if (timeStampsCount == this.statisticSettings.timeStamps.length)
            {
              this.statisticsData.rows = this.statisticsData.rows.sort((a,b) => a.id-b.id)
              //console.log('sort!')
              //console.log(this.statisticsData.rows)
            }
          })
          .catch(err => {
            //console.log(err.response.data)
          })
        }
      })
      //console.log(this.statisticsData.rows)
    }
  },
  async mounted() {
    /*this.mathDate(new Date())
    console.log(this.allFilials)
    this.statisticSettings.filialSet = this.allFilials[0].id
    this.allFilials.forEach(filial => {
      this.statisticSettings.filials.push({id: filial.id, name: filial.name})
    })
    console.log(this.statisticSettings)*/
  }
}
</script>

<style scoped>
.md-card .md-card-actions div {
  display: inline-flex !important;
}
</style>