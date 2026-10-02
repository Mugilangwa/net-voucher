<template>
    <div class="layout-px-spacing">
        <teleport to="#breadcrumb">
            <ul class="navbar-nav flex-row">
                <li>
                    <div class="page-header">
                        <nav class="breadcrumb-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="javascript:;">Locations</a></li>
                                <li class="breadcrumb-item active"><span>Location Management</span></li>
                            </ol>
                        </nav>
                    </div>
                </li>
            </ul>
        </teleport>

        <div class="row layout-top-spacing">
            <div class="col-xl-12 col-lg-12 col-sm-12">
                <div class="panel br-6">
                    <div class="custom-table">
                        <!-- Toolbar -->
                        <div class="d-flex justify-content-between align-items-center p-3">
                            <h4>Location Hierarchy</h4>
                            <button class="btn btn-primary" @click="openAddModal">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <line x1="12" y1="5" x2="12" y2="19"></line>
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                                Add Location
                            </button>
                        </div>

                        <!-- Tree View / Table View Toggle -->
                        <div class="btn-group m-3" role="group">
                            <button type="button" class="btn btn-sm" :class="viewMode === 'table' ? 'btn-primary' : 'btn-outline-primary'" @click="viewMode = 'table'">
                                Table View
                            </button>
                            <button type="button" class="btn btn-sm" :class="viewMode === 'tree' ? 'btn-primary' : 'btn-outline-primary'" @click="viewMode = 'tree'">
                                Tree View
                            </button>
                        </div>

                        <!-- Table View -->
                        <div v-if="viewMode === 'table'" class="table-responsive">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Type</th>
                                        <th>Parent</th>
                                        <th>Full Path</th>
                                        <th>Status</th>
                                        <th class="text-end">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="location in flattenedLocations" :key="location.id">
                                        <td>
                                            <span :style="{ marginLeft: (location.level * 20) + 'px' }">
                                                <span v-if="location.level > 0">└─ </span>
                                            </span>
                                            <span class="badge" :class="getTypeBadge(location.type)">
                                                {{ location.name }}
                                            </span>
                                        </td>
                                        <td>{{ getTypeLabel(location.type) }}</td>
                                        <td>{{ location.parent_name || '-' }}</td>
                                        <td>{{ location.full_path || location.name }}</td>
                                        <td>
                                            <span :class="location.is_active ? 'badge-success' : 'badge-danger'" class="badge">
                                                {{ location.is_active ? 'Active' : 'Inactive' }}
                                            </span>
                                        </td>
                                        <td class="text-end">
                                            <a href="javascript:;" class="me-2" @click="openAddModal(location)">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                    <circle cx="12" cy="12" r="10"></circle>
                                                    <line x1="12" y1="8" x2="12" y2="16"></line>
                                                    <line x1="8" y1="12" x2="16" y2="12"></line>
                                                </svg>
                                            </a>
                                            <a href="javascript:;" class="me-2" @click="openEditModal(location)">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                                                </svg>
                                            </a>
                                            <a href="javascript:;" @click="deleteLocation(location)">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                    <polyline points="3 6 5 6 21 6"></polyline>
                                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                                </svg>
                                            </a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <!-- Tree View -->
                        <div v-else class="tree-view p-3">
                            <LocationTreeNode 
                                v-for="location in treeLocations" 
                                :key="location.id"
                                :location="location"
                                :level="0"
                                @edit="openEditModal"
                                @add="openAddModal"
                                @delete="deleteLocation"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Location Modal (Add/Edit) -->
        <div id="locationModal" class="modal fade" aria-hidden="true">
            <div class="modal-dialog modal-md modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{{ isEdit ? 'Edit Location' : 'Add New Location' }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="saveLocation">
                            <div class="form-group mb-3">
                                <label>Location Name *</label>
                                <input type="text" v-model="form.name" class="form-control" required>
                            </div>
                            <div class="form-group mb-3">
                                <label>Location Type *</label>
                                <select v-model="form.type" class="form-control" required>
                                    <option value="">Select Type</option>
                                    <option value="country">Country</option>
                                    <option value="region">Region</option>
                                    <option value="district">District</option>
                                    <option value="ward">Ward</option>
                                </select>
                            </div>
                            <div class="form-group mb-3">
                                <label>Parent Location</label>
                                <select v-model="form.parent" class="form-control">
                                    <option :value="null">None (Top Level)</option>
                                    <option v-for="loc in parentOptions" :key="loc.id" :value="loc.id" :disabled="loc.id === form.id">
                                        {{ loc.full_path || loc.name }}
                                    </option>
                                </select>
                                <small class="text-muted">Parent must be of higher level (Country → Region → District → Ward)</small>
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
                        <button type="button" class="btn btn-default" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" @click="saveLocation" :disabled="loading">
                            {{ loading ? 'Saving...' : (isEdit ? 'Update' : 'Save') }}
                        </button>
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

useMeta({ title: 'Location Management' });

// Components
import LocationTreeNode from './LocationTreeNode.vue';

// State
const locations = ref([]);
const viewMode = ref('tree');
const isEdit = ref(false);
const loading = ref(false);
let locationModal = null;

const form = ref({
    id: null,
    name: '',
    type: '',
    parent: null,
    is_active: true
});

// Computed
const flattenedLocations = computed(() => {
    const flat = [];
    const flatten = (items, level = 0, parent = null) => {
        items.forEach(item => {
            flat.push({
                ...item,
                level,
                parent_name: parent?.name || item.parent_name
            });
            if (item.children && item.children.length) {
                flatten(item.children, level + 1, item);
            }
        });
    };
    flatten(treeLocations.value);
    return flat;
});

const treeLocations = computed(() => {
    const buildTree = (items, parentId = null) => {
        return items
            .filter(item => item.parent === parentId)
            .map(item => ({
                ...item,
                children: buildTree(items, item.id)
            }));
    };
    return buildTree(locations.value);
});

const parentOptions = computed(() => {
    // Filter valid parents based on type hierarchy
    const typeOrder = { country: 1, region: 2, district: 3, ward: 4 };
    const currentTypeOrder = typeOrder[form.value.type] || 0;
    
    return locations.value.filter(loc => {
        // Can't be its own parent
        if (loc.id === form.value.id) return false;
        // Parent must be higher level
        const parentTypeOrder = typeOrder[loc.type] || 0;
        return parentTypeOrder < currentTypeOrder;
    });
});

// Methods
const getTypeBadge = (type) => {
    const badges = {
        country: 'badge-primary',
        region: 'badge-info',
        district: 'badge-warning',
        ward: 'badge-secondary'
    };
    return badges[type] || 'badge-light';
};

const getTypeLabel = (type) => {
    const labels = {
        country: 'Country',
        region: 'Region',
        district: 'District',
        ward: 'Ward'
    };
    return labels[type] || type;
};

const loadLocations = async () => {
    try {
        const response = await axiosInstance.get('/locations/');
        locations.value = response.data;
    } catch (error) {
        console.error('Error loading locations:', error);
    }
};

const openAddModal = (parentLocation = null) => {
    isEdit.value = false;
    form.value = {
        id: null,
        name: '',
        type: '',
        parent: parentLocation ? parentLocation.id : null,
        is_active: true
    };
    
    // If parent exists, suggest type based on parent
    if (parentLocation) {
        const typeMap = { country: 'region', region: 'district', district: 'ward' };
        form.value.type = typeMap[parentLocation.type] || '';
    }
    
    locationModal.show();
};

const openEditModal = (location) => {
    isEdit.value = true;
    form.value = {
        id: location.id,
        name: location.name,
        type: location.type,
        parent: location.parent,
        is_active: location.is_active
    };
    locationModal.show();
};

const saveLocation = async () => {
    if (!form.value.name) {
        alert('Location name is required');
        return;
    }
    if (!form.value.type) {
        alert('Location type is required');
        return;
    }
    
    loading.value = true;
    try {
        if (isEdit.value) {
            await axiosInstance.put(`/locations/${form.value.id}/`, form.value);
        } else {
            await axiosInstance.post('/locations/', form.value);
        }
        await loadLocations();
        locationModal.hide();
    } catch (error) {
        console.error('Error saving location:', error);
        alert(error.response?.data?.message || 'Error saving location');
    } finally {
        loading.value = false;
    }
};

const deleteLocation = async (location) => {
    const hasChildren = treeLocations.value.some(l => l.parent === location.id);
    const message = hasChildren 
        ? `Location "${location.name}" has children. Deleting it will also delete all sub-locations. Continue?`
        : `Delete location "${location.name}"?`;
    
    if (confirm(message)) {
        try {
            await axiosInstance.delete(`/locations/${location.id}/`);
            await loadLocations();
        } catch (error) {
            console.error('Error deleting location:', error);
            alert('Cannot delete location with existing churches');
        }
    }
};

// Lifecycle
onMounted(() => {
    loadLocations();
    locationModal = new window.bootstrap.Modal(document.getElementById('locationModal'));
});
</script>

<style scoped>
.badge-primary { background-color: #4361ee; color: white; padding: 5px 10px; border-radius: 4px; }
.badge-info { background-color: #2196f3; color: white; padding: 5px 10px; border-radius: 4px; }
.badge-warning { background-color: #ff9800; color: white; padding: 5px 10px; border-radius: 4px; }
.badge-secondary { background-color: #6c757d; color: white; padding: 5px 10px; border-radius: 4px; }
.badge-success { background-color: #28a745; color: white; padding: 5px 10px; border-radius: 4px; }
.badge-danger { background-color: #dc3545; color: white; padding: 5px 10px; border-radius: 4px; }
.tree-view {
    min-height: 400px;
}
</style>