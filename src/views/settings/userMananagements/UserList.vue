<template>
    <div class="layout-px-spacing app-contacts">
        <teleport to="#breadcrumb">
            <ul class="navbar-nav flex-row">
                <li>
                    <div class="page-header">
                        <nav class="breadcrumb-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="javascript:;">Users</a></li>
                                <li class="breadcrumb-item active" aria-current="page"><span>User Management</span></li>
                            </ol>
                        </nav>
                    </div>
                </li>
            </ul>
        </teleport>

        <div class="row layout-spacing layout-top-spacing" id="cancel-row">
            <div class="col-lg-12">
                <div class="panel-body searchable-container" :class="[grid_type]">
                    <div class="row">
                        <div class="col-xl-4 col-lg-5 col-md-5 col-sm-7 filtered-list-search layout-spacing align-self-center">
                            <form class="form-inline my-2 my-lg-0">
                                <div class="">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="feather feather-search"
                                    >
                                        <circle cx="11" cy="11" r="8"></circle>
                                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                    </svg>
                                    <input type="text" v-model.trim="search_user" class="product-search form-control" @keyup="search_contacts" placeholder="Search Users..." />
                                </div>
                            </form>
                        </div>

                        <div class="col-xl-8 col-lg-7 col-md-7 col-sm-5 text-sm-end text-center layout-spacing align-self-center">
                            <div class="d-flex justify-content-sm-end justify-content-center">
                                <a href="javascript:;" @click="openUserModal">
                                    <svg
                                        id="btn-add-contact"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="feather feather-user-plus"
                                    >
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="8.5" cy="7" r="4"></circle>
                                        <line x1="20" y1="8" x2="20" y2="14"></line>
                                        <line x1="23" y1="11" x2="17" y2="11"></line>
                                    </svg>
                                </a>

                                <div class="switch align-self-center">
                                    <a href="javascript:;" @click="grid_type = 'list'">
                                        <svg
                                            :class="{ 'active-view': grid_type == 'list' }"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            class="feather feather-list view-list me-1"
                                        >
                                            <line x1="8" y1="6" x2="21" y2="6"></line>
                                            <line x1="8" y1="12" x2="21" y2="12"></line>
                                            <line x1="8" y1="18" x2="21" y2="18"></line>
                                            <line x1="3" y1="6" x2="3" y2="6"></line>
                                            <line x1="3" y1="12" x2="3" y2="12"></line>
                                            <line x1="3" y1="18" x2="3" y2="18"></line>
                                        </svg>
                                    </a>
                                    <a href="javascript:;" @click="grid_type = 'grid'">
                                        <svg
                                            :class="{ 'active-view': grid_type == 'grid' }"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            class="feather feather-grid view-grid"
                                        >
                                            <rect x="3" y="3" width="7" height="7"></rect>
                                            <rect x="14" y="3" width="7" height="7"></rect>
                                            <rect x="14" y="14" width="7" height="7"></rect>
                                            <rect x="3" y="14" width="7" height="7"></rect>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="searchable-items" :class="[grid_type]">
                        <div class="items items-header-section">
                            <div class="item-content">
                                <div class="">
                                    <div class="checkbox-primary custom-control custom-checkbox d-inline-block">
                                        <input id="chkALl" type="checkbox" :checked="check_all_checkbox" class="custom-control-input" @change="check_all($event.target.checked)" />
                                        <label class="custom-control-label" for="chkALl"> </label>
                                    </div>
                                    <h4>Username</h4>
                                </div>
                                <div class="user-email">
                                    <h4>Email</h4>
                                </div>
                                <div class="user-location">
                                    <h4 style="margin-left: 0">Phone</h4>
                                </div>
                                <div class="user-phone">
                                    <h4 style="margin-left: 3px">Status</h4>
                                </div>
                                <div class="action-btn">
                                    <a href="javascript:;" @click="delete_selected">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            class="feather feather-trash-2 delete-multiple"
                                        >
                                            <polyline points="3 6 5 6 21 6"></polyline>
                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                            <line x1="10" y1="11" x2="10" y2="17"></line>
                                            <line x1="14" y1="11" x2="14" y2="17"></line>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div v-for="(user, index) in filterd_contacts_list" class="items" :key="index">
                            <div class="item-content">
                                <div class="user-profile">
                                    <div class="checkbox-primary custom-control custom-checkbox" @click.stop="$event.stopPropagation()">
                                        <input type="checkbox" :id="`chk-${user.id}`" v-model="ids" class="custom-control-input" :value="user.id" />
                                        <label class="custom-control-label" :for="`chk-${user.id}`"></label>
                                    </div>
                                    <img :src="require(`@/assets/images/boy-1.png`)" alt="avatar" />

                                    <div class="user-meta-info">
                                        <p class="user-name">{{ user.username }}</p>
                                        <p class="user-work">{{ user.is_staff ? 'Admin' : 'User' }}</p>
                                    </div>
                                </div>
                                <div class="user-email">
                                    <p class="info-title">Email:</p>
                                    <p class="usr-email-addr">{{ user.email }}</p>
                                </div>
                                <div class="user-location">
                                    <p class="info-title">Phone:</p>
                                    <p class="usr-location">{{ user.phone_number || 'N/A' }}</p>
                                </div>
                                <div class="user-phone">
                                    <p class="info-title">Status:</p>
                                    <p class="usr-ph-no">
                                        <span :class="user.is_active ? 'badge badge-success' : 'badge badge-danger'">
                                            {{ user.is_active ? 'Active' : 'Inactive' }}
                                        </span>
                                    </p>
                                </div>
                                <div class="action-btn">
                                    <a href="javascript:;" class="me-1" @click="editUser(user)">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            class="feather feather-edit-2 edit"
                                        >
                                            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                                        </svg>
                                    </a>
                                    <a href="javascript:;" @click="deleteUser(user)">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            class="feather feather-user-minus delete"
                                        >
                                            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                            <circle cx="8.5" cy="7" r="4"></circle>
                                            <line x1="23" y1="11" x2="17" y2="11"></line>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- User Modal -->
                    <div id="userModal" class="modal fade" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-md modal-dialog-centered">
                            <div class="modal-content mailbox-popup">
                                <div class="modal-header">
                                    <h5 class="modal-title">{{ isEditMode ? 'Update User' : 'Add New User' }}</h5>
                                    <button type="button" data-dismiss="modal" data-bs-dismiss="modal" aria-label="Close" class="btn-close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="add-contact-box">
                                        <div class="add-contact-content">
                                            <form @submit.prevent="saveUser">
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <div class="form-group mb-4">
                                                            <label>Username *</label>
                                                            <input type="text" v-model="formData.username" class="form-control" placeholder="Username" required />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12">
                                                        <div class="form-group mb-4">
                                                            <label>Email *</label>
                                                            <input type="email" v-model="formData.email" class="form-control" placeholder="Email" required />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="form-group mb-4">
                                                            <label>Password {{ isEditMode ? '(Leave blank to keep current)' : '*' }}</label>
                                                            <input type="password" v-model="formData.password" class="form-control" placeholder="Password" :required="!isEditMode" />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group mb-4">
                                                            <label>Phone Number</label>
                                                            <input type="text" v-model="formData.phone_number" class="form-control" placeholder="Phone Number" />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="form-group mb-4">
                                                            <label>Role</label>
                                                            <select v-model="formData.is_staff" class="form-control">
                                                                <option :value="false">User</option>
                                                                <option :value="true">Admin</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group mb-4">
                                                            <label>Status</label>
                                                            <select v-model="formData.is_active" class="form-control">
                                                                <option :value="true">Active</option>
                                                                <option :value="false">Inactive</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="row" v-if="isEditMode">
                                                    <div class="col-md-12">
                                                        <div class="form-group mb-4">
                                                            <label>Verified</label>
                                                            <select v-model="formData.is_verified" class="form-control">
                                                                <option :value="true">Verified</option>
                                                                <option :value="false">Not Verified</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-default" data-dismiss="modal" data-bs-dismiss="modal">Cancel</button>
                                                    <button type="submit" class="btn btn-primary" :disabled="loading">
                                                        {{ loading ? 'Saving...' : (isEditMode ? 'Update User' : 'Add User') }}
                                                    </button>
                                                </div>
                                            </form>
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
</template>

<script setup>
    import { computed, onMounted, ref } from 'vue';
    import '@/assets/sass/apps/contacts.scss';
    import { useMeta } from '@/composables/use-meta';
    import { axiosInstance } from '@/services/axios';
    
    useMeta({ title: 'User Management' });

    let userModal = ref(null);
    const formData = ref({
        id: null,
        username: '',
        email: '',
        password: '',
        phone_number: '',
        is_active: true,
        is_verified: true,
        is_staff: false
    });
    
    const users_list = ref([]);
    const filterd_contacts_list = ref([]);
    const search_user = ref('');
    const ids = ref([]);
    const grid_type = ref('list');
    const loading = ref(false);
    const isEditMode = ref(false);

    // API Endpoints (Update these with your actual API URLs)
    const API_ENDPOINTS = {
        REGISTER: '/auth/register/',
        GET_ALL_USERS: '/auth/users/',  // You need to create this endpoint
        UPDATE_USER: '/auth/users/update/',  // /api/users/update/<id>/
        DELETE_USER: '/auth/users/delete/',  // /api/users/delete/<id>/
    };

    onMounted(() => {
        initModal();
        loadUsers();
    });

    const initModal = () => {
        userModal = new window.bootstrap.Modal(document.getElementById('userModal'));
    };

    const loadUsers = async () => {
        loading.value = true;
        try {
            const response = await axiosInstance.get(API_ENDPOINTS.GET_ALL_USERS);
            users_list.value = response.data.users || response.data;
            search_contacts();
        } catch (error) {
            console.error('Error loading users:', error);
            showMessage('Failed to load users', 'error');
        } finally {
            loading.value = false;
        }
    };

    const search_contacts = () => {
        if (!search_user.value) {
            filterd_contacts_list.value = users_list.value;
        } else {
            filterd_contacts_list.value = users_list.value.filter((d) => 
                d.username?.toLowerCase().includes(search_user.value.toLowerCase()) ||
                d.email?.toLowerCase().includes(search_user.value.toLowerCase())
            );
        }
    };

    const openUserModal = () => {
        isEditMode.value = false;
        resetForm();
        userModal.show();
    };

    const editUser = (user) => {
        isEditMode.value = true;
        formData.value = {
            id: user.id,
            username: user.username,
            email: user.email,
            password: '',
            phone_number: user.phone_number || '',
            is_active: user.is_active,
            is_verified: user.is_verified,
            is_staff: user.is_staff
        };
        userModal.show();
    };

    const saveUser = async () => {
        // Validation
        if (!formData.value.username) {
            showMessage('Username is required', 'error');
            return;
        }
        if (!formData.value.email) {
            showMessage('Email is required', 'error');
            return;
        }
        if (!isEditMode.value && !formData.value.password) {
            showMessage('Password is required', 'error');
            return;
        }

        loading.value = true;
        
        try {
            if (isEditMode.value) {
                // Update user
                const updateData = {
                    username: formData.value.username,
                    email: formData.value.email,
                    phone_number: formData.value.phone_number,
                    is_active: formData.value.is_active,
                    is_verified: formData.value.is_verified,
                    is_staff: formData.value.is_staff
                };
                
                if (formData.value.password) {
                    updateData.password = formData.value.password;
                }
                
                const response = await axiosInstance.put(
                    `${API_ENDPOINTS.UPDATE_USER}${formData.value.id}/`,
                    updateData
                );
                
                // Update user in list
                const index = users_list.value.findIndex(u => u.id === formData.value.id);
                if (index !== -1) {
                    users_list.value[index] = response.data.user || response.data;
                }
                
                showMessage('User updated successfully', 'success');
            } else {
                // Create new user
                const response = await axiosInstance.post(API_ENDPOINTS.REGISTER, {
                    username: formData.value.username,
                    email: formData.value.email,
                    password: formData.value.password,
                    phone_number: formData.value.phone_number,
                    is_active: formData.value.is_active,
                    is_verified: formData.value.is_verified,
                    is_staff: formData.value.is_staff
                });
                
                const newUser = response.data.user || response.data;
                users_list.value.unshift(newUser);
                showMessage('User created successfully', 'success');
            }
            
            search_contacts();
            userModal.hide();
            resetForm();
            
        } catch (error) {
            console.error('Save user error:', error);
            const errorMsg = error.response?.data?.error || error.response?.data?.message || 'Failed to save user';
            showMessage(errorMsg, 'error');
        } finally {
            loading.value = false;
        }
    };

    const deleteUser = async (user) => {
        const confirm = await window.Swal.fire({
            title: 'Are you sure?',
            text: `Delete user "${user.username}"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Yes, delete!'
        });
        
        if (confirm.isConfirmed) {
            loading.value = true;
            try {
                await axiosInstance.delete(`${API_ENDPOINTS.DELETE_USER}${user.id}/`);
                
                users_list.value = users_list.value.filter(u => u.id !== user.id);
                ids.value = ids.value.filter(id => id !== user.id);
                search_contacts();
                
                showMessage('User deleted successfully', 'success');
            } catch (error) {
                console.error('Delete user error:', error);
                showMessage('Failed to delete user', 'error');
            } finally {
                loading.value = false;
            }
        }
    };

    const delete_selected = async () => {
        if (!ids.value.length) {
            showMessage('Please select at least one user', 'info');
            return;
        }
        
        const confirm = await window.Swal.fire({
            title: 'Are you sure?',
            text: `Delete ${ids.value.length} selected user(s)?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Yes, delete all!'
        });
        
        if (confirm.isConfirmed) {
            loading.value = true;
            try {
                // Delete users one by one or use bulk delete endpoint
                const deletePromises = ids.value.map(id => 
                    axiosInstance.delete(`${API_ENDPOINTS.DELETE_USER}${id}/`)
                );
                
                await Promise.all(deletePromises);
                
                users_list.value = users_list.value.filter(u => !ids.value.includes(u.id));
                clearSelection();
                search_contacts();
                
                showMessage('Selected users deleted successfully', 'success');
            } catch (error) {
                console.error('Bulk delete error:', error);
                showMessage('Failed to delete some users', 'error');
            } finally {
                loading.value = false;
            }
        }
    };

    const check_all = (is_checked) => {
        if (is_checked) {
            ids.value = filterd_contacts_list.value.map(d => d.id);
        } else {
            clearSelection();
        }
    };

    const clearSelection = () => {
        ids.value = [];
    };

    const resetForm = () => {
        formData.value = {
            id: null,
            username: '',
            email: '',
            password: '',
            phone_number: '',
            is_active: true,
            is_verified: true,
            is_staff: false
        };
    };

    const showMessage = (msg = '', type = 'success') => {
        const toast = window.Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
        });
        toast.fire({
            icon: type,
            title: msg,
            padding: '10px 20px',
        });
    };

    const check_all_checkbox = computed(() => {
        return filterd_contacts_list.value.length && ids.value.length === filterd_contacts_list.value.length;
    });
</script>

<style scoped>
    .searchable-container .switch {
        width: auto;
        height: auto;
    }
    .searchable-container .searchable-items.grid .items .user-profile .custom-checkbox {
        display: none !important;
    }
    .badge-success {
        background-color: #28a745;
        color: white;
        padding: 5px 10px;
        border-radius: 4px;
    }
    .badge-danger {
        background-color: #dc3545;
        color: white;
        padding: 5px 10px;
        border-radius: 4px;
    }
</style>