<template>
    <div class="layout-px-spacing apps-invoice-list mt-4">
        <teleport to="#breadcrumb">
            <ul class="navbar-nav flex-row">
                <li>
                    <div class="page-header">
                        <nav class="breadcrumb-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="javascript:;">Churches</a></li>
                                <li class="breadcrumb-item active"><span>Church List</span></li>
                            </ol>
                        </nav>
                    </div>
                </li>
            </ul>
        </teleport>
        

        <!-- Header with Graphics -->
        <div class="row mb-4">
            <div class="col-12">
                <div class="statbox widget box box-shadow">
                    <div class="widget-header">
                        <div class="row">
                            <div class="col-xl-12 col-md-12 col-sm-12 col-12">
                                <div class="d-flex justify-content-between align-items-center p-3">
                                    <div>
                                        <h4 class="mb-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="me-2">
                                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                                <polyline points="22,6 12,13 2,6"></polyline>
                                            </svg>
                                            Church Management
                                        </h4>
                                        <p class="text-muted mt-1">Manage all churches, their locations and details</p>
                                    </div>
                                    <div class="stats-info">
                                        <div class="d-flex gap-4">
                                            <div class="text-center">
                                                <div class="h3 mb-0 text-primary">{{ totalChurches }}</div>
                                                <small class="text-muted">Total Churches</small>
                                            </div>
                                            <div class="text-center">
                                                <div class="h3 mb-0 text-success">{{ activeChurches }}</div>
                                                <small class="text-muted">Active</small>
                                            </div>
                                            <div class="text-center">
                                                <div class="h3 mb-0 text-warning">{{ churchesWithImages }}</div>
                                                <small class="text-muted">With Images</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row layout-top-spacing">
            <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
                <div class="panel br-6">                       
                    
                   <Loader v-if="isLoading" />                  
                    <div v-else class="custom-table m-3">
                        <v-client-table :data="items" :columns="columns" :options="table_option" :loading="true">
                            <template #beforeFilter>
                                <div class="d-flex gap-2">
                                    <router-link to="/parishi/add" class="btn me-2 btn-primary">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-1">
                                            <line x1="12" y1="5" x2="12" y2="19"></line>
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                        </svg>
                                        Add New Church
                                    </router-link>
                                    <!-- <button type="button" class="btn ml-2 btn-danger" @click="deleteSelected">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-1">
                                            <polyline points="3 6 5 6 21 6"></polyline>
                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                        </svg>
                                        Delete Selected
                                    </button> -->
                                </div>
                            </template>
                            
                            <template #id="props">
                                <div class="checkbox-primary custom-control custom-checkbox">
                                    <input type="checkbox" class="custom-control-input" :id="'chk' + props.row.id" @change="toggleSelection(props.row.id)" />
                                    <label class="custom-control-label" :for="'chk' + props.row.id"></label>
                                </div>
                            </template>
                            
                            <!-- Church Name with Profile Image (with default fallback) -->
                            <template #name="props">
                                <div class="d-flex align-items-center">
                                    <div class="circle-avatar me-3">
                                        <img 
                                            :src="getChurchImage(props.row)" 
                                            :alt="props.row.name"
                                            @error="handleImageError(props.row)"
                                            class="profile-img"
                                        />
                                    </div>
                                    <div>
                                        <div class="fw-semibold">{{ props.row.name }}</div>
                                        <small class="text-muted">{{ props.row.aka || 'No alias' }}</small>
                                    </div>
                                </div>
                            </template>
                            
                            <template #code="props">
                                <span class="badge badge-info">{{ props.row.code }}</span>
                            </template>
                            
                            <template #location="props">
                                <div class="d-flex align-items-center">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-1 text-muted">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                        <circle cx="12" cy="10" r="3"></circle>
                                    </svg>
                                    {{ props.row.location_name || 'Not assigned' }}
                                </div>
                            </template>
                            
                            <template #phone="props">
                                <div class="d-flex align-items-center">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-1 text-muted">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                    </svg>
                                    {{ props.row.phone || 'No phone' }}
                                </div>
                            </template>
                            <template #status="props">
                                <div class="form-check form-switch">
                                    <input 
                                        class="form-check-input" 
                                        type="checkbox" 
                                        :checked="props.row.is_active"
                                        @change="toggleStatus(props.row)"
                                        :id="'status' + props.row.id"
                                    />
                                    <label class="form-check-label" :for="'status' + props.row.id">
                                        <span :class="props.row.is_active ? 'text-success' : 'text-danger'">
                                            {{ props.row.is_active ? 'Active' : 'Inactive' }}
                                        </span>
                                    </label>
                                </div>
                            </template>
                            
                            <template #actions="props">
                                <div class="action-buttons d-flex gap-2">
                                    <router-link :to="'/parishi/view/' + props.row.id" class="btn btn-sm btn-icon btn-outline-info" title="View Details">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                            <circle cx="12" cy="12" r="3"></circle>
                                        </svg>
                                    </router-link>
                                    <router-link :to="'/parishi/edit/' + props.row.id" class="btn btn-sm btn-icon btn-outline-primary" title="Edit Church">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                                        </svg>
                                    </router-link>
                                    <a href="javascript:;" @click="deleteChurch(props.row)" class="btn btn-sm btn-icon btn-outline-danger" title="Delete Church">
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
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { axiosInstance } from '@/services/axios';
import { useMeta } from '@/composables/use-meta';
import { useNotification } from '@/composables/swal';
import Loader from '@/components/plugins/loader.vue';

const { showAlert } = useNotification();

useMeta({ title: 'Church List' });

const items = ref([]);
const selectedIds = ref([]);
const isLoading  = ref(false);


const DEFAULT_CHURCH_IMAGE = '../assets/img/klpt.png';

const columns = ref(['id', 'name', 'code', 'location', 'phone', 'status', 'actions']);
const table_option = ref({
    perPage: 10,
    perPageValues: [10, 25, 50, 100],
    skin: 'table table-hover',
    columnsClasses: { 
        actions: 'text-center',
        name: 'col-name'
    },
    texts: { 
        filterPlaceholder: 'Search churches by name, code...',
        filter: '',
        count: 'Showing {from} to {to} of {count} churches'
    },
    sortable: ['name', 'code', 'location', 'phone'],
    filterable: ['name', 'code', 'location_name'],
    headings: {
        id: '#',
        name: 'Church Name',
        code: 'Code',
        location: 'Location',
        phone: 'Contact',
        status: 'Status',
        actions: 'Actions'
    }
});

// Computed properties
const totalChurches = computed(() => items.value.length);
const activeChurches = computed(() => items.value.filter(c => c.is_active).length);
const churchesWithImages = computed(() => items.value.filter(c => c.profile_image).length);

// Function to get church image (with default fallback)
const getChurchImage = (church) => {
    // Kama kuna profile_image, tumia hiyo
    if (church.profile_image && church.profile_image !== 'null') {
        // Check if it's a full URL or local path
        if (church.profile_image.startsWith('http')) {
            return church.profile_image;
        } else {
            // Kama ni local path, add base URL
            const baseUrl = process.env.VUE_APP_API_URL || 'http://127.0.0.1:8000';
            return `${baseUrl}${church.profile_image}`;
        }
    }    
    // Kama hakuna image, return default image
    return DEFAULT_CHURCH_IMAGE;
};

// Handle image load error - fallback to default
const handleImageError = (church) => {
    church.profile_image = null;
    // Optionally update the image src
    const imgElement = event.target;
    if (imgElement) {
        imgElement.src = DEFAULT_CHURCH_IMAGE;
    }
};

// Load churches
const loadChurches = async () => {
    isLoading.value = true;
    try {
        const response = await axiosInstance.get('/churches/');
        items.value = response.data;
    } catch (error) {
        console.error('Error loading churches:', error);
    } finally {
        isLoading.value = false;
    }
   
};

// Toggle selection
const toggleSelection = (id) => {
    if (selectedIds.value.includes(id)) {
        selectedIds.value = selectedIds.value.filter(i => i !== id);
    } else {
        selectedIds.value.push(id);
    }
};

// Toggle status
const toggleStatus = async (church) => {
    try {
        await axiosInstance.patch(`/churches/${church.id}/`, {
            is_active: !church.is_active
        });
        await loadChurches();
    } catch (error) {
        console.error('Error toggling status:', error);
    }
};

// Delete single church
const deleteChurch = async (church) => {
    if (confirm(`Delete church "${church.name}"?`)) {
        try {
            await axiosInstance.delete(`/churches/${church.id}/`);
            await loadChurches();
        } catch (error) {
            console.error('Error deleting church:', error);
        }
    }
};

// Delete selected churches
const deleteSelected = async () => {
    if (selectedIds.value.length === 0) {
        showAlert('info','Please select at least one church');
        return;
    }
    if (confirm(`Delete ${selectedIds.value.length} selected church(es)?`)) {
        try {
            await axiosInstance.post('/churches/bulk_delete/', { ids: selectedIds.value });
            selectedIds.value = [];
            await loadChurches();
        } catch (error) {
            console.error('Error deleting churches:', error);
        }
    }
};

onMounted(() => {
    loadChurches();
});
</script>

<style scoped>
/* Circle Avatar Styles */
.circle-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    flex-shrink: 0;
}

.profile-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

/* Action Buttons */
.action-buttons .btn-icon {
    width: 32px;
    height: 32px;
    padding: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    transition: all 0.3s ease;
}

.action-buttons .btn-icon:hover {
    transform: translateY(-2px);
}

.btn-outline-info {
    border: 1px solid #2196f3;
    color: #2196f3;
}
.btn-outline-info:hover {
    background-color: #2196f3;
    color: white;
}
.btn-outline-primary {
    border: 1px solid #4361ee;
    color: #4361ee;
}
.btn-outline-primary:hover {
    background-color: #4361ee;
    color: white;
}
.btn-outline-danger {
    border: 1px solid #dc3545;
    color: #dc3545;
}
.btn-outline-danger:hover {
    background-color: #dc3545;
    color: white;
}

/* Badges */
.badge-info {
    background: linear-gradient(135deg, #2196f3, #1976d2);
    color: white;
    padding: 5px 12px;
    border-radius: 20px;
    font-size: 12px;
}

/* Table Styling */
.custom-table :deep(.table) {
    border-collapse: separate;
    border-spacing: 0 8px;
}
.custom-table :deep(.table tbody tr) {
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.05);
    transition: all 0.3s ease;
}
.custom-table :deep(.table tbody tr:hover) {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0,0,0,0.1);
}
.custom-table :deep(.table td) {
    vertical-align: middle;
    padding: 15px;
    border: none;
}
.custom-table :deep(.table th) {
    background: #f8f9fa;
    padding: 12px 15px;
    font-weight: 600;
    color: #495057;
    border: none;
}

/* Stats Box */
.stats-info {
    background: linear-gradient(135deg, #f8f9fa, #e9ecef);
    padding: 10px 20px;
    border-radius: 12px;
}
.gap-4 {
    gap: 2rem;
}
.gap-2 {
    gap: 0.5rem;
}

/* Switch Toggle */
.form-check-input:checked {
    background-color: #28a745;
    border-color: #28a745;
}
.form-check-input:focus {
    box-shadow: none;
}
</style>