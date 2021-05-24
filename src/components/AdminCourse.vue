<template>
  <div>
    <v-row no-gutters class="ml-15 mt-5">
      <v-btn depressed color="green" @click="addElement, (dialogBlock = true)"
        >Добавить блок</v-btn
      >
    </v-row>
    <v-dialog max-width="600" v-model="dialogBlock">
      <v-card>
        <v-card-title class="headline">
          Заполните данные для добавления ответа
        </v-card-title>
        <v-card-text>
          <v-text-field
            filled
            dense
            clearable
            label="Блок"
            v-model="blockModel.name"
          ></v-text-field>
          <v-row>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              @click="
                blockModel.childrens.push(Object.assign({}, childrenModel))
              "
              >Добавить раздел</v-btn
            >
          </v-row>
          <v-col
            class="sm-2"
            v-for="children in blockModel.childrens"
            :key="children"
          >
            <v-text-field
              filled
              dense
              clearable
              label="Раздел"
              v-model="children.name"
            >
            </v-text-field>
          </v-col>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary darken-1" text @click="dialogBlock = false">
            Отмена
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="(dialogBlock = false), block.push(blockModel)"
          >
            Добавить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-container class="ml-0 mr-0" style="max-width:1350px">
      <v-layout row wrap>
        <v-flex xs2>
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
                    <v-icon
                      class="pl-1"
                      @click="(dialogBlock = true), (blockModel = item)"
                      >mdi-pencil</v-icon
                    >
                    <v-icon class="pl-1">mdi-delete</v-icon>
                  </v-btn>
                </v-row>
                <v-div v-if="item.childrens.length != 0">
                  <v-row
                    v-for="children in item.childrens"
                    class="ml-5 mt-5"
                    :key="children"
                  >
                    <v-btn
                      depressed
                      color="primary"
                      @click="
                        (content = children.html), (htmlChildren = children)
                      "
                    >
                      {{ children.name
                      }}<v-icon
                        class="pl-1"
                        @click="(dialogBlock = true), (blockModel = children)"
                        >mdi-pencil</v-icon
                      ><v-icon class="pl-1" @click="dialogDelete=true"
                        >mdi-delete</v-icon
                      >
                    </v-btn>
                  </v-row>
                </v-div>
              </v-timeline-item>
            </v-timeline>
          </v-div>
        </v-flex>
        <v-flex xs2></v-flex>
        <v-flex xs8 style="padding-left:65px">
          <quill-editor
            :content="content"
            :options="editorOption"
            @change="onEditorChange($event)"
          />
        </v-flex>
      </v-layout>
    </v-container>
    <v-row no-gutters>
      <v-spacer></v-spacer>
      <v-btn
        v-if="htmlChildren.html != content"
        class="mr-5"
        color="success"
        @click="saveChanges"
        >Сохранить изменения</v-btn
      >
    </v-row>
    <v-dialog v-model="dialogDelete" max-width="600px">
      <v-card>
        <v-card-title>Вы уверены что хотите удалить запись?</v-card-title>
        <v-card-actions>
          <v-row no-gutters>
            <v-spacer></v-spacer>
            <v-btn color="primary">Отмена</v-btn>
            <v-btn color="green">Да</v-btn>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import store from "../store";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";
export default {
  components: {
    quillEditor,
  },
  data: () => ({
    dialogDelete: false,

    dialogBlock: false,
    content: "",
    editorOption: {
      // Some Quill options...
    },
    htmlChildren: "",
    block: null,
    blockModel: { name: "", childrens: [] },
    childrenModel: {
      id: 0,
      name: "",
      html: "",
    },
  }),
  methods: {
    onEditorChange({ html }) {
      this.content = html;
    },
    initialize() {
      this.block = store.getters.getBlock;
    },
    saveChanges() {
      let children = this.htmlChildren;
      this.block.find((element) =>
        element.childrens.find((f) => {
          if (f == children) {
            f.html = this.content;
            return;
          }
        })
      );
    },
    addElement() {},
  },
  created() {
    this.initialize();
  },

  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
  },
};
</script>

<style lang="scss" scoped>
.quill-editor,
.content {
  background-color: white;
}
.editor {
  height: 500px;
}
</style>
