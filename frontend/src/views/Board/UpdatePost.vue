<template>
    <v-container>
        <v-card outlined>
            <v-card-title>
                게시글 수정
                <v-spacer></v-spacer>
                <v-btn
                    class="ma-2"
                    tile
                    outlined
                    color="black darken-2"
                    @click="goCancle()"
                >
                    <v-icon left>mdi-close-circle</v-icon>
                    수정취소
                </v-btn>
            </v-card-title>
            <!-- <v-card-subtitle> 게시판: {{ curBoardName }} </v-card-subtitle> -->
            <v-card-text>
                <v-text-field
                    v-model="title"
                    label="제목"
                    hide-details
                    class="mb-4"
                ></v-text-field>
                <editor
                    ref="editor"
                    mode="wysiwyg"
                    :options="editor.options"
                    :value="content"
                />
                <file-upload
                    v-model="uploadFile.selected"
                    :uploaded="uploadFile.uploaded"
                    :currentProgress="uploadFile.currentProgress"
                    :fileProgress="uploadFile.fileProgress"
                    :uploading="uploadFile.isUploading"
                    class="mt-3"
                ></file-upload>
                <div class="d-flex align-center mt-3">
                    <v-spacer></v-spacer>
                    <small class="red--text mr-3" v-if="isError"
                        >게시글 작성에 실패했습니다.</small
                    >
                    <v-btn
                        class="ma-2"
                        tile
                        outlined
                        color="blue darken-3"
                        :disabled="isLoading"
                        @click="updateClick"
                    >
                        <v-icon left>mdi-pencil</v-icon> 수정
                    </v-btn>
                </div>
            </v-card-text>
        </v-card>
        <v-dialog v-model="titleAlert" max-width="290">
            <v-card>
                <v-card-title class="headline"
                    >제목을 입력해주세요.</v-card-title
                >
                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                        color="green darken-1"
                        text
                        @click="titleAlert = false"
                    >
                        확인
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="contentAlert" max-width="290">
            <v-card>
                <v-card-title class="headline"
                    >내용을 입력해주세요.</v-card-title
                >
                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                        color="green darken-1"
                        text
                        @click="contentAlert = false"
                    >
                        확인
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>
<script>
import axios from 'axios'
import { Editor } from '@toast-ui/vue-editor'
import fileUpload from '../../components/file/FileUpload.vue'

export default {
    beforeRouteLeave(to, from, next) {
        if (this.certification) next()
        else this.nextConfirm(next)
    },
    components: {
        Editor,
        fileUpload,
    },
    data() {
        return {
            certification: false,
            title: '',
            titleAlert: false,
            content: '',
            contentAlert: false,
            cancelAlert: false,
            author: '',
            created_date: '',
            post_id: '',
            loading: true,
            curBoardName: '',
            isLoading: false,
            isError: false,
            editor: {
                options: {
                    language: 'ko',
                },
            },
            uploadFile: {
                selected: [],
                uploaded: [],
                isUploading: false,
                currentProgress: 0,
                fileProgress: 0,
            },
        }
    },
    methods: {
        async nextConfirm(next) {
            const res = await this.$action.showConfirmDialog(
                '게시글 수정 취소',
                '수정을 취소하시겠습니까?'
            )
            if (res) {
                next()
            } else {
                next(false)
            }
        },
        goCancle() {
            this.$router.push({
                path:
                    '/board/' +
                    this.$route.params.board_id +
                    '/' +
                    this.$route.params.post_id,
            })
        },
        async getBoards() {
            const res = await axios.get('simple/boards')
            return res.data
        },
        async fetchPost() {
            const res = await axios.get(
                '/simple/posts/' + this.$route.params.post_id
            )
            this.title = res.data.title
            this.content = res.data.content

            this.uploadFile.uploaded = res.data.files.map(file => {
                return {
                    filename: file.filename,
                    id: file.id,
                }
            })

            this.loading = false
        },
        clearClick() {
            this.$router.push({
                path: `/board/${this.$route.params.board_id}/${this.$route.params.post_id}`,
            })
        },
        async updateClick() {
            if (!this.title) {
                this.titleAlert = true
                return
            }
            if (!this.getMarkdown()) {
                this.contentAlert = true
                return
            }
            this.certification = true
            try {
                this.isLoading = true

                const content = this.getMarkdown()

                const fileIds = await this.uploadFiles()

                await axios.patch(
                    '/simple/posts/' + this.$route.params.post_id,
                    {
                        title: this.title,
                        content: content,
                        files: fileIds,
                    }
                )
                this.$router.push(
                    `/board/${this.$route.params.board_id}/${this.$route.params.post_id}`
                )
            } catch (error) {
                this.isError = true
            } finally {
                this.isLoading = false
            }
        },
        getMarkdown() {
            return this.$refs.editor.invoke('getMarkdown')
        },
        async uploadFiles() {
            const fileIds = []

            const fileCount = this.uploadFile.selected.length

            if (fileCount > 0) {
                this.uploadFile.isUploading = true
                this.uploadFile.fileProgress = 0

                for (let file of this.uploadFile.selected) {
                    if (file.uploaded) {
                        fileIds.push(file.id)
                        // this.uploadFile.fileProgress += 1
                        continue
                    }
                    let form = new FormData()
                    form.append('file', file.file)
                    this.uploadFile.currentProgress = 0

                    const res = await axios.post('file/upload', form, {
                        headers: { 'Content-Type': 'multipart/form-data' },
                        // 진행상황 반영
                        onUploadProgress(e) {
                            this.uploadFile.currentProgress += Math.floor(
                                (e.loaded * 100) / e.total
                            )
                        },
                    })
                    this.uploadFile.currentProgress = 0
                    this.uploadFile.fileProgress += 1
                    fileIds.push(res.data.id)
                }
                this.uploadFile.isLoading = false
            }
            return fileIds
        },
    },
    async created() {
        await this.fetchPost()
    },
    watch: {
        async $route(to, from) {
            await this.fetchPost()
        },
    },
}
</script>
