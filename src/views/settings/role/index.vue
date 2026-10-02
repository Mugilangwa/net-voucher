<template>
    <div class="layout-px-spacing">
        <teleport to="#breadcrumb">
            <ul class="navbar-nav flex-row">
                <li>
                    <div class="page-header">
                        <nav class="breadcrumb-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="javascript:;">Settings</a></li>
                                <li class="breadcrumb-item active"><span>Roles (Nyadhifa)</span></li>
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
                        <v-client-table :data="items" :columns="columns" :options="table_options">
                            <template #beforeFilter>
                                <button class="btn btn-primary" @click="openModal()">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-1">
                                        <line x1="12" y1="5" x2="12" y2="19"></line>
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                    </svg>
                                    Add Role
                                </button>
                            </template>
                            
                            <template #category="props">
                                <span class="badge" :class="getCategoryBadge(props.row.category)">
                                    {{ props.row.category }}
                                </span>
                            </template>
                            
                            <template #status="props">
                                <span :class="props.row.is_active ? 'badge-success' : 'badge-danger'" class="badge">
                                    {{ props.row.is_active ? 'Active' : 'Inactive' }}
                                </span>
                            </template>
                            
                            <template #actions="props">
                                <a href="javascript:;" class="me-2" @click="openModal(props.row)">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                                    </svg>
                                </a>
                                <a href="javascript:;" @click="deleteItem(props.row)">
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
                        <h5 class="modal-title">{{ isEdit ? 'Edit Role' : 'Add Role' }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="saveItem">
                            <div class="form-group mb-3">
                                <label>Name (Swahili) *</label>
                                <input type="text" v-model="form.name_sw" class="form-control" required>
                            </div>
                            <div class="form-group mb-3">
                                <label>Name (English)</label>
                                <input type="text" v-model="form.name_en" class="form-control">
                            </div>
                            <div class="form-group mb-3">
                                <label>Code *</label>
                                <input type="text" v-model="form.code" class="form-control" required>
                            </div>
                            <div class="form-group mb-3">
                                <label>Category</label>
                                <select v-model="form.category" class="form-control">
                                    <option value="pastoral">Pastoral (Wachungaji)</option>
                                    <option value="elder">Elder (Wazee)</option>
                                    <option value="deacon">Deacon (Mashemasi)</option>
                                </select>
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
import { axiosInstance } from '@/services/axios';
import { useMeta } from '@/composables/use-meta';

useMeta({ title: 'Roles' });

const items = ref([]);
const loading = ref(false);
const isEdit = ref(false);
let modal = null;

const form = ref({
    id: null,
    name_sw: '',
    name_en: '',
    code: '',
    category: 'pastoral',
    is_active: true
});

const columns = ref(['id', 'name_sw', 'name_en', 'code', 'category', 'status', 'actions']);
const table_options = ref({
    perPage: 10,
    perPageValues: [10, 25, 50, 100],
    skin: 'table table-hover',
    sortable: ['name_sw', 'code', 'category'],
    filterable: ['name_sw', 'name_en', 'code'],
    headings: {
        name_sw: 'Name (Swahili)',
        name_en: 'Name (English)',
        code: 'Code',
        category: 'Category',
        status: 'Status',
        actions: 'Actions'
    }
});

const getCategoryBadge = (category) => {
    const badges = { pastoral: 'badge-primary', elder: 'badge-info', deacon: 'badge-warning' };
    return badges[category] || 'badge-secondary';
};

const loadItems = async () => {
    try {
        const response = await axiosInstance.get('/roles/');
        items.value = response.data;
    } catch (error) {
        console.error('Error loading:', error);
    }
};

const openModal = (item = null) => {
    if (item) {
        isEdit.value = true;
        form.value = { ...item };
    } else {
        isEdit.value = false;
        form.value = { id: null, name_sw: '', name_en: '', code: '', category: 'pastoral', is_active: true };
    }
    modal.show();
};

const saveItem = async () => {
    if (!form.value.name_sw || !form.value.code) {
        alert('Name and Code are required');
        return;
    }
    
    loading.value = true;
    try {
        if (isEdit.value) {
            await axiosInstance.put(`/roles/${form.value.id}/`, form.value);
        } else {
            await axiosInstance.post('/roles/', form.value);
        }
        await loadItems();
        modal.hide();
    } catch (error) {
        console.error('Error saving:', error);
        alert('Error saving data');
    } finally {
        loading.value = false;
    }
};

const deleteItem = async (item) => {
    if (confirm(`Delete "${item.name_sw}"?`)) {
        try {
            await axiosInstance.delete(`/roles/${item.id}/`);
            await loadItems();
        } catch (error) {
            console.error('Error deleting:', error);
            alert('Error deleting data');
        }
    }
};

onMounted(() => {
    loadItems();
    modal = new window.bootstrap.Modal(document.getElementById('itemModal'));
});
</script>