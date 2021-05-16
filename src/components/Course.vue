<template>
  <div>
    <h1 class="white--text">Страница выбранного курса</h1>
    <v-container class="ml-0 mr-0" >
      <v-layout row wrap >
        <v-flex xs2 >
          <v-div flat>
            <v-timeline align-top dense>
              <v-timeline-item
                small
                light
                color="primary"
                v-for="item in block"
                :key="item"
              >
                <v-row class="pt-1">
                  <v-btn class="md" depressed color="primary">
                    {{ item.name }}
                  </v-btn>
                </v-row>
                <v-div v-if="item.childrens.length != 0">
                  <v-row
                    v-for="children in item.childrens"
                    class="ml-5 mt-5"
                    :key="children"
                  >
                    <v-btn depressed color="primary" @click="html = children.html">
                      {{ children.name }}
                    </v-btn>
                  </v-row>
                </v-div>
              </v-timeline-item>
            </v-timeline>
          </v-div>
        </v-flex>
        <v-flex xs1></v-flex>
        <v-flex xs9>
          <v-card >
            <v-span background-color="#c9c9c9" class="px-0" v-html="html">6</v-span>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-row>
      <v-spacer></v-spacer>
        <v-btn depressed color="primary"> Далее</v-btn>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    html: ``,
    block: [
      {
        name: "text",
        childrens: [
          {
            id: 1,
            name: "children",
            html:`<p color="primary">children</p>`,
          },
        ],
      },
      {
        name: "text1",
        childrens: [
          {
            id: 1,
            name: "children11",
            html:`<p>children11</p>`,
          },
        ],
      },
    ],
  }),
};
</script>

<style lang="scss" scoped></style>
