<script setup lang="ts">
import { ref, reactive } from 'vue';
import DashboardLayout from '../layouts/DashboardLayout.vue';
import BaseInput from '../components/BaseInput.vue';
import BaseButton from '../components/BaseButton.vue';
import { usePrecoStore } from '../stores/preco';

const precoStore = usePrecoStore();
const isLoading = ref(false);
const previewUrl = ref<string | null>(null);

const form = reactive({
  itemId: '',
  preco: '',
  quantidade: '',
  imagem: null as File | null,
});

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    const file = target.files[0];
    form.imagem = file;
    previewUrl.value = URL.createObjectURL(file);
  }
};

const handleSubmit = async () => {
  if (!form.itemId || !form.preco || !form.imagem) {
    alert('Por favor, preencha todos os campos e anexe uma foto da gôndola.');
    return;
  }

  try {
    isLoading.value = true;
    await precoStore.uploadPreco({
      itemId: form.itemId,
      preco: parseFloat(form.preco.replace(',', '.')),
      quantidade: form.quantidade,
      imagem: form.imagem,
    });
    alert('Preço enviado com sucesso! Aguarde a análise do OCR.');
    // Reset form
    form.itemId = '';
    form.preco = '';
    form.quantidade = '';
    form.imagem = null;
    previewUrl.value = null;
  } catch (err) {
    alert('Erro ao enviar preço. Tente novamente.');
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <DashboardLayout>
    <div class="upload-view">
      <header class="view-header">
        <h2>Registrar Novo Preço</h2>
        <p>Informe os dados do produto e envie uma foto da gôndola para validação.</p>
      </header>

      <div class="upload-grid">
        <!-- Form Section -->
        <section class="form-section card">
          <form @submit.prevent="handleSubmit" class="upload-form">
            <div class="form-group">
              <label class="label">Item da Cesta Básica (DIEESE)</label>
              <select v-model="form.itemId" class="base-select">
                <option value="" disabled>Selecione um item</option>
                <option v-for="item in precoStore.itemsDieese" :key="item.id" :value="item.id">
                  {{ item.nome }}
                </option>
              </select>
            </div>

            <div class="form-row">
              <BaseInput
                v-model="form.preco"
                label="Preço Comercial (R$)"
                placeholder="0,00"
              />
              <BaseInput
                v-model="form.quantidade"
                label="Embalagem (Ex: 1kg, 500g)"
                placeholder="1kg"
              />
            </div>

            <div class="upload-area" :class="{ 'has-file': form.imagem }">
              <input
                type="file"
                id="gondola-upload"
                accept="image/*"
                capture="environment"
                @change="handleFileChange"
                hidden
              />
              <label for="gondola-upload" class="upload-label">
                <template v-if="!previewUrl">
                  <svg class="upload-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Tirar Foto da Gôndola</span>
                  <small>Clique para abrir a câmera ou galeria</small>
                </template>
                <div v-else class="preview-container">
                  <img :src="previewUrl" alt="Preview da gôndola" class="preview-img" />
                  <div class="preview-overlay">
                    <span>Alterar Foto</span>
                  </div>
                </div>
              </label>
            </div>

            <BaseButton type="submit" :loading="isLoading" class="submit-btn">
              {{ isLoading ? 'Processando OCR...' : 'Enviar para Aprovação' }}
            </BaseButton>
          </form>
        </section>

        <!-- Guidelines Section -->
        <section class="guidelines card">
          <h3>Instruções para o OCR</h3>
          <ul class="guideline-list">
            <li>
              <div class="icon-circle success">✓</div>
              <p>Certifique-se de que o preço está legível na foto.</p>
            </li>
            <li>
              <div class="icon-circle success">✓</div>
              <p>Evite reflexos excessivos de luz na etiqueta.</p>
            </li>
            <li>
              <div class="icon-circle warning">!</div>
              <p>O produto deve corresponder exatamente ao item DIEESE selecionado.</p>
            </li>
          </ul>
        </section>
      </div>
    </div>
  </DashboardLayout>
</template>

<style scoped>
.upload-view {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.view-header h2 {
  font-size: 1.5rem;
  font-weight: 700;
}

.view-header p {
  color: var(--text-muted);
  margin-top: var(--space-1);
}

.upload-grid {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: var(--space-6);
  align-items: start;
}

.card {
  background: var(--surface);
  padding: var(--space-6);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
}

.upload-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-muted);
}

.base-select {
  padding: var(--space-3);
  border: 1.5px solid var(--border);
  border-radius: var(--radius-md);
  font-size: 1rem;
  background-color: var(--input-bg);
  cursor: pointer;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
}

.upload-area {
  border: 2px dashed var(--border);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  transition: all 0.2s;
  background-color: var(--bg);
}

.upload-area:hover {
  border-color: var(--primary);
  background-color: #f0f7ff;
}

.upload-area.has-file {
  border-style: solid;
  padding: 0;
  overflow: hidden;
}

.upload-label {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  cursor: pointer;
  min-height: 200px;
  text-align: center;
}

.upload-icon {
  width: 48px;
  height: 48px;
  color: var(--text-muted);
}

.upload-label span {
  font-weight: 600;
  color: var(--primary);
}

.upload-label small {
  color: var(--text-muted);
}

.preview-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.preview-img {
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  display: block;
}

.preview-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
}

.preview-container:hover .preview-overlay {
  opacity: 1;
}

.preview-overlay span {
  color: white;
  font-weight: 600;
  padding: var(--space-2) var(--space-4);
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(4px);
  border-radius: var(--radius-md);
}

.submit-btn {
  width: 100%;
}

.guidelines h3 {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: var(--space-4);
}

.guideline-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.guideline-list li {
  display: flex;
  gap: var(--space-3);
  align-items: flex-start;
  font-size: 0.875rem;
  line-height: 1.4;
}

.icon-circle {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  flex-shrink: 0;
}

.icon-circle.success { background: #dcfce7; color: var(--success); }
.icon-circle.warning { background: #fef9c3; color: var(--warning); }

@media (max-width: 900px) {
  .upload-grid {
    grid-template-columns: 1fr;
  }
}
</style>
