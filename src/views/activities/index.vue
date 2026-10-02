<template>
    <div class="layout-px-spacing">
        <teleport to="#breadcrumb">
            <ul class="navbar-nav flex-row">
                <li>
                    <div class="page-header">
                        <nav class="breadcrumb-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="javascript:;">Apps</a></li>
                                <li class="breadcrumb-item active" aria-current="page"><span>Events</span></li>
                            </ol>
                        </nav>
                    </div>
                </li>
            </ul>
        </teleport>

        <div class="layout-px-spacing">
            <div class="row app-notes layout-top-spacing layout-spacing" id="cancel-row">
                <div class="col-lg-12">
                    <div class="app-hamburger-container">
                        <div class="hamburger" @click="is_show_event_menu = !is_show_event_menu">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-menu chat-menu d-xl-none">
                                <line x1="3" y1="12" x2="21" y2="12"></line>
                                <line x1="3" y1="6" x2="21" y2="6"></line>
                                <line x1="3" y1="18" x2="21" y2="18"></line>
                            </svg>
                        </div>
                    </div>

                    <div class="app-container">
                        <div class="app-note-container">
                            <div class="app-note-overlay" :class="{ 'app-note-overlay-show': is_show_event_menu }" @click="is_show_event_menu = false"></div>

                            <!-- Sidebar Menu -->
                            <div class="tab-title" :class="{ 'note-menu-show': is_show_event_menu }">
                                <div class="row">
                                    <div class="col-md-12 col-sm-12 col-12 text-center">
                                        <a class="btn btn-primary" href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#eventsModal" @click="edit_event()">Add Event</a>
                                    </div>
                                    <div class="col-md-12 col-sm-12 col-12 mt-5">
                                        <ul class="nav nav-pills d-block" id="pills-tab3" role="tablist">
                                            <li class="nav-item">
                                                <a class="nav-link list-actions" :class="{ active: selected_tab == 'all' }" @click="tab_changed('all')">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-calendar">
                                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                                        <line x1="16" y1="2" x2="16" y2="6"></line>
                                                        <line x1="8" y1="2" x2="8" y2="6"></line>
                                                        <line x1="3" y1="10" x2="21" y2="10"></line>
                                                    </svg>
                                                    All Events
                                                </a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link list-actions" :class="{ active: selected_tab == 'upcoming' }" @click="tab_changed('upcoming')">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-clock">
                                                        <circle cx="12" cy="12" r="10"></circle>
                                                        <polyline points="12 6 12 12 16 14"></polyline>
                                                    </svg>
                                                    Upcoming
                                                </a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link list-actions" :class="{ active: selected_tab == 'ongoing' }" @click="tab_changed('ongoing')">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-play-circle">
                                                        <circle cx="12" cy="12" r="10"></circle>
                                                        <polygon points="10 8 16 12 10 16 10 8"></polygon>
                                                    </svg>
                                                    Ongoing
                                                </a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link list-actions" :class="{ active: selected_tab == 'completed' }" @click="tab_changed('completed')">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check-circle">
                                                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                                    </svg>
                                                    Completed
                                                </a>
                                            </li>
                                        </ul>

                                        <hr />

                                        <p class="group-section">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-tag">
                                                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                                                <line x1="7" y1="7" x2="7" y2="7"></line>
                                            </svg>
                                            Event Type
                                        </p>

                                        <ul class="nav nav-pills d-block group-list" id="pills-tab" role="tablist">
                                            <li class="nav-item">
                                                <a class="nav-link list-actions g-dot-primary" :class="{ active: selected_tab == 'event' }" @click="tab_changed('event')">Events</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link list-actions g-dot-success" :class="{ active: selected_tab == 'activity' }" @click="tab_changed('activity')">Activities</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link list-actions g-dot-warning" :class="{ active: selected_tab == 'announcement' }" @click="tab_changed('announcement')">Announcements</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <!-- Events Grid -->
                            <div id="ct" class="note-container note-grid">
                                <div v-for="(event, index) in filtered_events_list" class="note-item all-notes" :class="event_class(event)" :key="index">
                                    <div class="note-inner-content">
                                        <div class="note-content">
                                            <div v-if="event.image" class="event-image mb-2">
                                                <img :src="event.image" alt="Event" style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px;">
                                            </div>
                                            <p class="note-title">{{ event.title }}</p>
                                            <p class="meta-time">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-1">
                                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                                    <line x1="16" y1="2" x2="16" y2="6"></line>
                                                    <line x1="8" y1="2" x2="8" y2="6"></line>
                                                    <line x1="3" y1="10" x2="21" y2="10"></line>
                                                </svg>
                                                {{ format_date(event.start_date) }} 
                                                <span v-if="event.end_date"> - {{ format_date(event.end_date) }}</span>
                                            </p>
                                            <p class="meta-time" v-if="event.start_time || event.end_time">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-1">
                                                    <circle cx="12" cy="12" r="10"></circle>
                                                    <polyline points="12 6 12 12 16 14"></polyline>
                                                </svg>
                                                {{ event.start_time || '' }} {{ event.end_time ? '- ' + event.end_time : '' }}
                                            </p>
                                            <p class="meta-time" v-if="event.location">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-1">
                                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                                    <circle cx="12" cy="10" r="3"></circle>
                                                </svg>
                                                {{ event.location }}
                                            </p>
                                            <div class="note-description-content">
                                                <p class="note-description">{{ event.description }}</p>
                                            </div>
                                            <div class="mt-2" v-if="event.organizers && event.organizers.length > 0">
                                                <small class="text-muted">Organizers: {{ event.organizers.length }}</small>
                                            </div>
                                        </div>
                                        <div class="note-action">
                                            <a href="javascript:;" @click="edit_event(event)">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2">
                                                    <path d="M17 3l4 4-7 7H10v-3l7-7z"></path>
                                                    <path d="M4 20h16"></path>
                                                </svg>
                                            </a>
                                            <a href="javascript:;" @click="delete_event(event)">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2 delete-note">
                                                    <polyline points="3 6 5 6 21 6"></polyline>
                                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                                    <line x1="10" y1="11" x2="10" y2="17"></line>
                                                    <line x1="14" y1="11" x2="14" y2="17"></line>
                                                </svg>
                                            </a>
                                        </div>
                                        <div class="note-footer">
                                            <span class="badge" :class="get_status_badge(event.status)">
                                                {{ event.status }}
                                            </span>
                                            <span class="badge bg-secondary ms-1">
                                                {{ event.type }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Add/Edit Event Modal -->
                    <div id="eventsModal" class="modal fade" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg modal-dialog-centered">
                            <div class="modal-content mailbox-popup">
                                <div class="modal-header">
                                    <h5 class="modal-title">{{ form.id ? 'Edit Event' : 'Add Event' }}</h5>
                                    <button type="button" data-dismiss="modal" data-bs-dismiss="modal" aria-label="Close" class="btn-close" @click="resetForm"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="notes-box">
                                        <div class="notes-content">
                                            <form>
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <div class="form-group mb-3">
                                                            <label>Event Title <span class="text-danger">*</span></label>
                                                            <input type="text" v-model="form.title" class="form-control" placeholder="Enter Title" />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="form-group mb-3">
                                                            <label>Event Type</label>
                                                            <select v-model="form.type" class="form-control">
                                                                <option value="event">Event</option>
                                                                <option value="activity">Activity</option>
                                                                <option value="announcement">Announcement</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group mb-3">
                                                            <label>Location</label>
                                                            <input type="text" v-model="form.location" class="form-control" placeholder="Enter Location" />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="form-group mb-3">
                                                            <label>Start Date <span class="text-danger">*</span></label>
                                                            <input type="date" v-model="form.start_date" class="form-control" />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group mb-3">
                                                            <label>End Date</label>
                                                            <input type="date" v-model="form.end_date" class="form-control" />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="form-group mb-3">
                                                            <label>Start Time</label>
                                                            <input type="time" v-model="form.start_time" class="form-control" />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group mb-3">
                                                            <label>End Time</label>
                                                            <input type="time" v-model="form.end_time" class="form-control" />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <div class="form-group mb-3">
                                                            <label>Event Image</label>
                                                            <input type="file" @change="handleImageUpload" class="form-control" accept="image/*" />
                                                            <div v-if="form.image_preview" class="mt-2">
                                                                <img :src="form.image_preview" alt="Preview" style="max-width: 150px; max-height: 100px;" class="img-thumbnail" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <div class="form-group mb-3">
                                                            <label>Description</label>
                                                            <textarea v-model="form.description" rows="3" class="form-control" placeholder="Enter Description"></textarea>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <div class="form-check">
                                                            <input type="checkbox" v-model="form.is_public" class="form-check-input" id="isPublic" />
                                                            <label class="form-check-label" for="isPublic">Make this event public</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                                <div class="modal-footer">
                                    <button type="button" class="btn btn-default" data-dismiss="modal" data-bs-dismiss="modal" @click="resetForm">Discard</button>
                                    <button type="button" class="btn btn-primary" @click="save_event()" :disabled="loading">
                                        {{ loading ? 'Saving...' : (form.id ? 'Update' : 'Add') }}
                                    </button>
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
    import { onMounted, ref, computed } from 'vue';
    import '@/assets/sass/apps/notes.scss';
    import { useMeta } from '@/composables/use-meta';
    import { axiosInstance } from '@/services/axios';

    useMeta({ title: 'Events' });

    let eventsModal = null;
    const loading = ref(false);
    const is_show_event_menu = ref(false);
    const events_list = ref([]);
    const filtered_events_list = ref([]);
    const selected_tab = ref('all');

    const form = ref({
        id: null,
        title: '',
        description: '',
        type: 'event',
        start_date: '',
        end_date: '',
        start_time: '',
        end_time: '',
        location: '',
        is_public: true,
        image: null,
        image_preview: null
    });

    onMounted(() => {
        initPopup();
        fetchEvents();
    });

    const initPopup = () => {
        eventsModal = new window.bootstrap.Modal(document.getElementById('eventsModal'));
    };

    const fetchEvents = async () => {
        try {
            const response = await axiosInstance.get('/events/');
            events_list.value = response.data;
            search_events();
        } catch (error) {
            console.error('Error fetching events:', error);
            showMessage('Failed to load events', 'error');
        }
    };

    const search_events = () => {
        if (selected_tab.value === 'all') {
            filtered_events_list.value = events_list.value;
        } else if (selected_tab.value === 'upcoming' || selected_tab.value === 'ongoing' || selected_tab.value === 'completed') {
            filtered_events_list.value = events_list.value.filter(e => e.status === selected_tab.value);
        } else {
            filtered_events_list.value = events_list.value.filter(e => e.type === selected_tab.value);
        }
    };

    const tab_changed = (type) => {
        selected_tab.value = type;
        search_events();
        is_show_event_menu.value = false;
    };

    const event_class = (event) => {
        let cls = '';
        if (event.type === 'event') cls = 'note-primary';
        else if (event.type === 'activity') cls = 'note-success';
        else if (event.type === 'announcement') cls = 'note-warning';
        return cls;
    };

    const get_status_badge = (status) => {
        if (status === 'upcoming') return 'bg-info';
        if (status === 'ongoing') return 'bg-success';
        if (status === 'completed') return 'bg-secondary';
        if (status === 'cancelled') return 'bg-danger';
        return 'bg-secondary';
    };

    const format_date = (date) => {
        if (!date) return '';
        const d = new Date(date);
        return d.toLocaleDateString();
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            form.value.image = file;
            const reader = new FileReader();
            reader.onload = (e) => {
                form.value.image_preview = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    };

    const edit_event = (event = null) => {
        resetForm();
        if (event) {
            form.value = {
                id: event.id,
                title: event.title,
                description: event.description || '',
                type: event.type,
                start_date: event.start_date,
                end_date: event.end_date || '',
                start_time: event.start_time || '',
                end_time: event.end_time || '',
                location: event.location || '',
                is_public: event.is_public,
                image: null,
                image_preview: event.image || null
            };
        }
        eventsModal.show();
    };

    const save_event = async () => {
        if (!form.value.title) {
            showMessage('Title is required', 'error');
            return;
        }
        if (!form.value.start_date) {
            showMessage('Start date is required', 'error');
            return;
        }

        loading.value = true;

        try {
            const formData = new FormData();
            formData.append('title', form.value.title);
            formData.append('description', form.value.description || '');
            formData.append('type', form.value.type);
            formData.append('start_date', form.value.start_date);
            if (form.value.end_date) formData.append('end_date', form.value.end_date);
            if (form.value.start_time) formData.append('start_time', form.value.start_time);
            if (form.value.end_time) formData.append('end_time', form.value.end_time);
            if (form.value.location) formData.append('location', form.value.location);
            formData.append('is_public', form.value.is_public);
            if (form.value.image) formData.append('image', form.value.image);

            if (form.value.id) {
                await axiosInstance.put(`/events/${form.value.id}/`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                showMessage('Event updated successfully', 'success');
            } else {
                await axiosInstance.post('/events/', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                showMessage('Event added successfully', 'success');
            }

            await fetchEvents();
            eventsModal.hide();
            resetForm();

        } catch (error) {
            console.error('Error saving event:', error);
            showMessage(error.response?.data?.message || 'Failed to save event', 'error');
        } finally {
            loading.value = false;
        }
    };

    const delete_event = async (event) => {
        const result = await window.Swal.fire({
            title: 'Are you sure?',
            text: `Delete "${event.title}"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete!'
        });

        if (result.isConfirmed) {
            try {
                await axiosInstance.delete(`/events/${event.id}/`);
                showMessage('Event deleted successfully', 'success');
                await fetchEvents();
            } catch (error) {
                console.error('Error deleting event:', error);
                showMessage('Failed to delete event', 'error');
            }
        }
    };

    const resetForm = () => {
        form.value = {
            id: null,
            title: '',
            description: '',
            type: 'event',
            start_date: '',
            end_date: '',
            start_time: '',
            end_time: '',
            location: '',
            is_public: true,
            image: null,
            image_preview: null
        };
    };

    const showMessage = (msg, type = 'success') => {
        const toast = window.Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
        });
        toast.fire({
            icon: type,
            title: msg,
            padding: '10px 20px',
        });
    };
</script>

<style scoped>
.event-image img {
    width: 100%;
    height: 120px;
    object-fit: cover;
    border-radius: 8px;
}

.note-primary { border-left: 3px solid #4361ee; }
.note-success { border-left: 3px solid #1abc9c; }
.note-warning { border-left: 3px solid #e2a03f; }

.badge {
    font-size: 11px;
    padding: 4px 8px;
}
</style>