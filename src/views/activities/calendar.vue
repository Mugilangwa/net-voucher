<template>
    <div class="layout-px-spacing">
        <teleport to="#breadcrumb">
            <ul class="navbar-nav flex-row">
                <li>
                    <div class="page-header">
                        <nav class="breadcrumb-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="javascript:;">Apps</a></li>
                                <li class="breadcrumb-item active" aria-current="page"><span>Events Calendar</span></li>
                            </ol>
                        </nav>
                    </div>
                </li>
            </ul>
        </teleport>

        <div class="row layout-top-spacing" id="cancel-row">
            <div class="col-xl-12 col-lg-12 col-md-12">
                <div class="statbox panel box box-shadow">
                    <div class="panel-body">
                        <div class="calendar-upper-section">
                            <div class="row">
                                <div class="col-md-6 col-12">
                                    <div class="labels text-md-start text-center">
                                        <p class="label label-primary">Events</p>
                                        <p class="label label-success">Activities</p>
                                        <p class="label label-warning">Announcements</p>
                                    </div>
                                </div>
                                <div class="col-md-6 col-12">
                                    <form class="form-horizontal mt-md-0 mt-3 text-md-end text-center">
                                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#eventsModal" @click="edit_event()">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-calendar me-2">
                                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                                <line x1="16" y1="2" x2="16" y2="6"></line>
                                                <line x1="8" y1="2" x2="8" y2="6"></line>
                                                <line x1="3" y1="10" x2="21" y2="10"></line>
                                            </svg>
                                            Add Event
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <FullCalendar ref="fullCalendar" :options="calendarOptions">
                            <template v-slot:eventContent="arg">
                                <div class="fc-event-main-frame">
                                    <div class="fc-event-time">{{ arg.timeText }}</div>
                                    <div class="fc-event-title-container">
                                        <div class="fc-event-title fc-sticky">{{ arg.event.title }}</div>
                                    </div>
                                    <div class="calendar-tlp">
                                        <div class="event-tooltip-content">
                                            <div v-if="arg.event.extendedProps?.image_url" class="tooltip-image">
                                                <img :src="arg.event.extendedProps.image_url" alt="Event" style="width: 100%; height: 100px; object-fit: cover;">
                                            </div>
                                            <div class="p-2 bg-dark text-white text-start text-wrap">
                                                {{ arg.timeText + ' : ' + arg.event.title }}
                                            </div>
                                            <div class="p-2 text-start text-wrap">
                                                {{ arg.event.extendedProps?.description || '' }}
                                            </div>
                                            <div class="p-2 text-start text-wrap">
                                                <small>📍 Location: {{ arg.event.extendedProps?.location || 'N/A' }}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </FullCalendar>
                    </div>
                </div>
            </div>

            <!-- Add/Edit Event Modal -->
            <div id="eventsModal" class="modal fade" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">{{ form.id ? 'Edit Event' : 'Add Event' }}</h5>
                            <button type="button" data-dismiss="modal" data-bs-dismiss="modal" aria-label="Close" class="btn-close" @click="resetForm"></button>
                        </div>
                        <div class="modal-body" style="max-height: 70vh; overflow-y: auto;">
                            <!-- Basic Information -->
                            <div class="row">
                                <div class="col-md-12">
                                    <h6 class="mb-3">Basic Information</h6>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group mb-3">
                                        <label>Event Title: <span class="text-danger">*</span></label>
                                        <input type="text" v-model="form.title" class="form-control" placeholder="Enter Title" />
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group mb-3">
                                        <label>Event Type: <span class="text-danger">*</span></label>
                                        <select v-model="form.type" class="form-control">
                                            <option value="event">Event</option>
                                            <option value="announcement">Announcement</option>
                                            <option value="activity">Activity</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group mb-3">
                                        <label>Location:</label>
                                        <input type="text" v-model="form.location" class="form-control" placeholder="Enter Location" />
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group mb-3">
                                        <label>Start Date: <span class="text-danger">*</span></label>
                                        <flat-pickr v-model="form.start_date" :config="{ dateFormat: 'Y-m-d', minDate: today }" class="form-control" placeholder="Start Date"></flat-pickr>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group mb-3">
                                        <label>End Date:</label>
                                        <flat-pickr v-model="form.end_date" :config="{ dateFormat: 'Y-m-d', minDate: form.start_date || today }" class="form-control" placeholder="End Date"></flat-pickr>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group mb-3">
                                        <label>Start Time:</label>
                                        <flat-pickr v-model="form.start_time" :config="{ enableTime: true, noCalendar: true, dateFormat: 'H:i:S', time_24hr: true }" class="form-control" placeholder="Start Time"></flat-pickr>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group mb-3">
                                        <label>End Time:</label>
                                        <flat-pickr v-model="form.end_time" :config="{ enableTime: true, noCalendar: true, dateFormat: 'H:i:S', time_24hr: true }" class="form-control" placeholder="End Time"></flat-pickr>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group mb-3">
                                        <label>Description:</label>
                                        <textarea v-model="form.description" class="form-control" placeholder="Enter Description" rows="3"></textarea>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group mb-3">
                                        <label>Event Image:</label>
                                        <input type="file" @change="handleImageUpload" class="form-control" accept="image/*" />
                                        <div v-if="form.image_preview" class="mt-2">
                                            <img :src="form.image_preview" alt="Preview" style="max-width: 200px; max-height: 150px;" class="img-thumbnail" />
                                            <button type="button" class="btn btn-sm btn-danger mt-1" @click="removeImage">Remove</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group mb-3">
                                        <label>Visibility:</label>
                                        <div class="form-check">
                                            <input type="checkbox" v-model="form.is_public" class="form-check-input" id="isPublic" />
                                            <label class="form-check-label" for="isPublic">Make this event public</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Organizers Section -->
                            <div class="row mt-3">
                                <div class="col-md-12">
                                    <h6 class="mb-3">Organizers</h6>
                                    <div class="table-responsive">
                                        <table class="table table-sm">
                                            <thead>
                                                <tr>
                                                    <th>Type</th>
                                                    <th>ID/Name</th>
                                                    <th>Role</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(org, idx) in form.organizers" :key="idx">
                                                    <td>{{ org.organizer_type }}</td>
                                                    <td>{{ org.organizer_name || org.organizer_id }}</td>
                                                    <td>{{ org.role }}</td>
                                                    <td>
                                                        <button type="button" class="btn btn-sm btn-danger" @click="removeOrganizer(org.id)">Remove</button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <select v-model="new_organizer.type" class="form-control form-control-sm">
                                                            <option value="user">User</option>
                                                            <option value="department">Department</option>
                                                            <option value="group">Group</option>
                                                        </select>
                                                    </td>
                                                    <td>
                                                        <input type="number" v-model="new_organizer.id" class="form-control form-control-sm" placeholder="ID" />
                                                    </td>
                                                    <td>
                                                        <select v-model="new_organizer.role" class="form-control form-control-sm">
                                                            <option value="main">Main Organizer</option>
                                                            <option value="co">Co Organizer</option>
                                                            <option value="coordinator">Coordinator</option>
                                                        </select>
                                                    </td>
                                                    <td>
                                                        <button type="button" class="btn btn-sm btn-primary" @click="addOrganizer">Add</button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <!-- Targets Section -->
                            <div class="row mt-3">
                                <div class="col-md-12">
                                    <h6 class="mb-3">Target Audience</h6>
                                    <div class="table-responsive">
                                        <table class="table table-sm">
                                            <thead>
                                                <tr>
                                                    <th>Target Type</th>
                                                    <th>Target ID</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(target, idx) in form.targets" :key="idx">
                                                    <td>{{ target.target_type }}</td>
                                                    <td>{{ target.target_id || 'All' }}</td>
                                                    <td>
                                                        <button type="button" class="btn btn-sm btn-danger" @click="removeTarget(target.id)">Remove</button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <select v-model="new_target.type" class="form-control form-control-sm">
                                                            <option value="church">Church (All)</option>
                                                            <option value="department">Department</option>
                                                            <option value="group">Group</option>
                                                        </select>
                                                    </td>
                                                    <td>
                                                        <input v-if="new_target.type != 'church'" type="number" v-model="new_target.id" class="form-control form-control-sm" placeholder="ID" />
                                                        <span v-else class="form-control-plaintext">All Members</span>
                                                    </td>
                                                    <td>
                                                        <button type="button" class="btn btn-sm btn-primary" @click="addTarget">Add</button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal" data-bs-dismiss="modal" @click="resetForm">Cancel</button>
                            <button type="button" class="btn btn-primary" @click="saveEvent()" :disabled="loading">
                                <span v-if="loading">Saving...</span>
                                <span v-else>{{ form.id ? 'Update Event' : 'Add Event' }}</span>
                            </button>
                            <button v-if="form.id" type="button" class="btn btn-danger" @click="deleteEvent()" :disabled="loading">Delete</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Delete Confirmation Modal -->
            <div id="deleteConfirmModal" class="modal fade" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Confirm Delete</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            Are you sure you want to delete "{{ form.title }}"? This action cannot be undone.
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-danger" @click="confirmDelete">Yes, Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, ref, reactive, computed } from 'vue';
    import axios from 'axios';
    import '@/assets/sass/apps/calendar.scss';
    import FullCalendar from '@fullcalendar/vue3';
    import dayGridPlugin from '@fullcalendar/daygrid';
    import timeGridPlugin from '@fullcalendar/timegrid';
    import interactionPlugin from '@fullcalendar/interaction';
    import flatPickr from 'vue-flatpickr-component';
    import 'flatpickr/dist/flatpickr.css';
    import { useMeta } from '@/composables/use-meta';
    import { axiosInstance } from '@/services/axios';

    useMeta({ title: 'Event Calendar' });

    // State
    const loading = ref(false);
    const fullCalendar = ref(null);
    let eventsModal = null;
    let deleteConfirmModal = null;
    const eventsList = ref([]);

    const today = ref(new Date().toISOString().split('T')[0]);

    const form = reactive({
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
        image_preview: null,
        organizers: [],
        targets: []
    });

    const new_organizer = reactive({
        type: 'user',
        id: null,
        role: 'coordinator'
    });

    const new_target = reactive({
        type: 'church',
        id: null
    });

    // API Methods
    const fetchEvents = async () => {
        try {
            const response = await axiosInstance.get('/events/calendar_events/');
            eventsList.value = response.data.map(event => ({
                id: event.id,
                title: event.title,
                start: event.start,
                end: event.end,
                extendedProps: {
                    description: event.description,
                    location: event.location,
                    type: event.type,
                    image_url: event.image_url
                }
            }));
            
            if (fullCalendar.value) {
                const calendarApi = fullCalendar.value.getApi();
                calendarApi.removeAllEvents();
                calendarApi.addEventSource(eventsList.value);
            }
        } catch (error) {
            console.error('Error fetching events:', error);
            showMessage('Failed to load events', 'error');
        }
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            form.image = file;
            const reader = new FileReader();
            reader.onload = (e) => {
                form.image_preview = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        form.image = null;
        form.image_preview = null;
    };

    const saveEvent = async () => {
        if (!form.title) {
            showMessage('Title is required', 'error');
            return;
        }
        if (!form.start_date) {
            showMessage('Start date is required', 'error');
            return;
        }

        loading.value = true;
        
        try {
            const formData = new FormData();
            formData.append('title', form.title);
            formData.append('description', form.description || '');
            formData.append('type', form.type);
            formData.append('start_date', form.start_date);
            if (form.end_date) formData.append('end_date', form.end_date);
            if (form.start_time) formData.append('start_time', form.start_time);
            if (form.end_time) formData.append('end_time', form.end_time);
            if (form.location) formData.append('location', form.location);
            formData.append('is_public', form.is_public);
            if (form.image) formData.append('image', form.image);

            let response;
            if (form.id) {
                response = await axiosInstance.put(`/events/${form.id}/`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                showMessage('Event updated successfully', 'success');
            } else {
                response = await axiosInstance.post('/events/', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                showMessage('Event created successfully', 'success');
                form.id = response.data.id;
            }

            // Save organizers and targets if they exist
            if (form.organizers.length > 0 || form.targets.length > 0) {
                await saveOrganizersAndTargets();
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

    const saveOrganizersAndTargets = async () => {
        // Save organizers
        for (const org of form.organizers) {
            if (!org.id) {
                await axiosInstance.post(`/events/${form.id}/add_organizer/`, {
                    organizer_type: org.organizer_type,
                    organizer_id: org.organizer_id,
                    role: org.role
                });
            }
        }
        
        // Save targets
        for (const target of form.targets) {
            if (!target.id) {
                await axiosInstance.post(`/events/${form.id}/add_target/`, {
                    target_type: target.target_type,
                    target_id: target.target_id
                });
            }
        }
    };

    const addOrganizer = async () => {
        if (!new_organizer.id) {
            showMessage('Please enter organizer ID', 'error');
            return;
        }
        
        if (form.id) {
            // Save immediately if event exists
            try {
                const response = await axiosInstance.post(`/events/${form.id}/add_organizer/`, {
                    organizer_type: new_organizer.type,
                    organizer_id: new_organizer.id,
                    role: new_organizer.role
                });
                form.organizers.push(response.data);
                showMessage('Organizer added', 'success');
            } catch (error) {
                showMessage('Failed to add organizer', 'error');
            }
        } else {
            // Add to local list
            form.organizers.push({
                organizer_type: new_organizer.type,
                organizer_id: new_organizer.id,
                role: new_organizer.role
            });
        }
        
        new_organizer.id = null;
        new_organizer.role = 'coordinator';
    };

    const removeOrganizer = async (orgId) => {
        if (form.id) {
            try {
                await axiosInstance.delete(`/events/${form.id}/remove_organizer/?organizer_id=${orgId}`);
                form.organizers = form.organizers.filter(o => o.id !== orgId);
                showMessage('Organizer removed', 'success');
            } catch (error) {
                showMessage('Failed to remove organizer', 'error');
            }
        } else {
            form.organizers = form.organizers.filter((_, idx) => idx !== orgId);
        }
    };

    const addTarget = () => {
        if (new_target.type === 'department' || new_target.type === 'group') {
            if (!new_target.id) {
                showMessage('Please enter target ID', 'error');
                return;
            }
        }
        
        form.targets.push({
            target_type: new_target.type,
            target_id: new_target.type === 'church' ? null : new_target.id
        });
        
        new_target.id = null;
    };

    const removeTarget = (targetId) => {
        form.targets = form.targets.filter(t => t.id !== targetId);
    };

    const deleteEvent = () => {
        deleteConfirmModal.show();
    };

    const confirmDelete = async () => {
        if (!form.id) return;
        
        loading.value = true;
        
        try {
            await axiosInstance.delete(`/events/${form.id}/`);
            showMessage('Event deleted successfully', 'success');
            await fetchEvents();
            deleteConfirmModal.hide();
            eventsModal.hide();
            resetForm();
        } catch (error) {
            console.error('Error deleting event:', error);
            showMessage('Failed to delete event', 'error');
        } finally {
            loading.value = false;
        }
    };

    const resetForm = () => {
        form.id = null;
        form.title = '';
        form.description = '';
        form.type = 'event';
        form.start_date = '';
        form.end_date = '';
        form.start_time = '';
        form.end_time = '';
        form.location = '';
        form.is_public = true;
        form.image = null;
        form.image_preview = null;
        form.organizers = [];
        form.targets = [];
        new_organizer.id = null;
        new_target.id = null;
    };

    const edit_event = (eventData = null) => {
        resetForm();
        if (eventData) {
            fetchEventDetails(eventData.id);
        }
        eventsModal.show();
    };

    const fetchEventDetails = async (eventId) => {
        try {
            const response = await axiosInstance.get(`/events/${eventId}/`);
            const event = response.data;
            
            form.id = event.id;
            form.title = event.title;
            form.description = event.description || '';
            form.type = event.type;
            form.start_date = event.start_date;
            form.end_date = event.end_date || '';
            form.start_time = event.start_time || '';
            form.end_time = event.end_time || '';
            form.location = event.location || '';
            form.is_public = event.is_public;
            form.organizers = event.organizers || [];
            form.targets = event.targets || [];
            
            if (event.image) {
                form.image_preview = event.image;
            }
        } catch (error) {
            console.error('Error fetching event details:', error);
            showMessage('Failed to load event details', 'error');
        }
    };

    const handleEventClick = (info) => {
        info.jsEvent.preventDefault();
        edit_event(info.event);
    };

    const handleDateSelect = (info) => {
        resetForm();
        form.start_date = info.startStr.split('T')[0];
        form.end_date = info.endStr.split('T')[0];
        eventsModal.show();
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

    const calendarOptions = computed(() => ({
        initialView: 'dayGridMonth',
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        headerToolbar: {
            start: 'prev,next today',
            center: 'title',
            end: 'dayGridMonth,timeGridWeek,timeGridDay',
        },
        editable: true,
        selectable: true,
        eventClick: handleEventClick,
        select: handleDateSelect,
        events: eventsList.value,
        loading: false
    }));

    onMounted(() => {
        eventsModal = new window.bootstrap.Modal(document.getElementById('eventsModal'));
        deleteConfirmModal = new window.bootstrap.Modal(document.getElementById('deleteConfirmModal'));
        fetchEvents();
    });
</script>

<style scoped>
.calendar-tlp {
    display: none;
    position: absolute;
    background: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 1000;
    min-width: 250px;
    max-width: 300px;
}

.fc-event:hover .calendar-tlp {
    display: block;
}

.event-tooltip-content {
    font-size: 12px;
}

.tooltip-image {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    overflow: hidden;
}

.label {
    display: inline-block;
    padding: 5px 10px;
    margin: 0 5px;
    border-radius: 3px;
    font-size: 12px;
}

.label-primary { background-color: #4361ee; color: white; }
.label-success { background-color: #1abc9c; color: white; }
.label-warning { background-color: #e2a03f; color: white; }

.modal-body {
    max-height: 70vh;
    overflow-y: auto;
}
</style>