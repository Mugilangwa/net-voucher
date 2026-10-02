<template>
    <div class="tree-node">
        <div class="tree-node-item" :style="{ marginLeft: (level * 20) + 'px' }">
            <div class="d-flex align-items-center justify-content-between p-2 border-bottom">
                <div class="d-flex align-items-center">
                    <button v-if="hasChildren" class="btn btn-sm btn-link p-0 me-2" @click="expanded = !expanded">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline v-if="!expanded" points="9 18 15 12 9 6"></polyline>
                            <polyline v-else points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </button>
                    <span v-else class="me-2" style="width: 20px;"></span>
                    <span class="badge" :class="getTypeBadge(location.type)">
                        {{ location.name }}
                    </span>
                    <span class="ms-2 text-muted small">({{ getTypeLabel(location.type) }})</span>
                    <span v-if="!location.is_active" class="ms-2 badge badge-danger">Inactive</span>
                </div>
                <div class="actions">
                    <a href="javascript:;" class="me-2" @click="$emit('add', location)">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                    </a>
                    <a href="javascript:;" class="me-2" @click="$emit('edit', location)">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                        </svg>
                    </a>
                    <a href="javascript:;" @click="$emit('delete', location)">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
        <div v-if="hasChildren && expanded" class="tree-node-children">
            <LocationTreeNode
                v-for="child in location.children"
                :key="child.id"
                :location="child"
                :level="level + 1"
                @edit="$emit('edit', $event)"
                @add="$emit('add', $event)"
                @delete="$emit('delete', $event)"
            />
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
    location: Object,
    level: Number
});

const expanded = ref(true);

const hasChildren = computed(() => {
    return props.location.children && props.location.children.length > 0;
});

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

defineEmits(['edit', 'add', 'delete']);
</script>

<style scoped>
.tree-node-item {
    transition: background-color 0.2s;
}
.tree-node-item:hover {
    background-color: #f5f5f5;
}
.actions {
    opacity: 0;
    transition: opacity 0.2s;
}
.tree-node-item:hover .actions {
    opacity: 1;
}
.badge-primary { background-color: #4361ee; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; }
.badge-info { background-color: #2196f3; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; }
.badge-warning { background-color: #ff9800; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; }
.badge-secondary { background-color: #6c757d; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; }
.badge-danger { background-color: #dc3545; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; }
</style>