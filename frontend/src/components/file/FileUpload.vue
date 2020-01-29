<template>
    <v-card
        outlined
        :loading="loading"
        @drop.prevent="addFileByDragDrop"
        @dragover.prevent=""
        @dragenter.prevent="showDroppable"
        @dragleave.prevent="hideDroppable"
    >
        <v-card-subtitle>
            <v-icon>mdi-paperclip</v-icon>
            <span class="ml-2">파일 첨부</span>
        </v-card-subtitle>
        <v-card-text class="d-flex">
            <v-chip
                v-for="(fileinfo, idx) in selectedFiles"
                :key="idx"
                @click:close="removeFile(idx)"
                close
                :color="fileinfo.uploaded ? 'green' : ''"
                class="mr-2"
                >{{ fileinfo.filename }}</v-chip
            >
            <v-btn small icon @click="showFileUploadDialog">
                <v-icon>mdi-plus</v-icon>
            </v-btn>
            <span class="ml-3" v-if="selectedFiles.length == 0"
                >또는 파일을 끌어다 넣으세요...</span
            >
        </v-card-text>
        <!-- <p v-if="dragOver">
            gogo
        </p> -->

        <v-fade-transition>
            <v-row
                class="overlay"
                v-show="dragOver"
                align="center"
                justify="center"
            >
                <v-col cols="3">
                    <v-icon class="display-3">mdi-plus</v-icon>
                </v-col>
            </v-row>
        </v-fade-transition>

        <input
            type="file"
            class="d-none"
            ref="fileInput"
            @change="addFileByDialog"
            multiple
        />
    </v-card>
</template>
<style scoped>
.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.1);
}

/* v-card * {
    pointer-events: none;
} */
</style>
<script>
export default {
    props: {
        value: Array,
        loading: {
            type: Boolean,
            default: false,
        },
        uploaded: {
            type: Array,
            default() {
                return []
            },
        },
    },
    data() {
        return {
            selectedFiles: [],
            fileinput: [],
            dragCount: 0,
        }
    },
    computed: {
        dragOver() {
            return this.dragCount != 0
        },
    },
    methods: {
        showFileUploadDialog() {
            this.$refs.fileInput.click()
        },
        addFileByDialog(e) {
            e.target.files.forEach(file => {
                this.addFile(file)
            })
        },
        addFileByDragDrop(e) {
            if (e.dataTransfer.files) {
                ;[...e.dataTransfer.files].forEach(file => {
                    this.addFile(file)
                })
            }
            this.hideDroppable()
        },
        addFile(file) {
            this.selectedFiles.push({
                uploaded: false,
                file: file,
                filename: file.name,
            })
            this.$emit('input', this.selectedFiles)
        },
        removeFile(idx) {
            this.selectedFiles.splice(idx, 1)
        },
        showDroppable() {
            this.dragCount += 1
        },
        hideDroppable() {
            this.dragCount -= 1
        },
    },
    watch: {
        uploaded(val) {
            this.selectedFiles = val.map(file => {
                return {
                    filename: file.filename,
                    uploaded: true,
                    id: file.id,
                }
            })
            this.$emit('input', this.selectedFiles)
        },
    },
}
</script>