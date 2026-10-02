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
                                <li class="breadcrumb-item active"><span>Groups</span></li>
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
                                <h3>Group Management</h3>
                                <p>Manage all groups and small groups for {{ churchName }}</p>
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
                                        Add Group
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
                                        <span>{{ getInitial(props.row.name) }}</span>
                                    </div>
                                    <div>
                                        <div class="fw-semibold">{{ props.row.name }}</div>
                                        <small class="text-muted">{{ props.row.department_name }}</small>
                                    </div>
                                </div>
                            </template>
                            
                            <template #meeting="props">
                                <div v-if="props.row.meeting_day || props.row.meeting_time">
                                    <div class="fw-semibold">{{ props.row.meeting_day || 'Not set' }}</div>
                                    <small class="text-muted">{{ props.row.meeting_time || '' }}</small>
                                    <div v-if="props.row.meeting_venue" class="small text-muted mt-1">
                                        📍 {{ props.row.meeting_venue }}
                                    </div>
                                </div>
                                <div v-else class="text-muted">Not scheduled</div>
                            </template>
                            
                            <template #status="props">
                                <span :class="props.row.is_active ? 'badge-success' : 'badge-danger'" class="badge">
                                    {{ props.row.is_active ? 'Active' : 'Inactive' }}
                                </span>
                            </template>
                            
                            <template #actions="props">
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

        <!-- Modal -->
        <div class="modal fade" id="itemModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-md modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{{ isEdit ? 'Edit Group' : 'Add Group' }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="saveItem">
                            <div class="form-group mb-3">
                                <label>Group Name *</label>
                                <input type="text" v-model="form.name" class="form-control" required placeholder="e.g., Worship Team, Bible Study Group">
                            </div>
                            
                            <div class="form-group mb-3">
                                <label>Department *</label>
                                <select v-model="form.department" class="form-control" required>
                                    <option :value="null">Select Department</option>
                                    <option v-for="dept in departments" :key="dept.id" :value="dept.id">
                                        {{ dept.name }}
                                    </option>
                                </select>
                            </div>
                            
                            <div class="form-group mb-3">
                                <label>Description</label>
                                <textarea v-model="form.description" class="form-control" rows="2" placeholder="Group description and purpose"></textarea>
                            </div>
                            
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group mb-3">
                                        <label>Meeting Day</label>
                                        <select v-model="form.meeting_day" class="form-control">
                                            <option value="">Select Day</option>
                                            <option value="Monday">Monday</option>
                                            <option value="Tuesday">Tuesday</option>
                                            <option value="Wednesday">Wednesday</option>
                                            <option value="Thursday">Thursday</option>
                                            <option value="Friday">Friday</option>
                                            <option value="Saturday">Saturday</option>
                                            <option value="Sunday">Sunday</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group mb-3">
                                        <label>Meeting Time</label>
                                        <input type="time" v-model="form.meeting_time" class="form-control">
                                    </div>
                                </div>
                            </div>
                            
                            <div class="form-group mb-3">
                                <label>Meeting Venue</label>
                                <input type="text" v-model="form.meeting_venue" class="form-control" placeholder="e.g., Main Hall, Room 101, Online (Zoom)">
                            </div>
                            
                            <div class="form-group mb-3">
                                <label>Status</label>
                                <select v-model="form.is_active" class="form-control">
                                    <option :value="true">Active</option>
                                    <option :value="false">Inactive</option>
                                </select>
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

useMeta({ title: 'Groups' });

const route = useRoute();
const router = useRouter();
const churchId = route.params.id;
const churchName = ref('');

const items = ref([]);
const departments = ref([]);
const selectedIds = ref([]);
const loading = ref(false);
const isEdit = ref(false);
let modal = null;

const form = ref({
    id: null,
    department: null,
    name: '',
    description: '',
    meeting_day: '',
    meeting_time: '',
    meeting_venue: '',
    is_active: true
});

const columns = ref(['id', 'name', 'meeting', 'status', 'actions']);
const table_options = ref({
    perPage: 10,
    perPageValues: [10, 25, 50, 100],
    skin: 'table table-hover',
    sortable: ['name'],
    filterable: ['name', 'department_name', 'description'],
    headings: {
        id: '#',
        name: 'Group Name',
        meeting: 'Meeting Schedule',
        status: 'Status',
        actions: 'Actions'
    }
});

const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : 'G';
};

const getColor = (id) => {
    const colors = ['#4361ee', '#2196f3', '#ff9800', '#28a745', '#dc3545', '#6c757d'];
    return colors[id % colors.length];
};

const loadChurchName = async () => {
    try {
        const response = await axiosInstance.get(`/churches/${churchId}/`);
        churchName.value = response.data.name;
    } catch (error) {
        console.error('Error loading church:', error);
    }
};

const loadDepartments = async () => {
    try {
        const response = await axiosInstance.get(`/departments/?church_id=${churchId}`);
        departments.value = response?.data?.data?.departments || response?.data || [];
    } catch (error) {
        console.error('Error loading departments:', error);
        showNotification('error', 'Error', 'Failed to load departments');
    }
};

const loadItems = async () => {
    loading.value = true;
    try {
        const response = await axiosInstance.get(`/groups/?church_id=${churchId}`);
        items.value = response?.data?.data?.groups || response?.data || [];
        churchName.value = response?.data?.data?.church_details?.church_name || churchName.value;
    } catch (error) {
        console.error('Error loading groups:', error);
        showNotification('error', 'Error', 'Failed to load groups');
    } finally {
        loading.value = false;
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
            department: null,
            name: '',
            description: '',
            meeting_day: '',
            meeting_time: '',
            meeting_venue: '',
            is_active: true
        };
    }
    modal.show();
};

const saveItem = async () => {
    if (!form.value.name) {
        showAlert('error', 'Group name is required');
        return;
    }
    if (!form.value.department) {
        showAlert('error', 'Please select a department');
        return;
    }
    
    loading.value = true;
    try {
        let res;
        if (isEdit.value) {
            res = await axiosInstance.put(`/groups/${form.value.id}/`, form.value);
        } else {
            res = await axiosInstance.post('/groups/', form.value);
        }
        
        if (res.status === 200 || res.status === 201) {
            showAlert('success', isEdit.value ? 'Group Updated Successfully' : 'Group Added Successfully');
            await loadItems();
            modal.hide();
        }
    } catch (error) {
        console.error('Error saving:', error);
        showNotification('error', 'Error', 'Failed to save group');
    } finally {
        loading.value = false;
    }
};

const deleteItem = async (item) => {
    const confirmed = await showAlert('warning', `Delete group "${item.name}"?`, 'This action cannot be undone', 'Yes, Delete');
    if (confirmed) {
        try {
            await axiosInstance.delete(`/groups/${item.id}/`);
            showAlert('success', 'Group Deleted Successfully');
            await loadItems();
        } catch (error) {
            console.error('Error deleting:', error);
            showNotification('error', 'Error', 'Cannot delete group with existing members');
        }
    }
};

const deleteSelected = async () => {
    if (selectedIds.value.length === 0) return;
    const confirmed = await showAlert('warning', `Delete ${selectedIds.value.length} selected group(s)?`, 'This action cannot be undone', 'Yes, Delete');
    if (confirmed) {
        try {
            await axiosInstance.post('/groups/bulk_delete/', { ids: selectedIds.value });
            selectedIds.value = [];
            showAlert('success', 'Groups Deleted Successfully');
            await loadItems();
        } catch (error) {
            console.error('Error bulk deleting:', error);
            showNotification('error', 'Error', 'Failed to delete groups');
        }
    }
};

onMounted(() => {
    loadChurchName();
    loadDepartments();
    loadItems();
    modal = new window.bootstrap.Modal(document.getElementById('itemModal'));
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

.gap-2 {
    gap: 0.5rem;
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