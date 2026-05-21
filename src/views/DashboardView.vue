<script setup lang="ts">
import DashboardLayout from '../layouts/DashboardLayout.vue';
import { ref, onMounted } from 'vue';
import type { DashboardStats } from '../types';

const stats = ref<DashboardStats>({
  aprovados: 124,
  pendentes: 8,
  rejeitados: 2,
  ultimoEnvio: '21/05/2026 14:30',
});

const isLoading = ref(false);
</script>

<template>
  <DashboardLayout>
    <div class="dashboard-view">
      <section class="stats-grid">
        <div class="stat-card">
          <span class="stat-label">Preços Aprovados</span>
          <div class="stat-value text-success">{{ stats.aprovados }}</div>
        </div>
        <div class="stat-card">
          <span class="stat-label">Aguardando Análise</span>
          <div class="stat-value text-warning">{{ stats.pendentes }}</div>
        </div>
        <div class="stat-card">
          <span class="stat-label">Rejeitados</span>
          <div class="stat-value text-danger">{{ stats.rejeitados }}</div>
        </div>
        <div class="stat-card stat-highlight">
          <span class="stat-label">Última Atualização</span>
          <div class="stat-date">{{ stats.ultimoEnvio || 'Sem envios' }}</div>
        </div>
      </section>

      <section class="recent-activity">
        <div class="section-header">
          <h3>Atividade Recente</h3>
          <router-link to="/upload" class="btn-link">Novo Upload</router-link>
        </div>
        
        <div class="card-table">
          <div class="empty-state" v-if="false">
            <p>Nenhuma atividade registrada hoje.</p>
          </div>
          <table v-else>
            <thead>
              <tr>
                <th>Item</th>
                <th>Preço</th>
                <th>Data</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Feijão Preto 1kg</td>
                <td>R$ 8,50</td>
                <td>Hoje, 10:20</td>
                <td><span class="badge badge-success">Aprovado</span></td>
              </tr>
              <tr>
                <td>Arroz Agulhinha 5kg</td>
                <td>R$ 24,90</td>
                <td>Hoje, 09:15</td>
                <td><span class="badge badge-warning">Em análise</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </DashboardLayout>
</template>

<style scoped>
.dashboard-view {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: var(--space-6);
}

.stat-card {
  background: var(--surface);
  padding: var(--space-6);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
}

.stat-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-muted);
  display: block;
  margin-bottom: var(--space-2);
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
}

.stat-date {
  font-size: 1.25rem;
  font-weight: 600;
}

.stat-highlight {
  background: var(--primary);
  border-color: var(--primary);
}

.stat-highlight .stat-label,
.stat-highlight .stat-date {
  color: white;
}

.recent-activity {
  background: var(--surface);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  overflow: hidden;
}

.section-header {
  padding: var(--space-6);
  border-bottom: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn-link {
  color: var(--primary);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.875rem;
}

.card-table {
  padding: var(--space-2);
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  text-align: left;
  padding: var(--space-4);
  font-size: 0.75rem;
  text-transform: uppercase;
  color: var(--text-muted);
  letter-spacing: 0.05em;
}

td {
  padding: var(--space-4);
  border-top: 1px solid var(--border);
  font-size: 0.875rem;
}

.badge {
  padding: 4px 8px;
  border-radius: 99px;
  font-size: 0.75rem;
  font-weight: 600;
}

.badge-success { background: #dcfce7; color: var(--success); }
.badge-warning { background: #fef9c3; color: var(--warning); }

.text-success { color: var(--success); }
.text-warning { color: var(--warning); }
.text-danger { color: var(--danger); }
</style>
