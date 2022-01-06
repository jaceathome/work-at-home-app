<template>
  <employee-base>
    <template>
      <v-row class="fill-height">
        <v-col>
          <v-sheet height="64">
            <v-toolbar
                flat
            >
              <v-btn
                  outlined
                  class="mr-4"
                  color="grey darken-2"
                  @click="setToday"
              >
                Today
              </v-btn>
              <v-btn
                  fab
                  text
                  small
                  color="grey darken-2"
                  @click="prev"
              >
                <v-icon small>
                  mdi-chevron-left
                </v-icon>
              </v-btn>
              <v-btn
                  fab
                  text
                  small
                  color="grey darken-2"
                  @click="next"
              >
                <v-icon small>
                  mdi-chevron-right
                </v-icon>
              </v-btn>
              <v-toolbar-title v-if="$refs.calendar">
                {{ $refs.calendar.title }}
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-menu
                  bottom
                  right
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                      outlined
                      color="grey darken-2"
                      v-bind="attrs"
                      v-on="on"
                  >
                    <span>{{ typeToLabel[type] }}</span>
                    <v-icon right>
                      mdi-menu-down
                    </v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item @click="type = 'day'">
                    <v-list-item-title>Day</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="type = 'week'">
                    <v-list-item-title>Week</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="type = 'month'">
                    <v-list-item-title>Month</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="type = '4day'">
                    <v-list-item-title>4 days</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-toolbar>
          </v-sheet>
          <v-sheet height="600">
            <v-calendar
                ref="calendar"
                v-model="focus"
                color="primary"
                :events="events"
                :event-color="getEventColor"
                :type="type"
                @click:event="showEvent"
                @click:more="viewDay"
                @click:date="viewDay"
                @change="updateRange"
            ></v-calendar>
            <v-menu
                v-model="selectedOpen"
                :close-on-content-click="false"
                :activator="selectedElement"
                offset-x
            >
              <v-card
                  color="grey lighten-4"
                  min-width="350px"
                  flat
              >
                <v-toolbar
                    :color="selectedEvent.color"
                    dark
                >
                  <v-btn icon>
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn icon>
                    <v-icon>mdi-heart</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </v-toolbar>
                <v-card-text>
                  <span v-html="selectedEvent.details"></span>
                </v-card-text>
                <v-card-actions>
                  <v-btn
                      text
                      color="secondary"
                      @click="selectedOpen = false"
                  >
                    Cancel
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-menu>
          </v-sheet>
        </v-col>
      </v-row>
    </template>
  </employee-base>
</template>

<script>
import EmployeeBase from "@/components/EmployeeBase";
import {mapActions, mapGetters} from "vuex";
import {requiredRules} from "@/tools/rules";
import moment from "moment";
import db from "@/database";
import {alertConfirmWarning, alertError, alertSuccessWithAuto, alertWarning} from "@/tools/swal";
import firestore__ from "@/database/firestore";

export default {
  name: "EmployeeTask",
  components: {EmployeeBase},
  data: () => ({
    focus: '',
    type: 'month',
    typeToLabel: {
      month: 'Month',
      week: 'Week',
      day: 'Day',
      '4day': '4 Days',
    },
    allTasks: [],
    myTasks: [],
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    saveRange: {},
    events: [],
    colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
    names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
  }),
  created() {
    this.setTasks()
  },
  computed: mapGetters({user: 'getUser'}),
  methods: {
    setTasks() {
      firestore__.collection('tasks')
      .onSnapshot(snapshot => {
        this.allTasks = snapshot.docs.map(doc => ({...doc.data(),id : doc.id}));
        console.log(this.allTasks)
        this.setMyTasks();
      })
    },
    setMyTasks(){
      firestore__.collection('tasks_users')
      .where('assign_to','==',this.user.id)
      .onSnapshot(snapshot => {
        const tasks = snapshot.docs.map(doc => doc.data())
        this.myTasks = this.allTasks.filter(task => tasks.some(myTask => task.id === myTask.task_id))
        console.log(tasks,this.myTasks)
        this.updateRange(this.saveRange)
      })
    },
    viewDay({date}) {
      this.focus = date
      this.type = 'day'
    },
    uploadFiles(){
      
    },
    getEventColor(event) {
      return event.color
    },
    setToday() {
      this.focus = ''
    },
    prev() {
      this.$refs.calendar.prev()
    },
    next() {
      this.$refs.calendar.next()
    },
    showEvent({nativeEvent, event}) {
      let routeData = this.$router.resolve({name: 'task-view', params: {id: event.task.id}});
      window.open(routeData.href, '_blank');
    },
    updateRange({start, end}) {
      console.log("updated")
      Object.assign(this.saveRange, {start, end})
      const events = [];
      const min = new Date(`${start.date}T00:00:00`);
      const max = new Date(`${end.date}T23:59:59`);
      const days = (max.getTime() - min.getTime()) / 86400000;
      const eventCount = this.myTasks.length //length of tasks;
      for (let i = 0; i < eventCount; i++) {
        const task = this.myTasks[i];
        events.push({
          name: task.title,
          start: `${task.from} 00:00`,
          end: `${task.to} ${task.end}`,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          task,
          // timed: true,
        });
      }
      this.events = events;
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },
  },
}
</script>

<style scoped>

</style>