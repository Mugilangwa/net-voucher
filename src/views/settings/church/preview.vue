<template>
    <div class="layout-px-spacing m-4">
        <teleport to="#breadcrumb">
            <ul class="navbar-nav flex-row">
                <li>
                    <div class="page-header">
                        <nav class="breadcrumb-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="javascript:;">Church</a></li>
                                <li class="breadcrumb-item active"><span>{{ church.name }}</span></li>
                            </ol>
                        </nav>
                    </div>
                </li>
            </ul>
        </teleport>

        <!-- Church Header Card -->
        <div class="row mb-4">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-start">
                            <div class="d-flex">
                                <div class="church-avatar me-4">
                                    <img 
                                        :src="getChurchImage(church)" 
                                        alt="Church Logo" 
                                        class="rounded-circle"
                                        style="width: 100px; height: 100px; object-fit: cover;"
                                    />
                                </div>
                                <div>
                                    <h2 class="mb-2">{{ church.name }}</h2>
                                    <p class="text-muted mb-1">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-1">
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                            <circle cx="12" cy="10" r="3"></circle>
                                        </svg>
                                        {{ church.location_name || 'Location not set' }}
                                    </p>
                                    <p class="text-muted mb-1">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-1">
                                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                        </svg>
                                        {{ church.phone || 'No phone' }}
                                    </p>
                                    <p class="text-muted">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-1">
                                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                            <polyline points="22,6 12,13 2,6"></polyline>
                                        </svg>
                                        {{ church.code }}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <router-link :to="'/parishi/edit/' + church.id" class="btn btn-primary">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-1">
                                        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                                    </svg>
                                    Edit Church
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Statistics Cards -->
        <div class="row mb-4">
            <div class="col-md-3 col-6 mb-3">
                <div class="card text-center">
                    <div class="card-body">
                        <div class="w-icon text-primary mb-2">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                            </svg>
                        </div>
                        <h3 class="mb-0">{{ stats.members }}</h3>
                        <p class="text-muted">Total Members</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3 col-6 mb-3">
                <div class="card text-center">
                    <div class="card-body">
                        <div class="w-icon text-success mb-2">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                            </svg>
                        </div>
                        <h3 class="mb-0">{{ stats.departments }}</h3>
                        <p class="text-muted">Departments</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3 col-6 mb-3">
                <div class="card text-center">
                    <div class="card-body">
                        <div class="w-icon text-warning mb-2">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"></path>
                                <path d="M8.5 8.5L12 12"></path>
                                <path d="M16 8.5L12 12"></path>
                            </svg>
                        </div>
                        <h3 class="mb-0">{{ stats.groups }}</h3>
                        <p class="text-muted">Groups</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3 col-6 mb-3">
                <div class="card text-center">
                    <div class="card-body">
                        <div class="w-icon text-danger mb-2">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                                <line x1="18" y1="8" x2="22" y2="8"></line>
                                <line x1="20" y1="6" x2="20" y2="10"></line>
                            </svg>
                        </div>
                        <h3 class="mb-0">{{ stats.leadership }}</h3>
                        <p class="text-muted">Leadership</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Quick Action Buttons -->
        <div class="row mb-4">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <h5 class="mb-3">Quick Actions</h5>
                        <div class="d-flex flex-wrap gap-4">
                            <router-link :to="'/church/' + church.id + '/departments'" class="btn btn-outline-primary">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-1">
                                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                                </svg>
                                Manage Departments
                            </router-link>
                            <router-link :to="'/church/' + church.id + '/leadership'" class="btn btn-outline-success">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-1">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                                Manage Leadership
                            </router-link>
                            <router-link :to="'/church/' + church.id + '/members'" class="btn btn-outline-info">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-1">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="9" cy="7" r="4"></circle>
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                </svg>
                                Manage Members
                            </router-link>
                            <router-link :to="'/church/' + church.id + '/groups'" class="btn btn-outline-warning">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-1">
                                    <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"></path>
                                    <path d="M8.5 8.5L12 12"></path>
                                    <path d="M16 8.5L12 12"></path>
                                </svg>
                                Manage Groups
                            </router-link>
                            <router-link :to="'/church/' + church.id + '/attachments'" class="btn btn-outline-secondary">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-1">
                                    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                                    <polyline points="13 2 13 9 20 9"></polyline>
                                </svg>
                                Attachments
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Recent Items Section -->
        <div class="row">
            <div class="col-md-6 mb-4">
                <div class="card">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <h5 class="mb-0">Recent Departments</h5>
                        <router-link :to="'/church/' + church.id + '/departments'" class="btn btn-sm btn-primary">View All</router-link>
                    </div>
                    <div class="card-body p-0">
                        <div class="table-responsive">
                            <table class="table table-hover mb-0">
                                <thead>
                                    <tr><th>Name</th><th>Status</th><th></th></tr>
                                </thead>
                                <tbody>
                                    <tr v-for="dept in recentDepartments" :key="dept.id">
                                        <td>{{ dept.name }}</td>
                                        <td><span :class="dept.is_active ? 'badge-success' : 'badge-danger'" class="badge">{{ dept.is_active ? 'Active' : 'Inactive' }}</span></td>
                                        <td class="text-end">
                                            <router-link :to="'/church/' + church.id + '/departments/edit/' + dept.id" class="btn btn-sm btn-icon">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                                                </svg>
                                            </router-link>
                                        </td>
                                    </tr>
                                    <tr v-if="recentDepartments.length === 0">
                                        <td colspan="3" class="text-center text-muted">No departments yet</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-6 mb-4">
                <div class="card">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <h5 class="mb-0">Recent Leadership</h5>
                        <router-link :to="'/church/' + church.id + '/leadership'" class="btn btn-sm btn-primary">View All</router-link>
                    </div>
                    <div class="card-body p-0">
                        <div class="table-responsive">
                            <table class="table table-hover mb-0">
                                <thead>
                                    <tr><th>Name</th><th>Position/Role</th><th></th></tr>
                                </thead>
                                <tbody>
                                    <tr v-for="leader in recentLeadership" :key="leader.id">
                                        <td>{{ leader.leader_name }}</td>
                                        <td>{{ leader.role_name }} {{ leader.position_name }}</td>
                                        <td class="text-end">
                                            <router-link :to="'/church/' + church.id + '/leadership/edit/' + leader.id" class="btn btn-sm btn-icon">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                                                </svg>
                                            </router-link>
                                        </td>
                                    </tr>
                                    <tr v-if="recentLeadership.length === 0">
                                        <td colspan="3" class="text-center text-muted">No leadership yet</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-6 mb-4">
                <div class="card">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <h5 class="mb-0">Recent Members</h5>
                        <router-link :to="'/church/' + church.id + '/members'" class="btn btn-sm btn-primary">View All</router-link>
                    </div>
                    <div class="card-body p-0">
                        <div class="table-responsive">
                            <table class="table table-hover mb-0">
                                <thead>
                                    <tr><th>Name</th><th>Membership No</th><th></th></tr>
                                </thead>
                                <tbody>
                                    <tr v-for="member in recentMembers" :key="member.id">
                                        <td>{{ member.full_name }}</td>
                                        <td>{{ member.membership_number }}</td>
                                        <td class="text-end">
                                            <router-link :to="'/church/' + church.id + '/members/edit/' + member.id" class="btn btn-sm btn-icon">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                                                </svg>
                                            </router-link>
                                        </td>
                                    </tr>
                                    <tr v-if="recentMembers.length === 0">
                                        <td colspan="3" class="text-center text-muted">No members yet</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-6 mb-4">
                <div class="card">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <h5 class="mb-0">Recent Groups</h5>
                        <router-link :to="'/church/' + church.id + '/groups'" class="btn btn-sm btn-primary">View All</router-link>
                    </div>
                    <div class="card-body p-0">
                        <div class="table-responsive">
                            <table class="table table-hover mb-0">
                                <thead>
                                    <tr><th>Name</th><th>Department</th><th></th></tr>
                                </thead>
                                <tbody>
                                    <tr v-for="group in recentGroups" :key="group.id">
                                        <td>{{ group.name }}</td>
                                        <td>{{ group.department_name }}</td>
                                        <td class="text-end">
                                            <router-link :to="'/church/' + church.id + '/groups/edit/' + group.id" class="btn btn-sm btn-icon">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                                                </svg>
                                            </router-link>
                                        </td>
                                    </tr>
                                    <tr v-if="recentGroups.length === 0">
                                        <td colspan="3" class="text-center text-muted">No groups yet</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { axiosInstance } from '@/services/axios';
import { useMeta } from '@/composables/use-meta';

useMeta({ title: 'Church Dashboard' });

const route = useRoute();
const churchId = route.params.id;

const church = ref({
    id: null,
    name: '',
    code: '',
    location_name: '',
    phone: '',
    profile_image: null
});

const stats = ref({
    members: 0,
    departments: 0,
    groups: 0,
    leadership: 0
});

const recentDepartments = ref([]);
const recentLeadership = ref([]);
const recentMembers = ref([]);
const recentGroups = ref([]);


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
    return '@/assets/img/profile.png';
};

// In your Vue component, replace multiple API calls with one
const loadCompleteChurchData = async () => {
    try {
        const response = await axiosInstance.get(`/churches/${churchId}/`);
        const data = response.data.data;
        
        // Set all data from single response
        church.value = data;
        stats.value = {
            members: data.stats.total_members,
            departments: data.stats.total_departments,
            groups: data.stats.total_groups,
            leadership: data.stats.total_leadership
        };
        
        // Recent items (take first 5 of each)
        recentDepartments.value = data.departments.slice(0, 5);
        recentMembers.value = data.members.slice(0, 5);
        recentLeadership.value = data.leadership?.slice(0, 5) || [];
        
        // Groups need to be extracted from departments
        const allGroups = data.departments.flatMap(dept => dept.groups || []);
        recentGroups.value = allGroups.slice(0, 5);
        
    } catch (error) {
        console.error('Error loading church data:', error);
    }
};

// In onMounted, replace all separate load functions with just this one



const loadStats = async () => {
    try {
        const [members, departments, groups, leadership] = await Promise.all([
            axiosInstance.get(`/members/?church_id=${churchId}`),
            axiosInstance.get(`/departments/?church_id=${churchId}`),
            axiosInstance.get(`/groups/?church_id=${churchId}`),
            axiosInstance.get(`/leadership/?church_id=${churchId}`)
        ]);
        stats.value.members = members.data.length;
        stats.value.departments = departments.data.length;
        stats.value.groups = groups.data.length;
        stats.value.leadership = leadership.data.length;
    } catch (error) {
        console.error('Error loading stats:', error);
    }
};

const loadRecentDepartments = async () => {
    try {
        const response = await axiosInstance.get(`/departments/?church_id=${churchId}&limit=5`);
        recentDepartments.value = response.data;
    } catch (error) {
        console.error('Error loading departments:', error);
    }
};

const loadRecentLeadership = async () => {
    try {
        const response = await axiosInstance.get(`/leadership/?church_id=${churchId}&limit=5`);
        recentLeadership.value = response.data;
    } catch (error) {
        console.error('Error loading leadership:', error);
    }
};

const loadRecentMembers = async () => {
    try {
        const response = await axiosInstance.get(`/members/?church_id=${churchId}&limit=5`);
        recentMembers.value = response.data;
    } catch (error) {
        console.error('Error loading members:', error);
    }
};

const loadRecentGroups = async () => {
    try {
        const response = await axiosInstance.get(`/groups/?church_id=${churchId}&limit=5`);
        recentGroups.value = response.data;
    } catch (error) {
        console.error('Error loading groups:', error);
    }
};

onMounted(() => {
    loadCompleteChurchData();
    // loadChurch();
    // loadStats();
    // loadRecentDepartments();
    // loadRecentLeadership();
    // loadRecentMembers();
    // loadRecentGroups();
});
</script>

<style scoped>
.gap-2 {
    gap: 0.5rem;
}
.church-avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    background: linear-gradient(135deg, #667eea, #764ba2);
}
.badge-success { background: #28a745; color: white; padding: 4px 10px; border-radius: 20px; font-size: 12px; }
.badge-danger { background: #dc3545; color: white; padding: 4px 10px; border-radius: 20px; font-size: 12px; }
.btn-icon {
    padding: 4px 8px;
}
</style>