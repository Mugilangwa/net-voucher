<template>
    <div class="layout-px-spacing">   
        <teleport to="#breadcrumb">
            <ul class="navbar-nav flex-row">
                <li>
                    <div class="page-header">
                        <nav class="breadcrumb-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><router-link to="/parishi">Churches</router-link></li>
                                <li class="breadcrumb-item"><router-link :to="'/parishi/view/'+churchId">{{ churchName }}</router-link></li>
                                <li class="breadcrumb-item active"><span>Attachments</span></li>
                            </ol>
                        </nav>
                    </div>
                </li>
            </ul>
        </teleport>    

        <div class="card mt-3 p-2 mb-3 rounded">
            <div>
                <div>
                    <div>
                        <div class="d-flex justify-content-between me-3 ms-3">               
                            <div class="p-2">
                                <h3>Attachment Management</h3>
                                <p>Manage all church attachments, documents, and media files for {{ churchName }}</p>
                            </div>          
                            <router-link :to="'/parishi/view/'+churchId" class="btn bg-dark btn-sm mt-4 mb-4">Back</router-link>
                        </div>
                    </div>
                </div>
            </div>     
        </div>

        <!-- Stats Cards -->
        <div class="row mb-4">
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12">
                <div class="card stat-card">
                    <div class="card-body">
                        <div class="d-flex justify-content-between">
                            <div>
                                <p class="text-muted mb-1">Total Attachments</p>
                                <h3 class="mb-0">{{ stats.total }}</h3>
                            </div>
                            <div class="stat-icon bg-primary-light">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                                    <polyline points="13 2 13 9 20 9"></polyline>
                                </svg>
                            </div>
                        </div>
                        <div class="mt-2">
                            <small class="text-muted">All church documents</small>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12">
                <div class="card stat-card">
                    <div class="card-body">
                        <div class="d-flex justify-content-between">
                            <div>
                                <p class="text-muted mb-1">Images</p>
                                <h3 class="mb-0">{{ stats.images }}</h3>
                            </div>
                            <div class="stat-icon bg-info-light">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <rect x="2" y="2" width="20" height="20" rx="2.18"></rect>
                                    <circle cx="8.5" cy="8.5" r="2.5"></circle>
                                    <polyline points="21 15 16 10 5 21"></polyline>
                                </svg>
                            </div>
                        </div>
                        <div class="mt-2">
                            <small class="text-muted">Photos and graphics</small>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12">
                <div class="card stat-card">
                    <div class="card-body">
                        <div class="d-flex justify-content-between">
                            <div>
                                <p class="text-muted mb-1">Documents</p>
                                <h3 class="mb-0">{{ stats.documents }}</h3>
                            </div>
                            <div class="stat-icon bg-warning-light">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                    <polyline points="14 2 14 8 20 8"></polyline>
                                </svg>
                            </div>
                        </div>
                        <div class="mt-2">
                            <small class="text-muted">PDF, Word, Excel</small>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12">
                <div class="card stat-card">
                    <div class="card-body">
                        <div class="d-flex justify-content-between">
                            <div>
                                <p class="text-muted mb-1">Storage Used</p>
                                <h3 class="mb-0">{{ formatFileSize(stats.total_size) }}</h3>
                            </div>
                            <div class="stat-icon bg-success-light">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M21 12v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3"></path>
                                    <path d="M15 6h6"></path>
                                    <path d="M18 9v6"></path>
                                </svg>
                            </div>
                        </div>
                        <div class="mt-2">
                            <small class="text-muted">Total storage used</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Main Table -->
        <div class="row">
            <div class="col-xl-12 col-lg-12 col-sm-12">
                <div class="panel br-6">
                    <div v-if="loading">
                        <Loader />
                    </div>
                    
                    <div v-else class="custom-table m-3">
                        <v-client-table :data="items" :columns="columns" :options="table_options">
                            <template #beforeFilter>
                                <div class="d-flex gap-2 justify-content-between align-items-center flex-wrap">
                                    <div class="d-flex gap-2">
                                        <button class="btn btn-primary me-3" @click="openUploadModal()">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-1">
                                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                            </svg>
                                            Upload File
                                        </button>
                                        <button v-if="selectedIds.length > 0" class="btn btn-danger me-3" @click="deleteSelected" :disabled="selectedIds.length === 0">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-1">
                                                <polyline points="3 6 5 6 21 6"></polyline>
                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                            </svg>
                                            Delete Selected
                                        </button>
                                    </div>
                                    <div class="d-flex gap-2">
                                        <select v-model="filterType" class="form-control form-control-sm" style="width: 150px;" @change="filterAttachments">
                                            <option value="">All Types</option>
                                            <option value="image">Images</option>
                                            <option value="document">Documents</option>
                                            <option value="certificate">Certificates</option>
                                            <option value="other">Other</option>
                                        </select>
                                        <select v-model="filterTarget" class="form-control form-control-sm" style="width: 150px;" @change="filterAttachments">
                                            <option value="">All Targets</option>
                                            <option value="church">Church</option>
                                            <option value="department">Department</option>
                                            <option value="group">Group</option>
                                            <option value="member">Member</option>
                                        </select>
                                    </div>
                                </div>
                            </template>
                            
                            <template #id="props">
                                <div class="checkbox-primary custom-control custom-checkbox">
                                    <input type="checkbox" class="custom-control-input" :id="'chk' + props.row.id" @change="toggleSelection(props.row.id)" />
                                    <label class="custom-control-label" :for="'chk' + props.row.id"></label>
                                </div>
                            </template>
                            
                            <template #file="props">
                                <div class="d-flex align-items-center">
                                    <div class="file-icon me-3" :class="getFileIconClass(props.row.file_type)">
                                        <i :class="getFileIcon(props.row.file_name)"></i>
                                    </div>
                                    <div>
                                        <a :href="getFileUrl(props.row.file_path)" target="_blank" class="fw-semibold text-dark">
                                            {{ props.row.file_name }}
                                        </a>
                                        <div class="small text-muted">
                                            {{ formatFileSize(props.row.file_size) }}
                                        </div>
                                    </div>
                                </div>
                            </template>
                            
                            <template #target="props">
                                <div>
                                    <span class="badge" :class="getTargetBadge(props.row.target_type)">
                                        {{ formatTargetType(props.row.target_type) }}
                                    </span>
                                    <div class="small text-muted mt-1" v-if="props.row.target_name">
                                        {{ props.row.target_name }}
                                    </div>
                                </div>
                            </template>
                            
                            <template #type="props">
                                <span class="badge" :class="getTypeBadge(props.row.file_type)">
                                    {{ capitalize(props.row.file_type) }}
                                </span>
                            </template>
                            
                            <template #uploaded_by="props">
                                <div>
                                    <div class="fw-semibold">{{ props.row.uploaded_by_name || 'Unknown' }}</div>
                                    <div class="small text-muted">{{ formatDate(props.row.created_at) }}</div>
                                </div>
                            </template>
                            
                            <template #actions="props">
                                <div class="btn-group btn-group-sm">
                                    <a href="javascript:;" class="me-2 text-primary" @click="previewAttachment(props.row)" title="Preview">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                            <circle cx="12" cy="12" r="3"></circle>
                                        </svg>
                                    </a>
                                    <a :href="getFileUrl(props.row.file_path)" :download="props.row.file_name" class="me-2 text-success" title="Download">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                            <polyline points="7 10 12 15 17 10"></polyline>
                                            <line x1="12" y1="15" x2="12" y2="3"></line>
                                        </svg>
                                    </a>
                                    <a href="javascript:;" class="me-2 text-info" @click="openEditModal(props.row)" title="Edit">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                                        </svg>
                                    </a>
                                    <a href="javascript:;" class="text-danger" @click="deleteItem(props.row)" title="Delete">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <polyline points="3 6 5 6 21 6"></polyline>
                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                        </svg>
                                    </a>
                                </div>
                            </template>
                        </v-client-table>
                    </div>
                </div>
            </div>
        </div>

        <!-- Upload Modal -->
        <div class="modal fade" id="uploadModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-md modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Upload Attachment</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="uploadAttachment">
                            <div class="text-center mb-4">
                                <div class="upload-area" :class="{ 'drag-over': isDragging }" 
                                     @dragover.prevent="isDragging = true"
                                     @dragleave.prevent="isDragging = false"
                                     @drop.prevent="handleDrop">
                                    <input type="file" ref="fileInput" @change="onFileSelect" style="display: none">
                                    <div v-if="!selectedFile">
                                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                            <polyline points="17 8 12 3 7 8"></polyline>
                                            <line x1="12" y1="3" x2="12" y2="15"></line>
                                        </svg>
                                        <p class="mt-2 mb-0">Drag & drop file here or click to browse</p>
                                        <small class="text-muted">Supported: Images, PDF, DOC, XLS, PPT</small>
                                    </div>
                                    <div v-else>
                                        <i :class="getFileIcon(selectedFile.name)" style="font-size: 48px;"></i>
                                        <p class="mt-2 mb-0 fw-semibold">{{ selectedFile.name }}</p>
                                        <small class="text-muted">{{ formatFileSize(selectedFile.size) }}</small>
                                        <button type="button" class="btn btn-sm btn-link text-danger mt-2" @click="clearFile">Remove</button>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="form-group mb-3">
                                <label>File Type *</label>
                                <select v-model="uploadForm.file_type" class="form-control" required>
                                    <option value="image">Image</option>
                                    <option value="document">Document</option>
                                    <option value="certificate">Certificate</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            
                            <div class="form-group mb-3">
                                <label>Target Type *</label>
                                <select v-model="uploadForm.target_type" class="form-control" required @change="onTargetTypeChange">
                                    <option value="church">Church</option>
                                    <option value="department">Department</option>
                                    <option value="group">Group</option>
                                    <option value="member">Member</option>
                                </select>
                            </div>
                            
                            <div class="form-group mb-3" v-if="uploadForm.target_type === 'department'">
                                <label>Department *</label>
                                <select v-model="uploadForm.target_id" class="form-control" required>
                                    <option :value="null">Select Department</option>
                                    <option v-for="dept in departments" :key="dept.id" :value="dept.id">
                                        {{ dept.name }}
                                    </option>
                                </select>
                            </div>
                            
                            <div class="form-group mb-3" v-if="uploadForm.target_type === 'group'">
                                <label>Group *</label>
                                <select v-model="uploadForm.target_id" class="form-control" required>
                                    <option :value="null">Select Group</option>
                                    <option v-for="grp in groups" :key="grp.id" :value="grp.id">
                                        {{ grp.name }}
                                    </option>
                                </select>
                            </div>
                            
                            <div class="form-group mb-3" v-if="uploadForm.target_type === 'member'">
                                <label>Member *</label>
                                <select v-model="uploadForm.target_id" class="form-control" required>
                                    <option :value="null">Select Member</option>
                                    <option v-for="member in members" :key="member.id" :value="member.id">
                                        {{ member.full_name }}
                                    </option>
                                </select>
                            </div>
                            
                            <div class="form-group mb-3">
                                <label>Description</label>
                                <textarea v-model="uploadForm.description" class="form-control" rows="2" placeholder="Optional description"></textarea>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" @click="uploadAttachment" :disabled="uploading || !selectedFile">
                            {{ uploading ? 'Uploading...' : 'Upload' }}
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Preview Modal -->
        <div class="modal fade" id="previewModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">File Preview</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body text-center">
                        <div v-if="previewFile">
                            <img v-if="previewFile.file_type === 'image'" :src="getFileUrl(previewFile.file_path)" class="img-fluid rounded" style="max-height: 500px;">
                            <div v-else class="preview-placeholder">
                                <i :class="getFileIcon(previewFile.file_name)" style="font-size: 80px;"></i>
                                <h5 class="mt-3">{{ previewFile.file_name }}</h5>
                                <p class="text-muted">Preview not available for this file type</p>
                                <a :href="getFileUrl(previewFile.file_path)" :download="previewFile.file_name" class="btn btn-primary">Download File</a>
                            </div>
                            <div class="mt-3 text-start">
                                <hr>
                                <p><strong>Description:</strong> {{ previewFile.description || 'No description' }}</p>
                                <p><strong>Uploaded By:</strong> {{ previewFile.uploaded_by_name || 'Unknown' }}</p>
                                <p><strong>Size:</strong> {{ formatFileSize(previewFile.file_size) }}</p>
                                <p><strong>Type:</strong> {{ previewFile.file_type }}</p>
                                <p><strong>MIME Type:</strong> {{ previewFile.mime_type }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Edit Modal -->
        <div class="modal fade" id="editModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-md modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Edit Attachment</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="updateAttachment">
                            <div class="form-group mb-3">
                                <label>File Type</label>
                                <select v-model="editForm.file_type" class="form-control">
                                    <option value="image">Image</option>
                                    <option value="document">Document</option>
                                    <option value="certificate">Certificate</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div class="form-group mb-3">
                                <label>Description</label>
                                <textarea v-model="editForm.description" class="form-control" rows="3"></textarea>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" @click="updateAttachment" :disabled="updating">
                            {{ updating ? 'Updating...' : 'Update' }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { axiosInstance } from '@/services/axios';
import { useMeta } from '@/composables/use-meta';
import '@/assets/sass/elements/breadcrumb.scss';
import { useNotification } from '@/composables/swal';
import Loader from '@/components/plugins/loader.vue';

const { showAlert, showNotification } = useNotification();

useMeta({ title: 'Attachments' });

const route = useRoute();
const router = useRouter();
const churchId = route.params.id;
const churchName = ref('');

const items = ref([]);
const originalItems = ref([]);
const selectedIds = ref([]);
const loading = ref(false);
const uploading = ref(false);
const updating = ref(false);
const isDragging = ref(false);
const filterType = ref('');
const filterTarget = ref('');

const departments = ref([]);
const groups = ref([]);
const members = ref([]);

let uploadModal = null;
let previewModal = null;
let editModal = null;
const fileInput = ref(null);
const selectedFile = ref(null);

const uploadForm = ref({
    file_type: 'document',
    target_type: 'church',
    target_id: null,
    description: ''
});

const editForm = ref({
    id: null,
    file_type: '',
    description: ''
});

const previewFile = ref(null);

const stats = computed(() => {
    const total = items.value.length;
    const images = items.value.filter(i => i.file_type === 'image').length;
    const documents = items.value.filter(i => i.file_type === 'document' || i.file_type === 'certificate').length;
    const total_size = items.value.reduce((sum, i) => sum + (i.file_size || 0), 0);
    return { total, images, documents, total_size };
});

const columns = ref(['id', 'file', 'target', 'type', 'uploaded_by', 'actions']);
const table_options = ref({
    perPage: 10,
    perPageValues: [10, 25, 50, 100],
    skin: 'table table-hover',
    sortable: ['file_name', 'file_type', 'created_at'],
    filterable: ['file_name', 'description', 'uploaded_by_name'],
    headings: {
        id: '#',
        file: 'File',
        target: 'Target',
        type: 'Type',
        uploaded_by: 'Uploaded By',
        actions: 'Actions'
    }
});

const capitalize = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
};

const formatFileSize = (bytes) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString();
};

const formatTargetType = (type) => {
    const types = {
        church: 'Church',
        department: 'Department',
        group: 'Group',
        member: 'Member'
    };
    return types[type] || type;
};

const getFileIcon = (fileName) => {
    if (!fileName) return 'bi-file';
    const ext = fileName.split('.').pop().toLowerCase();
    const icons = {
        pdf: 'bi-file-pdf',
        doc: 'bi-file-word',
        docx: 'bi-file-word',
        xls: 'bi-file-excel',
        xlsx: 'bi-file-excel',
        ppt: 'bi-file-ppt',
        pptx: 'bi-file-ppt',
        jpg: 'bi-file-image',
        jpeg: 'bi-file-image',
        png: 'bi-file-image',
        gif: 'bi-file-image',
        mp4: 'bi-file-play',
        mp3: 'bi-file-music'
    };
    return icons[ext] || 'bi-file';
};

const getFileIconClass = (fileType) => {
    const classes = {
        image: 'file-icon-image',
        document: 'file-icon-document',
        certificate: 'file-icon-certificate',
        other: 'file-icon-other'
    };
    return classes[fileType] || 'file-icon-other';
};

const getTargetBadge = (targetType) => {
    const badges = {
        church: 'badge-primary',
        department: 'badge-info',
        group: 'badge-warning',
        member: 'badge-success'
    };
    return badges[targetType] || 'badge-secondary';
};

const getTypeBadge = (fileType) => {
    const badges = {
        image: 'badge-info',
        document: 'badge-warning',
        certificate: 'badge-success',
        other: 'badge-secondary'
    };
    return badges[fileType] || 'badge-secondary';
};

const getFileUrl = (filePath) => {
    if (!filePath) return '#';
    if (filePath.startsWith('http')) return filePath;
    const baseUrl = process.env.VUE_APP_API_URL || 'http://127.0.0.1:8000';
    return `${baseUrl}${filePath}`;
};

const loadItems = async () => {
    loading.value = true;
    try {
        const response = await axiosInstance.get(`/attachments/?target_id=${churchId}&target_type=church`);
        items.value = response?.data?.data || response?.data || [];
        originalItems.value = [...items.value];
        churchName.value = response?.data?.data?.church_details?.church_name || churchName.value;
    } catch (error) {
        console.error('Error loading attachments:', error);
        showNotification('error', 'Error', 'Failed to load attachments');
    } finally {
        loading.value = false;
    }
};

const loadDepartments = async () => {
    try {
        const response = await axiosInstance.get(`/departments/?church_id=${churchId}`);
        departments.value = response?.data?.data?.departments || response?.data || [];
    } catch (error) {
        console.error('Error loading departments:', error);
    }
};

const loadGroups = async () => {
    try {
        const response = await axiosInstance.get(`/groups/?church_id=${churchId}`);
        groups.value = response?.data?.data?.groups || response?.data || [];
    } catch (error) {
        console.error('Error loading groups:', error);
    }
};

const loadMembers = async () => {
    try {
        const response = await axiosInstance.get(`/members/?church_id=${churchId}`);
        members.value = response?.data?.data?.members || response?.data || [];
    } catch (error) {
        console.error('Error loading members:', error);
    }
};

const filterAttachments = () => {
    let filtered = [...originalItems.value];
    if (filterType.value) {
        filtered = filtered.filter(i => i.file_type === filterType.value);
    }
    if (filterTarget.value) {
        filtered = filtered.filter(i => i.target_type === filterTarget.value);
    }
    items.value = filtered;
};

const onTargetTypeChange = () => {
    uploadForm.value.target_id = null;
    if (uploadForm.value.target_type === 'church') {
        uploadForm.value.target_id = churchId;
    }
};

const onFileSelect = (event) => {
    selectedFile.value = event.target.files[0];
};

const handleDrop = (event) => {
    isDragging.value = false;
    selectedFile.value = event.dataTransfer.files[0];
};

const clearFile = () => {
    selectedFile.value = null;
    if (fileInput.value) fileInput.value.value = '';
};

const uploadAttachment = async () => {
    if (!selectedFile.value) {
        showAlert('error', 'Please select a file');
        return;
    }
    
    if (!uploadForm.value.target_id && uploadForm.value.target_type !== 'church') {
        showAlert('error', `Please select a ${uploadForm.value.target_type}`);
        return;
    }
    
    uploading.value = true;
    const formData = new FormData();
    formData.append('file', selectedFile.value);
    formData.append('target_type', uploadForm.value.target_type);
    formData.append('target_id', uploadForm.value.target_id || churchId);
    formData.append('file_type', uploadForm.value.file_type);
    formData.append('description', uploadForm.value.description);
    
    try {
        const response = await axiosInstance.post('/attachments/', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        
        if (response.status === 200 || response.status === 201) {
            showAlert('success', 'File Uploaded Successfully');
            await loadItems();
            uploadModal.hide();
            clearFile();
            uploadForm.value = {
                file_type: 'document',
                target_type: 'church',
                target_id: churchId,
                description: ''
            };
        }
    } catch (error) {
        console.error('Error uploading:', error);
        if (error.response?.data) {
            const errors = error.response.data;
            const errorMessages = Object.values(errors).flat().join('\n');
            showNotification('error', 'Upload Failed', errorMessages);
        } else {
            showNotification('error', 'Error', 'Failed to upload file');
        }
    } finally {
        uploading.value = false;
    }
};

const updateAttachment = async () => {
    updating.value = true;
    try {
        const response = await axiosInstance.patch(`/attachments/${editForm.value.id}/`, {
            file_type: editForm.value.file_type,
            description: editForm.value.description
        });
        
        if (response.status === 200) {
            showAlert('success', 'Attachment Updated Successfully');
            await loadItems();
            editModal.hide();
        }
    } catch (error) {
        console.error('Error updating:', error);
        showNotification('error', 'Error', 'Failed to update attachment');
    } finally {
        updating.value = false;
    }
};

const previewAttachment = (item) => {
    previewFile.value = item;
    previewModal.show();
};

const openUploadModal = () => {
    uploadModal.show();
};

const openEditModal = (item) => {
    editForm.value = {
        id: item.id,
        file_type: item.file_type,
        description: item.description || ''
    };
    editModal.show();
};

const toggleSelection = (id) => {
    if (selectedIds.value.includes(id)) {
        selectedIds.value = selectedIds.value.filter(i => i !== id);
    } else {
        selectedIds.value.push(id);
    }
};

const deleteItem = async (item) => {
    const confirmed = await showAlert('warning', `Delete "${item.file_name}"?`, 'This action cannot be undone', 'Yes, Delete');
    if (confirmed) {
        try {
            await axiosInstance.delete(`/attachments/${item.id}/`);
            showAlert('success', 'Attachment Deleted Successfully');
            await loadItems();
        } catch (error) {
            console.error('Error deleting:', error);
            showNotification('error', 'Error', 'Failed to delete attachment');
        }
    }
};

const deleteSelected = async () => {
    if (selectedIds.value.length === 0) return;
    const confirmed = await showAlert('warning', `Delete ${selectedIds.value.length} selected attachment(s)?`, 'This action cannot be undone', 'Yes, Delete');
    if (confirmed) {
        try {
            await axiosInstance.post('/attachments/bulk_delete/', { ids: selectedIds.value });
            selectedIds.value = [];
            showAlert('success', 'Attachments Deleted Successfully');
            await loadItems();
        } catch (error) {
            console.error('Error bulk deleting:', error);
            showNotification('error', 'Error', 'Failed to delete attachments');
        }
    }
};

onMounted(() => {
    loadItems();
    loadDepartments();
    loadGroups();
    loadMembers();
    uploadModal = new window.bootstrap.Modal(document.getElementById('uploadModal'));
    previewModal = new window.bootstrap.Modal(document.getElementById('previewModal'));
    editModal = new window.bootstrap.Modal(document.getElementById('editModal'));
});
</script>

<style scoped>
/* Stats Cards */
.stat-card {
    border: none;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease;
}

.stat-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
}

.stat-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.bg-primary-light {
    background: rgba(67, 97, 238, 0.1);
    color: #4361ee;
}

.bg-info-light {
    background: rgba(23, 162, 184, 0.1);
    color: #17a2b8;
}

.bg-warning-light {
    background: rgba(255, 193, 7, 0.1);
    color: #ffc107;
}

.bg-success-light {
    background: rgba(40, 167, 69, 0.1);
    color: #28a745;
}

/* Upload Area */
.upload-area {
    border: 2px dashed #dee2e6;
    border-radius: 10px;
    padding: 40px 20px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.upload-area:hover, .drag-over {
    border-color: #4361ee;
    background: rgba(67, 97, 238, 0.05);
}

/* File Icons */
.file-icon {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
}

.file-icon-image {
    background: rgba(23, 162, 184, 0.1);
    color: #17a2b8;
}

.file-icon-document {
    background: rgba(255, 193, 7, 0.1);
    color: #ffc107;
}

.file-icon-certificate {
    background: rgba(40, 167, 69, 0.1);
    color: #28a745;
}

.file-icon-other {
    background: rgba(108, 117, 125, 0.1);
    color: #6c757d;
}

/* Badges */
.badge-success { 
    background: #28a745; 
    color: white; 
    padding: 4px 10px; 
    border-radius: 20px; 
    font-size: 11px; 
}

.badge-danger { 
    background: #dc3545; 
    color: white; 
    padding: 4px 10px; 
    border-radius: 20px; 
    font-size: 11px; 
}

.badge-primary {
    background: #4361ee;
    color: white;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 11px;
}

.badge-info {
    background: #17a2b8;
    color: white;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 11px;
}

.badge-warning {
    background: #ffc107;
    color: #333;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 11px;
}

.badge-secondary {
    background: #6c757d;
    color: white;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 11px;
}

/* Preview Placeholder */
.preview-placeholder {
    padding: 50px;
    background: #f8f9fa;
    border-radius: 10px;
}

.gap-2 {
    gap: 0.5rem;
}

.small {
    font-size: 11px;
}

.text-muted {
    color: #6c757d;
}

.fw-semibold {
    font-weight: 600;
}
</style>