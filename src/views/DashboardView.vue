<script setup lang="ts">
import { ref } from 'vue';
import DashboardLayout from '../layouts/DashboardLayout.vue';
import { useAuthStore } from '../stores/auth';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  TrendingUp, 
  History,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-vue-next';

const auth = useAuthStore();

const stats = ref([
  { name: 'Preços Aprovados', value: '124', icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-100', trend: '+12%', trendUp: true },
  { name: 'Em Análise (OCR)', value: '18', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-100', trend: '5 novos', trendUp: true },
  { name: 'Divergências', value: '3', icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-100', trend: '-2%', trendUp: false },
  { name: 'Economia Gerada', value: 'R$ 450', icon: TrendingUp, color: 'text-primary-600', bg: 'bg-primary-100', trend: '+8%', trendUp: true },
]);

const recentActivities = ref([
  { id: 1, item: 'Arroz Agulhinha (5kg)', price: 'R$ 24,90', status: 'Aprovado', date: 'Hoje, 14:30' },
  { id: 2, item: 'Feijão Preto (1kg)', price: 'R$ 8,50', status: 'Em Análise', date: 'Hoje, 12:15' },
  { id: 3, item: 'Leite Integral (1L)', price: 'R$ 5,20', status: 'Aprovado', date: 'Ontem, 18:45' },
  { id: 4, item: 'Café em Pó (500g)', price: 'R$ 18,90', status: 'Divergente', date: 'Ontem, 16:20' },
]);
</script>

<template>
  <DashboardLayout>
    <div class="space-y-8">
      <!-- Welcome Header -->
      <section>
        <h2 class="text-3xl font-extrabold text-slate-900 tracking-tight">
          Olá, {{ auth.user?.nome || 'Supermercado' }} 👋
        </h2>
        <p class="text-slate-500 mt-2 font-medium">Aqui está o resumo do monitoramento de preços da sua unidade.</p>
      </section>

      <!-- Stats Grid -->
      <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div 
          v-for="item in stats" 
          :key="item.name"
          class="bg-white p-6 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col justify-between"
        >
          <div class="flex items-start justify-between">
            <div :class="[item.bg, item.color, 'p-3 rounded-2xl']">
              <component :is="item.icon" :size="24" />
            </div>
            <div 
              :class="[
                item.trendUp ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50',
                'px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1'
              ]"
            >
              <ArrowUpRight v-if="item.trendUp" :size="12" />
              <ArrowDownRight v-else :size="12" />
              {{ item.trend }}
            </div>
          </div>
          <div class="mt-4">
            <p class="text-slate-500 text-sm font-bold uppercase tracking-wider">{{ item.name }}</p>
            <h3 class="text-3xl font-black text-slate-900 mt-1">{{ item.value }}</h3>
          </div>
        </div>
      </section>

      <!-- Content Row -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Recent Submissions Table -->
        <section class="lg:col-span-2">
          <div class="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
            <header class="p-8 border-b border-slate-50 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600">
                  <History :size="20" />
                </div>
                <h3 class="text-xl font-bold text-slate-900">Envios Recentes</h3>
              </div>
              <button class="text-primary-600 font-bold text-sm hover:underline">Ver todos</button>
            </header>
            
            <div class="overflow-x-auto">
              <table class="w-full text-left">
                <thead>
                  <tr class="bg-slate-50/50">
                    <th class="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Item</th>
                    <th class="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Preço</th>
                    <th class="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                    <th class="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Data</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-50">
                  <tr v-for="activity in recentActivities" :key="activity.id" class="hover:bg-slate-50 transition-colors">
                    <td class="px-8 py-5 font-bold text-slate-900">{{ activity.item }}</td>
                    <td class="px-8 py-5 font-medium text-slate-600">{{ activity.price }}</td>
                    <td class="px-8 py-5">
                      <span 
                        :class="{
                          'bg-green-100 text-green-700': activity.status === 'Aprovado',
                          'bg-amber-100 text-amber-700': activity.status === 'Em Análise',
                          'bg-red-100 text-red-700': activity.status === 'Divergente',
                        }"
                        class="px-3 py-1 rounded-full text-xs font-bold"
                      >
                        {{ activity.status }}
                      </span>
                    </td>
                    <td class="px-8 py-5 text-sm text-slate-400">{{ activity.date }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <!-- Insights / Actions -->
        <section class="space-y-6">
          <div class="bg-primary-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-primary-200 relative overflow-hidden group">
            <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500"></div>
            
            <h3 class="text-xl font-bold relative z-10">Novo Registro</h3>
            <p class="text-primary-100 mt-2 text-sm relative z-10">Está no mercado agora? Registre um novo preço rapidamente.</p>
            
            <router-link 
              to="/upload" 
              class="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-600 font-bold rounded-xl shadow-lg hover:bg-primary-50 transition-colors relative z-10"
            >
              Registrar Agora
              <ArrowUpRight :size="18" />
            </router-link>
          </div>

          <div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
            <h3 class="text-lg font-bold text-slate-900 mb-4">Meta Mensal</h3>
            <div class="space-y-4">
              <div class="flex items-center justify-between text-sm">
                <span class="text-slate-500 font-medium">Progresso de Envios</span>
                <span class="text-slate-900 font-bold">75%</span>
              </div>
              <div class="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div class="h-full bg-primary-600 w-3/4 rounded-full"></div>
              </div>
              <p class="text-xs text-slate-400 leading-relaxed">
                Você enviou 142 preços este mês. Faltam 58 para atingir o selo de <b>Supermercado Parceiro</b>.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  </DashboardLayout>
</template>
