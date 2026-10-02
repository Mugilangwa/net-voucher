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
                                <li class="breadcrumb-item active"><span>Leadership</span></li>
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
                                <h3>Leadership Management</h3>
                                <p>Manage church leadership and positions for {{ churchName }}</p>
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
                                        Add Leader
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
                            
                            <template #leader="props">
                                <div class="d-flex align-items-center">
                                    <div class="circle-icon me-2" :style="{ backgroundColor: getColor(props.row.id) }">
                                        <img v-if="props.row.profile_image && props.row.profile_image !== 'null'" 
                                             :src="getLeaderImage(props.row)" 
                                             class="rounded-circle w-100 h-100" 
                                             style="object-fit: cover;">
                                        <span v-else>{{ getInitial(props.row.leader_name) }}</span>
                                    </div>
                                    <div>
                                        <div class="fw-semibold">{{ props.row.leader_name }}</div>
                                        <small class="text-muted">{{ props.row.membership_number || 'Member' }}</small>
                                    </div>
                                </div>
                            </template>
                            
                            <template #title="props">
                                <div>
                                    <div class="fw-semibold">{{ props.row.role_name || props.row.position_name || 'Leader' }}</div>
                                    <small class="text-muted" v-if="props.row.position_name && props.row.role_name && props.row.role_name !== props.row.position_name">
                                        {{ props.row.position_name }}
                                    </small>
                                </div>
                            </template>
                            
                            <template #target_type="props">
                                <span class="badge" :class="getTargetBadge(props.row.target_type)">
                                    {{ formatTargetType(props.row.target_type) }}
                                </span>
                                <div class="small text-muted mt-1" v-if="props.row.target_name">
                                    {{ props.row.target_name }}
                                </div>
                            </template>
                            
                            <template #hierarchy_level="props">
                                <div class="text-center">
                                    <span class="badge" :class="getLevelBadge(props.row.hierarchy_level)">
                                        Level {{ props.row.hierarchy_level }}
                                    </span>
                                </div>
                            </template>
                            
                            <template #status="props">
                                <span :class="props.row.is_current ? 'badge-success' : 'badge-secondary'" class="badge">
                                    {{ props.row.is_current ? 'Current' : 'Former' }}
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
                        <h5 class="modal-title">{{ isEdit ? 'Edit Leader' : 'Add Leader' }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="saveItem">
                            <div class="form-group mb-3">
                                <label>Member (Leader) *</label>
                                <select v-model="form.leader" class="form-control" required>
                                    <option :value="null">Select Member</option>
                                    <option v-for="member in members" :key="member.id" :value="member.id">
                                        {{ member.full_name }} ({{ member.membership_number }})
                                    </option>
                                </select>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group mb-3">
                                        <label>Role (Cheo)</label>
                                        <select v-model="form.role" class="form-control">
                                            <option :value="null">Select Role</option>
                                            <option v-for="role in roles" :key="role.id" :value="role.id">
                                                {{ role.name_sw }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group mb-3">
                                        <label>Position (Jukumu)</label>
                                        <select v-model="form.position" class="form-control">
                                            <option :value="null">Select Position</option>
                                            <option v-for="pos in positions" :key="pos.id" :value="pos.id">
                                                {{ pos.name_sw }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label>Target (Where they lead)</label>
                                <select v-model="form.target_type" class="form-control" required @change="onTargetTypeChange">
                                    <option value="church">Church (Overall)</option>
                                    <option value="department">Department</option>
                                    <option value="group">Group</option>
                                </select>
                            </div>
                            
                            <div class="form-group mb-3" v-if="form.target_type === 'church'">
                                <input type="text" v-model="form.target_id" hidden="true">                               
                            </div>

                            <div class="form-group mb-3" v-if="form.target_type === 'department'">
                                <label>Department</label>
                                <select v-model="form.target_id" class="form-control">
                                    <option :value="null">Select Department</option>
                                    <option v-for="dept in departments" :key="dept.id" :value="dept.id">
                                        {{ dept.name }}
                                    </option>
                                </select>
                            </div>
                            
                            <div class="form-group mb-3" v-if="form.target_type === 'group'">
                                <label>Group</label>
                                <select v-model="form.target_id" class="form-control">
                                    <option :value="null">Select Group</option>
                                    <option v-for="grp in groups" :key="grp.id" :value="grp.id">
                                        {{ grp.name }} ({{ grp.department_name }})
                                    </option>
                                </select>
                            </div>
                            
                            <div class="form-group mb-3">
                                <label>Hierarchy Level (1=Highest)</label>
                                <input type="number" v-model="form.hierarchy_level" class="form-control" min="1">
                                <small class="text-muted">Lower numbers indicate higher authority</small>
                            </div>
                            
                            <div class="form-group mb-3">
                                <label>Status</label>
                                <select v-model="form.is_current" class="form-control">
                                    <option :value="true">Current</option>
                                    <option :value="false">Former</option>
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

useMeta({ title: 'Leadership' });

const route = useRoute();
const router = useRouter();
const churchId = route.params.id;
const churchName = ref('');

const items = ref([]);
const selectedIds = ref([]);
const members = ref([]);
const roles = ref([]);
const positions = ref([]);
const departments = ref([]);
const groups = ref([]);
const loading = ref(false);
const isLoadingData = ref(false);
const isEdit = ref(false);
let modal = null;

const form = ref({  
    id: null,
    leader: null,
    role: null,
    position: null,
    target_type: 'church',
    target_id: churchId,
    hierarchy_level: 1,
    is_current: true
});

const columns = ref(['id', 'leader', 'title', 'target_type', 'hierarchy_level', 'status', 'actions']);
const table_options = ref({
    perPage: 10,
    perPageValues: [10, 25, 50, 100],
    skin: 'table table-hover',
    sortable: ['leader_name', 'hierarchy_level'],
    filterable: ['leader_name', 'role_name', 'position_name', 'target_name'],
    headings: {
        id: '#',
        leader: 'Leader',
        title: 'Title',
        target_type: 'Target',
        hierarchy_level: 'Level',
        status: 'Status',
        actions: 'Actions'
    }
});

const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : 'L';
};

const getColor = (id) => {
    const colors = ['#4361ee', '#2196f3', '#ff9800', '#28a745', '#dc3545', '#6c757d'];
    return colors[id % colors.length];
};

const getLeaderImage = (leader) => {
    if (leader.profile_image && leader.profile_image !== 'null') {
        if (leader.profile_image.startsWith('http')) {
            return leader.profile_image;
        }
        const baseUrl = process.env.VUE_APP_API_URL || 'http://127.0.0.1:8000';
        return `${baseUrl}${leader.profile_image}`;
    }
    return '';
};

const getTargetBadge = (targetType) => {
    const badges = {
        church: 'badge-primary',
        department: 'badge-info',
        group: 'badge-warning'
    };
    return badges[targetType] || 'badge-secondary';
};

const getLevelBadge = (level) => {
    if (level === 1) return 'badge-danger';
    if (level === 2) return 'badge-warning';
    if (level === 3) return 'badge-info';
    return 'badge-secondary';
};

const formatTargetType = (type) => {
    const types = {
        church: 'Church',
        department: 'Department',
        group: 'Group'
    };
    return types[type] || type;
};

const onTargetTypeChange = () => {
    if (form.value.target_type === 'church') {
        form.value.target_id = churchId;
    } else {
        form.value.target_id = null;
    }
};

const loadChurchName = async () => {
    try {
        const response = await axiosInstance.get(`/churches/${churchId}/`);
        churchName.value = response.data.name;
    } catch (error) {
        console.error('Error loading church:', error);
    }
};

const loadItems = async () => {
    loading.value = true;
    try {
        const response = await axiosInstance.get(`/leadership/?target_id=${churchId}&target_type=church`);
        items.value = response?.data?.data?.leadership || response?.data || [];
        churchName.value = response?.data?.data?.church_details?.church_name || churchName.value;
    } catch (error) {
        console.error('Error loading leadership:', error);
        showNotification('error', 'Error', 'Failed to load leadership data');
    } finally {
        loading.value = false;
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

const loadRoles = async () => {
    try {
        const response = await axiosInstance.get('/roles/');
        roles.value = response?.data?.data || response?.data || [];
    } catch (error) {
        console.error('Error loading roles:', error);
    }
};

const loadPositions = async () => {
    try {
        const response = await axiosInstance.get('/positions/');
        positions.value = response?.data?.data || response?.data || [];
    } catch (error) {
        console.error('Error loading positions:', error);
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

const toggleSelection = (id) => {
    if (selectedIds.value.includes(id)) {
        selectedIds.value = selectedIds.value.filter(i => i !== id);
    } else {
        selectedIds.value.push(id);
    }
};

const openModal = async (item = null) => {

    await fetchFormData();
    if (item) {
        isEdit.value = true;
        form.value = {
            id: item.id,
            leader: item.leader,
            role: item.role,
            position: item.position,
            target_type: item.target_type,
            target_id: item.target_id,
            hierarchy_level: item.hierarchy_level,
            is_current: item.is_current
        };
    } else {
        isEdit.value = false;
        form.value = {
            id: null,
            leader: null,
            role: null,
            position: null,
            target_type: 'church',
            target_id: churchId,
            hierarchy_level: 1,
            is_current: true
        };
    }
    modal.show();
};

const saveItem = async () => {
    if (!form.value.leader) {
        showAlert('error', 'Please select a leader');
        return;
    }
    
    loading.value = true;
    try {
        let res;
        if (isEdit.value) {
            res = await axiosInstance.put(`/leadership/${form.value.id}/`, form.value);
        } else {
            res = await axiosInstance.post('/leadership/', { ...form.value, church: churchId });
        }
        
        if (res.status === 200 || res.status === 201) {
            showAlert('success', isEdit.value ? 'Leadership Updated Successfully' : 'Leader Added Successfully');
            await loadItems();
            modal.hide();
        }
    } catch (error) {
        console.error('Error saving:', error);
        showNotification('error', 'Error', 'Failed to save leadership data');
    } finally {
        loading.value = false;
    }
};

const deleteItem = async (item) => {
    const confirmed = await showAlert('warning', `Remove "${item.leader_name}" from leadership?`, 'This action cannot be undone', 'Yes, Remove');
    if (confirmed) {
        try {
            await axiosInstance.delete(`/leadership/${item.id}/`);
            showAlert('success', 'Leader Removed Successfully');
            await loadItems();
        } catch (error) {
            console.error('Error deleting:', error);
            showNotification('error', 'Error', 'Failed to remove leader');
        }
    }
};

const deleteSelected = async () => {
    if (selectedIds.value.length === 0) return;
    const confirmed = await showAlert('warning', `Remove ${selectedIds.value.length} selected leader(s)?`, 'This action cannot be undone', 'Yes, Remove');
    if (confirmed) {
        try {
            await axiosInstance.post('/leadership/bulk_delete/', { ids: selectedIds.value });
            selectedIds.value = [];
            showAlert('success', 'Leaders Removed Successfully');
            await loadItems();
        } catch (error) {
            console.error('Error bulk deleting:', error);
            showNotification('error', 'Error', 'Failed to remove leaders');
        }
    }
};

const fetchFormData = async () => {
    isLoadingData.value =  true
    try {
    const res = await axiosInstance.get(`/leadership-form-data/?church_id=${churchId}`);
    members.value = res?.data?.data?.members || [];
    roles.value = res?.data?.data?.roles || [];
    positions.value = res?.data?.data?.positions || [];
    departments.value = res?.data?.data?.departments || [];
    groups.value = res?.data?.data?.groups || [];   
    } catch (error) {
      console.error('Error fetching form data:', error);
      showNotification('error', 'Error', 'Failed to load form data');  
    }
    finally{
        isLoadingData.value = false;
    }
};

onMounted(() => {   
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

.badge-secondary { 
    background: #6c757d; 
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