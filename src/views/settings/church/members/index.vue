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
                                <li class="breadcrumb-item active"><span>Members</span></li>
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
                                <h3>Member Management</h3>
                                <p>Manage all members for {{ churchName }}</p>
                            </div>          
                            <router-link :to="'/parishi/view/'+churchId" class="btn bg-dark btn-sm mt-4 mb-4">Back</router-link>
                        </div>
                    </div>
                </div>
            </div>     
        </div>

        <div class="row">
            <div class="col-xl-12 col-lg-12 col-sm-12">
                <div class="panel br-6">
                    <div v-if="loading">
                        <Loader />
                    </div>
                    
                    <div v-else class="custom-table m-3">
                        <v-client-table :data="items" :columns="columns" :options="table_options">
                            <template #beforeFilter>
                                <div class="d-flex gap-2">
                                    <button class="btn btn-primary me-3" @click="openModal()">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-1">
                                            <line x1="12" y1="5" x2="12" y2="19"></line>
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                        </svg>
                                        Add Member
                                    </button>
                                    <button v-if="selectedIds.length > 0" class="btn btn-danger me-3" @click="deleteSelected" :disabled="selectedIds.length === 0">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-1">
                                            <polyline points="3 6 5 6 21 6"></polyline>
                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                        </svg>
                                        Delete Selected
                                    </button>
                                </div>
                            </template>
                            
                            <template #id="props">
                                <div class="checkbox-primary custom-control custom-checkbox">
                                    <input type="checkbox" class="custom-control-input" :id="'chk' + props.row.id" @change="toggleSelection(props.row.id)" />
                                    <label class="custom-control-label" :for="'chk' + props.row.id"></label>
                                </div>
                            </template>
                            
                            <template #name="props">
                                <div class="d-flex align-items-center">
                                    <div class="circle-icon me-2" :style="{ backgroundColor: getColor(props.row.id) }">
                                        <img v-if="props.row.profile_image && props.row.profile_image !== 'null'" 
                                             :src="getProfileImage(props.row.profile_image)" 
                                             class="rounded-circle w-100 h-100" 
                                             style="object-fit: cover;">
                                        <span v-else>{{ getInitial(props.row.full_name) }}</span>
                                    </div>
                                    <div>
                                        <div class="fw-semibold">{{ props.row.full_name }}</div>
                                        <small class="text-muted">{{ props.row.membership_number }}</small>
                                    </div>
                                </div>
                            </template>
                            
                            <template #roles="props">
                                <div class="d-flex flex-wrap gap-1">
                                    <span v-for="role in props.row.member_roles?.slice(0, 2)" :key="role.id" class="badge badge-info small">
                                        {{ role.name_sw }}
                                    </span>
                                    <span v-if="props.row.member_roles?.length > 2" class="badge badge-secondary small">
                                        +{{ props.row.member_roles.length - 2 }}
                                    </span>
                                    <span v-if="!props.row.member_roles?.length" class="text-muted small">No roles</span>
                                </div>
                            </template>
                            
                            <template #status="props">
                                <span :class="props.row.is_active ? 'badge-success' : 'badge-danger'" class="badge">
                                    {{ props.row.is_active ? 'Active' : 'Inactive' }}
                                </span>
                            </template>
                            
                            <template #actions="props">
                                <a href="javascript:;" class="me-2 text-info" @click="openMemberRoles(props.row)" title="Manage Roles">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                        <line x1="18" y1="8" x2="22" y2="8"></line>
                                        <line x1="20" y1="6" x2="20" y2="10"></line>
                                    </svg>
                                </a>
                                <a href="javascript:;" class="me-2 text-warning" @click="openAttachments(props.row)" title="Attachments">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                                        <polyline points="13 2 13 9 20 9"></polyline>
                                    </svg>
                                </a>
                                <a href="javascript:;" class="me-2 text-primary" @click="openModal(props.row)" title="Edit">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                                    </svg>
                                </a>
                                <a href="javascript:;" class="text-danger" @click="deleteItem(props.row)" title="Delete">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <polyline points="3 6 5 6 21 6"></polyline>
                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                    </svg>
                                </a>
                            </template>
                        </v-client-table>
                    </div>
                </div>
            </div>
        </div>

        <!-- Member Modal (Add/Edit) -->
        <div class="modal fade" id="itemModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{{ isEdit ? 'Edit Member' : 'Add Member' }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="saveItem">
                            <div class="row">
                                <div class="col-md-12 text-center mb-3">
                                    <div class="position-relative d-inline-block">
                                        <div class="circle-icon-lg" :style="{ backgroundColor: getColor(form.id || 0) }">
                                            <img v-if="form.profile_image && form.profile_image !== 'null'" 
                                                 :src="getProfileImage(form.profile_image)" 
                                                 class="rounded-circle w-100 h-100" 
                                                 style="object-fit: cover;">
                                            <span v-else>{{ getInitial(form.full_name || 'U') }}</span>
                                        </div>
                                        <div class="position-absolute bottom-0 end-0 bg-primary rounded-circle p-1" style="cursor: pointer;" @click="$refs.formProfileInput.click()">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                                                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                                                <circle cx="12" cy="13" r="4"></circle>
                                            </svg>
                                        </div>
                                        <input type="file" ref="formProfileInput" @change="onFormProfileSelect" accept="image/*" style="display: none">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group mb-3">
                                        <label>Full Name *</label>
                                        <input type="text" v-model="form.full_name" class="form-control" required placeholder="e.g., John Doe">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group mb-3">
                                        <label>Membership Number *</label>
                                        <input type="text" v-model="form.membership_number" class="form-control" required placeholder="e.g., M001">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group mb-3">
                                        <label>Gender</label>
                                        <select v-model="form.gender" class="form-control">
                                            <option value="">Select Gender</option>
                                            <option value="M">Male</option>
                                            <option value="F">Female</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group mb-3">
                                        <label>Phone</label>
                                        <input type="text" v-model="form.phone" class="form-control" placeholder="e.g., 0712345678">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group mb-3">
                                        <label>Email</label>
                                        <input type="email" v-model="form.email" class="form-control" placeholder="e.g., john@example.com">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group mb-3">
                                        <label>Date of Birth</label>
                                        <input type="date" v-model="form.date_of_birth" class="form-control">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group mb-3">
                                        <label>Joined Date</label>
                                        <input type="date" v-model="form.joined_date" class="form-control">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group mb-3">
                                        <label>Baptism Date</label>
                                        <input type="date" v-model="form.baptism_date" class="form-control">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group mb-3">
                                        <label>Marital Status</label>
                                        <select v-model="form.marital_status" class="form-control">
                                            <option value="">Select Status</option>
                                            <option value="single">Single</option>
                                            <option value="married">Married</option>
                                            <option value="widowed">Widowed</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group mb-3">
                                        <label>Address</label>
                                        <textarea v-model="form.address" class="form-control" rows="2" placeholder="Physical address"></textarea>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group mb-3">
                                        <label>Status</label>
                                        <select v-model="form.is_active" class="form-control">
                                            <option :value="true">Active</option>
                                            <option :value="false">Inactive</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" @click="saveItem" :disabled="loading">
                            {{ loading ? 'Saving...' : 'Save' }}
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Member Roles Management Modal -->
        <div class="modal fade" id="memberRolesModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-md modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Manage Member Roles</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <h6 class="mb-3">{{ selectedMember?.full_name }}</h6>
                        <div class="form-group mb-3">
                            <label>Assign Roles (Huduma/Karama)</label>
                            <select v-model="selectedRoles" class="form-control" multiple size="8">
                                <option v-for="role in memberRoles" :key="role.id" :value="role.id">
                                    {{ role.name_sw }} ({{ role.category }})
                                </option>
                            </select>
                            <small class="text-muted">Hold Ctrl/Cmd to select multiple roles</small>
                        </div>
                        <div class="mt-3" v-if="selectedMemberRoles.length">
                            <label>Current Roles:</label>
                            <div class="d-flex flex-wrap gap-2 mt-2">
                                <span v-for="role in selectedMemberRoles" :key="role.id" class="badge badge-info">
                                    {{ role.name_sw }}
                                    <a href="javascript:;" @click="removeRole(role.id)" class="text-white ms-1">✕</a>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" @click="saveMemberRoles">Save Roles</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Attachments Modal -->
        <div class="modal fade" id="attachmentsModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Member Attachments</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <h6 class="mb-3">{{ selectedMember?.full_name }}</h6>
                        
                        <div class="card mb-3">
                            <div class="card-body">
                                <h6>Upload New Attachment</h6>
                                <div class="row">
                                    <div class="col-md-5">
                                        <div class="form-group mb-2">
                                            <label>File</label>
                                            <input type="file" ref="fileInput" @change="onFileSelect" class="form-control">
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group mb-2">
                                            <label>File Type</label>
                                            <select v-model="newAttachment.file_type" class="form-control">
                                                <option value="image">Image</option>
                                                <option value="document">Document</option>
                                                <option value="certificate">Certificate</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group mb-2">
                                            <label>&nbsp;</label>
                                            <button class="btn btn-primary w-100" @click="uploadAttachment" :disabled="!selectedFile">
                                                Upload
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label>Description</label>
                                    <input type="text" v-model="newAttachment.description" class="form-control" placeholder="Attachment description">
                                </div>
                            </div>
                        </div>
                        
                        <h6>Attachments</h6>
                        <div class="table-responsive">
                            <table class="table table-sm table-hover">
                                <thead>
                                    <tr><th>File Name</th><th>Type</th><th>Size</th><th>Uploaded</th><th></th></tr>
                                </thead>
                                <tbody>
                                    <tr v-for="att in attachments" :key="att.id">
                                        <td>
                                            <a :href="att.file_path" target="_blank">
                                                {{ att.file_name }}
                                            </a>
                                        </td>
                                        <td><span class="badge" :class="getTypeBadge(att.file_type)">{{ att.file_type }}</span></td>
                                        <td>{{ formatFileSize(att.file_size) }}</td>
                                        <td>{{ formatDate(att.created_at) }}</td>
                                        <td>
                                            <a href="javascript:;" @click="deleteAttachment(att.id)" class="text-danger">
                                                ✕
                                            </a>
                                        </td>
                                    </tr>
                                    <tr v-if="attachments.length === 0">
                                        <td colspan="5" class="text-center text-muted">No attachments</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { axiosInstance } from '@/services/axios';
import { useMeta } from '@/composables/use-meta';
import '@/assets/sass/elements/breadcrumb.scss';
import { useNotification } from '@/composables/swal';
import Loader from '@/components/plugins/loader.vue';

const { showAlert, showNotification } = useNotification();

useMeta({ title: 'Members' });

const route = useRoute();
const router = useRouter();
const churchId = route.params.id;
const churchName = ref('');

const items = ref([]);
const selectedIds = ref([]);
const loading = ref(false);
const isEdit = ref(false);
let modal = null;
let rolesModal = null;
let attachmentsModal = null;

// Member Roles
const memberRoles = ref([]);
const selectedMember = ref(null);
const selectedRoles = ref([]);
const selectedMemberRoles = ref([]);

// Attachments
const attachments = ref([]);
const selectedFile = ref(null);
const fileInput = ref(null);
const newAttachment = ref({
    file_type: 'document',
    description: ''
});

const form = ref({
    id: null,
    church: churchId,
    membership_number: '',
    full_name: '',
    gender: '',
    date_of_birth: '',
    email: '',
    phone: '',
    address: '',
    occupation: '',
    education_level: '',
    marital_status: '',
    baptism_date: '',
    joined_date: '',
    profile_image: '',
    is_active: true
});

const columns = ref(['id', 'name', 'roles', 'phone', 'email', 'joined_date', 'status', 'actions']);
const table_options = ref({
    perPage: 10,
    perPageValues: [10, 25, 50, 100],
    skin: 'table table-hover',
    sortable: ['full_name', 'membership_number'],
    filterable: ['full_name', 'membership_number', 'phone', 'email'],
    headings: {
        id: '#',
        name: 'Member',
        roles: 'Roles',
        phone: 'Phone',
        email: 'Email',
        joined_date: 'Joined Date',
        status: 'Status',
        actions: 'Actions'
    }
});

const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : '?';
};

const getColor = (id) => {
    const colors = ['#4361ee', '#2196f3', '#ff9800', '#28a745', '#dc3545', '#6c757d'];
    return colors[id % colors.length];
};

const getProfileImage = (imagePath) => {
    if (!imagePath || imagePath === 'null') return '';
    if (imagePath.startsWith('http')) return imagePath;
    const baseUrl = process.env.VUE_APP_API_URL || 'http://127.0.0.1:8000';
    return `${baseUrl}${imagePath}`;
};

const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString();
};

const formatFileSize = (bytes) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const getTypeBadge = (type) => {
    const badges = {
        image: 'badge-info',
        document: 'badge-warning',
        certificate: 'badge-success',
        other: 'badge-secondary'
    };
    return badges[type] || 'badge-secondary';
};

const loadItems = async () => {
    loading.value = true;
    try {
        const response = await axiosInstance.get(`/members/?church_id=${churchId}`);
        items.value = response?.data?.data?.memberships || response?.data || [];
        churchName.value = response?.data?.data?.church_details?.church_name || '';
    } catch (error) {
        console.error('Error loading members:', error);
        showNotification('error', 'Error', 'Failed to load members');
    } finally {
        loading.value = false;
    }
};

const loadMemberRoles = async () => {
    try {
        const response = await axiosInstance.get('/member-roles/');
        memberRoles.value = response?.data?.data || response?.data || [];
    } catch (error) {
        console.error('Error loading member roles:', error);
    }
};


const loadMemberAttachments = async (memberId) => {
    try {
        const response = await axiosInstance.get(`/attachments/?target_type=member&target_id=${memberId}`);
        attachments.value = response?.data?.data || response?.data || [];
    } catch (error) {
        console.error('Error loading attachments:', error);
    }
};

const loadMemberRolesList = async (memberId) => {
    try {
        const response = await axiosInstance.get(`/member-member-roles/?member_id=${memberId}`);
        selectedMemberRoles.value = response?.data?.data || response?.data || [];
        selectedRoles.value = selectedMemberRoles.value.map(r => r.member_role || r.id);
    } catch (error) {
        console.error('Error loading member roles:', error);
    }
};

const toggleSelection = (id) => {
    if (selectedIds.value.includes(id)) {
        selectedIds.value = selectedIds.value.filter(i => i !== id);
    } else {
        selectedIds.value.push(id);
    }
};

const openModal = (item = null) => {
    if (item) {
        isEdit.value = true;
        form.value = { ...item };
    } else {
        isEdit.value = false;
        form.value = {
            id: null,
            church: churchId,
            membership_number: '',
            full_name: '',
            gender: '',
            date_of_birth: '',
            email: '',
            phone: '',
            address: '',
            occupation: '',
            education_level: '',
            marital_status: '',
            baptism_date: '',
            joined_date: '',
            profile_image: '',
            is_active: true
        };
    }
    modal.show();
};

const saveItem = async () => {
    if (!form.value.full_name) {
        showAlert('error', 'Member name is required');
        return;
    }
    if (!form.value.membership_number) {
        showAlert('error', 'Membership number is required');
        return;
    }
    
    loading.value = true;
    try {
        let res;
        if (isEdit.value) {
            res = await axiosInstance.put(`/members/${form.value.id}/`, form.value);
        } else {
            res = await axiosInstance.post('/members/', form.value);
        }
        
        if (res.status === 200 || res.status === 201) {
            showAlert('success', isEdit.value ? 'Member Updated Successfully' : 'Member Added Successfully');
            await loadItems();
            modal.hide();
        }
    } catch (error) {
        console.error('Error saving:', error);
        showNotification('error', 'Error', 'Failed to save member');
    } finally {
        loading.value = false;
    }
};

const deleteItem = async (item) => {
    const confirmed = await showAlert('warning', `Delete member "${item.full_name}"?`, 'This action cannot be undone', 'Yes, Delete');
    if (confirmed) {
        try {
            await axiosInstance.delete(`/members/${item.id}/`);
            showAlert('success', 'Member Deleted Successfully');
            await loadItems();
        } catch (error) {
            console.error('Error deleting:', error);
            showNotification('error', 'Error', 'Cannot delete member with existing records');
        }
    }
};

const deleteSelected = async () => {
    if (selectedIds.value.length === 0) return;
    const confirmed = await showAlert('warning', `Delete ${selectedIds.value.length} selected member(s)?`, 'This action cannot be undone', 'Yes, Delete');
    if (confirmed) {
        try {
            await axiosInstance.post('/members/bulk_delete/', { ids: selectedIds.value });
            selectedIds.value = [];
            showAlert('success', 'Members Deleted Successfully');
            await loadItems();
        } catch (error) {
            console.error('Error bulk deleting:', error);
            showNotification('error', 'Error', 'Failed to delete members');
        }
    }
};

const openMemberRoles = async (member) => {
    selectedMember.value = member;
    await loadMemberRolesList(member.id);
    rolesModal.show();
};

const saveMemberRoles = async () => {
    if (!selectedMember.value) return;
    
    try {
        await axiosInstance.post('/member-member-roles/sync/', {
            member_id: selectedMember.value.id,
            role_ids: selectedRoles.value
        });
        showAlert('success', 'Roles Updated Successfully');
        await loadItems();
        rolesModal.hide();
    } catch (error) {
        console.error('Error saving roles:', error);
        showNotification('error', 'Error', 'Failed to save roles');
    }
};

const removeRole = async (roleId) => {
    if (!selectedMember.value) return;
    
    try {
        await axiosInstance.delete(`/member-member-roles/${selectedMember.value.id}/${roleId}/`);
        await loadMemberRolesList(selectedMember.value.id);
        await loadItems();
        showAlert('success', 'Role Removed Successfully');
    } catch (error) {
        console.error('Error removing role:', error);
        showNotification('error', 'Error', 'Failed to remove role');
    }
};

const openAttachments = async (member) => {
    selectedMember.value = member;
    await loadMemberAttachments(member.id);
    attachmentsModal.show();
};

const onFileSelect = (event) => {
    selectedFile.value = event.target.files[0];
};

const uploadAttachment = async () => {
    if (!selectedFile.value || !selectedMember.value) return;
    
    const formData = new FormData();
    formData.append('file', selectedFile.value);
    formData.append('target_type', 'member');
    formData.append('target_id', selectedMember.value.id);
    formData.append('file_type', newAttachment.value.file_type);
    formData.append('description', newAttachment.value.description);
    
    try {
        await axiosInstance.post('/attachments/', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        await loadMemberAttachments(selectedMember.value.id);
        selectedFile.value = null;
        newAttachment.value = { file_type: 'document', description: '' };
        if (fileInput.value) fileInput.value.value = '';
        showAlert('success', 'Attachment Uploaded Successfully');
    } catch (error) {
        console.error('Error uploading attachment:', error);
        showNotification('error', 'Error', 'Failed to upload file');
    }
};

const deleteAttachment = async (attachmentId) => {
    const confirmed = await showAlert('warning', 'Delete this attachment?', 'This action cannot be undone', 'Yes, Delete');
    if (confirmed) {
        try {
            await axiosInstance.delete(`/attachments/${attachmentId}/`);
            await loadMemberAttachments(selectedMember.value.id);
            showAlert('success', 'Attachment Deleted Successfully');
        } catch (error) {
            console.error('Error deleting attachment:', error);
            showNotification('error', 'Error', 'Failed to delete attachment');
        }
    }
};

const onFormProfileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    const formData = new FormData();
    formData.append('image', file);
    formData.append('member_name', form.value.full_name);
    
    try {
        const response = await axiosInstance.post('/upload-member-image/', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        form.value.profile_image = response.data.image_url;
        showAlert('success', 'Profile Image Uploaded');
    } catch (error) {
        console.error('Error uploading image:', error);
        showNotification('error', 'Error', 'Failed to upload image');
    }
};

onMounted(() => {
    loadItems();
    loadMemberRoles();
    modal = new window.bootstrap.Modal(document.getElementById('itemModal'));
    rolesModal = new window.bootstrap.Modal(document.getElementById('memberRolesModal'));
    attachmentsModal = new window.bootstrap.Modal(document.getElementById('attachmentsModal'));
});
</script>

<style scoped>
.circle-icon {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    font-size: 18px;
    overflow: hidden;
}

.circle-icon-lg {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    font-size: 36px;
    overflow: hidden;
}

.gap-2 {
    gap: 0.5rem;
}

.gap-1 {
    gap: 0.25rem;
}

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

.small {
    font-size: 11px;
}
</style>