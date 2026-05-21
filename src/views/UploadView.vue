<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import DashboardLayout from '../layouts/DashboardLayout.vue';
import Input from '../components/ui/Input.vue';
import Button from '../components/ui/Button.vue';
import { usePrecoStore } from '../stores/preco';
import { useAuthStore } from '../stores/auth';
import { useToastStore } from '../stores/toast';
import { Camera, Upload, Trash2, CheckCircle2, AlertCircle, Info } from 'lucide-vue-next';

const precoStore = usePrecoStore();
const auth = useAuthStore();
const toast = useToastStore();

const isLoading = ref(false);
const isFetchingItems = ref(false);
const previewUrl = ref<string | null>(null);

const form = reactive({
  itemId: '',
  preco: '',
  quantidade: '',
  imagem: null as File | null,
});

onMounted(async () => {
  try {
    isFetchingItems.value = true;
    await precoStore.fetchItemsDieese();
  } catch (err) {
    toast.show('Erro ao carregar lista de itens.', 'error');
  } finally {
    isFetchingItems.value = false;
  }
});

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    const file = target.files[0];
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.show('Por favor, selecione uma imagem válida.', 'error');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.show('A imagem deve ter no máximo 5MB.', 'error');
      return;
    }

    form.imagem = file;
    previewUrl.value = URL.createObjectURL(file);
  }
};

const removeImage = () => {
  form.imagem = null;
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value);
    previewUrl.value = null;
  }
};

const handleSubmit = async () => {
  if (!form.itemId || !form.preco || !form.imagem) {
    toast.show('Por favor, preencha todos os campos obrigatórios e tire uma foto.', 'error');
    return;
  }

  try {
    isLoading.value = true;
    
    // Ensure we have a supermercadoId
    const supermercadoId = auth.supermercadoId || '00000000-0000-0000-0000-000000000000'; // Fallback or handle error

    await precoStore.uploadPreco({
      supermercadoId,
      itemId: form.itemId,
      preco: parseFloat(form.preco.replace(',', '.')),
      quantidade: parseFloat(form.quantidade.replace(',', '.')) || 1.0,
      imagem: form.imagem,
    });

    toast.show('Preço enviado com sucesso para análise OCR!', 'success');
    
    // Reset form
    form.itemId = '';
    form.preco = '';
    form.quantidade = '';
    removeImage();
  } catch (err: any) {
    toast.show(err.message || 'Erro ao enviar preço. Tente novamente.', 'error');
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <DashboardLayout>
    <div class="max-w-4xl mx-auto">
      <header class="mb-8">
        <h2 class="text-3xl font-extrabold text-slate-900 tracking-tight">Registrar Preço</h2>
        <p class="text-slate-500 mt-2 font-medium">Capture a oferta diretamente na gôndola do supermercado.</p>
      </header>

      <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <!-- Main Form Section -->
        <div class="lg:col-span-3 space-y-6">
          <div class="bg-white p-6 md:p-8 rounded-[2rem] shadow-xl shadow-slate-200/60 border border-slate-100">
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <!-- Item Selection -->
              <div class="space-y-2">
                <label class="text-sm font-bold text-slate-700 ml-1">Item da Cesta Básica</label>
                <div class="relative">
                  <select 
                    v-model="form.itemId" 
                    class="w-full pl-4 pr-10 py-3 border border-slate-300 rounded-xl outline-none appearance-none focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all bg-white font-medium"
                    :disabled="isFetchingItems"
                  >
                    <option value="" disabled>{{ isFetchingItems ? 'Carregando...' : 'Selecione um produto' }}</option>
                    <option v-for="item in precoStore.itemsDieese" :key="item.id" :value="item.id">
                      {{ item.nome }}
                    </option>
                  </select>
                  <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>

              <!-- Price and Quantity Row -->
              <div class="grid grid-cols-2 gap-4">
                <Input
                  v-model="form.preco"
                  label="Preço (R$)"
                  placeholder="0,00"
                  type="text"
                />
                <Input
                  v-model="form.quantidade"
                  label="Qtd/Peso (Opcional)"
                  placeholder="1.0"
                  type="text"
                />
              </div>

              <!-- Image Upload Area -->
              <div class="space-y-2">
                <label class="text-sm font-bold text-slate-700 ml-1">Foto da Gôndola (OCR)</label>
                
                <div v-if="!previewUrl" class="relative group">
                  <input
                    type="file"
                    id="camera-input"
                    accept="image/*"
                    capture="environment"
                    @change="handleFileChange"
                    class="hidden"
                  />
                  <label 
                    for="camera-input" 
                    class="flex flex-col items-center justify-center w-full min-h-[220px] border-3 border-dashed border-slate-200 rounded-[2rem] bg-slate-50 hover:bg-primary-50 hover:border-primary-300 transition-all cursor-pointer group-hover:scale-[0.99]"
                  >
                    <div class="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-primary-600 mb-4 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                      <Camera :size="32" />
                    </div>
                    <span class="text-slate-900 font-bold">Abrir Câmera</span>
                    <p class="text-slate-400 text-sm mt-1">Capture o preço e o produto</p>
                  </label>
                </div>

                <!-- Preview State -->
                <div v-else class="relative rounded-[2rem] overflow-hidden shadow-lg border-4 border-white">
                  <img :src="previewUrl" class="w-full aspect-[4/3] object-cover" />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                    <div class="flex items-center justify-between w-full">
                      <div class="flex items-center gap-2 text-white">
                        <CheckCircle2 :size="20" class="text-green-400" />
                        <span class="font-bold">Imagem capturada</span>
                      </div>
                      <button 
                        @click="removeImage" 
                        type="button"
                        class="p-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors shadow-lg"
                      >
                        <Trash2 :size="20" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                :loading="isLoading" 
                variant="primary" 
                size="lg" 
                class="w-full h-16 !rounded-2xl text-lg shadow-lg shadow-primary-200"
              >
                <Upload :size="20" />
                Enviar para Validação
              </Button>
            </form>
          </div>
        </div>

        <!-- Sidebar Info -->
        <div class="lg:col-span-2 space-y-6">
          <div class="bg-accent-600 p-8 rounded-[2rem] text-white shadow-xl shadow-accent-200">
            <h3 class="text-xl font-bold flex items-center gap-2 mb-4">
              <Info :size="24" />
              Dicas para o OCR
            </h3>
            <ul class="space-y-4">
              <li class="flex gap-3">
                <div class="flex-shrink-0 w-6 h-6 bg-accent-500 rounded-full flex items-center justify-center text-xs font-bold">1</div>
                <p class="text-accent-50 leading-snug">Mantenha a câmera estável e foque na etiqueta de preço.</p>
              </li>
              <li class="flex gap-3">
                <div class="flex-shrink-0 w-6 h-6 bg-accent-500 rounded-full flex items-center justify-center text-xs font-bold">2</div>
                <p class="text-accent-50 leading-snug">Certifique-se de que o nome do produto também aparece na imagem.</p>
              </li>
              <li class="flex gap-3">
                <div class="flex-shrink-0 w-6 h-6 bg-accent-500 rounded-full flex items-center justify-center text-xs font-bold">3</div>
                <p class="text-accent-50 leading-snug">Evite sombras e reflexos de luz diretamente no preço.</p>
              </li>
            </ul>
          </div>

          <div class="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
            <h4 class="font-bold text-slate-900 mb-3">Status do Backend</h4>
            <div class="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
              <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span class="text-sm font-bold text-slate-700">Conectado ao Servidor</span>
            </div>
            <p class="text-xs text-slate-400 mt-4 leading-relaxed">
              O processamento via OCR (Reconhecimento Óptico de Caracteres) pode levar até 30 segundos.
            </p>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<style scoped>
.border-3 { border-width: 3px; }
</style>
