<template>
    <div class="layout-px-spacing">
        <teleport to="#breadcrumb">
            <ul class="navbar-nav flex-row">
                <li>
                    <div class="page-header">
                        <nav class="breadcrumb-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="javascript:;">Churches</a></li>
                                <li class="breadcrumb-item active"><span>{{ isEdit ? 'Edit Church' : 'Add Church' }}</span></li>
                            </ol>
                        </nav>
                    </div>
                </li>
            </ul>
        </teleport>

       

        <div class="row layout-top-spacing">
            <div class="col-xl-12 col-lg-12 col-md-12">
                <div class="doc-container">
                    <form @submit.prevent="saveChurch">
                        <div class="row">
                            <!-- Left Column - Form Fields -->
                            <div class="col-xl-8">
                                <div class="invoice-content">
                                    <div class="invoice-detail-body">
                                        <div class="invoice-detail-header">
                                            <div class="row">
                                                <!-- Header -->
                                                <div class="col-12 mb-4">
                                                    <div class="d-flex align-items-center">
                                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4361ee" stroke-width="1.5" class="me-2">
                                                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                                            <polyline points="22,6 12,13 2,6"></polyline>
                                                        </svg>
                                                        <h3 class="mb-0">Church Registration Form</h3>
                                                    </div>
                                                    <hr>
                                                </div>
                                                
                                                <!-- Basic Information -->
                                                <div class="col-12 mb-3">
                                                    <h5 class="text-primary">Basic Information</h5>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group mb-4">
                                                        <label>Church Name *</label>
                                                        <input type="text" v-model="form.name" class="form-control" placeholder="Enter church name" required>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group mb-4">
                                                        <label>Church Code *</label>
                                                        <input type="text" v-model="form.code" class="form-control" placeholder="e.g., CCO-001" required>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group mb-4">
                                                        <label>Also Known As (AKA)</label>
                                                        <input type="text" v-model="form.aka" class="form-control" placeholder="Nickname">
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group mb-4">
                                                        <label>Phone Number</label>
                                                        <input type="text" v-model="form.phone" class="form-control" placeholder="Phone number">
                                                    </div>
                                                </div>
                                                
                                                <!-- Location Information -->
                                                <div class="col-12 mt-3 mb-3">
                                                    <h5 class="text-primary">Location Information</h5>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group mb-4">
                                                        <label>Administrative Location</label>
                                                        <select v-model="form.location" class="form-control">
                                                            <option :value="null">Select Location</option>
                                                            <option v-for="loc in locations" :key="loc.id" :value="loc.id">
                                                                {{ loc.full_path || loc.name }}
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group mb-4">
                                                        <label>Address</label>
                                                        <input v-model="form.address" class="form-control" placeholder="Full address"/>
                                                    </div>
                                                </div>
                                                <div class="col-12">
                                                    <div class="form-group mb-4">
                                                        <label>Description</label>
                                                        <textarea v-model="form.description" class="form-control" rows="3" placeholder="Church description"></textarea>
                                                    </div>
                                                </div>
                                                
                                                <!-- Geolocation Section -->
                                                <div class="col-12 mt-3 mb-3">
                                                    <h5 class="text-primary">Map Location</h5>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group mb-3">
                                                        <label>Latitude</label>
                                                        <input type="text" v-model="geolocation.coordinates.lat" class="form-control" placeholder="-6.8234">
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group mb-3">
                                                        <label>Longitude</label>
                                                        <input type="text" v-model="geolocation.coordinates.lng" class="form-control" placeholder="39.2345">
                                                    </div>
                                                </div>
                                                <div class="col-12 mb-3">
                                                    <div class="d-flex gap-2">
                                                        <button type="button" class="btn btn-sm btn-success" @click="getCurrentLocation">
                                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-1">
                                                                <circle cx="12" cy="12" r="10"></circle>
                                                                <polygon points="12 2 15 9 22 9 16 14 19 22 12 17 5 22 8 14 2 9 9 9 12 2"></polygon>
                                                            </svg>
                                                            Use My Current Location
                                                        </button>
                                                        <button type="button" class="btn btn-sm btn-info" @click="openGoogleMaps">
                                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-1">
                                                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                                                <circle cx="12" cy="10" r="3"></circle>
                                                            </svg>
                                                            Open Google Maps
                                                        </button>
                                                    </div>
                                                    <small class="text-muted">Click "Open Google Maps" to find your location, then copy coordinates above</small>
                                                </div>
                                                
                                                <!-- Status -->
                                                <div class="col-12 mt-3 mb-3">
                                                    <h5 class="text-primary">Status</h5>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group mb-4">
                                                        <label>Church Status</label>
                                                        <select v-model="form.is_active" class="form-control">
                                                            <option :value="true">Active</option>
                                                            <option :value="false">Inactive</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Right Column - Profile Picture -->
                            <div class="col-xl-4">
                                <div class="mb-5  d-flex justify-content-end">
                                     <router-link to="/parishi" class="btn btn-dark btn-sm"> Back</router-link>
                                </div>
                                <div class="invoice-actions-btn mt-3">
                                    <div class="card">
                                        <div class="card-header bg-outline-primary text-white">
                                            <h5 class="mb-0">Church Profile Picture</h5>
                                        </div>
                                        <div class="card-body text-center">
                                            <!-- Profile Picture Upload -->
                                            <div class="profile-upload-container mb-3">
                                                <div class="profile-preview" @click="triggerFileInput">
                                                    <img 
                                                        v-if="profilePreview" 
                                                        :src="profilePreview" 
                                                        alt="Church Profile" 
                                                        class="profile-image"
                                                    />
                                                    <div v-else class="profile-placeholder">
                                                        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#cbd5e0" stroke-width="1">
                                                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                                            <polyline points="22,6 12,13 2,6"></polyline>
                                                            <circle cx="12" cy="13" r="3"></circle>
                                                        </svg>
                                                        <p class="mt-2 text-muted">Click to upload</p>
                                                    </div>
                                                </div>
                                                <input 
                                                    type="file" 
                                                    ref="fileInput" 
                                                    @change="handleImageUpload" 
                                                    accept="image/*"
                                                    style="display: none"
                                                />
                                            </div>
                                            
                                            <div class="mt-2">
                                                <button type="button" class="btn btn-sm btn-outline-primary me-2" @click="triggerFileInput">
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-1">
                                                        <polyline points="16 16 12 12 8 16"></polyline>
                                                        <line x1="12" y1="12" x2="12" y2="21"></line>
                                                        <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
                                                        <polyline points="16 16 12 12 8 16"></polyline>
                                                    </svg>
                                                    Upload Photo
                                                </button>
                                                <button type="button" class="btn btn-sm btn-outline-danger" @click="removeImage" v-if="profilePreview">
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-1">
                                                        <polyline points="3 6 5 6 21 6"></polyline>
                                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                                    </svg>
                                                    Remove
                                                </button>
                                            </div>
                                            <small class="text-muted d-block mt-2">Recommended: Square image, max 2MB</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Submit and Cancel Buttons at the Bottom -->
                        <div class="row mt-4 mb-4">
                            <div class="col-12">
                                <div class="d-flex justify-content-end gap-3 p-3 bg-light rounded">
                                    <router-link to="/parishi" class="btn btn-secondary btn-lg px-4">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-2">
                                            <line x1="18" y1="6" x2="6" y2="18"></line>
                                            <line x1="6" y1="6" x2="18" y2="18"></line>
                                        </svg>
                                        Cancel
                                    </router-link>
                                    <button type="submit" class="btn btn-primary btn-lg px-5" :disabled="loading">
                                        <svg v-if="loading" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-2 spin">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <line x1="12" y1="2" x2="12" y2="6"></line>
                                            <line x1="12" y1="18" x2="12" y2="22"></line>
                                        </svg>
                                        <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-2">
                                            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                                            <polyline points="17 21 17 13 7 13 7 21"></polyline>
                                            <polyline points="7 3 7 8 15 8"></polyline>
                                        </svg>
                                        {{ loading ? 'Saving...' : (isEdit ? 'Update Church' : 'Save Church') }}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { axiosInstance } from '@/services/axios';
import { useMeta } from '@/composables/use-meta';
import { useNotification } from '@/composables/swal';

const { showAlert } = useNotification();

useMeta({ title: 'Church Form' });

const route = useRoute();
const router = useRouter();
const isEdit = ref(false);
const loading = ref(false);
const locations = ref([]);
const fileInput = ref(null);
const profilePreview = ref(null);
const profileImageFile = ref(null);

// Geolocation data
const geolocation = ref({
    id: null,
    name: '',
    geometry_type: 'point',
    coordinates: {
        lat: -6.8234,
        lng: 39.2345
    },
    metadata: {}
});

const form = ref({
    name: '',
    code: '',
    aka: '',
    phone: '',
    location: null,
    address: '',
    description: '',
    is_active: true,
    geolocation: null,
    profile_image: null
});

const loadLocations = async () => {
    try {
        const response = await axiosInstance.get('/locations/');
        locations.value = response.data;
    } catch (error) {
        console.error('Error loading locations:', error);
    }
};

const loadChurch = async (id) => {
    try {
        const response = await axiosInstance.get(`/churches/${id}/`);
        const data = response.data;
        form.value = {
            name: data.name,
            code: data.code,
            aka: data.aka || '',
            phone: data.phone || '',
            location: data.location,
            address: data.address || '',
            description: data.description || '',
            is_active: data.is_active,
            geolocation: data.geolocation,
            profile_image: data.profile_image
        };
        
        // Load profile image preview
        if (data.profile_image) {
            profilePreview.value = data.profile_image;
        }
        
        // Load geolocation if exists
        if (data.geolocation && data.geolocation.coordinates) {
            const coords = data.geolocation.coordinates;
            geolocation.value = {
                id: data.geolocation.id,
                name: `${data.name} Location`,
                geometry_type: 'point',
                coordinates: {
                    lat: coords.coordinates[1],
                    lng: coords.coordinates[0]
                },
                metadata: data.geolocation.metadata || {}
            };
        }
    } catch (error) {
        console.error('Error loading church:', error);
    }
};

// Image upload handlers
const triggerFileInput = () => {
    fileInput.value.click();
};

const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        // Check file size (max 2MB)
        if (file.size > 2 * 1024 * 1024) {
            showAlert('info','Image size should be less than 2MB');
            return;
        }
        
        // Check file type
        if (!file.type.startsWith('image/')) {
           showAlert('info','Please upload an image file');
            return;
        }
        
        profileImageFile.value = file;
        
        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
            profilePreview.value = e.target.result;
        };
        reader.readAsDataURL(file);
    }
};

const removeImage = () => {
    profilePreview.value = null;
    profileImageFile.value = null;
    form.value.profile_image = null;
    if (fileInput.value) {
        fileInput.value.value = '';
    }
};

// Get current location
const getCurrentLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                geolocation.value.coordinates.lat = latitude;
                geolocation.value.coordinates.lng = longitude;
                showAlert('error',`Location updated! Lat: ${latitude}, Lng: ${longitude}`);
            },
            (error) => {
                console.error('Error getting location:', error);
                showAlert('error','Unable to get your location. Please check browser permissions.');
            }
        );
    } else {
       showAlert('error','Geolocation is not supported by this browser.');
    }
};

// Open Google Maps
const openGoogleMaps = () => {
    const { lat, lng } = geolocation.value.coordinates;
    const url = `https://www.google.com/maps?q=${lat},${lng}&z=15`;
    window.open(url, '_blank');
};

// Upload image to server
const uploadImage = async () => {
    if (!profileImageFile.value) return null;
    
    const formData = new FormData();
    formData.append('image', profileImageFile.value);
    formData.append('church_name', form.value.name);
    
    try {
        const response = await axiosInstance.post('/upload-church-image/', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data.image_url;
    } catch (error) {
        console.error('Error uploading image:', error);
        return null;
    }
};


// Save church
const saveChurch = async () => {
    if (!form.value.name) {
        showAlert('error','Church name is required');
        return;
    }
    if (!form.value.code) {
       showAlert('error','Church code is required');
        return;
    }
    
    loading.value = true;
    
    try {
        // Upload image first if new image selected
        let imageUrl = form.value.profile_image;
        if (profileImageFile.value) {
            const uploadedUrl = await uploadImage();
            if (uploadedUrl) {
                imageUrl = uploadedUrl;
            }
        }
        
        let geolocationId = geolocation.value.id;
        
        // Create/update geolocation
        if (geolocation.value.coordinates.lat && geolocation.value.coordinates.lng) {
            const geoData = {
                name: `${form.value.name} Location`,
                geometry_type: 'point',
                coordinates: {
                    type: 'Point',
                    coordinates: [geolocation.value.coordinates.lng, geolocation.value.coordinates.lat]
                },
                metadata: {
                    church_name: form.value.name,
                    address: form.value.address
                },
                is_active: true
            };
            
            if (!geolocation.value.id) {
                const geoResponse = await axiosInstance.post('/geolocations/', geoData);
                geolocationId = geoResponse.data.id;
            } else {
                await axiosInstance.put(`/geolocations/${geolocation.value.id}/`, geoData);
            }
        }
        
        // Save church
        const churchData = {
            ...form.value,
            geolocation: geolocationId || null,
            profile_image: imageUrl
        };
        
        if (isEdit.value) {
            await axiosInstance.put(`/churches/${route.params.id}/`, churchData);
        } else {
            await axiosInstance.post('/churches/', churchData);
        }
        
        router.push('/parishi');
    } catch (error) {
        console.error('Error saving church:', error);
        showAlert('error',error.response?.data?.message || 'Error saving church');
    } finally {
        loading.value = false;
    }
};

onMounted(async () => {
    await loadLocations();
    if (route.params.id) {
        isEdit.value = true;
        await loadChurch(route.params.id);
    }
});
</script>

<style scoped>
/* Profile Picture Styles */
.profile-upload-container {
    cursor: pointer;
}

.profile-preview {
    width: 180px;
    height: 180px;
    margin: 0 auto;
    border-radius: 50%;
    overflow: hidden;
    border: 3px solid #e0e0e0;
    background-color: #f8f9fa;
    cursor: pointer;
    transition: all 0.3s ease;
}

.profile-preview:hover {
    border-color: #4361ee;
    transform: scale(1.02);
}

.profile-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.profile-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #f5f7fa, #e9ecef);
}

/* Button Styles */
.btn-lg {
    padding: 10px 24px;
    font-size: 16px;
}

.gap-3 {
    gap: 1rem;
}

.bg-light {
    background-color: #f8f9fa !important;
    border-radius: 12px;
}

/* Animation for loading spinner */
@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

.spin {
    animation: spin 1s linear infinite;
}

/* Form styling */
.form-group label {
    font-weight: 500;
    margin-bottom: 8px;
    color: #495057;
}

.form-control {
    border-radius: 8px;
    border: 1px solid #dee2e6;
    padding: 10px 12px;
    transition: all 0.3s ease;
}

.form-control:focus {
    border-color: #4361ee;
    box-shadow: 0 0 0 0.2rem rgba(67, 97, 238, 0.1);
}

.card {
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.card-header {
    background: linear-gradient(135deg, #4361ee, #3b37a5);
    padding: 15px 20px;
}
</style>